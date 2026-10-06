import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  const menuItems = [
    { label: 'My Orders', icon: 'box', onPress: () => router.push('/order-history' as any) },
    { label: 'Wishlist', icon: 'heart', onPress: () => router.push('/wishlist') },
    { label: 'Settings', icon: 'gear', onPress: () => {} },
    { label: 'Help & Support', icon: 'circle-question', onPress: () => {} },
  ];

  return (
    <View style={styles.page}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <FontAwesome6 name="user" size={26} color="#fff" />
        </View>
        <Text style={styles.name}>Guest User</Text>
        <Text style={styles.email}>guest@circuitcart.com</Text>
      </View>

      <View style={styles.menu}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.label} style={styles.menuItem} onPress={item.onPress}>
            <FontAwesome6 name={item.icon} size={16} color="#1f2937" />
            <Text style={styles.menuLabel}>{item.label}</Text>
            <FontAwesome6 name="chevron-right" size={12} color="#999" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#f6f7fb', paddingTop: 50 },
  profileHeader: { alignItems: 'center', marginBottom: 30 },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  email: { fontSize: 12, color: '#777' },
  menu: { paddingHorizontal: 16 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuLabel: { flex: 1, fontSize: 13, fontWeight: '500' },
});
