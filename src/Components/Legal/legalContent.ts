export interface LegalSection {
    id: string;
    title: string;
    intro?: string;
    bullets?: string[];
    outro?: string;
}

export interface LegalDocument {
    slug: 'terms-of-use' | 'subscription-policy';
    badge: string;
    title: string;
    subtitle: string;
    lastUpdated: string;
    summaryNote?: string;
    sections: LegalSection[];
}

export const TERMS_OF_USE_DOC: LegalDocument = {
    slug: 'terms-of-use',
    badge: 'LEGAL · TERMS',
    title: 'Terms of Use',
    subtitle: 'Please read these terms carefully before using Skolarix on iOS, Android, or Web.',
    lastUpdated: 'November 2026',
    summaryNote:
        'Updated to cover Sign in with Apple & Google, file/image quiz uploads, Shared Quiz codes & participant attempt exports, Strict Mode, offline SQLite caching, and current plan limits.',
    sections: [
        {
            id: 'acceptance',
            title: '1. Acceptance of Terms',
            intro:
                'By accessing or using Skolarix (the mobile apps on iOS and Android, or the web platform at skolarix.app), you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree, please discontinue use of the service.',
        },
        {
            id: 'accounts',
            title: '2. Accounts & Authentication',
            bullets: [
                'You may create an account and sign in using Email & Password (with 6-digit email verification), Google Sign-In (Android), or Sign in with Apple (iOS).',
                'You are responsible for keeping your credentials and device access secure and for all activity conducted through your account.',
                'Skolarix may send security notifications (such as new-device login alerts) and invalidate prior sessions when your password is changed.',
                'You may request permanent deletion of your account and associated data at any time through the account deletion link on our Privacy Policy page (https://privacy-policy.skolarix.app/) or by emailing app.skolarix@gmail.com.',
                'We reserve the right to suspend or terminate accounts that abuse the platform, bypass rate/plan limits, or violate these Terms.',
            ],
        },
        {
            id: 'acceptable-use',
            title: '3. Acceptable Use',
            bullets: [
                'Skolarix is provided for personal study, educational practice, and sharing quizzes with students, classmates, or study groups.',
                'You agree not to attempt unauthorized access, probe or scrape backend services, interfere with Strict Mode or subscription verification, or submit harmful, abusive, or unlawful material.',
            ],
        },
        {
            id: 'ai-and-strict-mode',
            title: '4. AI-Generated Content, Grading & Strict Mode',
            bullets: [
                'Skolarix generates Multiple Choice, True/False, and Theory questions (including formatted math/LaTeX expressions) from keywords, pasted text, and uploaded documents or images.',
                'Theory answer evaluation and feedback are AI-assisted and may occasionally differ from human instructor grading.',
                'While quizzes are grounded in the topics or study materials you supply, AI-generated outputs can occasionally contain inaccuracies and should not be relied upon as a sole source of factual, academic, medical, or legal truth.',
                'Strict Mode applies exam-style session protections (such as hiding answer feedback until completion, detecting app switches, and preventing screenshots during active sessions where supported by the OS). Strict Mode is a study/self-assessment aid rather than a certified proctoring platform.',
            ],
        },
        {
            id: 'content-and-sharing',
            title: '5. User Content, File Uploads & Shared Quizzes',
            bullets: [
                'You may paste study text or upload PDF, DOCX, and image files (Premium) to generate quizzes. You represent that you own or have permission to use all uploaded materials.',
                'Your private quizzes and uploaded study materials are processed to generate questions and track your history, and are not published publicly to other users.',
                'Shared Quizzes: When you explicitly create a Shared Quiz and share its code or invite link (skolarix.app/join/<code>), anyone with that code can join and submit responses while you keep responses open.',
                'When a participant submits a Shared Quiz attempt, their display name, account email (when signed in), score, completion time, and question answers are visible to the quiz creator and may be exported by the creator as PDF or CSV.',
            ],
        },
        {
            id: 'offline-and-sync',
            title: '6. Offline Access & Data Sync',
            bullets: [
                'Previously generated quizzes, saved quizzes ("Save for Later"), shared quizzes, and quiz history are cached locally on your device so you can study, retake quizzes, and export PDFs offline.',
                'Changes queue locally and synchronize automatically with our servers when internet connectivity is restored.',
                'Actions requiring server computation — including new quiz generation, AI Theory grading, joining a new quiz code, and live submission of Shared Quiz attempts — require an internet connection.',
            ],
        },
        {
            id: 'subscriptions-link',
            title: '7. Plans & Subscriptions',
            intro:
                'Skolarix offers a Free tier and a Pro (Premium) subscription with expanded daily quotas, file/image uploads, unlimited Strict Mode, unlimited retakes, full history search, and advanced analytics. All billing, free trial, renewal, and cancellation terms are governed by our Subscription Policy.',
        },
        {
            id: 'ip-and-liability',
            title: '8. Intellectual Property & Limitation of Liability',
            bullets: [
                'All Skolarix branding, user interfaces, software, and platform features remain the intellectual property of Skolarix and its developer. You retain ownership of the notes and documents you upload.',
                'Skolarix is provided "as is" and "as available" without warranties of any kind, express or implied.',
                'To the maximum extent permitted by law, Skolarix and its developer shall not be liable for any indirect, incidental, or consequential damages arising from use of the app, reliance on AI-generated questions/grading, or temporary service or sync interruptions.',
            ],
        },
        {
            id: 'changes-and-contact',
            title: '9. Changes & Contact',
            intro:
                'We may update these Terms of Use as Skolarix evolves. Updated terms will appear on this page with a revised update date, and continued use of Skolarix constitutes acceptance. Questions? Contact us at app.skolarix@gmail.com.',
        },
    ],
};

