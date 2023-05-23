import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView,
  Pressable,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import LoginModal from "../components/Connections/LoginModal";
import SignUpModal from "../components/Connections/SignUpModal";
import { useDispatch, useSelector } from "react-redux";
import { setLoginModal } from "../reducers/modals";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const loginModal = useSelector((state) => state.modals.loginModal);
  const signUpModal = useSelector((state) => state.modals.signUpModal);

  console.log("loginModals / signUpModals", loginModal, signUpModal);

  return (
    <ImageBackground
      source={require("../assets/background-login.jpg")}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <View>
                <Text style={styles.h1}>Créer un itinéraire</Text>
                <Text style={styles.h4}>
                  Pour accéder à toutes les fonctionnalitées de l'application,
                  merci de vous inscrire à Sauve ta Pow
                </Text>
                </View>
              {!loginModal && !signUpModal && (
                <Pressable
                  style={styles.buttonShortWhite}
                  activeOpacity={0.8}
                  onPress={() => dispatch(setLoginModal(true))}
                >
                  <Text style={styles.textButtonGrey}>Log In</Text>
                </Pressable>
              )}
              {loginModal && <LoginModal style={styles.modal} />}
              {signUpModal && <SignUpModal />}
            </>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  h1: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    alignSelf: "flex-start",
    marginTop: "10%",
    marginLeft: "5%",
  },
  h4: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginRight:"10%"
  },

  buttonShortWhite: {
    width: 143,
    height: 43,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 100,
    marginBottom: "10%",

  },
  textButtonGrey: {
    color: "#8B9EAB",
    fontWeight: "700",
    fontSize: 16,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
