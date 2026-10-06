import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OrderHistoryScreen() {
  const [orders, setOrders] = useState([]);

  // reload the orders every time this screen comes into focus
  // (so a newly placed order shows up right away)
  useFocusEffect(
    useCallback(() => {
      loadOrders();
    }, [])
  );

  const loadOrders = async () => {
    const saved = await AsyncStorage.getItem('orders');
    if (saved) {
      setOrders(JSON.parse(saved));
    }
  };

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Order History</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {orders.length === 0 ? (
          <Text style={styles.emptyText}>No orders yet</Text>
        ) : (
          orders.map((order) => (
            <View key={order.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
              </View>

              <Text style={styles.itemCount}>{order.items.length} items</Text>
              <Text style={styles.payment}>Paid via {order.paymentMethod.toUpperCase()}</Text>

              <Text style={styles.total}>₹{order.total.toLocaleString('en-IN')}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#f6f7fb', padding: 16, paddingTop: 50 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 50 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  orderId: { fontSize: 13, fontWeight: '600' },
  orderDate: { fontSize: 11, color: '#999' },
  itemCount: { fontSize: 12, color: '#555' },
  payment: { fontSize: 12, color: '#555', marginVertical: 2 },
  total: { fontSize: 15, fontWeight: 'bold', marginTop: 6 },
});
