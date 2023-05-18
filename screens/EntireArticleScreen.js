import { 
    StyleSheet, 
    Text, 
    View,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    Image,
    ScrollView,
  } from 'react-native';
  import { useEffect, useState } from 'react';
  import { SearchBar } from 'react-native-elements';
  import { useDispatch, useSelector } from 'react-redux';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import { useNavigation } from '@react-navigation/native';
  import { importArticles, addBookmark, removeBookmark } from '../reducers/bookmarks';

  
  export default function EntireArticlesScreen({ navigation }) {

  const article = useSelector((state) => state.articles.value.entireArticle)

   return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        <View style={styles.article}>
            <Text style={styles.title}>{article.title}</Text>
            <View style={styles.imageContainer}>
                <View style={styles.heartContainer}>
                <FontAwesome name='heart' size={15} color='#D5D8DC'/>
                </View>
                <Image style={styles.articleImage} source={{
                    uri: article.urlToImage,
                }}/>
            </View>
            <Text style={styles.date}>Date: {article.publishedAt}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.titleDescription}>Description</Text>
                <Text style={styles.content}>{article.description}</Text>
                <Text style={styles.content}>{article.content}</Text>
                <Text style={styles.date}>Source : {article.source.name}</Text>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
   );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    article: {
      marginBottom: 20,
      padding: 25,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    imageContainer: {
        marginBottom: 10,
    },
    heartContainer: {
      position: 'absolute',
      zIndex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      height: 30,
      width: 30,
      borderRadius: 30,
      marginLeft: 14,
      marginTop: 14,
    },
    articleImage: {
      height: 230,
      borderRadius: 13,
    },
    date: {
        fontStyle: 'italic',
        color: '#D5D8DC',
        fontSize: 12,
    },
    infoContainer: {
      padding: 10,
    },
    titleDescription: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 15,
    },
    content: {
        marginTop: 18,
        marginBottom: 10
    },
  })