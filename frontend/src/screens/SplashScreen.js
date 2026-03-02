import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../constants/colors";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>GarNex</Text>
      <Text style={styles.tagline}>  Style · Sets · High</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    color: colors.white,
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 5,
  },
  tagline: {
    marginTop: 12,
    color: colors.gold,
    fontSize: 15,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});
