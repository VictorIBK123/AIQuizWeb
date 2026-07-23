import appIcon from './assets/app-icon.png'
import './App.css'
import { useContext, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { MobileMenu } from './Components/MobileMenu';
import { AuthModal } from './Components/AuthModal';
import screenshot from './assets/app-screenshot.jpeg'
import Switch from '@mui/material/Switch';
import Screenshot1 from './assets/screenshot1.png'
import Screenshot2 from './assets/screenshot2.png'
import Screenshot3 from './assets/screenshot3.png'
import Screenshot4 from './assets/screenshot4.png'
import Screenshot5 from './assets/screenshot5.png'
import Screenshot6 from './assets/screenshot6.png'
import Screenshot7 from './assets/screenshot7.png'
import Screenshot8 from './assets/screenshot8.png'
import Screenshot9 from './assets/screenshot9.png'


import {
  Dot, Menu, SquareCheck, Sparkles, FileText, File as FileIcon,
  ClipboardList, BarChart3, CheckCircle2, Smartphone, Clock
} from 'lucide-react';
import { Box, Button, Text } from './Components/UI';
import { fonts, colorsDefinition, baseUrl } from './constants';
import { authContext, AuthProvider, themeContext, ThemeProvider, uiContext } from './Context/context';
import { AccountMenu } from './Components/AccountMenu';
import { Reveal, FadeIn } from './Components/Motion';
import { scrollToSection } from './utils/Scrolltosection';
import { SignInSuccessToast } from './Components/SignInSuccessToast';
import { Toast, type ToastState } from './Components/Toast';
import { usePayment } from './hooks/usePayment';
import { getProfileData } from './services/profile';
import axios from 'axios';


const FixedHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [successEmail, setSuccessEmail] = useState('');
  const { setUser, user, setAccessToken } = useContext(authContext);
  const { setColors } = useContext(themeContext);

  useEffect(() => {
    setColors(darkMode ? colorsDefinition.dark : colorsDefinition.light);
  }, [darkMode])

  const handleSignOut = () => {
    localStorage.clear();
    setUser(null);
    setAccessToken(null);
  };

  const centerLinks = [
    { text: 'Features', slug: 'features' },
    { text: 'How it works', slug: 'how-it-works' },
    { text: 'Screenshots', slug: 'screenshots' },
    { text: 'Pricing', slug: 'pricing' },
    { text: 'FAQ', slug: 'faq' },
  ]

  return (
    <>
      <Box variant='card' className='z-50 fixed top-0 left-0 w-full h-19 text-white flex items-center justify-between px-10'>
        <div className='flex items-center flex-row'>
          <img src={appIcon} alt="Logo" className="h-8 rounded-lg" />
          <Text className='ml-4 font-bold'>AIQuiz</Text>
        </div>
        <div className='hidden md:flex items-center flex-row'>
          {centerLinks.map((link) => (
            <Text key={link.slug} className='ml-4'>
              <a href={`#${link.slug}`} onClick={scrollToSection(link.slug)}>{link.text}</a>
            </Text>
          ))}
        </div>
        <div className='flex items-center flex-row'>
          <Switch onChange={(_e, checked) => setDarkMode(checked)} defaultChecked color='primary' />

          {user ? (
            <AccountMenu email={user.email} onSignOut={handleSignOut} />
          ) : (
            <>
              <Button variant='ghost' className='ml-4 max-md:hidden' onClick={() => setShowAuth(true)}>
                <Text>Sign in</Text>
              </Button>
              <Button variant='primary' className='ml-4'>
                <Text>Download</Text>
              </Button>
            </>
          )}

          <button onClick={() => setMobileOpen((o) => !o)} className='md:hidden ml-4 cursor-pointer'>
            {mobileOpen ? <X color='white' /> : <Menu color='white' />}
          </button>
        </div>
        <hr className='absolute bottom-0 left-0 w-full border-t border-gray-700' />
      </Box>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={centerLinks}
        onSignInClick={() => setShowAuth(true)}
      />
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onAuthSuccess={(email) => setSuccessEmail(email)}
      />
      <SignInSuccessToast
        visible={!!successEmail}
        email={successEmail}
        onDismiss={() => setSuccessEmail('')}
      />
    </>
  )
}

