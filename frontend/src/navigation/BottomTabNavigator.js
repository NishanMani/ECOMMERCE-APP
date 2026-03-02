import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import colors from "../constants/colors";

import HomeScreen from "../screens/HomeScreen";
import SavedScreen from "../screens/SavedScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity ?? 0),
    0
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#8B97A8",
        tabBarStyle: {
          height: 86,
          paddingTop: 10,
          paddingBottom: 14,
          borderTopWidth: 0,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          backgroundColor: "#F7F8FA",
          position: "absolute",
          elevation: 8,
          shadowColor: "#0E1726",
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -2 },
        },
        tabBarItemStyle: {
          paddingTop: 2,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") iconName = "home-outline";
          if (route.name === "Wishlist") iconName = "heart-outline";
          if (route.name === "Cart") iconName = "cart-outline";
          if (route.name === "Profile") iconName = "person-outline";

          return (
            <View>
              <Ionicons name={iconName} size={size} color={color} />

              {route.name === "Cart" && totalItems > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {totalItems}
                  </Text>
                </View>
              )}

              {route.name === "Wishlist" && wishlistItems.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {wishlistItems.length}
                  </Text>
                </View>
              )}
            </View>
          );
        },
        tabBarLabel: ({ focused, color }) => (
          <View style={styles.labelWrap}>
            <Text style={[styles.label, { color }]}>
              {route.name.toUpperCase()}
            </Text>
            <View style={[styles.dot, !focused && styles.dotHidden]} />
          </View>
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wishlist" component={SavedScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  labelWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.gold,
    marginTop: 3,
  },
  dotHidden: {
    opacity: 0,
  },

  badge: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },

  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
