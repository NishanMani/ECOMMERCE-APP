import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { CartProvider } from "./src/context/CartContext";
import { WishlistProvider } from "./src/context/WishlistContext";

export default function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </CartProvider>
    </WishlistProvider>
  );
}
