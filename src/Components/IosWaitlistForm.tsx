import React, { useContext, useState } from 'react';
import axios from 'axios';
import { CheckCircle2, Loader2, Mail, User } from 'lucide-react';
import { baseUrl, fonts } from '../constants';
import { themeContext } from '../Context/context';
import { Button, Text } from './UI';

interface IosWaitlistFormProps {
    source?: string;
    onDone?: () => void;
    compact?: boolean;
}

export const IosWaitlistForm: React.FC<IosWaitlistFormProps> = ({
    source = 'web',
    onDone,
    compact = false,
}) => {
    const { colors } = useContext(themeContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const trimmedEmail = email.trim();
        if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            setError('Please enter a valid email address.');
            return;
        }

        setSubmitting(true);
        try {
            const res = await axios.post(`${baseUrl}/api/waitlist/ios`, {
                name: name.trim() || undefined,
                email: trimmedEmail,
                source,
            });
            setSubmittedEmail(trimmedEmail);
            setSuccessMsg(
                res.data?.message ||
                    "You're on the iOS waitlist! We'll email you as soon as it's live."
            );
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                'Could not submit right now. Please try again.';
            setError(msg);
        } finally {
            setSubmitting(false);
        }
    };

    if (submittedEmail) {
        return (
            <div
                className="rounded-xl border p-4 text-left"
                style={{
                    backgroundColor: colors.backgroundSunken,
                    borderColor: colors.success,
                    fontFamily: fonts.body,
                }}
            >
                <div className="flex items-start gap-3">
                    <CheckCircle2 size={20} color={colors.success} className="shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                        <Text className="font-semibold text-sm">You&apos;re on the list!</Text>
                        <Text variant="soft" className="text-xs mt-1 leading-relaxed">
                            {successMsg} ({submittedEmail})
                        </Text>
                        {onDone && (
                            <Button
                                variant="primary"
                                className="w-full py-2.5 text-sm font-semibold mt-4"
                                onClick={onDone}
                            >
                                <Text variant="fixedWhite">Done</Text>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="text-left space-y-3" style={{ fontFamily: fonts.body }}>
            <div>
                <label className="block text-xs font-medium mb-1" style={{ color: colors.textSoft }}>
                    Full Name (optional)
                </label>
                <div
                    className="flex items-center gap-2 rounded-xl border px-3 py-2.5"
                    style={{
                        backgroundColor: colors.backgroundSunken,
                        borderColor: colors.border,
                    }}
                >
                    <User size={16} color={colors.textSoft} />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ibukun Ogundipe"
                        maxLength={100}
                        className="w-full bg-transparent text-sm outline-none"
                        style={{ color: colors.text }}
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-medium mb-1" style={{ color: colors.textSoft }}>
                    Email Address *
                </label>
                <div
                    className="flex items-center gap-2 rounded-xl border px-3 py-2.5"
                    style={{
                        backgroundColor: colors.backgroundSunken,
                        borderColor: colors.border,
                    }}
                >
                    <Mail size={16} color={colors.textSoft} />
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-transparent text-sm outline-none"
                        style={{ color: colors.text }}
                    />
                </div>
            </div>

            {error && (
                <p className="text-xs text-red-500 font-medium">{error}</p>
            )}

            <button
                type="submit"
                disabled={submitting}
                className={`w-full rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-60 inline-flex items-center justify-center gap-2 cursor-pointer ${
                    compact ? 'py-2.5' : 'py-3'
                }`}
                style={{ backgroundColor: colors.primary }}
            >
                {submitting ? (
                    <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Joining waitlist...</span>
                    </>
                ) : (
                    <span>Notify Me When iOS Launches</span>
                )}
            </button>
        </form>
    );
};

export default IosWaitlistForm;
