import { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

export default function ProductCard({ id, title, price, image }) {
  const navigation = useNavigation();
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext);

  const product = { id, title, price, image };
  const liked = isWishlisted(id);

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        navigation.navigate("ProductDetail", {
          product: { id, title, price, image },
        })
      }
    >
      <View style={styles.imageContainer}>
        {/* Wishlist Button */}
        <Pressable
          style={styles.wishlistIcon}
          onPress={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
        >
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={18}
            color={liked ? "red" : colors.primary}
          />
        </Pressable>

        {/* Product Image */}
        <Image
          source={image}
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.bottomRow}>
        <Text style={styles.price}>₹{price}</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={(e) => {
            e.stopPropagation();
            addToCart({
              id,
              title,
              price,
              image,
            });
          }}
        >
          <Ionicons name="add" size={16} color={colors.white} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 10,
    width: "48%",
    marginBottom: 18,
    elevation: 3,
  },

  imageContainer: {
    height: 170,
    backgroundColor: "#f2f2f2",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
  },

  wishlistIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255,255,255,0.92)",
    padding: 6,
    borderRadius: 20,
    elevation: 5,
    zIndex: 5,
  },

  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 6,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  price: {
    fontWeight: "bold",
    color: colors.gold,
  },

  addButton: {
    backgroundColor: colors.primary,
    padding: 6,
    borderRadius: 8,
  },
});
