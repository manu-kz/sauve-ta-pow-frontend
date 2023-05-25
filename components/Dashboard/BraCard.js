import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import selectBraIcon from "../meteo/BraIcons";

export default function BraCard() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //BRA IN REDUCER : To Lower Case for the fetch
  const { favoriteBra, token } = useSelector((state) => state.user);
  const braName = favoriteBra ? favoriteBra.toLowerCase() : favoriteBra;

  //USE STATE FOR SAVE BRA DATA
  const [braData, setBraData] = useState({});
  const { massif, date, braIcon, risk } = braData;

  //GET DATA OF FAVORITE BRA

  useEffect(() => {
    if (braName) {
      const fetchData = async () => {
        const rawRes = await fetch(
          `https://sauve-ta-pow-backend.vercel.app/meteo/bra/${braName}`
        );
        const jsonRes = await rawRes.json();
        const { bra } = jsonRes;

        const newDate = new Date(bra.BULLETINS_NEIGE_AVALANCHE.DateValidite[0]);
        const year = newDate.getUTCFullYear();
        const month = newDate.getUTCMonth() + 1;
        var day = newDate.getUTCDate();
        var hour = newDate.getUTCHours();

        setBraData({
          massif: bra.BULLETINS_NEIGE_AVALANCHE.$.MASSIF,
          date: `${day}/${month}/${year}, ${hour}h`,
          braIcon: selectBraIcon(
            bra.BULLETINS_NEIGE_AVALANCHE.CARTOUCHERISQUE[0].RISQUE[0].$.RISQUE1
          ),
          risk: bra.BULLETINS_NEIGE_AVALANCHE.CARTOUCHERISQUE[0].RISQUE[0].$
            .RISQUE1,
        });
      };

      fetchData();
    }
  }, [braName]);

  //NAVIGATION TO METEO

  const handleMeteoNavigation = () => {
    token ? navigation.navigate("Meteo") : navigation.navigate("Login");
  };
  
  return (
    <View style = {styles.view}>
    <BlurView intensity={30} style={styles.braCard}>
      <LinearGradient
        colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.2)"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        useAngle
        angle={110}
        style={styles.card}
      >
        <Pressable onPress={() => handleMeteoNavigation()}>
          {!token && (
            <Text style={styles.massifName}>
              Clickez pour vous connecter...
            </Text>
          )}
          {token && Object.keys(braData).length == 0 && (
            <Text style={styles.massifName}>
              Clickez et selectionnez un massif favoris
            </Text>
          )}
          {token && Object.keys(braData).length > 0 && (
            <>
              <Image source={braIcon} style={styles.riskIcon} />
              <View style={styles.massifNameContainer}>
                <Text style={styles.massifName}>{massif}</Text>
                <Text style={styles.massifName}>Risk {risk}</Text>
                <Text style={styles.majBra}>{date}</Text>
              </View>
            </>
          )}
        </Pressable>
      </LinearGradient>
    </BlurView>
    </View>
   
  );
}

const styles = StyleSheet.create({
  view:{
    width: "35%",
    height: 160,
    marginBottom: 20,
    overflow:"hidden",
    borderRadius: 30,
  },
  braCard: {
    width: "100%",
    height: 160,
    marginBottom: 20,
  },
  card: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  ///
  riskIcon: {
    height: 80,
    width: 80,
    alignSelf: "center",
  },

  massifNameContainer: {
    width: "100%",
    alignItems: "center",
  },
  massifName: {
    color: "#fff",
    fontWeight: 800,
    fontSize: 12,
  },
  majBra: {
    color: "#fff",
    fontWeight: 300,
    fontSize: 9,
  },
});
