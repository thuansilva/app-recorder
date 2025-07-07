import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { defaultStyles } from "@/constants/Styles";
import { Auth } from "@/entities/Auth";
import { ClerkAuthSessionService } from "@/entities/ProviderGateway";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import * as AuthSession from "expo-auth-session";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

enum Strategy {
  GOOGLE = "oauth_google",
  APPLE = "oauth_apple",
  FACEBOOK = "oauth_facebook",
}

function Login() {
  useWarmUpBrowser();
  const router = useRouter();
  const { startSSOFlow } = useSSO();

  const onSelectAuth = React.useCallback(async (strategy: Strategy) => {
    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: strategy,
          redirectUrl: AuthSession.makeRedirectUri(),
        });

      const clerkAuthSessionService = new ClerkAuthSessionService();
      const auth = new Auth(clerkAuthSessionService);
      await auth.create(createdSessionId, setActive, signIn);
      router.back();
    } catch (err) {
      console.error(
        "Erro na autenticação SSO/OAuth:",
        JSON.stringify(err, null, 2)
      );
    }
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.inputField, { marginBottom: 16 }]}
      />

      <TouchableOpacity
        style={defaultStyles.btn}
        onPress={() => onSelectAuth(Strategy.APPLE)}
      >
        <Text style={defaultStyles.btnText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.separatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.separtor}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View style={{ gap: 10 }}>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.GOOGLE)}
        >
          <Ionicons
            name="call-outline"
            size={24}
            color={Colors.light.grey}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.APPLE)}
        >
          <Ionicons
            name="logo-apple"
            size={24}
            color={Colors.light.grey}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.GOOGLE)}
        >
          <Ionicons
            name="logo-google"
            size={24}
            color={Colors.light.grey}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.FACEBOOK)}
        >
          <Ionicons
            name="logo-facebook"
            size={24}
            color={Colors.light.grey}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },
  separatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  separtor: {
    fontFamily: Fonts.mon.semiBold,
    color: Colors.light.grey,
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.light.grey,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "mon-sb",
  },
});

export default Login;
