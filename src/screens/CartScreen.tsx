import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';


export default function CartScreen() {
  const router = useRouter();
  const { cartItems, increaseQty, decreaseQty, removeFromCart, cartTotal } = useCart();

  return (
    <View style={styles.page}>
      <Text style={styles.title}>My Cart</Text>
      <Text style={styles.subtitle}>{cartItems.length} items</Text>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty</Text>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={increaseQty}
              onDecrease={decreaseQty}
              onRemove={removeFromCart}
            />
          ))
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <View style={styles.bottomBar}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{cartTotal.toLocaleString('en-IN')}</Text>
          </View>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => router.push('/checkout' as any)}
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#f6f7fb', padding: 16, paddingTop: 50 },
  title: { fontSize: 20, fontWeight: 'bold' },
  subtitle: { fontSize: 12, color: '#777', marginBottom: 16 },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 50 },
  bottomBar: { paddingTop: 10, paddingBottom: 20 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  totalLabel: { fontSize: 14, color: '#555' },
  totalValue: { fontSize: 18, fontWeight: 'bold' },
  checkoutButton: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  checkoutText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
