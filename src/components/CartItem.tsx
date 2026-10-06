import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

// one row inside the Cart screen
export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <View style={styles.row}>
      <View style={styles.imageBox}>
        <FontAwesome6 name={item.icon} size={24} color="#475569" />
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price.toLocaleString('en-IN')}</Text>

        <View style={styles.qtyRow}>
          <TouchableOpacity style={styles.qtyButton} onPress={() => onDecrease(item.id)}>
            <Text style={styles.qtyButtonText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.qtyValue}>{item.qty}</Text>

          <TouchableOpacity style={styles.qtyButton} onPress={() => onIncrease(item.id)}>
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => onRemove(item.id)}>
        <FontAwesome6 name="trash" size={16} color="#dc2626" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  price: { fontSize: 13, fontWeight: 'bold', marginTop: 2 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 6 },
  qtyButton: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonText: { fontSize: 14, fontWeight: '600' },
  qtyValue: { fontSize: 13, fontWeight: '600' },
});
