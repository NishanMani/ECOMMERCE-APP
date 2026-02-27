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

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Validation Error", "Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      Alert.alert(
        "Success",
        response.data?.message || "Account created successfully",
        [{ text: "OK", onPress: () => navigation.navigate("Login") }]
      );
    } catch (error) {
      if (!error.response) {
        Alert.alert(
          "Backend Unreachable",
          "Cannot connect to backend. Make sure the server is running and API URL is correct."
        );
        return;
      }

      const firstValidationMessage = error.response?.data?.errors?.[0]?.msg;
      Alert.alert(
        "Registration Failed",
        firstValidationMessage || error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.topSection}>
        <Text style={styles.welcome}>Join Us</Text>
        <Text style={styles.heading}>
          Create your{"\n"}
          <Text style={styles.gold}>GarNex</Text> account
        </Text>
      </View>

      <View style={styles.formSection}>
        <CustomInput
          label="Full Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
        />

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
          placeholder="Create password"
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "CREATING..." : "CREATE ACCOUNT"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLink}>Sign In</Text>
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
    height: 240,
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
    marginTop: 6,
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
    letterSpacing: 1.5,
  },
  loginText: {
    marginTop: 25,
    textAlign: "center",
    color: colors.textSecondary,
  },
  loginLink: {
    color: colors.primary,
    fontWeight: "700",
  },
});