export const SUBSCRIPTION_POLICY_DOC: LegalDocument = {
    slug: 'subscription-policy',
    badge: 'LEGAL · BILLING',
    title: 'Subscription Policy',
    subtitle: 'Clear breakdown of Free vs. Pro (Premium) plan quotas, billing platforms, trials, and cancellations.',
    lastUpdated: 'November 2026',
    summaryNote:
        'Updated with current daily quotas (5 Free / 30 Pro text + 15 file/image generations), Strict Mode & Shared Quiz limits, Paystack web checkout, and Google Play / RevenueCat mobile billing.',
    sections: [
        {
            id: 'overview',
            title: '1. Plans Overview',
            intro:
                'Skolarix offers both a Free plan and a Pro (Premium) subscription plan. You can review live plan features directly inside the app on the Compare Plans and Premium screens.',
        },
        {
            id: 'free-plan',
            title: '2. Free Plan Limits & Features',
            bullets: [
                'Up to 5 AI quiz generations per day from keywords, topics, or pasted text. (PDF, DOCX, and image uploads require Pro.)',
                'Full access to Multiple Choice, True/False, and Theory questions across difficulty modes (including Adaptive), plus offline retakes and PDF export.',
                'Up to 2 Strict Mode quizzes per day.',
                'Up to 1 retake per quiz (maximum 2 total attempts per quiz).',
                'Up to 5 saved quizzes ("Save for Later") and access to your 10 most recent quizzes in Quiz History (older entries are preserved and unlock upon upgrading).',
                'Up to 3 active Shared Quizzes, with up to the first 10 participant submissions viewable per quiz.',
                'Overall performance score, streak, and milestone achievements.',
            ],
        },
        {
            id: 'pro-plan',
            title: '3. Pro (Premium) Plan Features',
            bullets: [
                'Increased daily capacity: up to 30 AI quiz generations per day (keywords/text) plus up to 15 daily file or image quiz generations (PDF, DOCX, and images).',
                'Unlimited Strict Mode quizzes and unlimited retakes per quiz.',
                'Unlimited saved quizzes ("Save for Later") and full access to your entire Quiz History with live search and category filtering.',
                'Unlimited active Shared Quizzes and unlimited participant attempt tracking with PDF & CSV exports.',
                'Full analytics suite: per-topic performance breakdowns, difficulty and question-type charts, and 7 / 14 / 30-day growth trends.',
                'Priority quiz generation.',
            ],
        },
        {
            id: 'pricing-and-trial',
            title: '4. Pricing & 7-Day Free Trial',
            bullets: [
                'Eligible new subscribers receive a 7-day free trial before the first recurring charge.',
                'Web Pricing: Currently listed at ₦1,500 / month via Paystack (or the current price displayed at web checkout).',
                'Mobile Pricing: Displayed in your local currency inside the Google Play or Apple App Store purchase sheet prior to confirmation.',
            ],
        },
        {
            id: 'billing-and-renewal',
            title: '5. Payment Processing, Auto-Renewal & Restore',
            bullets: [
                'Web subscriptions are processed securely by Paystack. Mobile in-app subscriptions are billed through your Google Play or Apple App Store account (managed via RevenueCat).',
                'Payment is charged upon purchase confirmation or automatically when your 7-day free trial ends, unless canceled beforehand.',
                'Subscriptions automatically renew at the end of each monthly billing cycle unless auto-renew is turned off or canceled at least 24 hours before the renewal date.',
                'On mobile, if you reinstall the app or switch devices using the same store account, you can recover your active entitlement via "Restore Purchases" on the Premium screen.',
            ],
        },
        {
            id: 'cancellation-and-refunds',
            title: '6. Cancellation & Refunds',
            bullets: [
                'You may cancel your subscription at any time without penalty.',
                'Mobile subscriptions (Google Play / Apple App Store) must be canceled in your device app store subscription settings.',
                'Web subscriptions (Paystack) can be canceled using your Paystack subscription management link or by contacting app.skolarix@gmail.com prior to your next billing date.',
                'Cancellation stops future billing and takes effect at the end of the current paid period; you retain Pro features until that period expires.',
                'Fees for partial billing periods are non-refundable except where required by law. Refund requests for Google Play or Apple App Store charges are governed by Google Play or Apple refund policies.',
            ],
        },
        {
            id: 'pricing-changes',
            title: '7. Quota & Pricing Updates',
            intro:
                'Daily generation quotas reset daily to ensure fair and fast availability for all learners. We reserve the right to adjust plan quotas or subscription pricing; any subscription price change applies starting on the next billing cycle after advance notice. Billing support: app.skolarix@gmail.com.',
        },
    ],
};
