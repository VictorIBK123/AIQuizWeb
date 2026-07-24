import './App.css'
import { useContext, useEffect, useState } from 'react';
import { AuthModal } from './Components/AuthModal';
import { Box, Text } from './Components/UI';
import { fonts, baseUrl } from './constants';
import { authContext, AuthProvider, themeContext, ThemeProvider, uiContext } from './Context/context';
import { Reveal, FadeIn } from './Components/Motion';
import { SignInSuccessToast } from './Components/SignInSuccessToast';
import { Toast, type ToastState } from './Components/Toast';
import { usePayment } from './hooks/usePayment';
import { getProfileData } from './services/profile';
import axios from 'axios';
import Footer from './Components/Main/Footer';
import FixedHeader from './Components/Main/FixedHeader';
import Header from './Components/Main/Header';
import FAQ from './Components/Main/Faq';
import Testimonials from './Components/Main/Textimonials';
import WhyChoose from './Components/Main/WhyChoose';
import ScreenshotGallery from './Components/Main/ScreenshotGallery';
import HowItWorks from './Components/Main/HowItWorks';
import QuoteComp from './Components/Main/QuoteComp';
import Features from './Components/Main/Features';
import Pricing from './Components/Main/Pricing';
import AppShot from './Components/Main/AppShot';
import AppActions from './Components/Main/AppActions';
import BentoFeatures from './Components/Main/BentoFeatures';
import DownloadCta from './Components/Main/DownloadCta';



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
      <div style={{ backgroundColor: colors.background }} className='min-h-screen px-4 md:px-0 w-full transition-colors duration-300'>
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