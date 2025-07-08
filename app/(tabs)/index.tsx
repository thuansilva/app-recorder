import ExploreHeader from "@/components/ExploreHeader";
import { Stack } from "expo-router";
import React, { useMemo, useState } from "react";
import { View } from "react-native";

import ListingsBottomSheet from "@/components/ListingsBottomSheet";
import listingsData from "../../assets/data/airbnb-listings.json";
function Page() {
  const items = useMemo(() => listingsData as any, []);
  // const getoItems = useMemo(() => listingsDataGeo, []);
  const [category, setCategory] = useState<string>("Tiny homes");

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 185 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      {/* <Listing /> */}
      {/* <ListingsMap listings={getoItems} /> */}
      <ListingsBottomSheet listings={items} category={category} />
    </View>
  );
}

export default Page;
