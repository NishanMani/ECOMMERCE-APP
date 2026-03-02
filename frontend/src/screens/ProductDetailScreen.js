import { useContext, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext);

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const shades = ["#0D1D47", "#2F4A95", "#C8A349", "#4C8A5C"];
  const shadeLabels = {
    "#0D1D47": "Indigo",
    "#2F4A95": "Royal Blue",
    "#C8A349": "Mustard",
    "#4C8A5C": "Olive",
  };

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(shades[0]);

  const liked = isWishlisted(product?.id);

  const mrp = useMemo(() => Math.round(Number(product?.price ?? 0) * 1.35), [product?.price]);
  const savePercent = useMemo(() => {
    if (!mrp) return 0;
    const saved = ((mrp - Number(product?.price ?? 0)) / mrp) * 100;
    return Math.max(0, Math.round(saved));
  }, [mrp, product?.price]);

  const productDescription = useMemo(() => {
    const title = String(product?.title ?? "").toLowerCase();

    if (title.includes("t-shirt") || title.includes("tee")) {
      return "Soft, breathable cotton tee designed for all-day comfort. A clean everyday staple that pairs easily with denim, joggers, or layered streetwear looks.";
    }

    if (title.includes("jacket") || title.includes("denim")) {
      return "Structured denim layer with a versatile regular fit. Built for everyday wear with durable fabric and a timeless style that works across seasons.";
    }

    if (title.includes("hoodie")) {
      return "Cozy brushed-fleece hoodie with a relaxed feel and clean finish. Ideal for cooler days, easy layering, and casual comfort from morning to night.";
    }

    return `${product?.title ?? "This product"} is crafted for comfort, durability, and everyday style with a clean finish and easy-to-wear fit.`;
  }, [product?.title]);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.heroCard}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={20} color={colors.primary} />
          </TouchableOpacity>

          <View style={styles.heroImageWrap}>
            <Image source={product.image} style={styles.detailImage} resizeMode="cover" />
          </View>

          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="share-social-outline" size={17} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => toggleWishlist(product)}
            >
              <Ionicons
                name={liked ? "heart" : "heart-outline"}
                size={17}
                color={liked ? "#D61F45" : colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.topRow}>
            <Text style={styles.maker}>HANDLOOM INDIA</Text>
            <Text style={styles.rating}>★ 4.8 (186)</Text>
          </View>

          <Text style={styles.title}>{product.title}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{product.price}</Text>
            <Text style={styles.mrp}>₹{mrp}</Text>
            <Text style={styles.saveTag}>Save {savePercent}%</Text>
          </View>

          <Text style={styles.sectionLabel}>SELECT SIZE</Text>
          <Text style={styles.selectionValue}>Selected: {selectedSize}</Text>
          <View style={styles.sizeRow}>
            {sizes.map((size) => {
              const active = size === selectedSize;
              return (
                <TouchableOpacity
                  key={size}
                  style={[styles.sizeChip, active && styles.activeSizeChip]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={[styles.sizeText, active && styles.activeSizeText]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionLabel}>COLOR</Text>
          <Text style={styles.selectionValue}>
            Selected: {shadeLabels[selectedColor]}
          </Text>
          <View style={styles.colorRow}>
            {shades.map((shade) => {
              const active = shade === selectedColor;
              return (
                <TouchableOpacity
                  key={shade}
                  style={[
                    styles.colorSwatchWrap,
                    active && styles.activeColorSwatchWrap,
                  ]}
                  onPress={() => setSelectedColor(shade)}
                >
                  <View style={[styles.colorSwatch, { backgroundColor: shade }]} />
                  {active && <View style={styles.colorTick} />}
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.description}>
            {productDescription}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerIconButton}
          onPress={() => toggleWishlist(product)}
        >
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={20}
            color={liked ? "#D61F45" : colors.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() =>
            addToCart({
              ...product,
              selectedSize,
              selectedColor,
            })
          }
        >
          <Text style={styles.cartButtonText}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9ECF3",
  },

  scrollContent: {
    padding: 18,
    paddingTop: 44,
    paddingBottom: 130,
  },

  heroCard: {
    backgroundColor: "#DDE2EB",
    borderRadius: 26,
    padding: 14,
    marginBottom: 16,
    minHeight: 360,
  },

  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#FFFFFFE6",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },

  quickActions: {
    position: "absolute",
    right: 14,
    top: 68,
    gap: 8,
  },

  heroImageWrap: {
    marginTop: 30,
    height: 280,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: colors.primary,
  },

  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 16,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  maker: {
    fontSize: 11,
    letterSpacing: 1.4,
    color: "#7181A1",
    fontWeight: "700",
  },

  rating: {
    fontSize: 13,
    color: "#4A5E86",
    fontWeight: "600",
  },

  title: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: "700",
    color: "#0D1D47",
    marginBottom: 12,
    letterSpacing: -0.4,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 18,
  },

  price: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0D1D47",
  },

  mrp: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "#99A4BC",
    marginTop: 6,
  },

  saveTag: {
    marginTop: 6,
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 6,
    backgroundColor: "#EEF2FA",
    color: "#4D618B",
    fontWeight: "700",
    fontSize: 11,
  },

  sectionLabel: {
    fontSize: 11,
    letterSpacing: 1.4,
    color: "#7181A1",
    fontWeight: "700",
    marginBottom: 8,
  },

  selectionValue: {
    fontSize: 12,
    color: "#4D618B",
    fontWeight: "600",
    marginTop: -2,
    marginBottom: 8,
  },

  sizeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },

  sizeChip: {
    minWidth: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D5DCE8",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#EEF2F8",
  },

  activeSizeChip: {
    borderColor: "#0D1D47",
    borderWidth: 1.5,
    backgroundColor: "#EAF0FF",
  },

  sizeText: {
    color: "#627392",
    fontWeight: "600",
    fontSize: 12,
  },

  activeSizeText: {
    color: "#0D1D47",
  },

  colorRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },

  colorSwatchWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },

  activeColorSwatchWrap: {
    borderColor: "#0D1D47",
    borderWidth: 1.5,
    backgroundColor: "#FFFFFF",
  },

  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },

  colorTick: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    backgroundColor: "#0D1D47",
  },

  description: {
    color: "#50648E",
    fontSize: 14,
    lineHeight: 23,
    fontWeight: "500",
  },

  footer: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  footerIconButton: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D4DBE8",
  },

  cartButton: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#1E315D",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },

  cartButtonText: {
    color: colors.white,
    fontWeight: "800",
    letterSpacing: 1.6,
    fontSize: 14,
  },

  detailImage: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
  },
});
