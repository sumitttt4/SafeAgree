"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, X, MessageSquare, Loader2, Maximize2, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface Message {
    role: "user" | "assistant";
    content: string;
}

interface ChatInterfaceProps {
    context: string;
    onClose?: () => void;
}

export function ChatInterface({ context, onClose }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hi! I'm SafeAgree's AI Assistant. I can help explain this document or answer any questions you have. What would you like to know?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, { role: "user", content: userMessage }].map(m => ({ role: m.role, content: m.content })),
                    context: context
                })
            });

            if (!response.ok) throw new Error("Failed to get response");

            const data = await response.json();
            setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again." }]);
        } finally {
            setIsLoading(false);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                height: isExpanded ? "80vh" : "500px",
                width: isExpanded ? "800px" : "380px"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
                "fixed bottom-24 right-4 z-50 flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden",
                isExpanded ? "right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2" : "" // Centered if expanded? detailed logic below
            )}
            style={isExpanded ? { right: "50%", transform: "translate(50%, 50%)", bottom: "50%" } : {}}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-[#FDE047] rounded-lg">
                        <Bot className="w-4 h-4 text-slate-900" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Legal Assistant</h3>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-none">AI-powered • Not legal advice</p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-1.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="p-1.5 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Messages */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/50 scroll-smooth"
            >
                {messages.map((msg, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                            "flex items-start gap-3 max-w-[85%]",
                            msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                        )}
                    >
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm",
                            msg.role === "user"
                                ? "bg-slate-900 dark:bg-white border-transparent"
                                : "bg-[#FDE047] border-yellow-400/50"
                        )}>
                            {msg.role === "user" ? (
                                <User className="w-4 h-4 text-white dark:text-slate-900" />
                            ) : (
                                <Bot className="w-4 h-4 text-slate-900" />
                            )}
                        </div>
                        <div className={cn(
                            "p-3 rounded-2xl text-sm shadow-sm",
                            msg.role === "user"
                                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-tr-sm"
                                : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-sm"
                        )}>
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                <ReactMarkdown>
                                    {msg.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </motion.div>
                ))}
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs ml-12"
                    >
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Thinking...</span>
                    </motion.div>
                )}
            </div>

            {/* Input */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <div className="relative flex items-center">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Ask about this document..."
                        disabled={isLoading}
                        className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FDE047]/50 disabled:opacity-50"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 p-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-0"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export function ChatButton({ onClick }: { onClick: () => void }) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-5 py-3 bg-[#FDE047] text-slate-900 rounded-full shadow-lg hover:shadow-xl hover:bg-[#fcd34d] transition-all font-bold border-2 border-slate-900"
        >
            <MessageSquare className="w-5 h-5" />
            <span>Ask AI</span>
        </motion.button>
    );
}
