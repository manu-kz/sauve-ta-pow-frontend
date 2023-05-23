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

import { useRef, useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import RescueBasicCard from "../components/Dashboard/RescueBasicCard";
import ArticleDashboard from "../components/Dashboard/ArticleDashboard";
import { articles } from "../assets/rescueBasics";

export default function HomeScreen({ navigation }) {
  const username = useSelector((state) => state.user.username);
  const [news, setNews] = useState(null);

  // IMG BACKGROUND STATE
  const [heightImg, setHeightImg] = useState(0);

  //LAYOUT FUNCTION POUR IMAGE EN  BACKGROUND
  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setHeightImg(height);
  };

  //FETCH LE PREMIER ARTICLE

  useEffect(() => {
    // declare the data fetching function
    const fetchNews = async () => {
      const rawRes = await fetch(
        "https://sauve-ta-pow-backend.vercel.app/articles/"
      );
      const jsonRes = await rawRes.json();
      setNews(jsonRes.articles.slice(0, 1));
    };

    fetchNews().catch(console.error);
  }, []);


  const newsArticle =
    news &&
    news.map((data, i) => {
      return (
        <ArticleDashboard
          key={i}
          top={heightImg}
          author={data.author}
          title={data.title}
          description={data.description}
          content={data.content}
          publishedAt={data.publishedAt}
          urlToImage={data.urlToImage}
        />
      );
    });

  //MAPPING ON RESCUE BASICS TO CREATE CARDS
  const rescueArticles = articles.map((data, i) => {
    return (
      <RescueBasicCard
        key={i}
        bigTitle={data.bigTitle}
        description={data.description}
        paragraphes={data.paragraphes}
        img={data.img}
        num={data.num}
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
      {newsArticle}

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
