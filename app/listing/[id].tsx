import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

function Booking() {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log("Booking ID:", id);
  return (
    <View>
      <Text style={{ fontFamily: "Monstserrat-Regular" }}>Listing</Text>
    </View>
  );
}

export default Booking;
