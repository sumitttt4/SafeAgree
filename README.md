# SafeAgree 🛡️

**AI-Powered Legal Document Analysis**

SafeAgree helps you understand what you're signing. It scans Terms of Service, Privacy Policies, and Contracts in seconds to find hidden risks, unfair clauses, and privacy traps using advanced AI.

## 🚀 Features

- **🔍 Instant Analysis**: Paste text, drop a PDF, or enter a URL to get a comprehensive breakdown.
- **🚩 Risk Detection**: Automatically highlights Red, Green, and Gray flags in the document.
- **💬 AI Legal Assistant**: Chat with your document! Ask specific questions like "Can they sell my data?" and get answers based on the context.
- **📊 Trust Score**: Get a simple 0-100 safety score at a glance.
- **📤 Export Reports**: Download professional PDF reports of your analysis.
- **🔗 Shareable Links**: Generate unique, shareable links to show others what you found.
- **🌙 Dark Mode**: Beautiful, responsive UI with automatic dark mode support.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/)
- **AI Providers**: 
  - **Groq** (Llama-3.1-8b) for instant speed
  - **SambaNova** (Llama-3.1-70b) for deep reasoning fallback
- **PDF Handling**: `pdf-parse` (Server) & `jspdf` (Client)
- **Icons**: Lucide React

## 📦 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/sumitttt4/SafeAgree.git
   cd SafeAgree
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file with your API keys:
   ```env
   GROQ_API_KEY=your_groq_key
   SAMBANOVA_API_KEY=your_sambanova_key
   # Optional
   GEMINI_API_KEY=your_gemini_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🔒 Privacy

SafeAgree analyzes documents in real-time. We prioritize user privacy and transparency.

---
*Powered by [SafeAgree.tech](https://safeagree.tech)*
