// SafeAgree Content Script

// 1. SAFETY LOCK
function lockAgreeButtons() {
    const keywords = ["Agree", "I accept", "Sign Up", "Complete Sign Up", "Accept Terms"];

    // Helper to check text
    const isAgreeButton = (text) => keywords.some(k => text.toLowerCase().includes(k.toLowerCase()));

    const buttons = document.querySelectorAll("button, input[type='submit'], a[role='button']");
    buttons.forEach(btn => {
        if (isAgreeButton(btn.innerText || btn.value || "")) {
            // Check if already processed
            if (btn.dataset.saLocked) return;

            btn.dataset.saLocked = "true";
            btn.dataset.saOriginalTitle = btn.title;

            // Lock it
            btn.style.filter = "grayscale(100%) opacity(0.6)";
            btn.style.cursor = "not-allowed";
            btn.title = "⚠️ SafeAgree Lock: Analyze this page to ensure safety.";

            // Prevent clicks
            btn.addEventListener("click", (e) => {
                if (btn.dataset.saLocked === "true") {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    alert("⚠️ SafeAgree has locked this button.\n\nPlease run a scan (click the SafeAgree extension icon) to check for traps before agreeing.");
                }
            }, true);
        }
    });
}

// Run lock on load and mutation
lockAgreeButtons();
const observer = new MutationObserver(lockAgreeButtons);
observer.observe(document.body, { childList: true, subtree: true });


// 2. HIGHLIGHTER & COMM
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "UNLOCK") {
        document.querySelectorAll("[data-sa-locked='true']").forEach(btn => {
            btn.dataset.saLocked = "false";
            btn.style.filter = "";
            btn.style.cursor = "";
            btn.title = btn.dataset.saOriginalTitle || "";
        });
        sendResponse({ status: "unlocked" });
    }

    if (request.action === "HIGHLIGHT") {
        const flags = request.flags || [];
        let count = 0;

        flags.forEach(flag => {
            if (!flag.quote) return;

            // Simple text search (limited by HTML structure)
            // A robust highlighter would use Range/TreeWalker. 
            // For MVP, we try to find the text node containing the quote.

            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
            let node;
            while (node = walker.nextNode()) {
                if (node.nodeValue.includes(flag.quote)) {
                    // Found it
                    const span = document.createElement("span");
                    span.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
                    span.style.borderBottom = "2px solid red";
                    span.style.cursor = "help";
                    span.title = `RISK: ${flag.title}`;

                    // Replace content
                    const parts = node.nodeValue.split(flag.quote);
                    // This is destructive if quote appears multiple times in same node, 
                    // but simple replace works for MVP.
                    // We only highlight the first instance in the node to avoid loops if we inserted already.

                    const range = document.createRange();
                    range.setStart(node, node.nodeValue.indexOf(flag.quote));
                    range.setEnd(node, node.nodeValue.indexOf(flag.quote) + flag.quote.length);
                    range.surroundContents(span);

                    count++;
                    break; // Move to next flag
                }
            }
        });
        sendResponse({ count });
    }
});
