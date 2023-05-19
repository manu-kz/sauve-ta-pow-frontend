import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function SwipeItemFull() {
  return (
    <View style={styles.container}>
        <View style={styles.ligneIconContainer}>
        <View style={styles.ligneIcon}></View>
      </View>
      <Text style={styles.h2}>Planifier mon trajet</Text>
      <KeyboardAvoidingView style={styles.formContainer}>
        <View style={styles.inputSection}>
        <Image style={styles.itinaryImg}/>
        <View style={styles.inputSectionTwo}>
        <TextInput style={styles.input} placeholder="Nom de l'itinéraire" maxLength='20'/>
        <View style={styles.inputSectionThree} >
        <TextInput style={styles.inputSmall} placeholder="Participants" inputMode='numeric' />
        <TextInput style={styles.inputSmall} placeholder="Date" />
        </View>
        </View>
        </View>
        <TextInput style={styles.input} placeholder="Ajouter un membre" />
        <TextInput style={styles.input} placeholder="Ajouter un encadrant" />
        <Text style={styles.h3}>Discipline(s)</Text>
        <View style={styles.disciplinesContainer}>
          <View style={styles.discipline}></View>
          <View style={styles.discipline}></View>
          <View style={styles.discipline}></View>
          <View style={styles.discipline}></View>
        </View>
        <TouchableOpacity style={styles.buttonLong} activeOpacity={0.8}>
          <Text style={styles.textButtonWhite}>Enregistrer</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
  },
  h2: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "10%",
  },
  formContainer: {
    marginTop: '5%'
  },
  input: {
    backgroundColor: "#EDEDED",
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
  },
  disciplinesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: '5%'
  },
  disciplinesTitle: {
    marginTop: '5%'
  },
  discipline: {
    backgroundColor: "#EDEDED",
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  buttonLong: {
    width: '100%',
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8B9EAB",
    borderRadius: 50,
    marginTop: '10%'
  },
  textButtonWhite: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
  h3: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: '5%'
  },
  itinaryImg: {
    backgroundColor: "#EDEDED",
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputSectionTwo: {
    width: '65%',
  },
  inputSectionThree: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  inputSmall: {
    width: '45%',
    backgroundColor: "#EDEDED",
    padding: 10,
    borderRadius: 20,
  },
  ligneIconContainer:{
    alignItems: "center",
  },
  ligneIcon: {
    backgroundColor: "#A8A4A4",
    width: "15%",
    height: 3,
    borderRadius: 5,
  },
});
