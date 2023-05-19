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
  import { openArticle } from '../reducers/articles';

  // { navigation, ...props }
  export default function ArticlesScreen(props) {
  
  const dispatch = useDispatch()

  const navigation = useNavigation()
  
  // mettre article en bookmark avec gestion de la couleur de l'icon
  const handleBookmark = (props) => {
    const token = '76afn7z1YQxKnV_hZt_nWY4oaSlmi50n'
    if(props.isBookmarked) {
      fetch(`http://10.0.1.87:3000/bookmarks/deleteBookmark/${token}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(props)
      }).then((response) => response.json()).then(data => {
        dispatch(removeBookmark(data.bookmark))
      })
    } else {
      console.log('else')
      fetch(`http://10.0.1.87:3000/bookmarks/newBookmark/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(props)
      }).then((response) => response.json()).then(data => {
        console.log('data articles apres fetch ==> ', data.bookmark)
        dispatch(addBookmark(data.bookmark))
      })
    }
  }


  const handleEntireArticleNavigation = () => {
    dispatch(openArticle(props))
    navigation.navigate('EntireArticle')
  }

  let heartColor = '#D5D8DC'
  if(props.isBookmarked) {
    heartColor = 'red'
  } 

   return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => handleEntireArticleNavigation()} activeOpacity={0.8}>
        <View style={styles.article}>
          {/* image = titre = description = en savoir + */}
          <View style={styles.heartContainer}>
            <FontAwesome name='heart' size={18} color={heartColor} onPress={() => handleBookmark(props)} />
          </View>
            <Image style={styles.articleImage} source={{
              uri: props.urlToImage,
            }}/>
          <View style={styles.infoContainer}>
          <Text style={styles.titleArticle}>{props.title}</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.plus}>En savoir plus...</Text>
          </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
   );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EAECEE',
      borderRadius: 20,
      marginBottom: 10,
      shadowColor: 'black',
      shadowOpacity: 0.30,
      shadowOffset: { width: 1, height: 2},
      shadowRadius: 5,
      elevation: 3,
      backgroundColor: 'white',
      margin: 4,
    },
    article: {
      marginBottom: 20,
    },
    articleImage: {
      height: 200,
      borderRadius: 20,
    },
    heartContainer: {
      position: 'absolute',
      zIndex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      height: 35,
      width: 35,
      borderRadius: 30,
      marginLeft: 10,
      marginTop: 10,
    },
    infoContainer: {
      padding: 10,
    },
    titleArticle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    plus: {
      fontWeight: 'bold',
      color: '#D5D8DC',
    },
  })