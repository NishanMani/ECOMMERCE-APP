import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import colors from "../constants/colors";
import CustomInput from "../components/CustomInput";
import API from "../services/api";

export default function LoginScreen({ setIsLoggedIn, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Validation Error", "Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/login", {
        email,
        password,
      });

      setIsLoggedIn(true);
    } catch (error) {
      if (!error.response) {
        Alert.alert(
          "Backend Unreachable",
          "Cannot connect to backend. Make sure the server is running and API URL is correct."
        );
        return;
      }

      Alert.alert(
        "Login Failed",
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.topSection}>
        <Text style={styles.welcome}>Welcome Back</Text>
        <Text style={styles.heading}>
          Sign in to{"\n"}
          <Text style={styles.gold}>GarNex</Text>
        </Text>
      </View>

      <View style={styles.formSection}>
        <CustomInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <CustomInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "SIGNING IN..." : "SIGN IN"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.signupText}>
            New here? <Text style={styles.signupLink}>Create Account</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  topSection: {
    height: 260,
    backgroundColor: colors.primary,
    justifyContent: "flex-end",
    padding: 30,
  },

  welcome: {
    color: colors.gold,
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 8,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.white,
    lineHeight: 34,
  },

  gold: {
    color: colors.gold,
  },

  formSection: {
    flex: 1,
    padding: 30,
    backgroundColor: colors.white,
  },

  button: {
    marginTop: 10,
    height: 55,
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: colors.white,
    fontWeight: "700",
    letterSpacing: 2,
  },

  signupText: {
    marginTop: 25,
    textAlign: "center",
    color: colors.textSecondary,
  },

  signupLink: {
    color: colors.primary,
    fontWeight: "700",
  },
});
