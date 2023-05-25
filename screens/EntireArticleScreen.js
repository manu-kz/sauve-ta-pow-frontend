import { 
    StyleSheet, 
    Text, 
    View,
    Image,
    ScrollView,
  } from 'react-native';
  import { useDispatch, useSelector } from 'react-redux';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import { addBookmark, removeBookmark } from '../reducers/bookmarks';
  import moment from 'moment';

  
  export default function EntireArticlesScreen({ navigation }) {

  const dispatch = useDispatch()

  const article = useSelector((state) => state.articles.value.entireArticle)
  const bookmarks = useSelector((state) => state.bookmarks.value)
  const token = useSelector((state) => state.user.token)
  
  // ajoute ne favoris deuis l'article en entier
  const handleBookmark = (article) => {
    article.isBookmarked = !article.isBookmarked
    const isBookmarked = bookmarks?.some(bookmark => bookmark.title === article.title);
    if(isBookmarked) {
      fetch(`https://sauve-ta-pow-backend.vercel.app/bookmarks/deleteBookmark/${token}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
      }).then((response) => response.json()).then(data => {
        dispatch(removeBookmark(data.bookmark))
      })
    } else {
      fetch(`https://sauve-ta-pow-backend.vercel.app/bookmarks/newBookmark/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
      }).then((response) => response.json()).then(data => {
        heartColor = '#D5D8DC'
        dispatch(addBookmark(data.bookmark))
      })
    } 
  }
  
  // change la couleur du like 
  let heartColor = '#D5D8DC'
  if(article.isBookmarked) {
    heartColor = 'red'
  }

  const handleGoBack = () => {
    navigation.navigate('Articles')
  }


   return (
     <View style={styles.entireArticle}>
        <View style={styles.imageContainer}>
          <View style={styles.iconsArticle}>
              <View style={styles.heartContainer}>
              <FontAwesome name='angle-left' size={30} color='#D5D8DC' onPress={() => handleGoBack()}/>
              </View>
              <View style={styles.heartContainer}>
              <FontAwesome name='heart' size={15} color={heartColor} onPress={() => handleBookmark(article)}/>
              </View>
          </View>
            <Image style={styles.articleImage} source={{
              uri: article.urlToImage,
            }}/>
        </View>
        <ScrollView style={styles.articleContainer}>
            <Text style={styles.title}>{article.title}</Text>
            <Text style={styles.date}>Date: {moment(article.publishedAt).format('DD/MM/YYYY')}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.titleDescription}>Description</Text>
                <Text style={styles.content}>{article.description}</Text>
                <Text style={styles.content}>{article.content}</Text>
                <Text style={styles.date}>Auteur.ice : {article.author} </Text>
            </View>
        </ScrollView>
      </View>
   );
  }

  const styles = StyleSheet.create({
    entireArticle: {
      flex: 1,
    },
    imageContainer: {
      shadowColor: 'black',
      shadowOpacity: 0.25,
      shadowOffset: { width: 1, height: 2},
      shadowRadius: 5,
      elevation: 3,
    },
    articleImage: {
      height: 300,
      borderRadius: 10,
    },
    heartContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      height: 30,
      width: 30,
      borderRadius: 30,
    },
    iconsArticle: {
      position: 'absolute',
      zIndex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      padding: 20,
      marginTop: 30,
    },
    articleContainer: {
      padding: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    date: {
        fontStyle: 'italic',
        color: '#D5D8DC',
        fontSize: 12,
    },
    infoContainer: {
      padding: 13,
      shadowColor: 'black',
      shadowOpacity: 0.10,
      shadowOffset: { width: 1, height: 1},
      shadowRadius: 5,
      elevation: 2,
      backgroundColor: 'white',
      borderRadius: 15,
      marginTop: 10,
      marginBottom: 40,
      zIndex: 0,
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