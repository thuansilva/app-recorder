import ExploreHeader from "@/components/ExploreHeader";
import { Stack } from "expo-router";
import React, { useMemo, useState } from "react";
import { View } from "react-native";

import listingsDataGeo from "@/assets/data/airbnb-lisitngs.geo.json";
import listingsData from "@/assets/data/airbnb-listings.json";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";
import ListingsMap from "@/components/ListingsMap";
function Page() {
  const items = useMemo(() => listingsData as any, []);
  const getoItems: any = useMemo(() => listingsDataGeo, []);
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

      <ListingsMap listings={getoItems} />
      <ListingsBottomSheet listings={items} category={category} />
    </View>
  );
}

export default Page;
