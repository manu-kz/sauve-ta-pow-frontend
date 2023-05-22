import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from "react-native";

import { useRef, useState } from "react";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import RescueBasicCard from "../components/RescueBasicCard";
import { articles } from "../assets/rescueBasics";

export default function HomeScreen({ navigation }) {
  const username = useSelector((state) => state.user.username);

  // IMG BACKGROUND STATE
  const [heightImg, setHeightImg] = useState(0);

  //LAYOUT FUNCTION IMG BACKGROUND
  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setHeightImg(height);
  };

  //MAP RESCUE BASICS

  const rescueArticles = articles.map((data, i) => {
    return (
      <RescueBasicCard
        key={i}
        bigTitle={data.bigTitle}
        description={data.description}
        paragraphes={data.paragraphes}
        img={data.img}
        num = {data.num}
      />
    );
  });

  return (
    <>
      <ImageBackground
        source={require("../assets/Dashboard.jpg")}
        style={styles.imgBackground}
        resizeMode="cover"
        onLayout={onLayout}
      >
        <SafeAreaView />
        <Text style={styles.h1}>Welcome {username ? username : ""} </Text>
        <View style={styles.cardsContainer}>
          <BlurView intensity={30} style={styles.weatherCard}>
            <LinearGradient
              colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.2)"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              useAngle
              angle={110}
              style={styles.card}
            />
          </BlurView>
          <BlurView intensity={30} style={styles.braCard}>
            <LinearGradient
              colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.2)"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              useAngle
              angle={110}
              style={styles.card}
            />
          </BlurView>
        </View>
      </ImageBackground>
      <View
        style={{
          ...styles.containerContentPreview,
          top: heightImg - heightImg * 0.1,
        }}
      >
        <Image source={require("../assets/card-exemple-img.png")} />
        <View style={styles.containertextContentPreview}>
          <Text style={styles.h3}>Title</Text>
          <Text style={styles.p}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit aute irure
            dolor in reprehenderit...
          </Text>
          <Text style={styles.knowMore}>En savoir plus</Text>
        </View>
      </View>

      <ScrollView horizontal={true} style={styles.rescueBasic}>
        {rescueArticles}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  imgBackground: {},
  h1: {
    margin: 20,
    color: "white",
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
    fontSize: 13,
  },
  knowMore: {
    color: "#8B9EAB",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  weatherCard: {
    width: "45%",
    height: 150,
    marginBottom: 50,
  },
  braCard: {
    width: "35%",
    height: 150,
    marginBottom: 50,
  },

  card: {
    borderRadius: 30,
    height: "100%",
    width: "100%",
  },

  containerContentPreview: {
    position: "absolute",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: "5%",
    width: "80%",
  },
  containertextContentPreview: {
    marginLeft: "5%",
    width: "80%",
  },
  rescueBasic: {
    marginTop: 160,
  },
});
