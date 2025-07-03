import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { defaultStyles } from "@/constants/Styles";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import * as AuthSession from "expo-auth-session";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
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

      if (createdSessionId && setActive) {
        setActive!({ session: createdSessionId });
        router.back();
      } else {
        // CASO 1: Cadastro de um novo usuário via OAuth que está completo.
        if (signUp && signUp.status === "complete" && setActive) {
          setActive({ session: signUp.createdSessionId });
          console.log("Usuário cadastrado com sucesso:", signUp);
          router.back();
          return;
        }

        // CASO 2: Cadastro via OAuth com requisitos faltando (geralmente a senha).
        if (signUp && signUp.status === "missing_requirements") {
          // Log para depuração: veja quais campos estão faltando.
          console.log("Requisitos ausentes:", signUp.missingFields);

          // Se o único requisito ausente for a senha, podemos ignorar e completar o cadastro.
          // Isso efetivamente torna a senha opcional para usuários OAuth.
          if (signUp.missingFields.includes("password")) {
            const updatedSignUp = await signUp.create({
              // Não passamos a senha, o que a torna opcional para este usuário
            });

            // Após a criação, a sessão deve estar pronta para ser ativada
            if (updatedSignUp.status === "complete" && setActive) {
              setActive({ session: updatedSignUp.createdSessionId });
              router.replace("/");
              return;
            }
          } else {
            // Se outros campos estiverem faltando, informe o usuário ou trate de outra forma.
            Alert.alert(
              "Informações Incompletas",
              `Os seguintes campos são necessários: ${signUp.missingFields.join(
                ", "
              )}`
            );
          }
        }

        // CASO 3: Login incompleto (ex: 2FA).
        else if (signIn && signIn.status === "needs_second_factor") {
          router.push({ pathname: "/verify-2fa" });
        }

        // CASO 4: Fallback para erros inesperados.
        else {
          Alert.alert(
            "Erro de Autenticação",
            "Não foi possível completar o login. Por favor, tente novamente."
          );
        }
      }
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
