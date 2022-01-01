import React from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
if (Platform.OS === "android") {
  // only android needs polyfill
  require("intl"); // import intl object
  require("intl/locale-data/jsonp/en-IN"); // load the required locale details
}

// import {
//   ChartDot,
//   ChartPath,
//   ChartPathProvider,
// } from "@rainbow-me/animated-charts";

const Chart = ({
  currentPrice,
  logoUrl,
  name,
  priceChangePercentage7d,
  sparkline,
  symbol,
}) => {
  const priceChangeColor = priceChangePercentage7d > 0 ? "#34c759" : "#ff3b30";

  return (
    <View style={styles.chartWrapper}>
      <View style={styles.titlesWrapper}>
        <View style={styles.upperTitles}>
          <View style={styles.upperLeftTitle}>
            <Image source={{ uri: logoUrl }} style={styles.image} />
            <Text style={styles.subTitle}>
              {name} {symbol.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.subTitle}>7d</Text>
        </View>

        <View style={styles.lowerTitles}>
          <Text style={styles.boldTitles}>
            {currentPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Text>
          <Text style={[styles.title, { color: priceChangeColor }]}>
            {priceChangePercentage7d.toFixed(2)}%
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartWrapper: {
    margin: 16,
  },
  titlesWrapper: {},
  upperTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upperLeftTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  subTitle: {
    fontSize: 14,
    color: "#a9abb1",
  },
  lowerTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boldTitles: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
  },
});

export default Chart;
