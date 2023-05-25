import { StyleSheet, View, Modal,TouchableWithoutFeedback,Keyboard } from "react-native";
import SignUpForm from "./SignUpForm";
import HealthForm from "./HealthForm";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { setSignUpModal } from "../../reducers/modals";

export default function SignUpModal({ navigation }) {
  //USE STATE MODALS
  const dispatch = useDispatch();
  const signUpModal = useSelector((state) => state.modals.signUpModal);
  const showHealthForm = useSelector((state) => state.modals.healthForm);

  //SIGN UP MODAL
  return (
    <Modal animationType="slide" transparent={true} visible={signUpModal}>
       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.modalView}>
        {!showHealthForm && (
          <FontAwesome
            name="close"
            size={20}
            color="#D5D8DC"
            style={styles.cross}
            onPress={() => dispatch(setSignUpModal(false))}
          />
        )}

        {!showHealthForm ? <SignUpForm /> : <HealthForm />}
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: "5%",
    marginTop: "20%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 28,
    justifyContent: "space-evenly",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  centeredVertical: {
    flex: 1,
    justifyContent: "center",
  },

  //INSIDE MODAL
  cross: {
    alignSelf: "flex-end",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
