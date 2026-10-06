import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,ScrollView,FlatList,StyleSheet,} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const categories = [
  "All",
  "Mobiles",
  "Laptops",
  "Smartwatches",
  "Gaming Consoles",
  "Speakers",
  "Headphones",
  "Computer & Mobile Accessories",
];

export default function HomeScreen() {
  const router = useRouter();

  const { addToCart, cartCount } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = productsData.filter((product) => {
    const search = searchText.toLowerCase().trim();

    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.brand.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const resetFilters = () => {
    setSearchText("");
    setSelectedCategory("All");
  };

  const header = (
    <View>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <FontAwesome6 name="microchip" size={20} color="#2563eb" />

          <Text style={styles.logoText}>
            Circuit <Text style={{ color: "#2563eb" }}>Cart</Text>
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/cart")}
          style={styles.cartButton}
        >
          <FontAwesome6 name="cart-shopping" size={20} color="#1f2937" />

          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* SEARCH BOX */}
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by product or brand..."
          placeholderTextColor="#9ca3af"
          value={searchText}
          onChangeText={setSearchText}
        />

        {searchText.length > 0 ? (
          <TouchableOpacity onPress={() => setSearchText("")}>
            <FontAwesome6 name="xmark" size={16} color="#64748b" />
          </TouchableOpacity>
        ) : (
          <FontAwesome6 name="magnifying-glass" size={16} color="#2563eb" />
        )}
      </View>

      {/* HERO SECTION */}
      <View style={styles.heroContainer}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTag}>SMART TECHNOLOGY</Text>

          <Text style={styles.heroTitle}>
            Upgrade Your{"\n"}
            <Text style={styles.heroTitleAccent}>Tech</Text>
          </Text>

          <Text style={styles.heroText}>
            Phones, laptops, watches, consoles and more from top brands.
          </Text>

          <TouchableOpacity style={styles.shopButton} onPress={resetFilters}>
            <Text style={styles.shopButtonText}>Shop Now</Text>

            <FontAwesome6 name="arrow-right" size={13} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.heroImage}>
          <FontAwesome6 name="laptop" size={105} color="#ffffff" />
        </View>
      </View>

      {/* CATEGORIES */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={styles.categoryScroll}
      >
        {categories.map((category) => {
          const selected = selectedCategory === category;

          return (
            <TouchableOpacity
              key={category}
              style={[styles.categoryChip, selected && styles.selectedCategory]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selected && styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* PRODUCTS HEADER */}
      <View style={styles.productsHeader}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === "All" ? "Popular Products" : selectedCategory}
        </Text>

        <Text style={styles.productCount}>
          {filteredProducts.length} products
        </Text>
      </View>
    </View>
  );

  const emptyState = (
    <View style={styles.emptyState}>
      <FontAwesome6 name="magnifying-glass" size={30} color="#94a3b8" />

      <Text style={styles.emptyTitle}>No products found</Text>

      <Text style={styles.emptyText}>Try another search or category.</Text>

      <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
        <Text style={styles.resetButtonText}>Show all products</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      style={styles.page}
      data={filteredProducts}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      ListHeaderComponent={header}
      ListEmptyComponent={emptyState}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          isWishlisted={isInWishlist(item.id)}
          onToggleWishlist={toggleWishlist}
          onAddToCart={addToCart}
          onPress={() => router.push(`/product/${item.id}` as any)}
        />
      )}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      initialNumToRender={8}
      windowSize={7}
    />
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f6f7fb",
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  row: {
    justifyContent: "space-between",
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 16,
  },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  logoText: { fontSize: 20, fontWeight: "bold", color: "#111827" },
  cartButton: { padding: 5 },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -7,
    backgroundColor: "#2563eb",
    borderRadius: 10,
    minWidth: 17,
    height: 17,
    paddingHorizontal: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },

  /* SEARCH */
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 22,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 14,
    color: "#111827",
  },

  /* HERO */
  heroContainer: {
    backgroundColor: "#101B3F",
    borderRadius: 22,
    minHeight: 220,
    paddingHorizontal: 22,
    paddingVertical: 24,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  heroContent: { flex: 1, zIndex: 2 },
  heroTag: {
    color: "#79A9FF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
  },
  heroTitleAccent: { color: "#3478F6" },
  heroText: {
    color: "#CBD5E1",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
    marginBottom: 18,
    maxWidth: 190,
  },
  shopButton: {
    backgroundColor: "#3478F6",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 9,
  },
  shopButtonText: { color: "#ffffff", fontSize: 12, fontWeight: "700" },
  heroImage: {
    width: 125,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    opacity: 0.95,
  },

  /* CATEGORIES */
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
  },
  categoryScroll: { marginBottom: 20 },
  categoryChip: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 20,
    marginRight: 9,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  selectedCategory: { backgroundColor: "#2563eb", borderColor: "#2563eb" },
  categoryText: { fontSize: 12, fontWeight: "600", color: "#475569" },
  selectedCategoryText: { color: "#fff" },

  /* PRODUCTS */
  productsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  productCount: { fontSize: 11, color: "#64748b", marginBottom: 12 },

  /* EMPTY STATE */
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 14,
  },
  emptyText: { fontSize: 13, color: "#64748b", marginTop: 6 },
  resetButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 18,
  },
  resetButtonText: { color: "#fff", fontSize: 12, fontWeight: "600" },
});