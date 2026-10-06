import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '../context/CartContext';

export default function CheckoutScreen() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();

  // which payment option is selected - "upi", "card" or "cod"
  const [selectedPayment, setSelectedPayment] = useState('upi');

  const paymentOptions = [
    { id: 'upi', label: 'UPI (Google Pay / PhonePe)' },
    { id: 'card', label: 'Credit / Debit Card' },
    { id: 'cod', label: 'Cash on Delivery' },
  ];

  const placeOrder = async () => {
    // build a simple order object and save it to a list of past orders
    const newOrder = {
      id: 'ORD' + Date.now(),
      items: cartItems,
      total: cartTotal,
      paymentMethod: selectedPayment,
      date: new Date().toLocaleDateString(),
    };

    const existingOrdersRaw = await AsyncStorage.getItem('orders');
    const existingOrders = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : [];
    const updatedOrders = [newOrder, ...existingOrders];

    await AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));

    clearCart();
    router.push('/order-confirmation' as any);
  };

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Checkout</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Payment Method</Text>

        {paymentOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.paymentOption,
              selectedPayment === option.id && styles.paymentOptionSelected,
            ]}
            onPress={() => setSelectedPayment(option.id)}
          >
            <View
              style={[
                styles.radio,
                selectedPayment === option.id && styles.radioSelected,
              ]}
            />
            <Text style={styles.paymentLabel}>{option.label}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.summaryBox}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.summaryRow}>
              <Text style={styles.summaryText}>{item.name} x {item.qty}</Text>
              <Text style={styles.summaryText}>₹{(item.price * item.qty).toLocaleString('en-IN')}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>₹{cartTotal.toLocaleString('en-IN')}</Text>
        </View>

        <TouchableOpacity style={styles.placeOrderButton} onPress={placeOrder}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff', padding: 16, paddingTop: 50 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  paymentOptionSelected: { borderColor: '#2563eb', backgroundColor: '#eaf1ff' },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  radioSelected: { borderColor: '#2563eb', backgroundColor: '#2563eb' },
  paymentLabel: { fontSize: 13 },
  summaryBox: { marginTop: 20 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  summaryText: { fontSize: 12, color: '#555' },
  bottomBar: { borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 12, paddingBottom: 20 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  totalLabel: { fontSize: 13, color: '#555' },
  totalValue: { fontSize: 16, fontWeight: 'bold' },
  placeOrderButton: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  placeOrderText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
