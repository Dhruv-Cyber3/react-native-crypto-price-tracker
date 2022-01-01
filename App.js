import React, { useState, useCallback, useMemo, useRef } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import ListItem from "./components/ListItem";
import { SAMPLE_DATA } from "./assets/data/sampleData";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Chart from "./components/Chart";

const ListHeader = () => {
  return (
    <>
      <View style={styles.titleWrapper}>
        <Text style={styles.largeTitle}>Markets</Text>
      </View>
      <View style={styles.divider} />
    </>
  );
};

export default function App() {
  const [selectedCoinData, setSelectedCoinData] = useState(null);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["50%"], []);

  const openModal = (item) => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current.present();
  };
  const closeModal = () => {
    bottomSheetModalRef.current.dismiss();
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={SAMPLE_DATA}
          renderItem={({ item }) => {
            return (
              <ListItem
                name={item.name}
                symbol={item.symbol}
                currentPrice={item.current_price}
                priceChangePercentage7d={
                  item.price_change_percentage_7d_in_currency
                }
                logoUrl={item.image}
                onPress={() => openModal(item)}
              />
            );
          }}
          ListHeaderComponent={<ListHeader />}
        />
      </SafeAreaView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
      >
        <View style={styles.contentContainer}>
          <Button
            onPress={() => closeModal()}
            title="close"
            style={styles.button}
          />
          {selectedCoinData ? (
            <Chart
              currentPrice={selectedCoinData.current_price}
              logoUrl={selectedCoinData.image}
              name={selectedCoinData.name}
              priceChangePercentage7d={
                selectedCoinData.price_change_percentage_7d_in_currency
              }
              sparkline={selectedCoinData.sparkline_in_7d.price}
              symbol={selectedCoinData.symbol}
            />
          ) : null}
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleWrapper: {
    marginTop: 50,
    paddingHorizontal: 16,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#a9abb1",
    marginHorizontal: 16,
    marginTop: 16,
  },
  bottomSheet: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
});
