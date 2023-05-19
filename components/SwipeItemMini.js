import {
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function SwipeItemMini() {
  return (
    <View style={styles.container}>
      <View style={styles.ligneIconContainer}>
        <View style={styles.ligneIcon}></View>
      </View>
      <Text style={styles.h2}>Planifier mon trajet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
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
  h2: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "10%",
  },
});