// ---------- SHARED PIECES ----------
const QuoteComp = ({ showIcon, text }: { showIcon: boolean, text: string }) => {
  const { colors } = useContext(themeContext);
  return (
    <Box className='w-full flex justify-center'>
      <Box variant='small' className='px-4 flex pr-4 items-center flex-row'>
        {showIcon && <Dot size={50} color={colors.success} />}
        <Text className='text-center text-sm' variant='soft'>
          {text}
        </Text>
      </Box>
    </Box>
  )
}

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text variant='white' className='mx-auto max-w-lg text-center font-bold text-5xl'>
      {children}
    </Text>
  )
}

// ---------- HERO ----------
const Desc = () => {
  const { colors } = useContext(themeContext);
  return (
    <Box variant='bare' className='items-center flex-col flex mt-7 px-3'>
      <Header>Your notes, <span style={{ color: colors.primary }}>already </span>turned into a quiz.</Header>
      <Text variant='soft' className='text-lg max-w-lg text-center mt-6' style={{ fontFamily: fonts.body }}>
        Upload a PDF, DOCX, paste your lecture notes, enter a keyword, drop in a textbook chapter or upload an image. AIQuiz reads it and builds questions that test what you actually need to know.
      </Text>
    </Box>
  )
}

const AppActions = ({ onCreateAccount, isPremium }: { onCreateAccount: () => void; isPremium: boolean }) => {
  return (
    <Box variant='bare' className='justify-center flex mt-6'>
      <Button variant='primary' className='w-50'>
        <Text variant='fixedWhite'>Download the app</Text>
      </Button>
      {!isPremium && (
        <Button variant='ghost' className='h-13 w-50 ml-5' onClick={onCreateAccount}>
          <Text variant='white'>Create account</Text>
        </Button>
      )}
    </Box>
  )
}

const Features = () => {
  return (
    <Box className='mt-8 flex flex-col justify-center'>
      <hr className='w-full border-t border-gray-700' />
      <Box className='py-7 flex self-center w-130 justify-between'>
        <Box>
          <Text className='text-3xl text-center font-bold'>{`<30s`}</Text>
          <Text className='mt-2 text-center' variant='soft' style={{ fontFamily: fonts.body }}>To generate a quiz</Text>
        </Box>
        <Box variant='bare'>
          <Text className='text-3xl text-center font-bold'>5</Text>
          <Text className='mt-2 text-center' variant='soft' style={{ fontFamily: fonts.body }}>Supported input types</Text>
        </Box>
        <Box>
          <Text className='text-3xl text-center font-bold'>Free</Text>
          <Text className='mt-2 text-center' variant='soft' style={{ fontFamily: fonts.body }}>To get started</Text>
        </Box>
      </Box>
      <hr className='w-full border-t mb-32 border-gray-700' />
    </Box>
  )
}

const AppShot = () => {
  const { colors } = useContext(themeContext)
  return (
    <Box className='relative h-200 w-90 flex mx-auto mt-12'>
      <img src={Screenshot9} alt="App Screenshot" className='rounded-2xl object-cover h-200 w-90' />
      <Box variant='small' className='animate-bounce absolute w-40 rounded-lg -left-15 h-10 top-9 flex items-center justify-center'>
        <SquareCheck color={colors.success} />
        <Text className='ml-2.5' variant='white'>PDF uploaded</Text>
      </Box>
      <Box variant='small' className='animate-bounce absolute w-50 rounded-lg -right-15 h-10 bottom-9 flex items-center justify-center'>
        <SquareCheck color={colors.success} />
        <Text className='ml-2.5' variant='white'>10 questions ready</Text>
      </Box>
    </Box>
  )
}

// ---------- BENTO FEATURES ----------
const bentoFeatures = [
  { icon: Sparkles, title: 'Generate AI quizzes', desc: 'Turn any study material into a full quiz in seconds — no manual question-writing required.', big: true },
  { icon: FileText, title: 'PDF support', desc: 'Upload slides or scanned notes as a PDF.' },
  { icon: FileIcon, title: 'Document support', desc: 'Word docs work just as well.' },
  { icon: ClipboardList, title: 'Paste text', desc: 'No file? Paste notes or enter keyword directly.' },
  { icon: BarChart3, title: 'Difficulty levels', desc: 'Easy, medium, or hard — your call.' },
  { icon: CheckCircle2, title: 'Instant feedback', desc: 'Score and explanation the moment you finish.', wide: true },
  { icon: Smartphone, title: 'Study anywhere', desc: 'A spare five minutes is enough to review.', wide: true },
]

