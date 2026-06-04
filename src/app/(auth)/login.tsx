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

// ─── Leaf SVG replacement using Unicode emoji ────────────────────────────────
const LEAF = '🌿';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  // ── PIN / Password login (placeholder – wire to your auth later) ──────────
  const handleLogin = async () => {
    if (!phone || phone.length < 10) {
      Alert.alert('Invalid number', 'Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!pin) {
      Alert.alert('Missing PIN', 'Please enter your PIN.');
      return;
    }
    setLoading(true);
    // TODO: swap with real PIN-based auth
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Login', `Login pressed for +91${phone}`);
    }, 1200);
  };

  // ── OTP Login – sends OTP via Supabase then navigates to OTP screen ────────
  const handleOtpLogin = async () => {
    if (!phone || phone.length < 10) {
      Alert.alert('Invalid number', 'Please enter your 10-digit mobile number first.');
      return;
    }
    setOtpLoading(true);
    const fullPhone = `+91${phone}`;
    const { error } = await supabase.auth.signInWithOtp({ phone: fullPhone });
    setOtpLoading(false);
    if (error) {
      Alert.alert('Error sending OTP', error.message);
    } else {
      Alert.alert('OTP Sent', `OTP sent to ${fullPhone}`);
      router.push({ pathname: '/(auth)/otp', params: { phone: fullPhone } });
    }
  };

  // ── Google login (placeholder) ─────────────────────────────────────────────
  const handleGoogle = () => {
    Alert.alert('Google Login', 'Google Sign-In coming soon!');
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#c8e6c9" />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Text style={styles.leafEmoji}>{LEAF}</Text>
          <Text style={styles.brandName}>FarmIt</Text>
        </View>
        <View style={styles.badgePill}>
          <Text style={styles.badgeText}>KISAN LOGIN</Text>
        </View>
      </View>

      {/* ── Card ───────────────────────────────────────────────────────────── */}
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
            <Text style={styles.welcomeTitle}>Welcome Back!</Text>

            {/* ── Mobile number ──────────────────────────────────────────────── */}
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
                returnKeyType="next"
                accessibilityLabel="Mobile number input"
              />
            </View>

            {/* ── PIN / Password ──────────────────────────────────────────────── */}
            <Text style={styles.label}>Password / PIN</Text>
            <View style={styles.pinRow}>
              <TextInput
                style={styles.pinInput}
                placeholder="Enter PIN"
                placeholderTextColor="#9ebc9e"
                value={pin}
                onChangeText={setPin}
                secureTextEntry={!showPin}
                keyboardType="number-pad"
                maxLength={6}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                accessibilityLabel="PIN input"
              />
              <TouchableOpacity
                onPress={() => setShowPin((v) => !v)}
                style={styles.eyeBtn}
                accessibilityLabel={showPin ? 'Hide PIN' : 'Show PIN'}
              >
                <Text style={styles.eyeIcon}>{showPin ? '👁️' : '🙈'}</Text>
              </TouchableOpacity>
            </View>

            {/* ── Forgot PIN ──────────────────────────────────────────────────── */}
            <TouchableOpacity style={styles.forgotRow} accessibilityLabel="Forgot PIN">
              <Text style={styles.forgotText}>Forgot PIN?</Text>
            </TouchableOpacity>

            {/* ── LOG IN button ───────────────────────────────────────────────── */}
            <TouchableOpacity
              style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.85}
              accessibilityLabel="Log in button"
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginBtnText}>LOG IN</Text>
              )}
            </TouchableOpacity>

            {/* ── Divider ─────────────────────────────────────────────────────── */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or log in with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* ── OTP Login ───────────────────────────────────────────────────── */}
            <TouchableOpacity
              style={styles.altBtn}
              onPress={handleOtpLogin}
              disabled={otpLoading}
              activeOpacity={0.85}
              accessibilityLabel="OTP Login button"
            >
              {otpLoading ? (
                <ActivityIndicator color="#2e7d32" />
              ) : (
                <>
                  <Text style={styles.altBtnIcon}>💬</Text>
                  <Text style={styles.altBtnText}>OTP Login</Text>
                </>
              )}
            </TouchableOpacity>

            {/* ── Google ──────────────────────────────────────────────────────── */}
            <TouchableOpacity
              style={styles.altBtn}
              onPress={handleGoogle}
              activeOpacity={0.85}
              accessibilityLabel="Continue with Google button"
            >
              <Text style={styles.googleG}>G</Text>
              <Text style={styles.altBtnText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* ── Sign Up link ─────────────────────────────────────────────────── */}
            <View style={styles.signUpRow}>
              <Text style={styles.signUpPrompt}>New User? </Text>
              <TouchableOpacity accessibilityLabel="Sign up link">
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
const GREEN_DARK = '#2e7d32';
const GREEN_MID  = '#4caf50';
const GREEN_LIGHT = '#e8f5e9';
const GREEN_BG   = '#c8e6c9';
const GREEN_INPUT = '#dcedc8';

const styles = StyleSheet.create({
  // ── Root & header ──────────────────────────────────────────────────────────
  root: {
    flex: 1,
    backgroundColor: GREEN_BG,
  },
  header: {
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 20,
    backgroundColor: GREEN_BG,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  leafEmoji: {
    fontSize: 28,
  },
  brandName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1b4d1e',
    letterSpacing: -0.5,
  },
  badgePill: {
    marginTop: 10,
    backgroundColor: GREEN_DARK,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
  },

  // ── Card ───────────────────────────────────────────────────────────────────
  cardWrapper: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 48,
    flex: 1,
    minHeight: 600,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 24,
  },

  // ── Labels ─────────────────────────────────────────────────────────────────
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },

  // ── Phone input ────────────────────────────────────────────────────────────
  phoneRow: {
    flexDirection: 'row',
    backgroundColor: GREEN_INPUT,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 18,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: GREEN_MID,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderRightWidth: 1.5,
    borderRightColor: GREEN_MID,
  },
  countryCodeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1b4d1e',
  },
  dropdownChevron: {
    fontSize: 10,
    color: '#1b4d1e',
    marginLeft: 2,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 16,
    fontSize: 15,
    color: '#222',
  },

  // ── PIN input ──────────────────────────────────────────────────────────────
  pinRow: {
    flexDirection: 'row',
    backgroundColor: GREEN_INPUT,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: GREEN_MID,
    marginBottom: 8,
  },
  pinInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 16,
    fontSize: 15,
    color: '#222',
  },
  eyeBtn: {
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  eyeIcon: {
    fontSize: 18,
  },

  // ── Forgot PIN ─────────────────────────────────────────────────────────────
  forgotRow: {
    alignItems: 'flex-end',
    marginBottom: 22,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: '700',
    color: GREEN_DARK,
  },

  // ── LOG IN button ──────────────────────────────────────────────────────────
  loginBtn: {
    backgroundColor: GREEN_DARK,
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: 'center',
    shadowColor: GREEN_DARK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 24,
  },
  loginBtnDisabled: {
    opacity: 0.7,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  // ── Divider ────────────────────────────────────────────────────────────────
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },

  // ── Alt login buttons ──────────────────────────────────────────────────────
  altBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    paddingVertical: 15,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  altBtnIcon: {
    fontSize: 18,
  },
  altBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: GREEN_DARK,
  },
  googleG: {
    fontSize: 18,
    fontWeight: '900',
    color: '#4285F4',
  },

  // ── Sign Up row ────────────────────────────────────────────────────────────
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  signUpPrompt: {
    fontSize: 14,
    color: '#888',
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: '800',
    color: GREEN_DARK,
  },
});
