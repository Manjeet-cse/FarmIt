// src/app/(auth)/signup.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../../../supabase';
import * as WebBrowser from 'expo-web-browser';       // 🚀 ADD THIS
import * as AuthSession from 'expo-auth-session';   // 🚀 ADD THIS

// This ensures browser tracking windows close automatically once the redirect completes
WebBrowser.maybeCompleteAuthSession();               // 🚀 ADD THIS

const LEAF = '🌿';

export default function SignupScreen() {
  const [phone, setPhone] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);

  // ── OTP Signup – sends OTP via Supabase then navigates to OTP screen ────────
  const handleOtpSignup = async () => {
    if (!phone || phone.length < 10) {
      Alert.alert('Invalid number', 'Please enter your 10-digit mobile number first.');
      return;
    }
    setOtpLoading(true);
    const fullPhone = `+91${phone}`;

    // 1. Pre-flight check: Make sure they aren't already registered
    const { data: farmer } = await supabase
      .from('farmers')
      .select('id')
      .eq('phone', fullPhone)
      .maybeSingle();

    if (farmer) {
      setOtpLoading(false);
      Alert.alert(
        'Account Exists', 
        'This mobile number is already registered. Please log in instead.'
      );
      return;
    }

    // 2. If not registered, send OTP
    const { error } = await supabase.auth.signInWithOtp({ phone: fullPhone });
    setOtpLoading(false);
    if (error) {
      Alert.alert('Error sending OTP', error.message);
    } else {
      Alert.alert('OTP Sent', `OTP sent to ${fullPhone}`);
      router.push({ pathname: '/(auth)/otp', params: { phone: fullPhone } });
    }
  };

  // ── 🚀 REWRITTEN REAL GOOGLE SIGNUP METHOD ───────────────────────────────────
  const handleGoogle = async () => {
    try {
      // 1. Generate the app's native redirect scheme URI
      const redirectUrl = AuthSession.makeRedirectUri();
      console.log('Redirect URL (Signup):', redirectUrl);

      // 2. Request a secure Google Auth session URL link directly from Supabase
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true, // Tells Supabase to return the URL string instead of auto-opening it
        },
      });

      if (error) throw error;
      if (!data?.url) throw new Error('Could not retrieve authentication route URL from provider.');

      // 3. Launch the pop-up browser interface for account picking
      const authResult = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);

      // 4. Extract token keys if authentication checks pull through successfully
      if (authResult.type === 'success' && authResult.url) {
        const url = authResult.url;
        // Supabase returns tokens in the URL hash fragment
        const paramsStr = url.split('#')[1] || url.split('?')[1];
        
        if (paramsStr) {
          const urlParams = new URLSearchParams(paramsStr);
          const accessToken = urlParams.get('access_token');
          const refreshToken = urlParams.get('refresh_token');

          if (accessToken && refreshToken) {
            // Initialize native secure session validation strings directly inside your client instance
            await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
          }
        }
      }
    } catch (err: any) {
      Alert.alert('Google Auth Failure', err.message || 'Something went wrong.');
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#c8e6c9" />

      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Text style={styles.leafEmoji}>{LEAF}</Text>
          <Text style={styles.brandName}>FarmIt</Text>
        </View>
        <View style={styles.badgePill}>
          <Text style={styles.badgeText}>CREATE ACCOUNT</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.cardWrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Text style={styles.welcomeTitle}>Join FarmIt Today!</Text>

            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.phoneRow}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>+91</Text>
                <Text style={styles.dropdownChevron}>{' ▾'}</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter your 10-digit number"
                placeholderTextColor="#9ebc9e"
                value={phone}
                onChangeText={(t) => setPhone(t.replace(/[^0-9]/g, '').slice(0, 10))}
                keyboardType="number-pad"
                maxLength={10}
                returnKeyType="done"
                onSubmitEditing={handleOtpSignup}
                accessibilityLabel="Mobile number input"
              />
            </View>

            <TouchableOpacity
              style={[styles.loginBtn, otpLoading && styles.loginBtnDisabled]}
              onPress={handleOtpSignup}
              disabled={otpLoading}
              activeOpacity={0.85}
              accessibilityLabel="Sign up button"
            >
              {otpLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginBtnText}>SIGN UP WITH OTP</Text>
              )}
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
              style={styles.altBtn}
              onPress={handleGoogle}
              activeOpacity={0.85}
              accessibilityLabel="Continue with Google button"
            >
              <Text style={styles.googleG}>G</Text>
              <Text style={styles.altBtnText}>Continue with Google</Text>
            </TouchableOpacity>

            <View style={styles.signUpRow}>
              <Text style={styles.signUpPrompt}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/login')} accessibilityLabel="Log in link">
                <Text style={styles.signUpLink}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const GREEN_DARK = '#2e7d32';
const GREEN_MID  = '#4caf50';
const GREEN_LIGHT = '#e8f5e9';
const GREEN_BG   = '#c8e6c9';
const GREEN_INPUT = '#dcedc8';

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: GREEN_BG },
  header: { alignItems: 'center', paddingTop: 56, paddingBottom: 20, backgroundColor: GREEN_BG },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  leafEmoji: { fontSize: 28 },
  brandName: { fontSize: 26, fontWeight: '800', color: '#1b4d1e', letterSpacing: -0.5 },
  badgePill: { marginTop: 10, backgroundColor: GREEN_DARK, borderRadius: 50, paddingHorizontal: 20, paddingVertical: 6 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700', letterSpacing: 1.2 },
  cardWrapper: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'flex-start' },
  card: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 24, paddingTop: 32, paddingBottom: 48, flex: 1, minHeight: 600 },
  welcomeTitle: { fontSize: 26, fontWeight: '800', color: '#1a1a1a', marginBottom: 24 },
  label: { fontSize: 13, fontWeight: '600', color: '#333', marginBottom: 6 },
  phoneRow: { flexDirection: 'row', backgroundColor: GREEN_INPUT, borderRadius: 14, overflow: 'hidden', marginBottom: 24, alignItems: 'center', borderWidth: 1.5, borderColor: GREEN_MID },
  countryCode: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 16, borderRightWidth: 1.5, borderRightColor: GREEN_MID },
  countryCodeText: { fontSize: 15, fontWeight: '600', color: '#1b4d1e' },
  dropdownChevron: { fontSize: 10, color: '#1b4d1e', marginLeft: 2 },
  phoneInput: { flex: 1, paddingHorizontal: 14, paddingVertical: 16, fontSize: 15, color: '#222' },
  loginBtn: { backgroundColor: GREEN_DARK, borderRadius: 14, paddingVertical: 17, alignItems: 'center', shadowColor: GREEN_DARK, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8, elevation: 6, marginBottom: 24 },
  loginBtnDisabled: { opacity: 0.7 },
  loginBtnText: { color: '#fff', fontSize: 15, fontWeight: '800', letterSpacing: 1.5 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#e0e0e0' },
  dividerText: { fontSize: 12, color: '#999', fontWeight: '500' },
  altBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, borderRadius: 14, borderWidth: 1.5, borderColor: '#e0e0e0', paddingVertical: 15, marginBottom: 12, backgroundColor: '#fff' },
  googleG: { fontSize: 18, fontWeight: '900', color: '#4285F4' },
  altBtnText: { fontSize: 15, fontWeight: '700', color: GREEN_DARK },
  signUpRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 12 },
  signUpPrompt: { fontSize: 14, color: '#888' },
  signUpLink: { fontSize: 14, fontWeight: '800', color: GREEN_DARK },
});