const BentoFeatures = () => {
  const { colors } = useContext(themeContext)
  return (
    <Box variant='bare' className='grid grid-cols-2 md:grid-cols-4 gap-5 auto-rows-[170px] max-w-5xl w-full self-center mt-10 px-3'>
      {bentoFeatures.map((f, i) => (
        <Reveal
          key={i}
          delay={i * 0.06}
          className={`${f.big ? 'col-span-2 row-span-2' : ''} ${f.wide ? 'col-span-2' : ''}`}
        >
          <Box
            variant='card'
            className={`p-6 flex flex-col gap-2 h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${f.big ? 'justify-start' : ''}`}
          >
            <div className='w-10 h-10 rounded-xl flex items-center justify-center' style={{ backgroundColor: colors.primarySoft }}>
              <f.icon size={20} color={colors.primary} />
            </div>
            <Text className={`font-bold mt-2 ${f.big ? 'text-xl' : 'text-base'}`}>{f.title}</Text>
            <Text variant='soft' className='text-sm' style={{ fontFamily: fonts.body }}>{f.desc}</Text>
          </Box>
        </Reveal>
      ))}
    </Box>
  )
}

// ---------- HOW IT WORKS ----------
const steps = [
  { num: 1, title: 'Upload or paste', desc: 'Bring a PDF, DOCX, Image, Keyword or just paste the notes you already have.' },
  { num: 2, title: 'AI reads it', desc: "AIQuiz works through the material and picks out what's worth testing." },
  { num: 3, title: 'Practice', desc: "Take the quiz it builds, see what stuck, revisit what didn't." },
]

