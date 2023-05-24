import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { launchItinerary } from "../reducers/launchItinerary";
import CallModal from "../components/CallModal";
import { showCallModal } from "../reducers/modals";


import moment from "moment";

export default function EntireItineraryScreen() {

  const dispatch = useDispatch();
  const callModal = useSelector((state) => state.modals.callModal);


  const [islaunched, setIslaunched] = useState(false);
  const [btnContent, setBtnContent] = useState("Commencer");
  
  const handleLaunchItinerary = () => {
    setIslaunched(!islaunched)
  };

  
  useEffect(() => {
    if (islaunched) {
      dispatch(launchItinerary(islaunched))
      setBtnContent("Quitter");
    } else {
      dispatch(launchItinerary(islaunched))
      setBtnContent("Commencer");
    }
  }, [islaunched]); 
  


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
  
  // handle information from reducer
  const myItinerary = useSelector((state) => state.itineraries.value)
  
  // faire map sur les noms de membre participants
  const members = myItinerary.members.map((data, i) => {
    return (
      <View style={styles.peopleCard}>
        <Text style={styles.peopleCardContent} key={i}>
          {data} <FontAwesome name="close" size={12} color="#FFFFFF" />
        </Text>
      </View>
    )
  })

  // handle waypoints 
  const [ isWaypoints, setIsWaypoints ] = useState(false)
  const waypointsName = myItinerary.waypointsName

  // check si il y a des waypoints
  useEffect(() => {
    if(myItinerary.waypointsName.length) {
      setIsWaypoints(true)
    }
  }, []);

  // ajout de waypoints sur la page
  const allWaypoints = waypointsName.map((data, i) => {
    return (
      <View style={styles.iconSection} key={i}>
        <View style={styles.iconContainer}>
          <FontAwesome name="flag" size={20} color="#FFFFFF" />
        </View>
        <View style={styles.itineraryTextContainer}>
          <Text style={styles.h3}>Point de passage {1}</Text>
          <Text style={styles.p}>{data}</Text>
        </View>
      </View>
    )
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.containerMargin}>
      <CallModal/>
        <View style={styles.header}>
          <View style={styles.discipline}>
            <Image
              tintColor='white'
              style={styles.disciplineImg}
              source={require("../assets/diciplinesIcons/snowshoe.png")}
            />
          </View>
          <View>
            <Text style={styles.h1}>{myItinerary.itineraryName}</Text>
            <Text style={styles.p}>{moment(myItinerary.date).format('DD/MM/YYYY')} • temps estimé : {myItinerary.time}</Text>
          </View>
        </View>
        <Image
          style={styles.itineraryImg}
          source={require("../assets/map.jpg")}
        />
        <Text style={styles.h2}>Informations</Text>
        <Text style={styles.p}>{myItinerary.membersNumber} membre(s)</Text>
        <View style={styles.peopleCardSection}>
            {members}
        </View>
        <Text style={styles.p}>1 encadrant</Text>
        <View style={styles.peopleCardSection}>
          <View style={styles.peopleCard}>
            <Text style={styles.peopleCardContent}>
              {myItinerary.supervisor} <FontAwesome name="close" size={12} color="#FFFFFF" />
            </Text>
          </View>
        </View>
        <Text style={styles.h2}>Etapes de mon itinéraire</Text>
        <View style={styles.trajetContainer}>
          <View style={styles.iconSection}>
            <View style={styles.iconContainer}>
              <Ionicons name="location-outline" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.itineraryTextContainer}>
              <Text style={styles.h3}>Départ</Text>
              <Text style={styles.p}>{myItinerary.departureName}</Text>
            </View>
          </View>
          {/* condition si points de passages les afficher */}
          {isWaypoints && allWaypoints}
          <View style={styles.iconSection}>
            <View style={styles.iconContainer}>
              <Ionicons name="location-outline" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.itineraryTextContainer}>
              <Text style={styles.h3}>Arrivée</Text>
              <Text style={styles.p}>{myItinerary.arrivalName}</Text>
            </View>
          </View>
          <View style={styles.boderDecoration}></View>
        </View>
        <TouchableOpacity
          style={launchBtn}
          onPress={
            handleLaunchItinerary}
        >
          <Text style={styles.btnContent}>{btnContent}</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.whiteRectangle}>

      </View>
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
    flexDirection: 'row',
    marginRight: 10,
    height: 50,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  peopleCardContent: {
    color: "#FFFFFF",
  },
  trajetContainer: {
    marginTop: 10,

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
    // height: "20%",
    // top: "5%",
    // bottom: '10%',
    left: "7%",
    zIndex: -1,
    marginTop: 18,
    height: '80%',
  },
  whiteRectangle: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 15,
  }
});
