import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  return (
    
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Profile Section */}
        <View style={styles.topSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>KM</Text>
          </View>

          <Text style={styles.name}>Nishan K M</Text>
          <Text style={styles.email}>nishan@gmail.com</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>18</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>6</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
          </View>
        </View>

        {/* Account Section */}
        <Text style={styles.sectionTitle}>ACCOUNT</Text>

        <View style={styles.card}>

          <ProfileItem
  icon="cube-outline"
  title="My Orders"
  onPress={() => navigation.navigate("Orders")}
/>

<ProfileItem
  icon="heart-outline"
  title="Wishlist"
  onPress={() => navigation.navigate("Wishlist")}
/>

<ProfileItem
  icon="location-outline"
  title="Saved Addresses"
  onPress={() => navigation.navigate("Addresses")}
/>

        </View>

        {/* More Section */}
        <Text style={styles.sectionTitle}>MORE</Text>

        <View style={styles.card}>
          <ProfileItem
            icon="settings-outline"
            title="Settings"
          />
          <ProfileItem
            icon="log-out-outline"
            title="Sign Out"
            danger
          />
        </View>
      </ScrollView>
    </View>
  );
}

function ProfileItem({ icon, title, danger, onPress }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemLeft}>
        <Ionicons
          name={icon}
          size={20}
          color={danger ? "#E53935" : colors.primary}
        />
        <Text
          style={[
            styles.itemText,
            danger && { color: "#E53935" },
          ]}
        >
          {title}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward-outline"
        size={18}
        color="#A0A8B8"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },

  topSection: {
    backgroundColor: colors.primary,
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: "center",
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 12,
  },

  email: {
    color: "#D6DCE8",
    marginTop: 4,
  },

  statsContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.15)",
    marginTop: 20,
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },

  statBox: {
    alignItems: "center",
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.gold,
  },

  statLabel: {
    fontSize: 12,
    color: "#fff",
    marginTop: 4,
  },

  statDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginHorizontal: 30,
  },

  sectionTitle: {
    marginTop: 25,
    marginLeft: 20,
    fontSize: 12,
    letterSpacing: 2,
    color: "#8B97A8",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 16,
    paddingVertical: 5,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: "#F0F0F0",
  },

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  itemText: {
    marginLeft: 15,
    fontSize: 15,
    color: colors.primary,
    fontWeight: "500",
  },
});
