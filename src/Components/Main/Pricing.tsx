import { useContext } from "react";
import { Reveal } from "../Motion";
import { Text, Box, Button } from "../UI";
import QuoteComp from "./QuoteComp";
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
        name: 'Free', price: '₦0', period: '/ forever', desc: 'Enjoy basic access with a limited number of AI-generated quizzes per day.',
        features: [
            'Generate a limited number of AI quizzes each day',
            'Access Multiple Choice, True/False, and Theory questions',
            'View and retake your previous quiz history',
            'Track your learning progress and performance',
            'Earn achievements as you complete quizzes',
        ],
        cta: 'Get started free', featured: false,
    },
    {
        name: 'Pro', price: '₦1,500', period: '/ month', desc: 'Unlock unlimited AI-generated quizzes, faster generation, and the best learning experience.',
        features: [
            'Increased quiz generations',
            'Everything in free',
            'Upload files (pdf, docx) and images for quiz generation',
            'Priority quiz generation',
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
        <Box variant='bare' id='pricing' className='scroll-mt-24 flex flex-col items-center mt-32 px-3'>
            <Reveal><QuoteComp text='PRICING' showIcon={false} /></Reveal>
            <Reveal delay={0.05}>
                <Box className='flex mt-3'>
                    <Header>Simple pricing, upgrade whenever you're ready</Header>
                </Box>
            </Reveal>
            <Box variant='bare' className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full mt-14'>
                {plans.map((p, i) => (
                    <Reveal key={p.name} delay={i * 0.1}>
                        <Box
                            id={`pricing-${p.name.toLowerCase()}`}
                            variant='card'
                            className='scroll-mt-28 p-9 flex flex-col gap-5 relative h-full transition-all duration-200 hover:-translate-y-1'
                            style={p.featured ? { borderColor: colors.primary, borderWidth: '2px', backgroundColor: colors.primarySoft } : undefined}
                        >
                            {p.featured && (
                                <span
                                    className='absolute -top-3 left-8 text-xs font-bold px-3 py-1 rounded-full'
                                    style={{ backgroundColor: colors.primary, color: '#fff', fontFamily: fonts.mono }}
                                >
                                    {isPremium ? 'CURRENT PLAN' : 'MOST POPULAR'}
                                </span>
                            )}
                            <div>
                                <Text className='font-bold text-xl'>{p.name}</Text>
                                <Text variant='soft' className='text-sm mt-1' style={{ fontFamily: fonts.body }}>{p.desc}</Text>
                            </div>
                            <div className='flex items-baseline gap-1'>
                                <Text className='text-4xl font-bold'>{p.price}</Text>
                                <Text variant='soft' className='text-sm' style={{ fontFamily: fonts.body }}>{p.period}</Text>
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
                                <Box variant='bare' className='flex flex-col gap-3 flex-1'>
                                    {p.features.map((f, j) => (
                                        <div key={j} className='flex items-start gap-2'>
                                            <CheckCircle2 size={16} color={colors.primary} className='mt-0.5 flex-none' />
                                            <Text className='text-sm' style={{ fontFamily: fonts.body }}>{f}</Text>
                                        </div>
                                    ))}
                                </Box>
                            )}

                            {(!isPremium && (p.featured || !user)) && (
                                <Button
                                    id={`btn-pricing-${p.name.toLowerCase()}`}
                                    variant={p.featured ? 'primary' : 'ghost'}
                                    className='w-full justify-center'
                                    onClick={p.featured ? requestUpgrade : openSignup}
                                    disabled={p.featured && isSubscribing}
                                >
                                    <Text variant='white'>{p.featured && isSubscribing ? 'Redirecting…' : p.cta}</Text>
                                </Button>
                            )}
                        </Box>
                    </Reveal>
                ))}
            </Box>
        </Box>
    )
}

export default Pricing