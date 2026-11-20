import './App.css'
import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import JoinQuizPage from './Components/JoinQuizPage';
import LegalPage from './Components/Legal/LegalPage';
import DeleteAccountPage from './Components/Legal/DeleteAccountPage';
import SupportPage from './Components/Legal/SupportPage';
import IosWaitlistPage from './Components/IosWaitlistPage';
import { AuthModal } from './Components/AuthModal';
import { Text } from './Components/UI';
import { fonts, baseUrl } from './constants';
import { authContext, AuthProvider, themeContext, ThemeProvider, uiContext } from './Context/context';
import { FadeIn } from './Components/Motion';
import { SignInSuccessToast } from './Components/SignInSuccessToast';
import { Toast, type ToastState } from './Components/Toast';
import { usePayment } from './hooks/usePayment';
import { getProfileData } from './services/profile';
import axios from 'axios';
import Footer from './Components/Main/Footer';
import FixedHeader from './Components/Main/FixedHeader';
import FAQ from './Components/Main/Faq';
import Testimonials from './Components/Main/Textimonials';
import WhyChoose from './Components/Main/WhyChoose';
import ScreenshotGallery from './Components/Main/ScreenshotGallery';
import HowItWorks from './Components/Main/HowItWorks';
import Features from './Components/Main/Features';
import Pricing from './Components/Main/Pricing';
import AppShot from './Components/Main/AppShot';
import AppActions from './Components/Main/AppActions';
import BentoFeatures from './Components/Main/BentoFeatures';
import DownloadCta from './Components/Main/DownloadCta';
import { exchangeHandoffService } from './services/auth';























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

    const params = new URLSearchParams(window.location.search);
    const handoffToken = params.get('handOffToken');
    const hash = window.location.hash; // capture it first

    let cancelled = false;
    if (handoffToken) {
      if (cancelled) return;
      setPaymentToast({
        type: 'info',
        message: 'Please wait while your profile is being fetched',
      });
      if (hash) {
        const targetId = hash.replace(/^#+/, '');
        const jumpToTarget = () => {
          const el = document.getElementById(targetId) || document.getElementById('pricing');
          if (el) {
            el.scrollIntoView({ behavior: 'auto', block: 'start' });
          }
        };
        jumpToTarget();
        requestAnimationFrame(jumpToTarget);
        setTimeout(jumpToTarget, 60);
      }
      exchangeHandoffService(handoffToken).then((response) => {
        const { accessToken, email } = response;
        setAccessToken(accessToken);
        setUser({ email });
      }).catch((error) => {
        console.log("error", error?.response?.data?.message || error.message);
        setPaymentToast({
          type: 'error',
          message: 'Failed to fetch profile',
        });
      })
      return () => { cancelled = true; };
    }
    else {
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
      message: 'Payment received! Refresh the app and page in a moment to see your Pro status update.',
    });
  };

  // handle landing back here after a Paystack redirect
  useEffect(() => {
    const pathName = window.location.pathname;
    const hash = window.location.hash;
    console.log('Current path:', pathName, 'Hash:', hash.substring(1));
    // if (hash) {
    //   const el = document.getElementById(hash.substring(1));
    //   if (el) {
    //     el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //     // Keep the URL hash in sync without triggering another jump
    //     history.pushState(null, '', `#${hash}`);
    //   }
    // }
    console.log('Checking for payment reference in URL:', pathName.toString());
    if (pathName.toString() == '/transaction-success') {
      console.log('Payment successful, clearing URL and starting checkout for subscription');
      window.history.replaceState({}, '', '/');
      setPaymentToast({
        type: 'info',
        message: 'Please wait while we subscribe you to our premium plan',
      });
      /* start checkout as the previous checkout is for charge
      to register the user on paystack, then the present checkout is for subscribing */
      (async () => {
        await startCheckout();
      })();
    }
    else if (pathName.toString() == '/transaction-cancelled') {
      console.log('Payment cancelled, clearing URL');
      window.history.replaceState({}, '', '/#pricing');
      setPaymentToast({
        type: 'error',
        message: 'Transaction cancelled',
      });
    } else if (hash) {
      const targetId = hash.replace(/^#+/, '');
      requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
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
      <div style={{ backgroundColor: colors.background }} className='min-h-screen w-full transition-colors duration-200'>
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
        <main className='w-full pt-28 md:pt-32'>
          {/* Two-Column Editorial Hero */}
          <section className='max-w-6xl mx-auto px-5 md:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center'>
              <div className='lg:col-span-7'>
                <FadeIn>
                  <span
                    className='inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-md border mb-6'
                    style={{
                      backgroundColor: colors.backgroundRaised,
                      borderColor: colors.border,
                      color: colors.textSoft,
                      fontFamily: fonts.mono,
                    }}
                  >
                    iOS · Android
                  </span>
                </FadeIn>

                <FadeIn delay={0.05}>
                  <h1
                    className='text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]'
                    style={{ color: colors.text, fontFamily: fonts.display }}
                  >
                    Turn your study notes into{' '}
                    <span style={{ color: colors.primary }}>active recall.</span>
                  </h1>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <Text
                    variant='soft'
                    className='mt-6 text-base sm:text-lg leading-relaxed max-w-xl'
                  >
                    Upload PDFs, DOCX files, textbook photos, or pasted notes. Skolarix generates tailored quizzes with AI theory grading, Strict Mode exam timers, Shared Quiz codes, and offline review.
                  </Text>
                </FadeIn>

                <FadeIn delay={0.15}>
                  <AppActions onCreateAccount={() => setShowSignup(true)} isPremium={isPremium} />
                  <Text className='mt-3 text-xs' variant='soft' style={{ fontFamily: fonts.mono }}>
                    Free to start · No credit card required
                  </Text>
                </FadeIn>
              </div>

              <div className='lg:col-span-5'>
                <FadeIn delay={0.2}>
                  <AppShot />
                </FadeIn>
              </div>
            </div>
          </section>

          <Features />
          <BentoFeatures />
          <HowItWorks />
          <ScreenshotGallery />
          <WhyChoose />
          <Pricing />
          <Testimonials />
          <FAQ />
          <DownloadCta />
        </main>
        <Footer />
      </div>
    </uiContext.Provider>
  )
}

// ---------- APP ----------
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/join/:code" element={<JoinQuizPage />} />
            <Route path="/join" element={<JoinQuizPage />} />
            <Route path="/legal" element={<Navigate to="/legal/terms-of-use" replace />} />
            <Route path="/legal/terms-of-use" element={<LegalPage docType="terms-of-use" />} />
            <Route path="/legal/terms-and-conditions" element={<Navigate to="/legal/terms-of-use" replace />} />
            <Route path="/legal/terms" element={<Navigate to="/legal/terms-of-use" replace />} />
            <Route path="/legal/subscription-policy" element={<LegalPage docType="subscription-policy" />} />
            <Route path="/legal/subscription" element={<Navigate to="/legal/subscription-policy" replace />} />
            <Route path="/legal/privacy-policy" element={<LegalPage docType="privacy-policy" />} />
            <Route path="/legal/privacy" element={<Navigate to="/legal/privacy-policy" replace />} />
            <Route path="/del-acct" element={<DeleteAccountPage />} />
            <Route path="/delete-account" element={<Navigate to="/del-acct" replace />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/ios" element={<IosWaitlistPage />} />
            <Route path="/waitlist" element={<IosWaitlistPage />} />
            <Route path="/rsvp" element={<IosWaitlistPage />} />
            <Route path="*" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App