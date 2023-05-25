import { StyleSheet, View, Text, Image } from "react-native";
import { openArticle } from "../../reducers/articles";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";

export default function ArticleDashboard(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();


  const handleEntireArticleNavigation = () => {
    dispatch(openArticle(props))
    navigation.navigate('News', { screen: 'EntireArticle' })

  }

  return (
    <View
      style={{
        ...styles.containerContentPreview,
        // top: props.top - props.top * 0.1,
      }}
    >
      <Image source={{ uri: props.urlToImage }} style={styles.articleImage} />

      <View style={styles.containertextContentPreview}>
        <Text style={styles.h4}>
          {props.title.length > 40
            ? `${props.title.slice(0, 40)} ...`
            : props.title}
        </Text>
        <Text style={styles.p}>
          {props.description.length > 70
            ? `${props.description.slice(0, 70)} ...`
            : props.description}
        </Text>
        <Text
          style={styles.knowMore}
          onPress={() => handleEntireArticleNavigation()}
        >
          En savoir plus
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  h4: {
    fontSize: 16,
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

  containerContentPreview: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: "5%",
    width: "100%",
    backgroundColor:"white",
    padding:15,
    borderRadius:30,

  },
  containertextContentPreview: {
    margin: "5%",
    maxWidth: "60%",
  
  },
  articleImage: {
    width: 130,
    height: 150,
    borderRadius: 20,
  },
});
