import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { supabase } from '../../../supabase';

const OTP_LENGTH = 6;

export default function OtpScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(30);
  const inputs = useRef<(TextInput | null)[]>([]);

  // ── Countdown timer for Resend ──────────────────────────────────────────────
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const t = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCountdown]);

  // ── Handle single-digit input ───────────────────────────────────────────────
  const handleChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
    // Auto-verify when all filled
    if (next.every((d) => d !== '') && digit) {
      verifyOtp(next.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // ── Resend OTP ──────────────────────────────────────────────────────────────
  const handleResend = async () => {
    if (resendCountdown > 0 || !phone) return;
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      setResendCountdown(30);
      setOtp(Array(OTP_LENGTH).fill(''));
      Alert.alert('OTP Resent', `A new OTP was sent to ${phone}`);
    }
  };

  // ── Verify OTP ──────────────────────────────────────────────────────────────
  const verifyOtp = async (token?: string) => {
    const code = token ?? otp.join('');
    if (code.length < OTP_LENGTH) {
      Alert.alert('Incomplete', 'Please enter all 6 digits.');
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.verifyOtp({
      phone: phone ?? '',
      token: code,
      type: 'sms',
    });
    setLoading(false);
    if (error) {
      Alert.alert('Verification Failed', error.message);
      setOtp(Array(OTP_LENGTH).fill(''));
      inputs.current[0]?.focus();
    } else if (data.session) {
      router.replace('/');
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#c8e6c9" />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Text style={styles.leafEmoji}>🌿</Text>
          <Text style={styles.brandName}>FarmIt</Text>
        </View>
        <View style={styles.badgePill}>
          <Text style={styles.badgeText}>OTP VERIFICATION</Text>
        </View>
      </View>

      {/* ── Card ───────────────────────────────────────────────────────────── */}
      <KeyboardAvoidingView
        style={styles.cardWrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.card}>
          {/* Back button */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
            accessibilityLabel="Go back"
          >
            <Text style={styles.backBtnText}>← Back</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to{'\n'}
            <Text style={styles.phoneHighlight}>{phone}</Text>
          </Text>

          {/* ── OTP boxes ────────────────────────────────────────────────────── */}
          <View style={styles.otpRow}>
            {Array.from({ length: OTP_LENGTH }).map((_, i) => (
              <TextInput
                key={i}
                ref={(r) => { inputs.current[i] = r; }}
                style={[styles.otpBox, otp[i] ? styles.otpBoxFilled : null]}
                value={otp[i]}
                onChangeText={(t) => handleChange(t, i)}
                onKeyPress={(e) => handleKeyPress(e, i)}
                keyboardType="number-pad"
                maxLength={1}
                returnKeyType="done"
                selectTextOnFocus
                accessibilityLabel={`OTP digit ${i + 1}`}
              />
            ))}
          </View>

          {/* ── Resend ───────────────────────────────────────────────────────── */}
          <View style={styles.resendRow}>
            <Text style={styles.resendLabel}>Didn't receive OTP? </Text>
            <TouchableOpacity
              onPress={handleResend}
              disabled={resendCountdown > 0}
              accessibilityLabel="Resend OTP"
            >
              <Text
                style={[
                  styles.resendLink,
                  resendCountdown > 0 && styles.resendLinkDisabled,
                ]}
              >
                {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : 'Resend'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* ── Verify button ────────────────────────────────────────────────── */}
          <TouchableOpacity
            style={[styles.verifyBtn, loading && styles.verifyBtnDisabled]}
            onPress={() => verifyOtp()}
            disabled={loading}
            activeOpacity={0.85}
            accessibilityLabel="Verify OTP button"
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.verifyBtnText}>VERIFY & LOGIN</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
const GREEN_DARK  = '#2e7d32';
const GREEN_MID   = '#4caf50';
const GREEN_INPUT = '#dcedc8';
const GREEN_BG    = '#c8e6c9';

const styles = StyleSheet.create({
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
  leafEmoji: { fontSize: 28 },
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
  cardWrapper: { flex: 1 },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 48,
    flex: 1,
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backBtnText: {
    color: GREEN_DARK,
    fontWeight: '700',
    fontSize: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    lineHeight: 22,
    marginBottom: 32,
  },
  phoneHighlight: {
    fontWeight: '700',
    color: GREEN_DARK,
  },
  // ── OTP boxes
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 24,
  },
  otpBox: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: GREEN_MID,
    backgroundColor: GREEN_INPUT,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
    color: '#1b4d1e',
    maxWidth: 52,
  },
  otpBoxFilled: {
    borderColor: GREEN_DARK,
    backgroundColor: '#c8e6c9',
  },
  // ── Resend
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  resendLabel: {
    fontSize: 13,
    color: '#888',
  },
  resendLink: {
    fontSize: 13,
    fontWeight: '700',
    color: GREEN_DARK,
  },
  resendLinkDisabled: {
    color: '#aaa',
  },
  // ── Verify button
  verifyBtn: {
    backgroundColor: GREEN_DARK,
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: 'center',
    shadowColor: GREEN_DARK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  verifyBtnDisabled: {
    opacity: 0.7,
  },
  verifyBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
});
