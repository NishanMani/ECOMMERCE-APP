import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import OrdersScreen from "../screens/OrdersScreen";
import AddressScreen from "../screens/AddressScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Main" component={BottomTabNavigator} />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
          />
          <Stack.Screen name="Orders" component={OrdersScreen} />
          <Stack.Screen name="Addresses" component={AddressScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Splash">
            {(props) => <SplashScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
