import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";

if (Platform.OS === "android") {
  // only android needs polyfill
  require("intl"); // import intl object
  require("intl/locale-data/jsonp/en-IN"); // load the required locale details
}

const ListItem = ({
  name,
  symbol,
  currentPrice,
  priceChangePercentage7d,
  logoUrl,
  onPress,
}) => {
  const priceChangeColor = priceChangePercentage7d > 0 ? "#34c759" : "#ff3b30";
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemWrapper}>
        {/* Left side */}
        <View style={styles.leftWrapper}>
          <Image
            source={{
              uri: logoUrl,
            }}
            style={[styles.image]}
          />
          <View style={styles.titlesWrapper}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subTitle}>{symbol.toUpperCase()}</Text>
          </View>
        </View>

        {/* right side */}
        <View style={styles.rightWrapper}>
          <Text style={styles.title}>
            {currentPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Text>
          <Text style={[styles.subTitle, { color: priceChangeColor }]}>
            {priceChangePercentage7d.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 24,
  },
  leftWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 48,
    width: 48,
  },
  titlesWrapper: {
    marginLeft: 8,
  },
  title: {
    fontSize: 18,
  },
  subTitle: {
    fontSize: 14,
    color: "#a9abb1",
    marginTop: 4,
  },
  rightWrapper: {
    alignItems: "flex-end",
  },
});

export default ListItem;
