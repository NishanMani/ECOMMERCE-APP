import { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import colors from "../constants/colors";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

export default function SavedScreen() {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={styles.header}>
          <Text style={styles.heading}>My Wishlist</Text>
          <Text style={styles.itemCount}>
            {wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""}
          </Text>
        </View>

        {wishlistItems.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No saved items yet</Text>
          </View>
        )}

        {wishlistItems.map((item, index) => (
          <View
            key={item?.id != null ? String(item.id) : `wishlist-${index}`}
            style={styles.itemCard}
          >
            <Image source={item.image} style={styles.productImage} />

            <View style={styles.details}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>₹{item.price}</Text>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.cartButton}
                  onPress={() => {
                    addToCart(item);
                    removeFromWishlist(item.id);
                  }}
                >
                  <Text style={styles.cartButtonText}>Add To Cart</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => removeFromWishlist(item.id)}
                >
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  header: {
    marginBottom: 20,
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
  },

  itemCount: {
    color: colors.textSecondary,
    marginTop: 4,
  },

  emptyContainer: {
    marginTop: 60,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },

  itemCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 15,
    marginBottom: 15,
  },

  productImage: {
    width: 80,
    height: 110,
    borderRadius: 12,
  },

  details: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },

  price: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.gold,
    marginTop: 6,
  },

  actions: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cartButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  cartButtonText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 12,
    letterSpacing: 0.5,
  },

  removeText: {
    color: "red",
    fontSize: 13,
    fontWeight: "500",
  },
});
