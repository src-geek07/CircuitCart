
import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Image,} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import RatingStars from './RatingStars';

// Shows one product in a card - used in Home, Category, Search screens
export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  currency: string;
  imageUrl: string;
  description: string;
  rating: number;       
  reviewCount: number;  
};

type ProductCardProps = {
  product: Product;
  onPress: () => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
};

export default function ProductCard({
  product,
  onPress,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}: ProductCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.imageBox}>
        <Image
          source={{ uri: product.imageUrl }}
          style={styles.productImage}
          resizeMode="contain"
        />

        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => onToggleWishlist(product)}
        >
          <FontAwesome6
            name="heart"
            size={14}
            color={isWishlisted ? '#dc2626' : '#9ca3af'}
            solid={isWishlisted}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text style={styles.brand}>
          {product.brand}
        </Text>

        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>

        <Text style={styles.category} numberOfLines={1}>
          {product.category}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>
            ₹{product.price.toLocaleString('en-IN')}
          </Text>
        </View>
        <RatingStars rating={product.rating} size={12} showValue={false} />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => onAddToCart(product)}
        >
          <FontAwesome6
            name="cart-shopping"
            size={12}
            color="#fff"
          />
          <Text style={styles.addButtonText}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 13,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 2,
  },

  imageBox: {
    height: 130,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  productImage: {
    width: '85%',
    height: '85%',
  },

  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  info: {
    padding: 10,
  },

  brand: {
    fontSize: 10,
    color: '#2563eb',
    fontWeight: 'bold',
  },

  name: {
    fontSize: 13,
    fontWeight: '600',
    marginVertical: 4,
    color: '#111827',
  },

  category: {
    fontSize: 10,
    color: '#6b7280',
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
  },

  addButton: {
    marginTop: 10,
    backgroundColor: '#2563eb',
    paddingVertical: 9,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 7,
  },

  addButtonText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
});