const HowItWorks = () => {
  return (
    <Box variant='bare' id='how-it-works' className='scroll-mt-24 flex flex-col items-center mt-32 px-3'>
      <Reveal><QuoteComp text='THREE STEPS' showIcon={false} /></Reveal>
      <Reveal delay={0.05}>
        <Box className='flex mt-3'>
          <Header>How it works</Header>
        </Box>
      </Reveal>
      <Box variant='bare' className='grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl w-full mt-14'>
        {steps.map((s, i) => (
          <Reveal key={s.num} delay={i * 0.1}>
            <Box variant='bare' className='flex flex-col items-center text-center px-5'>
              <Box variant='small' className='w-13 h-13 rounded-full flex items-center justify-center mb-5'>
                <Text className='font-bold text-lg' variant='blue'>{s.num}</Text>
              </Box>
              <Text className='font-bold text-lg mb-2'>{s.title}</Text>
              <Text variant='soft' className='text-sm max-w-60' style={{ fontFamily: fonts.body }}>{s.desc}</Text>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Box>
  )
}

// ---------- SCREENSHOT GALLERY ----------
const screenshotDetails = [
  { name: 'Sign In', img: Screenshot1 },
  { name: 'Home', img: Screenshot2 },
  { name: 'Upload', img: Screenshot3 },
  { name: 'Quiz', img: Screenshot4 },
  { name: 'Result', img: Screenshot5 },
  { name: 'Quiz Review', img: Screenshot6 },
  { name: 'History', img: Screenshot7 },
  { name: 'Attempt History', img: Screenshot8 },
]

const ScreenshotGallery = () => {
  const { colors } = useContext(themeContext)
  return (
    <Box variant='bare' id='screenshots' className='scroll-mt-24 flex flex-col items-center mt-32 px-3'>
      <Reveal><QuoteComp text='INSIDE THE APP' showIcon={false} /></Reveal>
      <Reveal delay={0.05}>
        <Box className='flex mt-3'>
          <Header>A look at AIQuiz</Header>
        </Box>
      </Reveal>
      <Box
        variant='bare'
        className='flex flex-nowrap gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory mt-14 px-4 max-w-5xl w-full pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
      >
        {screenshotDetails.map((item, i) => (
          <Reveal key={i} delay={i * 0.08} className='flex-none snap-center'>
            <Box variant='bare' className='flex flex-col items-center'>
              <img
                src={item.img}
                alt={item.name}
                className='rounded-2xl object-cover h-90 w-45 border transition-transform duration-200 hover:scale-105'
                style={{ borderColor: colors.border }}
              />
              <Text variant='soft' className='text-xs mt-3'>{item.name.toUpperCase()}</Text>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Box>
  )
}

// ---------- PRICING ----------
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
              variant='card'
              className='p-9 flex flex-col gap-5 relative h-full transition-all duration-200 hover:-translate-y-1'
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

              {!isPremium && (
                <Button
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

// ---------- WHY CHOOSE ----------
const benefits = [
  { icon: Clock, title: 'Save hours writing questions', desc: 'The part that used to take an evening now takes as long as an upload.' },
  { icon: Sparkles, title: 'Learn what matters', desc: 'Questions come from your material, not a generic bank.' },
  { icon: Smartphone, title: 'Practice anywhere', desc: 'Five minutes between classes is enough for a quick round.' },
]

const WhyChoose = () => {
  const { colors } = useContext(themeContext)
  return (
    <Box variant='bare' className='flex flex-col items-center mt-32 px-3'>
      <Reveal><QuoteComp text='WHY AIQUIZ' showIcon={false} /></Reveal>
      <Reveal delay={0.05}>
        <Box className='flex mt-3 max-w-lg'>
          <Header>Built around the parts of studying that cost the most time</Header>
        </Box>
      </Reveal>
      <Box variant='bare' className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full mt-14 items-center'>
        <Reveal>
          <Box className='rounded-3xl p-10 min-h-70 flex flex-col justify-end' style={{ backgroundColor: colors.primary }}>
            <Text className='text-2xl font-bold' style={{ color: '#fff' }}>Every quiz, built from your own material</Text>
            <Text className='mt-2' style={{ color: 'rgba(255,255,255,0.85)', fontFamily: fonts.body }}>
              Not a generic question bank — questions pulled straight from what you uploaded.
            </Text>
          </Box>
        </Reveal>
        <Box variant='bare' className='flex flex-col gap-7'>
          {benefits.map((b, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <Box variant='bare' className='flex gap-4 items-start'>
                <div className='w-10 h-10 rounded-xl flex items-center justify-center flex-none' style={{ backgroundColor: colors.primarySoft }}>
                  <b.icon size={18} color={colors.primary} />
                </div>
                <div>
                  <Text className='font-bold'>{b.title}</Text>
                  <Text variant='soft' className='text-sm mt-1' style={{ fontFamily: fonts.body }}>{b.desc}</Text>
                </div>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

// ---------- TESTIMONIALS ----------
const testimonials = [
  { quote: 'I uploaded my whole database management system slide deck and had a 20-question quiz before I finished my Sprite.', name: 'Titilope Balikis', role: 'Computer Science Student' },
  { quote: 'Better than making flashcards by hand — it pulls questions from exactly what I highlighted.', name: 'Placeholder name', role: 'University student' },
  { quote: 'I build practice sets for my class in minutes instead of an afternoon.', name: 'Placeholder name', role: 'Tutor' },
]

const Testimonials = () => {
  const { colors } = useContext(themeContext)
  return (
    <Box variant='bare' className='flex flex-col items-center mt-32 px-3'>
      <Reveal><QuoteComp text='FROM PEOPLE USING IT' showIcon={false} /></Reveal>
      <Reveal delay={0.05}>
        <Box className='flex mt-3'>
          <Header>What early users are saying</Header>
        </Box>
      </Reveal>
      <Box variant='bare' className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl w-full mt-14'>
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <Box variant='card' className='p-7 flex flex-col gap-4 h-full transition-all duration-200 hover:-translate-y-1'>
              <Text style={{ color: '#FFB100', letterSpacing: '2px' }} className='text-sm'>★★★★★</Text>
              <Text className='text-sm leading-relaxed' style={{ fontFamily: fonts.body }}>{t.quote}</Text>
              <div className='flex items-center gap-3 mt-2'>
                <div className='w-9 h-9 rounded-full flex-none' style={{ backgroundColor: colors.primary }} />
                <div>
                  <Text className='font-bold text-sm'>{t.name}</Text>
                  <Text variant='soft' className='text-xs' style={{ fontFamily: fonts.body }}>{t.role}</Text>
                </div>
              </div>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Box>
  )
}

// ---------- FAQ ----------
const faqs = [
  { q: 'What file formats are supported?', a: 'PDF, Images and common document formats like Word, plus plain pasted text.' },
  { q: 'Is AIQuiz free?', a: 'Yes, you can generate and take quizzes for free. Premium options are available for heavier use.' },
  { q: 'How accurate are the AI-generated questions?', a: 'Questions are generated directly from the material you provide.' },
  { q: 'Can I use my own notes?', a: "That's the main use case, paste your own notes or upload your own files." },
  { q: 'Does AIQuiz work offline?', a: 'Generating a new quiz needs a connection, but quizzes already generated can be taken offline.' },
  { q: 'How many quizzes can I generate?', a: 'Free accounts get a generous daily amount; Pro accounts get more quiz generations.' },
]

const FAQ = () => {
  const { colors } = useContext(themeContext)
  return (
    <Box variant='bare' id='faq' className='scroll-mt-24 flex flex-col items-center mt-32 px-3'>
      <Reveal><QuoteComp text='QUESTIONS' showIcon={false} /></Reveal>
      <Reveal delay={0.05}>
        <Box className='flex mt-3'>
          <Header>Frequently asked</Header>
        </Box>
      </Reveal>
      <Box variant='bare' className='max-w-2xl w-full mt-14'>
        {faqs.map((f, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <details className='group py-5 border-b' style={{ borderColor: colors.border }}>
              <summary className='flex justify-between items-center cursor-pointer list-none'>
                <Text className='font-bold'>{f.q}</Text>
                <span className='transition-transform duration-200 group-open:rotate-45 text-xl' style={{ color: colors.primary }}>+</span>
              </summary>
              <Text variant='soft' className='text-sm mt-3' style={{ fontFamily: fonts.body }}>{f.a}</Text>
            </details>
          </Reveal>
        ))}
      </Box>
    </Box>
  )
}

// ---------- DOWNLOAD CTA ----------
const DownloadCta = () => {
  const { colors } = useContext(themeContext)
  return (
    <Reveal className='px-3 mt-32'>
      <Box className='max-w-4xl w-full mx-auto rounded-3xl p-14 md:p-20 text-center' style={{ backgroundColor: colors.primary }}>
        <Text className='text-3xl md:text-4xl font-bold' style={{ color: '#fff' }}>Start studying smarter today.</Text>
        <Text className='mt-3' style={{ color: 'rgba(255,255,255,0.85)', fontFamily: fonts.body }}>Your next quiz is one upload away.</Text>
        <Box variant='bare' className='flex justify-center gap-4 flex-wrap mt-8'>
          <a href='#' className='px-6 py-3 rounded-lg font-bold text-center w-56 bg-white transition-transform duration-200 hover:scale-105 inline-block' style={{ color: colors.primary }}>
            Download for Android
          </a>
          <a href='#' className='px-6 py-3 rounded-lg font-bold text-center w-56 border transition-transform duration-200 hover:scale-105 inline-block' style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)', backgroundColor: 'rgba(255,255,255,0.15)' }}>
            Download for iPhone
          </a>
        </Box>
      </Box>
    </Reveal>
  )
}

// ---------- FOOTER ----------
const footerColumns = [
  {
    title: 'NAVIGATE', links: [
      { text: 'Features', href: '#features', slug: 'features' },
      { text: 'FAQ', href: '#faq', slug: 'faq' },
      { text: 'Contact', href: '#', slug: null }, // no dedicated contact section yet
    ]
  },
  {
    title: 'LEGAL', links: [
      { text: 'Privacy policy', href: '#', slug: null },
      { text: 'Terms of service', href: '#', slug: null },
    ]
  },
  {
    title: 'FOLLOW', links: [
      { text: 'X', href: '#', slug: null },
      { text: 'Instagram', href: '#', slug: null },
    ]
  },
]

const Footer = () => {
  const { colors } = useContext(themeContext)
  return (
    <Box variant='bare' className='mt-32 px-6 md:px-16 pb-10'>
      <hr className='w-full border-t mb-14' style={{ borderColor: colors.border }} />
      <Box variant='bare' className='grid grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto'>
        <Box variant='bare'>
          <Box className='flex items-center flex-row'>
            <img src={appIcon} alt='Logo' className='h-7 rounded-lg' />
            <Text className='ml-3 font-bold'>AIQuiz</Text>
          </Box>
          <Text variant='soft' className='text-sm mt-3 max-w-60' style={{ fontFamily: fonts.body }}>
            Turn any PDF, Image, document, or block of notes into a quiz built from your material.
          </Text>
        </Box>
        {footerColumns.map((col) => (
          <Box variant='bare' key={col.title}>
            <Text variant='soft' className='text-xs mb-4'>{col.title}</Text>
            <Box variant='bare' className='flex flex-col gap-3'>
              {col.links.map((l) => (
                <a
                  href={l.href}
                  key={l.text}
                  onClick={l.slug ? scrollToSection(l.slug) : undefined}
                >
                  <Text className='text-sm'>{l.text}</Text>
                </a>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
      <Box variant='bare' className='flex justify-between flex-wrap gap-3 max-w-6xl mx-auto mt-12 pt-6 border-t' style={{ borderColor: colors.border }}>
        <Text variant='soft' className='text-xs'>© 2026 AIQuiz. All rights reserved.</Text>
      </Box>
    </Box>
  )
}

const Main = () => {
  const { colors } = useContext(themeContext)
  const { setUser, accessToken, user, setAccessToken, } = useContext(authContext);
  const [showSignup, setShowSignup] = useState(false);
  const [signupSuccessEmail, setSignupSuccessEmail] = useState('');
  const [pendingUpgrade, setPendingUpgrade] = useState(false);
  const [paymentToast, setPaymentToast] = useState<ToastState | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const { subscribeFunc, isSubscribing } = usePayment();
  axios.defaults.withCredentials = true;
  // load profile (and therefore premium status + subscription) any time we have
  // an authenticated user — covers sign-in, initial page load with a restored
  // session, and refresh
  useEffect(() => {
    if (!user || !accessToken) {
      setIsPremium(false);
      setSubscription(null);
      return;
    }
    getProfileData(accessToken)
      .then((profile) => {
        setIsPremium(profile.data.isPremium);
        setSubscription(profile.data.subscription ?? null);
      })
      .catch((error) => {
        console.log("error", error.response.data.message)
        // leave things as-is on a failed fetch — don't flip someone to "not premium"
        // just because one request hiccuped
      });
  }, [user, accessToken])

  useEffect(() => {

    const stored = localStorage.getItem('aiquiz');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAccessToken(parsed.accessToken);
        setUser(parsed.user);
      } catch {
        localStorage.removeItem('aiquiz'); // corrupted/old entry — clear it instead of crashing
      }
    }
  }, [])

  useEffect(() => {
    if (!user && !accessToken) return; // don't overwrite storage with nothing on first mount
    localStorage.setItem('aiquiz', JSON.stringify({ accessToken, user }));
  }, [user, accessToken])

  // auto-dismiss the payment toast
  useEffect(() => {
    if (!paymentToast) return;
    const timer = setTimeout(() => setPaymentToast(null), 4000);
    return () => clearTimeout(timer);
  }, [paymentToast])

  // resume a pending "Upgrade to Pro" click once the user becomes signed in —
  // works regardless of whether they signed in via the header's modal or this signup modal
  useEffect(() => {
    if (user && pendingUpgrade) {
      setPendingUpgrade(false);
      startCheckout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  useEffect(() => {
    const id = axios.interceptors.response.use(
      (res) => res,
      async (error) => {
        console.log('refreshing token caused by error', error)
        const original = error.config;
        if (error.response?.status === 401 && !original._retry) {
          original._retry = true;
          try {
            const res = await axios.request({ method: 'POST', url: `${baseUrl}/auth/refresh`, withCredentials: true });
            setAccessToken(res.data.accessToken);
            original.headers['Authorization'] = `Bearer ${res.data.accessToken}`;
            return axios.request(original);
          } catch {
            setUser(null);
            setAccessToken(null);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(id);
  }, [])

  // the backend confirms payment via webhook, not anything we can check ourselves
  // right after redirect — so just tell the person it's on its way and to refresh
  const notifyPaymentReceived = () => {
    setPaymentToast({
      type: 'success',
      message: 'Payment received! Refresh the page in a moment to see your Pro status update.',
    });
  };

  // handle landing back here after a Paystack redirect
  useEffect(() => {
    const pathName = window.location.pathname;
    const hash = window.location.hash;
    console.log('Current path:', pathName, 'Hash:', hash.substring(1));
    if (hash) {
      const el = document.getElementById(hash.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Keep the URL hash in sync without triggering another jump
        history.pushState(null, '', `#${hash}`);
      }
    }
    console.log('Checking for payment reference in URL:', pathName.toString());
    if (pathName.toString() == '/transaction-success') {
      console.log('Payment successful, clearing URL and starting checkout for subscription');
      window.history.replaceState({}, '', '/');
      /* start checkout as the previous checkout is for charge
      to register the user on paystack, then the present checkout is for subscribing */
      (async () => {
        await startCheckout();
      })();
    }
    else if (pathName.toString() == '/transaction-cancelled') {
      console.log('Payment cancelled, clearing URL');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [])

  const startCheckout = async () => {
    const result = await subscribeFunc();
    if (!result) return;
    const { data, error } = result;

    if (error) {
      setPaymentToast({ type: 'error', message: error });
      return;
    }
    if (data && 'authorization_url' in data.data && data.data.authorization_url) {
      console.log('Redirecting to Paystack checkout:', data.data.authorization_url);
      window.open(data.data.authorization_url, '_blank', 'noopener,noreferrer');
    } else if (data && 'status' in data) {
      notifyPaymentReceived();
    }
  };

  const requestUpgrade = () => {
    if (!user) {
      setPendingUpgrade(true);
      setShowSignup(true);
      return;
    }
    startCheckout();
  };

  return (
    <uiContext.Provider value={{ openSignup: () => setShowSignup(true), requestUpgrade, isSubscribing, isPremium, subscription }}>
      <div style={{ backgroundColor: colors.background }} className='min-h-screen w-full transition-colors duration-300'>
        <Toast toast={paymentToast} />
        <FixedHeader />
        <AuthModal
          isOpen={showSignup}
          onClose={() => setShowSignup(false)}
          initialMode='signup'
          onAuthSuccess={(email) => setSignupSuccessEmail(email)}
        />
        <SignInSuccessToast
          visible={!!signupSuccessEmail}
          email={signupSuccessEmail}
          onDismiss={() => setSignupSuccessEmail('')}
        />
        <div className='flex w-full flex-col flex-1 pt-30'>
          <FadeIn><QuoteComp text='Now generating from PDF, DOCX, text and images' showIcon /></FadeIn>
          <FadeIn delay={0.1}><Desc /></FadeIn>
          <FadeIn delay={0.2}><AppActions onCreateAccount={() => setShowSignup(true)} isPremium={isPremium} /></FadeIn>
          <FadeIn delay={0.25}>
            <Text className='text-center mt-3' variant='soft' style={{ fontFamily: fonts.body }}>
              Free to start · no credit card required
            </Text>
          </FadeIn>
          <FadeIn delay={0.3}><AppShot /></FadeIn>
          <Features />
          <Box variant='bare' id='features' className='scroll-mt-24 flex flex-col items-center'>
            <Reveal><QuoteComp text='WHAT IT DOES' showIcon={false} /></Reveal>
            <Reveal delay={0.05}>
              <Box className='flex mt-3'>
                <Header>Everything you need to go from material to mastery</Header>
              </Box>
            </Reveal>
            <BentoFeatures />
          </Box>
          <HowItWorks />
          <ScreenshotGallery />
          <Pricing />
          <WhyChoose />
          <Testimonials />
          <FAQ />
          <DownloadCta />
          <Footer />
        </div>
      </div>
    </uiContext.Provider>
  )
}

// ---------- APP ----------
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Main />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App