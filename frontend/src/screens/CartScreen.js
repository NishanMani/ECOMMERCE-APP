import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import colors from "../constants/colors";

export default function CartScreen() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity ?? 0),
    0
  );

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + Number(item?.price ?? 0) * Number(item?.quantity ?? 0),
    0
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.heading}>My Cart</Text>
          <Text style={styles.itemCount}>
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </Text>
        </View>

        {/* Empty State */}
        {cartItems.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Your cart is empty
            </Text>
          </View>
        )}

        {/* Cart Items */}
        {cartItems.map((item, index) => (
          <View
            key={item?.id != null ? String(item.id) : `cart-${index}`}
            style={styles.itemCard}
          >
            <Image source={item.image} style={styles.productImage} />

            <View style={styles.details}>
              <Text style={styles.title}>{item.title}</Text>

              <Text style={styles.price}>
                ₹{item.price}
              </Text>

              <View style={styles.bottomRow}>
                <View style={styles.qtyContainer}>
                  <TouchableOpacity
                    onPress={() => decreaseQuantity(item.id)}
                  >
                    <Text style={styles.qtyButton}>−</Text>
                  </TouchableOpacity>

                  <Text style={styles.qtyValue}>
                    {item.quantity}
                  </Text>

                  <TouchableOpacity
                    onPress={() => increaseQuantity(item.id)}
                  >
                    <Text style={styles.qtyButton}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => removeFromCart(item.id)}
                >
                  <Text style={styles.removeText}>
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Summary */}
        {subtotal > 0 && (
          <View style={styles.summaryCard}>
            <View style={styles.row}>
              <Text style={styles.label}>Subtotal</Text>
              <Text style={styles.value}>
                ₹{subtotal}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.totalLabel}>
                Total
              </Text>
              <Text style={styles.totalAmount}>
                ₹{subtotal}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Checkout Button */}
      {subtotal > 0 && (
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>
            PROCEED TO CHECKOUT
          </Text>
        </TouchableOpacity>
      )}
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

  bottomRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF1F7",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    width: 100,
    justifyContent: "space-between",
  },

  qtyButton: {
    fontSize: 18,
    fontWeight: "700",
  },

  qtyValue: {
    fontSize: 16,
    fontWeight: "600",
  },

  removeText: {
    color: "red",
    fontSize: 13,
    fontWeight: "500",
  },

  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginTop: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    color: colors.textSecondary,
  },

  value: {
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 10,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
  },

  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },

  checkoutButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
  },

  checkoutText: {
    color: "#fff",
    fontWeight: "700",
    letterSpacing: 1,
  },
});