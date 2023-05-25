import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from "react-native";

import { useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import RescueBasicCard from "../components/Dashboard/RescueBasicCard";
import ArticleDashboard from "../components/Dashboard/ArticleDashboard";
import { articles } from "../../assets/rescueBasics";
import MeteoCard from "../components/Dashboard/MeteoCard";
import BraCard from "../components/Dashboard/BraCard";
export default function HomeScreen({ navigation }) {
  const username = useSelector((state) => state.user.username);
  const [news, setNews] = useState(null);

  // IMG BACKGROUND STATE
  const [heightImg, setHeightImg] = useState(0);

  // LAYOUT FUNCTION POUR IMAGE EN  BACKGROUND
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
        source={require("../../assets/Dashboard.jpg")}
        style={{backgroundColor: "white"}}
        imageStyle={{
          resizeMode: "cover",
          height: "47%",
          bottom: undefined,
        }}
      >
        <SafeAreaView />
        <ScrollView>
          <Text style={styles.h1}>Bienvenue {username ? username : ""} </Text>
          <View style={styles.cardsContainer}>
            <MeteoCard />
            <BraCard />
          </View>
          {newsArticle}
          <View style={styles.rescueTextContainer}>
            <Text style={styles.h3}>Rescue Basics</Text>
            
          </View>
          <ScrollView horizontal={true} >
            {rescueArticles}
          </ScrollView>
        </ScrollView>
      <View style={styles.whiteRectangle}></View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
 
  h1: {
    margin: 20,
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
 
  h3: {
    fontSize: 18,
    fontWeight: "bold",
  },
 
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  rescueTextContainer: {
    marginLeft: 20,
    paddingBottom :10
  },
  whiteRectangle: {
    backgroundColor: 'white',
    width: '100%',
    height: 15,
    position:"absolute",
    top:'92.4%'
  },
  

});
