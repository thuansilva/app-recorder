/* eslint-disable react/display-name */
import { useRouter } from "expo-router";
import React, { memo, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const INITIAL_REGION = {
  latitude: 37.33,
  longitude: -122,
  latitudeDelta: 9,
  longitudeDelta: 9,
};

interface Props {
  listings: any;
}

const ListingsMap = memo(({ listings }: Props) => {
  //   const { listings } = props;
  const ref = useRef(null);
  //   console.log("props", props.listings.features);
  const router = useRouter();

  const onMarkerSelected = (event: any) => {
    router.push(`/listing/${event.properties.id}`);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={ref}
        style={StyleSheet.absoluteFillObject}
        provider={"google"}
        showsMyLocationButton
        showsUserLocation
        initialRegion={INITIAL_REGION}
      >
        {listings.features.map((item: any) => (
          <Marker
            key={item.properties.id}
            onPress={() => onMarkerSelected(item)}
            coordinate={{
              latitude: +item.properties.latitude,
              longitude: +item.properties.longitude,
            }}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>€{item.properties.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerText: {
    fontSize: 14,
    fontFamily: "mon-sb",
  },
  locateBtn: {
    position: "absolute",
    top: 70,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
});

export default ListingsMap;
