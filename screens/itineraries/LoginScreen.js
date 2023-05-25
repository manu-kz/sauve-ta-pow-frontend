import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView,
  Pressable,
  ImageBackground,
} from "react-native";
import LoginModal from "../../components/Connections/LoginModal";
import SignUpModal from "../../components/Connections/SignUpModal";
import { useDispatch, useSelector } from "react-redux";
import { setLoginModal } from "../../reducers/modals";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const loginModal = useSelector((state) => state.modals.loginModal);
  const signUpModal = useSelector((state) => state.modals.signUpModal);


  return (
    <ImageBackground
      source={require("../../assets/background-login.jpg")}
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
              <Text style={styles.h1}>Créer un itinéraire</Text>

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
          <View style={styles.whiteRectangle}></View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <View style={styles.whiteRectangle}></View>
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
    justifyContent: 'space-between',
  },
  h1: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    alignSelf: "flex-start",
    marginTop: "10%",
    marginLeft: "5%",
  },

  buttonShortWhite: {
    width: 143,
    height: 43,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",

    borderRadius: 100,
    marginBottom: "10%",
    marginTop: '120%'

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
   whiteRectangle: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 15,
  },
  whiteRectangle: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 15,
    position: 'absolute',
    top: '98.2%'
  }
});
