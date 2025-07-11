import { Fonts } from "@/constants/Fonts";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

interface Props {
  listings: any;
  category: string;
  refresh: number;
}

function Listings({ category, listings: items, refresh }: Props) {
  const [loading, setLoading] = React.useState<boolean>(true);

  const listRef = useRef<FlatList>(null);

  const scrollListTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  useEffect(() => {
    if (refresh) {
      scrollListTop();
    }
  }, [refresh]);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [category]);

  const renderRow: ListRenderItem<any> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          style={styles.listing}
          entering={FadeInRight}
          exiting={FadeOutLeft}
        >
          <Image source={{ uri: item.medium_url }} style={styles.image} />
          <TouchableOpacity
            style={{ position: "absolute", right: 30, top: 30 }}
          >
            <Ionicons name="heart-outline" size={24} color="#000" />
          </TouchableOpacity>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>{item.name}</Text>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Ionicons name="star" size={16} />
              <Text style={{ fontFamily: Fonts.mon.semiBold }}>
                {item.review_scores_rating / 20}
              </Text>
            </View>
          </View>
          <Text style={{ fontFamily: Fonts.mon.regular }}>
            {item.room_type}
          </Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text style={{ fontFamily: Fonts.mon.semiBold }}>
              € {item.price}
            </Text>
            <Text style={{ fontFamily: Fonts.mon.regular }}>night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  return (
    // <View style={defaultStyles.container}>
    <BottomSheetFlatList
      data={loading ? [] : items}
      // ref={listRef}
      renderItem={renderRow}
      style={defaultStyles.container}
    />
    // </View>
  );
}

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  info: {
    textAlign: "center",
    fontFamily: "mon-sb",
    fontSize: 16,
    marginTop: 4,
  },
});
export default Listings;
