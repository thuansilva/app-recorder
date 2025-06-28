import { Tabs } from "expo-router";
import React from "react-native";

import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tabIconSelected,
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontFamily: Fonts.mon.semiBold,
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="whishlist"
        options={{
          tabBarLabel: "Whislist",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          tabBarLabel: "Trips",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="airbnb" color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="inbox"
        options={{
          tabBarLabel: "Inbox",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="message-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
export default TabLayout;
