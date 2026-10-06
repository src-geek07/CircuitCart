
import React from 'react';
import {View,Text,TouchableOpacity,ScrollView,StyleSheet,Image,} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import productsData from '../data/products.json';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import RatingStars from "../components/RatingStars"; 


export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const product = productsData.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Product not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const wishlisted = isInWishlist(product.id);

  return (
    <ScrollView style={styles.page}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <FontAwesome6
          name="arrow-left"
          size={18}
          color="#1f2937"
        />
      </TouchableOpacity>

      <View style={styles.imageBox}>
        <Image
          source={{ uri: product.imageUrl }}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.brand}>{product.brand}</Text>
      <Text style={styles.name}>{product.name}</Text>
      <RatingStars rating={product.rating} reviewCount={product.reviewCount} />

      <View style={styles.priceRow}>
        <Text style={styles.price}>
          ₹{product.price.toLocaleString('en-IN')}
        </Text>
      </View>

      <Text style={styles.description}>
        {product.description}
      </Text>

      <View style={styles.stockRow}>
        <FontAwesome6
          name="circle-check"
          size={14}
          color="#16a34a"
        />
        <Text style={styles.stock}>
          Product available
        </Text>
      </View>

      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={() => toggleWishlist(product)}
        >
          <FontAwesome6
            name="heart"
            size={20}
            color={wishlisted ? '#dc2626' : '#1f2937'}
            solid={wishlisted}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addToCart(product)}
        >
          <FontAwesome6
            name="cart-shopping"
            size={16}
            color="#fff"
          />
          <Text style={styles.addButtonText}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  notFound: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },

  backText: {
    color: '#2563eb',
    marginTop: 12,
  },

  backButton: {
    marginTop: 40,
    marginBottom: 16,
  },

  imageBox: {
    height: 260,
    backgroundColor: '#f1f5f9',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },

  productImage: {
    width: '90%',
    height: '90%',
  },

  category: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 6,
  },

  brand: {
    fontSize: 13,
    color: '#2563eb',
    fontWeight: 'bold',
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginVertical: 8,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },

  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#111827',
  },

  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    marginTop: 12,
  },

  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 18,
  },

  stock: {
    fontSize: 13,
    color: '#16a34a',
    fontWeight: '600',
  },

  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 28,
    marginBottom: 30,
  },

  wishlistButton: {
    width: 52,
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButton: {
    flex: 1,
    height: 52,
    backgroundColor: '#2563eb',
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});