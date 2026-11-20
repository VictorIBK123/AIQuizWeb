import { useContext } from "react";
import { Reveal } from "../Motion";
import { Text, Box, Button } from "../UI";
import { authContext, themeContext, uiContext } from "../../Context/context";
import Header from "./Header";
import {
    CheckCircle2
} from 'lucide-react';
import { fonts } from "../../constants";
const subStatusConfig: Record<string, { label: string }> = {
    trial: { label: 'Free Trial' },
    active: { label: 'Active' },
    inactive: { label: 'Inactive' },
    past_due: { label: 'Payment Due' },
}

const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div className='flex justify-between items-center py-1.5'>
        <Text variant='soft' className='text-sm' style={{ fontFamily: fonts.body }}>{label}</Text>
        <Text className='text-sm font-semibold'>{value}</Text>
    </div>
)

const plans = [
    {
        name: 'Free', price: '₦0', period: '/ forever', desc: 'Everything you need to start turning topics and notes into quizzes every day.',
        features: [
            'Daily AI quizzes from topics, keywords & pasted notes',
            'Multiple Choice, True/False & AI-graded Theory questions',
            'Up to 2 Strict Mode quizzes per day',
            'Up to 3 active Shared Quizzes (up to 10 submissions/quiz)',
            'Offline retakes (1 retake/quiz) & PDF export',
            'Performance stats, daily streaks & achievements',
        ],
        cta: 'Get started free', featured: false,
    },
    {
        name: 'Pro', price: '₦1,500', period: '/ month', desc: 'Higher limits, file & photo uploads, unlimited Strict Mode, and full analytics.',
        features: [
            'Increased daily quiz generations & priority access',
            'Upload PDF, DOCX documents & photos/images',
            'Unlimited Strict Mode & unlimited quiz retakes',
            'Unlimited Saved Quizzes & unlimited Quiz History with search & filters',
            'Unlimited Shared Quizzes, unlimited participant responses & PDF/CSV exports',
            'Full analytics: per-topic breakdowns, difficulty charts & 7/14/30-day trends',
            '7-day free trial',
        ],
        cta: 'Upgrade to Pro', featured: true,
    },
]

const Pricing = () => {
    const { colors } = useContext(themeContext)
    const { openSignup, requestUpgrade, isSubscribing, isPremium, subscription } = useContext(uiContext)
    const { user } = useContext(authContext)
    return (
        <section id='pricing' className='scroll-mt-24 max-w-6xl mx-auto px-5 md:px-8 pt-24 pb-8'>
            <Reveal>
                <div className='max-w-xl mb-12'>
                    <p
                        className='text-xs font-semibold uppercase tracking-widest mb-3'
                        style={{ color: colors.primary, fontFamily: fonts.mono }}
                    >
                        Pricing
                    </p>
                    <Header>Simple plans, upgrade whenever you need more</Header>
                </div>
            </Reveal>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl'>
                {plans.map((p, i) => (
                    <Reveal key={p.name} delay={i * 0.08}>
                        <div
                            id={`pricing-${p.name.toLowerCase()}`}
                            className='scroll-mt-28 rounded-2xl border p-8 flex flex-col gap-6 relative h-full'
                            style={{
                                backgroundColor: colors.backgroundRaised,
                                borderColor: p.featured ? colors.primary : colors.border,
                                borderWidth: p.featured ? '1.5px' : '1px',
                            }}
                        >
                            <div className='flex items-start justify-between gap-4'>
                                <div>
                                    <Text className='font-bold text-xl'>{p.name}</Text>
                                    <Text variant='soft' className='text-sm mt-1.5 leading-relaxed'>{p.desc}</Text>
                                </div>
                                {p.featured && (
                                    <span
                                        className='shrink-0 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md'
                                        style={{
                                            backgroundColor: colors.primarySoft,
                                            color: colors.primary,
                                            fontFamily: fonts.mono,
                                        }}
                                    >
                                        {isPremium ? 'Current' : 'Popular'}
                                    </span>
                                )}
                            </div>

                            <div className='flex items-baseline gap-1.5 pb-5 border-b' style={{ borderColor: colors.border }}>
                                <Text className='text-4xl font-bold tracking-tight'>{p.price}</Text>
                                <Text variant='soft' className='text-sm'>{p.period}</Text>
                            </div>

                            {p.featured && isPremium ? (
                                <Box variant='bare' className='flex flex-col flex-1 divide-y' style={{ borderColor: colors.border }}>
                                    {subscription?.plan?.name && (
                                        <DetailRow label='Plan' value={subscription.plan.name} />
                                    )}
                                    {subscription?.plan?.amount != null && (
                                        <DetailRow
                                            label='Amount'
                                            value={`${subscription.plan.currency ?? 'NGN'} ${(subscription.plan.amount / 100).toLocaleString()}`}
                                        />
                                    )}
                                    {subscription?.plan?.interval && (
                                        <DetailRow
                                            label='Billing'
                                            value={subscription.plan.interval.charAt(0).toUpperCase() + subscription.plan.interval.slice(1)}
                                        />
                                    )}
                                    {subscription?.status && (
                                        <DetailRow
                                            label='Status'
                                            value={subStatusConfig[subscription.status]?.label ?? subscription.status}
                                        />
                                    )}
                                    {subscription?.nextPaymentDate && (
                                        <DetailRow
                                            label={subscription.status === 'trial' ? 'Trial ends' : 'Next renewal'}
                                            value={new Date(subscription.nextPaymentDate).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        />
                                    )}
                                    {subscription?.createdAt && (
                                        <DetailRow
                                            label='Subscribed on'
                                            value={new Date(subscription.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        />
                                    )}
                                </Box>
                            ) : (
                                <div className='flex flex-col gap-3 flex-1'>
                                    {p.features.map((f, j) => (
                                        <div key={j} className='flex items-start gap-2.5'>
                                            <CheckCircle2 size={16} color={p.featured ? colors.primary : colors.textSoft} className='mt-0.5 flex-none' />
                                            <Text className='text-sm leading-snug'>{f}</Text>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {(!isPremium && (p.featured || !user)) && (
                                <Button
                                    id={`btn-pricing-${p.name.toLowerCase()}`}
                                    variant={p.featured ? 'primary' : 'ghost'}
                                    className='w-full justify-center py-3 rounded-xl border text-sm font-semibold'
                                    style={
                                        p.featured
                                            ? undefined
                                            : {
                                                  backgroundColor: colors.backgroundSunken,
                                                  borderColor: colors.border,
                                              }
                                    }
                                    onClick={p.featured ? requestUpgrade : openSignup}
                                    disabled={p.featured && isSubscribing}
                                >
                                    <Text variant={p.featured ? 'fixedWhite' : 'white'} className='text-sm font-semibold'>
                                        {p.featured && isSubscribing ? 'Redirecting…' : p.cta}
                                    </Text>
                                </Button>
                            )}
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    )
}

export default Pricing