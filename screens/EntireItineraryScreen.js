import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { launchItinerary } from "../reducers/launchItinerary";

export default function EntireItineraryScreen() {
  const dispatch = useDispatch();

  const [islaunched, setIslaunched] = useState(false);
  const [btnContent, setBtnContent] = useState("Commencer");

  const handleLaunchItinerary = () => {
    setIslaunched(true)
    dispatch(launchItinerary(islaunched))
    setBtnContent("Quitter");
  };
  const handleQuitItinerary = () => {
    setIslaunched(false)
    dispatch(launchItinerary(islaunched))
    setBtnContent("Commencer");
  };

  let launchBtn = {
    backgroundColor: "#FFB703",
    padding: 20,
    marginTop: "10%",
    marginBottom: "20%",
    borderRadius: 50,
    width: "50%",
    marginLeft: "25%",
  };

  if (islaunched) {
    launchBtn = {
      backgroundColor: "#F94A56",
      padding: 20,
      marginTop: "10%",
      marginBottom: "20%",
      borderRadius: 50,
      width: "50%",
      marginLeft: "25%",
    };
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.containerMargin}>
        <View style={styles.header}>
          <View style={styles.discipline}>
            <Image
              style={styles.disciplineImg}
              source={require("../assets/diciplinesIcons/snowshoe.png")}
            />
          </View>
          <View>
            <Text style={styles.h1}>Nom Itinéraire</Text>
            <Text style={styles.p}>01/01/2024 • temps estimé : 0h00</Text>
          </View>
        </View>
        <Image
          style={styles.itineraryImg}
          source={require("../assets/map.jpg")}
        />
        <Text style={styles.h2}>Informations</Text>
        <Text style={styles.p}>3 membres</Text>
        <View style={styles.peopleCardSection}>
          <View style={styles.peopleCard}>
            <Text style={styles.peopleCardContent}>
              Username <FontAwesome name="close" size={12} color="#FFFFFF" />
            </Text>
          </View>
        </View>
        <Text style={styles.p}>1 encadrant</Text>
        <View style={styles.peopleCardSection}>
          <View style={styles.peopleCard}>
            <Text style={styles.peopleCardContent}>
              Username <FontAwesome name="close" size={12} color="#FFFFFF" />
            </Text>
          </View>
        </View>
        <Text style={styles.h2}>Etapes de mon itinéraire</Text>
        <View>
          <View style={styles.iconSection}>
            <View style={styles.iconContainer}>
              <Ionicons name="location-outline" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.itineraryTextContainer}>
              <Text style={styles.h3}>Départ</Text>
              <Text style={styles.p}>Nom du lieu</Text>
            </View>
          </View>
          <View style={styles.iconSection}>
            <View style={styles.iconContainer}>
              <FontAwesome name="flag" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.itineraryTextContainer}>
              <Text style={styles.h3}>Point(s) de passage</Text>
              <Text style={styles.p}>Nom du lieu</Text>
            </View>
          </View>
          <View style={styles.iconSection}>
            <View style={styles.iconContainer}>
              <Ionicons name="location-outline" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.itineraryTextContainer}>
              <Text style={styles.h3}>Arrivée</Text>
              <Text style={styles.p}>Nom du lieu</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={launchBtn}
          onPress={islaunched ? handleQuitItinerary : handleLaunchItinerary}
        >
          <Text style={styles.btnContent}>{btnContent}</Text>
        </TouchableOpacity>
        <View style={styles.boderDecoration}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
  },
  containerMargin: {
    padding: "5%",
  },
  h1: {
    fontSize: 32,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 26,
    fontWeight: "bold",
  },
  h3: {
    fontSize: 20,
    fontWeight: "bold",
  },
  p: {
    fontSize: 16,
  },
  header: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  discipline: {
    backgroundColor: "#8B9EAB",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "3%",
  },
  disciplineImg: {
    width: 40,
    height: 40,
  },
  itineraryImg: {
    borderRadius: 10,
    marginTop: "5%",
    width: "100%",
    height: 140,
    marginBottom: "5%",
  },
  peopleCardSection: {
    flexDirection: "row",
    marginTop: "2%",
    marginBottom: "5%",
  },
  peopleCard: {
    backgroundColor: "#8B9EAB",
    padding: 15,
    borderRadius: 50,
  },
  peopleCardContent: {
    color: "#FFFFFF",
  },
  iconSection: {
    flexDirection: "row",
    marginTop: "5%",
  },
  iconContainer: {
    padding: 15,
    backgroundColor: "#8B9EAB",
    borderRadius: 50,
  },
  itineraryTextContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
  btnContent: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  boderDecoration: {
    borderLeftWidth: 2,
    borderColor: "#8B9EAB",
    position: "absolute",
    width: "100%",
    height: "20%",
    top: "60%",
    left: "6.3%",
    zIndex: -1,
  },
});
