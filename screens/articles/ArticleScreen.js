import { 
    StyleSheet, 
    Text, 
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import { useDispatch, useSelector } from 'react-redux';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import { useNavigation } from '@react-navigation/native';
  import { addBookmark, removeBookmark } from '../../reducers/bookmarks';
  import { openArticle } from '../../reducers/articles';

  export default function ArticlesScreen(props) {
  
  const dispatch = useDispatch()

  const navigation = useNavigation()
  const token = useSelector((state) => state.user.token)
  
  // mettre article en bookmark avec gestion de la couleur de l'icon
  const handleBookmark = (props) => {
    if(props.isBookmarked) {
      fetch(`https://sauve-ta-pow-backend.vercel.app/bookmarks/deleteBookmark/${token}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(props)
      }).then((response) => response.json()).then(data => {
        dispatch(removeBookmark(data.bookmark))
      })
    } else {
      fetch(`https://sauve-ta-pow-backend.vercel.app/bookmarks/newBookmark/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(props)
      }).then((response) => response.json()).then(data => {
        dispatch(addBookmark(data.bookmark))
      })
    }
  }

  let heartColor = '#D5D8DC'
  if(props.isBookmarked) {
    heartColor = 'red'
  } 

  const handleEntireArticleNavigation = () => {
    dispatch(openArticle(props))
    navigation.navigate('EntireArticle')
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
      backgroundColor: '#FFFFFF',
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
      color: '#8B9EAB',
    },
  })