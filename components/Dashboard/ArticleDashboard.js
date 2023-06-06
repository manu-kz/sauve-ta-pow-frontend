import { StyleSheet, View, Text, Image } from "react-native";
import { openArticle } from "../../reducers/articles";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";

export default function ArticleDashboard(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();


  // ON PRESS SHOWS THE ENTIRE ARTICLE
  const handleEntireArticleNavigation = () => {
    dispatch(openArticle(props))
    navigation.navigate('News', { screen: 'EntireArticle' })
  }

  return (
    <View
      style={{
        ...styles.containerContentPreview,
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
