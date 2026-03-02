import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";
import ProductCard from "../components/ProductCard";

export default function HomeScreen() {
  const categories = ["All", "Men", "Women", "Kids", "Accessories"];
  const products = [
  {
    id: 1,
    title: "Classic T-Shirt",
    price: 799,
    image: require("../../assets/tshirt.png"),
  },
  {
    id: 2,
    title: "Denim Jacket",
    price: 1999,
    image: require("../../assets/denim.jpeg"),
  },
  {
    id: 3,
    title: "Casual Hoodie",
    price: 1499,
    image: require("../../assets/hoodie.png"),
  },
];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.brand}>GarNex</Text>
          </View>

          <View style={styles.cartIcon}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color={colors.primary}
            />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={18} color="#888" />
          <TextInput
            placeholder="Search products..."
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
        </View>

  {/* Banner */}
<View style={styles.banner}>
  <View style={styles.bannerContent}>
    <Text style={styles.bannerTag}>NEW COLLECTION</Text>

    <Text style={styles.bannerTitle}>
      Elevate{"\n"}Your Style
    </Text>

    <View style={styles.bannerButton}>
      <Text style={styles.bannerButtonText}>Explore</Text>
    </View>
  </View>
</View>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Shop By</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {categories.map((item, index) => (
            <View
              key={index}
              style={[
                styles.categoryChip,
                index === 0 && styles.activeCategory,
              ]}
            >
              <Text
                style={
                  index === 0
                    ? styles.activeCategoryText
                    : styles.categoryText
                }
              >
                {item}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Products Section Header */}
<View style={styles.sectionHeader}>
  <Text style={styles.sectionTitle}>Featured Products</Text>
</View>

<View style={styles.productGrid}>
  {products.map((item) => (
    <ProductCard
  key={item.id}
  id={item.id}
  title={item.title}
  price={item.price}
  image={item.image}
/>
  ))}
</View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },

  greeting: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  brand: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
  },

  cartIcon: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 12,
    elevation: 3,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    marginHorizontal: 20,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    elevation: 2,
  },

  searchInput: {
    marginLeft: 10,
    flex: 1,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },

  categoryScroll: {
    paddingLeft: 20,
  },

  categoryChip: {
    backgroundColor: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginRight: 10,
  },

  activeCategory: {
    backgroundColor: colors.primary,
  },

  categoryText: {
    color: colors.textSecondary,
    fontWeight: "500",
  },

  activeCategoryText: {
    color: colors.white,
    fontWeight: "600",
  },
  banner: {
  marginHorizontal: 20,
  marginTop: 30,
  borderRadius: 20,
  backgroundColor: colors.primary,
  padding: 25,
  elevation: 4,
},

bannerContent: {
  gap: 10,
},

bannerTag: {
  fontSize: 10,
  letterSpacing: 2,
  color: colors.gold,
  fontWeight: "600",
},

bannerTitle: {
  fontSize: 26,
  fontWeight: "bold",
  color: colors.white,
  lineHeight: 32,
},

bannerButton: {
  marginTop: 12,
  backgroundColor: colors.gold,
  alignSelf: "flex-start",
  paddingVertical: 6,
  paddingHorizontal: 18,
  borderRadius: 20,
},

bannerButtonText: {
  fontWeight: "600",
  color: colors.primary,
},
productGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  marginHorizontal: 20,
  marginTop: 10,
  paddingBottom: 12,
},
scrollContent: {
  paddingBottom: 110,
},
});
