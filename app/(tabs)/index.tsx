import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";

function Page() {
  return (
    <View>
      <Link href="/(modals)/login">Login</Link>
      <Link href="/(modals)/booking">Booking</Link>
      <Link href="/listing/137">Listing</Link>
    </View>
  );
}

export default Page;
