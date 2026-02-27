import { View, Text, StyleSheet } from "react-native";
import colors from "../constants/colors";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>GarNex</Text>
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
});