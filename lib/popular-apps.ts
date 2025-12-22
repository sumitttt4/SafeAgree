
export interface AppAnalysisData {
    score: number;
    summary: string;
    redFlags: Array<{
        title: string;
        description: string;
        severity?: "high" | "medium" | "low";
    }>;
    greenFlags: Array<{
        title: string;
        description: string;
    }>;
    grayFlags: Array<{
        title: string;
        value: string;
    }>;
}

export const POPULAR_APPS: Record<string, AppAnalysisData> = {
    // META / FACEBOOK
    "facebook": {
        score: 35,
        summary: "Facebook collects extensive data about you, tracks you across the web, and uses it for targeted advertising.",
        redFlags: [
            { title: "Tracks You Everywhere", description: "Facebook tracks your browsing history on other websites that use their plugins (like the Like button).", severity: "high" },
            { title: "Broad Data License", description: "You grant a non-exclusive, transferable, sub-licensable, royalty-free, and worldwide license to host, use, distribute, modify, run, copy, publicly perform or display, translate, and create derivative works of your content.", severity: "high" },
            { title: "Identity in Ads", description: "Your name and profile picture can be used in ads shown to your friends without your consent.", severity: "medium" },
            { title: "No Anonymity", description: "You are required to use your real name and identity.", severity: "medium" },
        ],
        greenFlags: [
            { title: "Delete Account", description: "You can delete your account and data, though it may take up to 90 days." },
            { title: "Control Tools", description: "Provides settings to limit some ad targeting (though often complex)." },
        ],
        grayFlags: [
            { title: "Jurisdiction", value: "California, US" },
            { title: "Age", value: "13+" },
            { title: "Arbitration", value: "Yes" },
            { title: "Contact", value: "https://www.facebook.com/help" }
        ]
    },

    // INSTAGRAM
    "instagram": {
        score: 38,
        summary: "Similar to Facebook, Instagram claims broad rights to your content and collects significant behavioral data.",
        redFlags: [
            { title: "Right to Sub-license", description: "They can sub-license your content to third parties without paying you.", severity: "high" },
            { title: "Waive Moral Rights", description: "You waive your moral rights to your uploaded material (in some jurisdictions).", severity: "medium" },
            { title: "No Screening Liability", description: "They take no responsibility for content posted by others but can remove yours at any time.", severity: "medium" },
        ],
        greenFlags: [
            { title: "Deletion", description: "Offers account deletion options." },
            { title: "GDPR Tools", description: "Data download tools available." },
        ],
        grayFlags: [
            { title: "Owner", value: "Meta" },
            { title: "Age", value: "13+" },
            { title: "Contact", value: "https://help.instagram.com" }
        ]
    },

    // X / TWITTER
    "twitter": {
        score: 45,
        summary: "X (Twitter) reserves the right to share your content broadly and use your data for AI training.",
        redFlags: [
            { title: "AI Training", description: "Your data is explicitly used to train their AI models (Grok).", severity: "high" },
            { title: "Sell Data", description: "Data may be sold or shared with partners for varying purposes.", severity: "high" },
            { title: "Remove Content", description: "They can remove your content or account at any time without notice.", severity: "medium" },
        ],
        greenFlags: [
            { title: "Archives", description: "User archives can be downloaded." },
            { title: "2FA", description: "Offers Two-Factor Authentication (paid for SMS, free for apps)." },
        ],
        grayFlags: [
            { title: "Jurisdiction", value: "US" },
            { title: "Changes", value: "No Notice" },
            { title: "Contact", value: "https://help.twitter.com" }
        ]
    },
    // Handles x.com as well
    "x.com": {
        score: 45,
        summary: "X (Twitter) reserves the right to share your content broadly and use your data for AI training.",
        redFlags: [
            { title: "AI Training", description: "Your data is explicitly used to train their AI models (Grok).", severity: "high" },
            { title: "Sell Data", description: "Data may be sold or shared with partners for varying purposes.", severity: "high" },
            { title: "Remove Content", description: "They can remove your content or account at any time without notice.", severity: "medium" },
        ],
        greenFlags: [
            { title: "Archives", description: "User archives can be downloaded." },
            { title: "2FA", description: "Offers Two-Factor Authentication (paid for SMS, free for apps)." },
        ],
        grayFlags: [
            { title: "Jurisdiction", value: "US" },
            { title: "Changes", value: "No Notice" },
            { title: "Contact", value: "https://help.twitter.com" }
        ]
    },

    // APPLE
    "apple": {
        score: 78,
        summary: "Apple is generally more privacy-focused than competitors, but locks you strictly into their ecosystem.",
        redFlags: [
            { title: "Ecosystem Lock-in", description: "Terms heavily restrict using purchased content on non-Apple devices.", severity: "medium" },
            { title: "Scanning", description: "They may scan uploaded content (iCloud) for illegal material.", severity: "medium" },
        ],
        greenFlags: [
            { title: "Data Privacy", description: "Business model is not primarily based on selling user data for ads.", },
            { title: "Encryption", description: "High levels of encryption for device data." },
            { title: "Transparency", description: "Clear privacy labels on App Store." },
        ],
        grayFlags: [
            { title: "Jurisdiction", value: "California" },
            { title: "Updates", value: "Periodic" },
            { title: "Contact", value: "https://support.apple.com" }
        ]
    },

    // REDDIT
    "reddit": {
        score: 55,
        summary: "Reddit claims ownership rights over your posts and tracks user behavior for advertising.",
        redFlags: [
            { title: "Content License", description: "Irrevocable, perpetual license to use your content for any purpose, including media features.", severity: "medium" },
            { title: "Tracking", description: "Uses trackers and cookies to monitor your activity for ads.", severity: "medium" },
            { title: "API Restrictions", description: "Heavy restrictions on how 3rd parties access your public data.", severity: "low" },
        ],
        greenFlags: [
            { title: "Anonymity", description: "Real names are not required." },
            { title: "Manuals", description: "Community guidelines are fairly transparent." },
        ],
        grayFlags: [
            { title: "Jurisdiction", value: "California" },
            { title: "Age", value: "13+" },
            { title: "Contact", value: "https://www.reddithelp.com" }
        ]
    },

    // PAYPAL
    "paypal": {
        score: 60,
        summary: "PayPal provides security for transactions but shares data with many third parties and credit bureaus.",
        redFlags: [
            { title: "Data Sharing", description: "Shares personal data with a very long list of third parties including credit bureaus.", severity: "high" },
            { title: "Account Freeze", description: "Can freeze your funds for 180 days without much recourse.", severity: "high" },
        ],
        greenFlags: [
            { title: "Buyer Protection", description: "Strong protection policies for unauthorized transactions." },
            { title: "Security", description: "Industry standard encryption and fraud detection." },
        ],
        grayFlags: [
            { title: "Jurisdiction", value: "Singapore/US" },
            { title: "Notice", value: "30 Days" },
            { title: "Contact", value: "https://www.paypal.com/us/smarthelp/contact-us" }
        ]
    },

    // GOOGLE
    "google": {
        score: 40,
        summary: "Google's business model relies on collecting massive amounts of data to serve targeted ads.",
        redFlags: [
            { title: "Data Mining", description: "Scans emails, search history, and location history to build a profile.", severity: "high" },
            { title: "Cross-Service Tracking", description: "Combines data from Maps, YouTube, Search, and more.", severity: "high" },
            { title: "Voice Recording", description: "May keep voice recordings from Assistant interactions.", severity: "medium" },
        ],
        greenFlags: [
            { title: "Security", description: "Top-tier security infrastructure." },
            { title: "Takeout", description: "Excellent data export tools (Google Takeout)." },
            { title: "Transparency", description: "My Activity dashboard allows viewing and deleting history." },
        ],
        grayFlags: [
            { title: "Jurisdiction", value: "California" },
            { title: "Updates", value: "Frequent" },
            { title: "Contact", value: "https://support.google.com" }
        ]
    },

    // YOUTUBE
    "youtube": {
        score: 42,
        summary: "YouTube (Google) tracks detailed viewing habits and can delete accounts without clear reason.",
        redFlags: [
            { title: "Ad Tracking", description: "Extensive tracking of viewing habits for video ads.", severity: "high" },
            { title: "Account Deletion", description: "Can terminate accounts if they are 'no longer commercially viable'.", severity: "high" },
        ],
        greenFlags: [
            { title: "Copyright Tools", description: "Tools to protect creator content (Content ID).", },
            { title: "Takeout", description: "Data is included in Google Takeout." },
        ],
        grayFlags: [
            { title: "Owner", value: "Google" },
            { title: "Age", value: "13+" },
            { title: "Contact", value: "https://support.google.com/youtube" }
        ]
    },

    // TIKTOK
    "tiktok": {
        score: 20,
        summary: "TikTok collects aggressive amounts of data, including precise location and keystroke patterns.",
        redFlags: [
            { title: "Aggressive Tracking", description: "Collects sim card info, battery state, keystroke patterns/rhythm.", severity: "high" },
            { title: "Jurisdiction Risk", description: "Concerns over data access laws in parent company's origin.", severity: "high" },
            { title: "Biometrics", description: "May collect faceprints and voiceprints.", severity: "high" },
        ],
        greenFlags: [
            { title: "Settings", description: "Some privacy controls available to limit visibility." },
        ],
        grayFlags: [
            { title: "Jurisdiction", value: "Singapore/US" },
            { title: "Age", value: "13+" },
            { title: "Contact", value: "https://support.tiktok.com" }
        ]
    },

    // AMAZON
    "amazon": {
        score: 65,
        summary: "Amazon tracks shopping habits extensively but generally secures payment information well.",
        redFlags: [
            { title: "Purchase Tracking", description: "Keeps a permanent history of every item ever viewed or bought.", severity: "medium" },
            { title: "3rd Party Sharing", description: "Shares info with marketplace sellers.", severity: "medium" },
        ],
        greenFlags: [
            { title: "Refunds", description: "generally customer-centric return policies." },
            { title: "Security", description: "Reliable payment security." },
        ],
        grayFlags: [
            { title: "Jurisdiction", value: "Washington" },
            { title: "Arbitration", value: "Yes" },
            { title: "Contact", value: "https://www.amazon.com/gp/help/customer/display.html" }
        ]
    },

    // SPOTIFY
    "spotify": {
        score: 55,
        summary: "Spotify collects data on your listening habits and can share it with social platforms.",
        redFlags: [
            { title: "Social Sharing", description: "Listening activity can be public by default unless changed.", severity: "low" },
            { title: "Data Sharing", description: "Shares data with advertising partners for free tier users.", severity: "medium" },
        ],
        greenFlags: [
            { title: "Portability", description: "Allows downloading personal data." },
        ],
        grayFlags: [
            { title: "Jurisdiction", value: "Sweden/US" },
            { title: "Age", value: "13+" },
            { title: "Contact", value: "https://support.spotify.com" }
        ]
    },

    // NETFLIX
    "netflix": {
        score: 70,
        summary: "Netflix tracks viewing history for recommendations but generally keeps data internal.",
        redFlags: [
            { title: "No Refunds", description: "Strict no-refund policy for partial months.", severity: "low" },
            { title: "Price Changes", description: "Can change prices with notice.", severity: "low" },
        ],
        greenFlags: [
            { title: "Ad-Free", description: "Base tiers do not sell viewing data to 3rd party ad networks (historically).", },
        ],
        grayFlags: [
            { title: "Jurisdiction", value: "Delaware" },
            { title: "Disputes", value: "Arbitration" },
            { title: "Contact", value: "https://help.netflix.com" }
        ]
    },

    // LINKEDIN
    "linkedin": {
        score: 60,
        summary: "LinkedIn uses your professional data for recruitment products and targeted B2B ads.",
        redFlags: [
            { title: "Public Visibility", description: "Profile data is public to search engines by default.", severity: "medium" },
            { title: "Contact Importing", description: "Aggressively suggests importing address books.", severity: "low" },
        ],
        greenFlags: [
            { title: "Data Export", description: "Comprehensive data export tools." },
            { title: "Visibility Controls", description: "Granular controls over who sees your activity." },
        ],
        grayFlags: [
            { title: "Owner", value: "Microsoft" },
            { title: "Jurisdiction", value: "California" },
            { title: "Contact", value: "https://www.linkedin.com/help" }
        ]
    },

    // MICROSOFT
    "microsoft": {
        score: 50,
        summary: "Microsoft collects significant telemetry from Windows and Office usage.",
        redFlags: [
            { title: "Telemetry", description: "Windows collects diagnostic data that is hard to fully disable.", severity: "medium" },
            { title: "AI Training", description: "Data may be used to improve services and AI.", severity: "medium" },
        ],
        greenFlags: [
            { title: "Enterprise Security", description: "Strong standards for enterprise data." },
            { title: "Privacy Dashboard", description: "Centralized privacy settings." },
        ],
        grayFlags: [
            { title: "Jurisdiction", value: "Washington" },
            { title: "Arbitration", value: "Yes" },
            { title: "Contact", value: "https://support.microsoft.com" }
        ]
    },

    // DISCORD
    "discord": {
        score: 45,
        summary: "Discord collects chat metadata and can read messages for safety enforcement.",
        redFlags: [
            { title: "Arbitration", description: "Forced arbitration clause preventing class actions.", severity: "high" },
            { title: "Data Collection", description: "Collects info on who you talk to and what servers you join.", severity: "medium" },
        ],
        greenFlags: [
            { title: "No Message Selling", description: "Claims not to sell message content to advertisers." },
        ],
        grayFlags: [
            { title: "Jurisdiction", value: "California" },
            { title: "Age", value: "13+" },
            { title: "Contact", value: "https://support.discord.com" }
        ]
    }
};
