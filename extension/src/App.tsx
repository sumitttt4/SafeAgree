import { useState, useEffect, useRef } from 'react';
import { Shield, AlertTriangle, Loader2, Info, FileText, MessageSquare, History, Send, Trash2, Star, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type Tab = 'scan' | 'chat' | 'history';
const FREE_LIMIT = 5000;

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('scan');
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  // Chat State
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // History State
  const [history, setHistory] = useState<any[]>([]);

  // Monetization State
  const [scansToday, setScansToday] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [isPro, setIsPro] = useState(false);

  // License Key State
  const [licenseInput, setLicenseInput] = useState("");
  const [licenseError, setLicenseError] = useState("");

  useEffect(() => {
    checkDailyLimit();
    checkProStatus();
    if (activeTab === 'history') {
      chrome.storage.local.get(['scanHistory'], (res) => {
        setHistory((res.scanHistory as any[]) || []);
      });
    }
  }, [activeTab]);

  const checkProStatus = () => {
    chrome.storage.local.get(['isPro'], (res) => {
      if (res.isPro) setIsPro(true);
    });
  };

  const checkDailyLimit = () => {
    const today = new Date().toDateString();
    chrome.storage.local.get(['usage'], (res) => {
      const usage: any = res.usage || { date: today, count: 0 };
      if (usage.date !== today) {
        // Reset for new day
        chrome.storage.local.set({ usage: { date: today, count: 0 } });
        setScansToday(0);
      } else {
        setScansToday(usage.count);
      }
    });
  };

  const incrementUsage = () => {
    const today = new Date().toDateString();
    const newCount = scansToday + 1;
    setScansToday(newCount);
    chrome.storage.local.set({ usage: { date: today, count: newCount } });
  };

  const validateLicenseKey = () => {
    setLicenseError("");
    const key = licenseInput.trim().toUpperCase();

    // MVP Validation Logic
    if (key.startsWith("SAFEAGREE-PRO-") && key.length > 18) {
      chrome.storage.local.set({ isPro: true, licenseKey: key });
      setIsPro(true);
      setShowPaywall(false);
      setLicenseInput("");
    } else {
      setLicenseError("Invalid License Key");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const scanPage = async () => {
    // Check limit (Bypass if Pro)
    if (!isPro && scansToday >= FREE_LIMIT) {
      setShowPaywall(true);
      return;
    }

    setStatus('analyzing');
    setError('');

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab.id) throw new Error("No active tab");

      const extraction = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const clone = document.body.cloneNode(true) as HTMLElement;
          clone.querySelectorAll('nav, footer, header, script, style, iframe, svg').forEach(el => el.remove());
          return clone.innerText.slice(0, 50000);
        }
      });
      const text = extraction[0].result;

      if (!text || text.length < 50) throw new Error("No readable text found.");

      const apiUrl = 'https://safeagree.tech/api/analyze';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text, type: 'text' })
      });

      if (!response.ok) throw new Error("Analysis service error.");

      const data = await response.json();
      data.fullText = text;
      setResult(data);
      setStatus('success');

      // Only increment usage if NOT Pro
      if (!isPro) incrementUsage();

      // 1. UNLOCK BUTTONS
      chrome.tabs.sendMessage(tab.id, { action: "UNLOCK" });

      // 2. HIGHLIGHT FLAGS
      chrome.tabs.sendMessage(tab.id, { action: "HIGHLIGHT", flags: data.redFlags });

      // 3. SAVE HISTORY
      chrome.storage.local.get(['scanHistory'], (res) => {
        const newHistory = [{
          url: tab.url,
          score: data.score,
          date: new Date().toISOString(),
          summary: data.summary,
          id: Date.now()
        }, ...(res.scanHistory as any[] || [])].slice(0, 20);
        chrome.storage.local.set({ scanHistory: newHistory });
      });

    } catch (e: any) {
      console.error(e);
      setError(e.message || "Something went wrong.");
      setStatus('error');
    }
  };

  const handleChat = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setChatLoading(true);

    try {
      const context = result?.fullText || JSON.stringify(result) || "No context available.";
      const safeContext = typeof context === 'string' ? context.slice(0, 30000) : JSON.stringify(context);

      const res = await fetch("https://safeagree.tech/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          context: safeContext
        })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I couldn't reach the server." }]);
    } finally {
      setChatLoading(false);
    }
  };

  // === PAYWALL UI ===
  if (showPaywall) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 blur-[100px] rounded-full"></div>
        <div className="relative z-10 text-center space-y-6 animate-in zoom-in-95 duration-500 w-full max-w-xs">

          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-orange-500/20 rotate-3">
            <Star className="w-10 h-10 text-white fill-white" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900">Daily Limit Reached</h2>
            <p className="text-slate-600 text-sm mt-2">
              You've used your {FREE_LIMIT} free scans for today.
            </p>
          </div>

          {/* License Key Input */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-sm">
            <div className="text-left">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Have a License Key?</label>
              <div className="flex gap-2 mt-1">
                <div className="relative flex-1">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    value={licenseInput}
                    onChange={(e) => setLicenseInput(e.target.value)}
                    placeholder="SAFEAGREE-PRO-..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:border-blue-500 focus:outline-none placeholder-slate-400 font-mono uppercase"
                  />
                </div>
                <button
                  onClick={validateLicenseKey}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 rounded-lg text-xs font-bold transition-colors"
                >
                  Activate
                </button>
              </div>
              {licenseError && <div className="text-[10px] text-red-500 mt-1 font-medium">{licenseError}</div>}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-50 px-2 text-slate-500 font-bold">Or</span></div>
          </div>

          <a
            href="https://safeagree.tech/pricing"
            target="_blank"
            className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02]"
          >
            Upgrade for $5/mo
          </a>

          <button onClick={() => setShowPaywall(false)} className="text-xs text-slate-500 hover:text-slate-700">
            Maybe later
          </button>
        </div>
      </div>
    )
  }

  // === MAIN UI ===
  return (
    <div className="w-full h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-white/50 blur-[80px] pointer-events-none"></div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 p-3 flex items-center justify-between shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
            <img src="/icon-32.png" alt="Logo" className="w-5 h-5 drop-shadow-sm" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-sm block leading-none mb-0.5 text-slate-900">SafeAgree</span>
              {isPro && <span className="bg-yellow-100 text-yellow-700 text-[9px] font-black px-1 rounded uppercase tracking-wider border border-yellow-200">Pro</span>}
            </div>
            {!isPro && (
              <span className="text-[10px] text-slate-500 font-medium px-0">
                Extension • v1.0
              </span>
            )}
          </div>
        </div>
        <nav className="flex gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button onClick={() => setActiveTab('scan')} className={`p-1.5 rounded-md transition-all duration-300 ${activeTab === 'scan' ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200' : 'text-slate-400 hover:text-slate-600'}`} title="Scan">
            <Shield className="w-4 h-4" />
          </button>
          <button onClick={() => setActiveTab('chat')} className={`p-1.5 rounded-md transition-all duration-300 ${activeTab === 'chat' ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200' : 'text-slate-400 hover:text-slate-600'}`} title="Chat">
            <MessageSquare className="w-4 h-4" />
          </button>
          <button onClick={() => setActiveTab('history')} className={`p-1.5 rounded-md transition-all duration-300 ${activeTab === 'history' ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200' : 'text-slate-400 hover:text-slate-600'}`} title="History">
            <History className="w-4 h-4" />
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar p-5 relative z-10">

        {/* === SCAN TAB === */}
        {activeTab === 'scan' && (
          <>
            {status === 'idle' && (
              <div className="flex flex-col items-center justify-center h-full text-center fade-in pb-10">
                <div className="relative mb-8 group cursor-pointer" onClick={scanPage}>
                  <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500 opacity-50"></div>
                  <div className="w-28 h-28 bg-white rounded-[2rem] flex items-center justify-center shadow-xl shadow-slate-200 ring-1 ring-slate-100 relative z-10 group-hover:scale-105 transition-transform duration-300">
                    <Shield className="w-12 h-12 text-blue-600" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Stay Safe Online</h2>
                <p className="text-slate-500 text-sm mb-8 max-w-[220px] leading-relaxed">
                  Instantly analyze Terms & Privacy Policies for hidden risks.
                </p>

                <button
                  onClick={scanPage}
                  className="group relative inline-flex h-12 w-full max-w-[220px] items-center justify-center overflow-hidden rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:bg-blue-700 hover:scale-[1.02]"
                >
                  <span className="flex items-center gap-2 relative z-10">
                    <FileText className="w-4 h-4" /> Analyze Page
                  </span>
                </button>
              </div>
            )}

            {status === 'analyzing' && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-pulse">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
                  <Loader2 className="w-12 h-12 text-blue-600 animate-spin relative z-10" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-slate-900">Scanning Document...</p>
                  <p className="text-xs text-slate-500">Connecting to AI Neural Net</p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center border border-red-100">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Scan Failed</h3>
                <p className="text-sm text-slate-500">{error}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-sm text-white font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {status === 'success' && result && (
              <div className="space-y-5 animate-in slide-in-from-bottom-8 duration-500">

                {/* Score Card */}
                <div className="relative overflow-hidden bg-white p-5 rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50">
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Safety Score</div>
                      <div className="text-4xl font-black text-slate-900 tracking-tight">{result.score}<span className="text-lg text-slate-400 font-medium">/100</span></div>
                    </div>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${result.score >= 80 ? 'bg-green-50 text-green-600 border-green-100' :
                      result.score >= 60 ? 'bg-orange-50 text-orange-600 border-orange-100' :
                        'bg-red-50 text-red-600 border-red-100'
                      }`}>
                      <Shield className="w-7 h-7" />
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2 text-slate-500">
                    <Info className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Executive Summary</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {result.summary}
                  </p>
                </div>

                {/* Red Flags */}
                {result.redFlags.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <h3 className="text-xs font-bold text-red-600 uppercase flex items-center gap-1.5 tracking-wider">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                        Critical Risks
                      </h3>
                      <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium border border-red-100">{result.redFlags.length} Found</span>
                    </div>
                    {result.redFlags.map((flag: any, i: number) => (
                      <div key={i} className="group bg-white p-4 rounded-xl border border-red-100 hover:border-red-200 hover:shadow-sm transition-all duration-300 relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                        <div className="font-bold text-slate-900 text-xs mb-1.5">{flag.title}</div>
                        <div className="text-[11px] text-slate-500 leading-relaxed">{flag.description}</div>

                        {/* Quote Preview */}
                        {flag.quote && (
                          <div className="mt-3 pt-3 border-t border-red-50 flex items-start gap-1.5">
                            <div className="text-red-400/50 mt-0.5">❝</div>
                            <div className="text-[10px] text-red-600/80 italic leading-snug line-clamp-2">
                              {flag.quote}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <div className="h-4"></div>
              </div>
            )}
          </>
        )}

        {/* === CHAT TAB === */}
        {activeTab === 'chat' && (
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 pb-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-48 text-center text-slate-500 space-y-4 mt-6">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-sm">
                    <MessageSquare className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Ask SafeAgree AI</p>
                    <p className="text-xs text-slate-500 mt-1">"Does this site sell my data?"</p>
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3.5 text-sm shadow-sm ${m.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-white text-slate-700 rounded-bl-none border border-slate-200'
                    }`}>
                    <div className="prose prose-sm prose-slate dark:prose-invert">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl p-4 rounded-bl-none border border-slate-200">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="pt-3 border-t border-slate-200 flex gap-2 pb-1">
              <input
                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 placeholder-slate-400 transition-all shadow-sm"
                placeholder="Ask a question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChat()}
              />
              <button
                onClick={handleChat}
                disabled={chatLoading || !input.trim()}
                className="bg-blue-600 p-2.5 rounded-xl text-white hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* === HISTORY TAB === */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2 px-1">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recent Analysis</h3>
              {history.length > 0 && (
                <button
                  onClick={() => { chrome.storage.local.set({ scanHistory: [] }); setHistory([]); }}
                  className="text-[10px] text-red-600 hover:text-red-500 flex items-center gap-1 bg-red-50 px-2 py-1 rounded-md transition-colors border border-red-100"
                >
                  <Trash2 className="w-3 h-3" /> Clear
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-center text-slate-500 space-y-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                <History className="w-8 h-8 opacity-30" />
                <p className="text-xs">No scan history yet.</p>
              </div>
            ) : (
              history.map((item: any) => (
                <a key={item.id} href={item.url} target="_blank" className="group block bg-white p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-1 relative z-10">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.score >= 80 ? 'bg-green-500' : item.score >= 60 ? 'bg-orange-500' : 'bg-red-500'
                        }`}></div>
                      <div className="font-medium text-slate-900 truncate w-32 text-xs">{new URL(item.url || 'http://unknown').hostname}</div>
                    </div>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${item.score >= 80 ? 'bg-green-50 text-green-700 border border-green-100' : item.score >= 60 ? 'bg-orange-50 text-orange-700 border border-orange-100' : 'bg-red-50 text-red-700 border border-red-100'
                      }`}>
                      {item.score}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-1 pl-3.5">
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="truncate max-w-[120px]">{item.summary?.slice(0, 30)}...</span>
                  </div>
                  <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                </a>
              ))
            )}
          </div>
        )}

      </main>
    </div>
  );
}
