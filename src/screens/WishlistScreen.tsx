import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import RatingStars from '../components/RatingStars';

export default function WishlistScreen() {
  const router = useRouter();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Wishlist</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {wishlistItems.length === 0 ? (
          <Text style={styles.emptyText}>No items saved yet</Text>
        ) : (
          wishlistItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.row}
              onPress={() => router.push(`/product/${item.id}` as any)}
            >
              <View style={styles.imageBox}>
                <FontAwesome6 name={item.icon} size={24} color="#475569" />
              </View>

              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>₹{item.price.toLocaleString('en-IN')}</Text>
                <RatingStars rating={item.rating} />
              </View>

              <View style={styles.actions}>
                <TouchableOpacity onPress={() => addToCart(item)}>
                  <FontAwesome6 name="cart-plus" size={16} color="#2563eb" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeFromWishlist(item.id)}>
                  <FontAwesome6 name="trash" size={16} color="#dc2626" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  imageBox: {
    width: 56,
    height: 56,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1 },
  name: { fontSize: 13, fontWeight: '600' },
  price: { fontSize: 13, fontWeight: 'bold', marginVertical: 2 },
  actions: { gap: 14, alignItems: 'center' },
});
