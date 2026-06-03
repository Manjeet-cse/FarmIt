import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../../supabase';

export default function AuthTest() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = Send OTP, 2 = Verify OTP

  // Step 1: Request OTP
  const sendOtp = async () => {
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (error) {
      Alert.alert('Error sending OTP', error.message);
    } else {
      Alert.alert('Success', 'OTP sent successfully!');
      setStep(2);
    }
  };

  // Step 2: Verify OTP
  const verifyOtp = async () => {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: 'sms',
    });

    if (error) {
      Alert.alert('Verification Failed', error.message);
    } else if (data.session) {
      Alert.alert('Success!', `Logged in as user ID: ${data.user?.id}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FarmIt Auth Test</Text>

      {step === 1 ? (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number (e.g. +919999999999)"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <Button title="Send OTP" onPress={sendOtp} />
        </View>
      ) : (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
          />
          <Button title="Verify & Login" onPress={verifyOtp} />
          <Button title="Back" onPress={() => setStep(1)} color="gray" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  form: { gap: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 6, fontSize: 16 },
});
