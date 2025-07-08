import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

function Profile() {
  const { signOut, isSignedIn } = useAuth();
  if (!isSignedIn) {
    return (
      <View>
        <Text>You are not signed in.</Text>
        <Link href="/(modals)/login">
          <Text>Login</Text>
        </Link>
      </View>
    );
  }

  return (
    <View>
      <Button title="Sign out" onPress={() => signOut()} />
      {!isSignedIn && (
        <Link href="/(modals)/login">
          <Text>Login</Text>
        </Link>
      )}
    </View>
  );
}

export default Profile;
