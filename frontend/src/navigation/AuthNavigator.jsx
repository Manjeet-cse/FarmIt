import { Routes, Route } from 'react-router-dom';
import SplashScreen from '../screens/auth/SplashScreen';
import LanguageSelectScreen from '../screens/auth/LanguageSelectScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import SignupStep2 from '../screens/auth/SignupStep2';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

export default function AuthNavigator() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/language" element={<LanguageSelectScreen />} />
      <Route path="/onboarding" element={<OnboardingScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/signup/step1" element={<SignupScreen />} />
      <Route path="/signup/step2" element={<SignupStep2 />} />
      <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
    </Routes>
  );
}
