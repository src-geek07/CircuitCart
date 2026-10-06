import { Tabs } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#2563eb' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <FontAwesome6 name="house" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color, size }) => <FontAwesome6 name="heart" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => <FontAwesome6 name="cart-shopping" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <FontAwesome6 name="user" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
