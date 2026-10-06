import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function OrderConfirmationScreen() {
  const router = useRouter();

  return (
    <View style={styles.page}>
      <View style={styles.iconCircle}>
        <FontAwesome6 name="check" size={30} color="#fff" />
      </View>

      <Text style={styles.title}>Order Placed Successfully!</Text>
      <Text style={styles.subtitle}>
        Your order has been placed and will be delivered soon.
      </Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push('/order-history' as any)}
      >
        <Text style={styles.primaryButtonText}>View Order History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push('/')}
      >
        <Text style={styles.secondaryButtonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#16a34a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  subtitle: { fontSize: 13, color: '#9ca3af', textAlign: 'center', marginBottom: 30 },
  primaryButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  secondaryButton: { paddingVertical: 10 },
  secondaryButtonText: { color: '#9ca3af', fontSize: 13 },
});
