import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={22} color={colors.primary} />
      </TouchableOpacity>

      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image source={product.image} style={styles.detailImage} resizeMode="cover" />
      </View>

      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>₹{product.price}</Text>

      <TouchableOpacity style={styles.cartButton}>
        <Text style={styles.cartButtonText}>Add To Cart</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },

  backButton: {
    marginTop: 40,
    marginBottom: 20,
  },

  imageContainer: {
    height: 300,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },

  price: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.gold,
    marginBottom: 30,
  },

  cartButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  cartButtonText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 16,
  },
  detailImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
});
