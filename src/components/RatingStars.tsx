import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  rating: number;        // e.g. 4.3
  reviewCount?: number;  // e.g. 1280
  size?: number;
  showValue?: boolean;
};

export default function RatingStars({
  rating,
  reviewCount,
  size = 16,
  showValue = true,
}: Props) {
  const stars = [1, 2, 3, 4, 5].map((i) => {
    if (rating >= i) return "star";                 // full
    if (rating >= i - 0.5) return "star-half";      // half
    return "star-outline";                          // empty
  });

  return (
    <View style={styles.row}>
      {stars.map((name, index) => (
        <Ionicons
          key={index}
          name={name as any}
          size={size}
          color="#f59e0b"
        />
      ))}

      {showValue && <Text style={styles.value}>{rating.toFixed(1)}</Text>}

      {reviewCount !== undefined && (
        <Text style={styles.count}>({reviewCount.toLocaleString("en-IN")})</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 2 },
  value: { marginLeft: 6, fontSize: 13, fontWeight: "700", color: "#111827" },
  count: { marginLeft: 4, fontSize: 12, color: "#64748b" },
});