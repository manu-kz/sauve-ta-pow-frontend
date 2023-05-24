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
import { importArticles, openArticle } from '../reducers/articles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// pour naviguer soit vers un article soit vers nos favoris
import { useNavigation } from '@react-navigation/native';
import ArticlesScreen from './ArticleScreen';


export default function NewsScreen() {

  const dispatch = useDispatch()
  const testBookmarks  = useSelector((state) => state.bookmarks.value)


  //  ---------------------------------------- AFFICHAGE DE LA PAGE DES ARTICLES --------------------------------------------

  // fetch des articles alpinismes
  useEffect(() => {
    fetch('http://10.0.1.87:3000/articles/').then((response) => response.json()).then(data => {
      // dispatch articles dans le store 
      dispatch(importArticles(data.articles))
    })
  }, []);

  // récupération données articles du store 
  const articles = useSelector((state) => state.articles.value.articles)

  // nombre d'articles du useSelector 
  // const numberOfArticles = articles.length

  // bookmarks store
  const bookmarks = useSelector((state) => state.bookmarks.value);  

  // map sur le fetch de get all articles alpinisme
  const allArticles = articles.map((data, i) => {
    // vérifie si article bookmark 
    const isBookmarked = bookmarks?.some(bookmark => bookmark.title === data.title);
    return (
       <ArticlesScreen key={i} {...data} isBookmarked={isBookmarked}/>
    )
  })

  // OnChangeText pour la recherche d'articles 
  const [search, setSearch] = useState('')

  // handle la recherche d'articles
  const handleSearch = () => {
    fetch(`http://10.0.1.87:3000/articles/${search}`).then((response) => response.json()).then(data => {
      // dispatch articles dans le store 
      dispatch(importArticles(data.articles))
      setSearch('')
    })
  }

  const navigation = useNavigation()

  // affichage page
  const handleFavorisNavigation = () => {
    // navigation vers le screen favoris
    navigation.navigate('Favoris')
  }
  
  const numberOfArticles = () => {
    if(articles.length > 1) {
        return `${articles.length} articles`
    } else if(articles.length = 1){
        return '1 article'
    } else {
        return '0 article'
    }
}

 return (
  <SafeAreaView style={styles.container}>
    <View style={styles.pageContainer}>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.topContainer}>
            <Text style={styles.title}>Articles</Text>
            <View style={styles.inputContainer}>
              <FontAwesome name='search' size={20} color='#D5D8DC' style={styles.searchIcon} />
              <TextInput
              placeholder="Recherche..."
              onChangeText={(value) => setSearch(value)}
              value={search}
              style={styles.inputSearch}
              inputMode='search'
              onSubmitEditing={() => handleSearch()}
              />
            </View>
            <View style={styles.bottomTop}>
              <TouchableOpacity style={styles.button} onPress={() => handleFavorisNavigation()} activeOpacity={0.8}>
                  <Text style={styles.textButton}>Favoris</Text>
              </TouchableOpacity>
              <Text>{numberOfArticles()}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View style={styles.articlesContainer}>
        <ScrollView style={styles.articlesContainer}>
          {allArticles}
        </ScrollView>
      </View>
    </View>
  </SafeAreaView>
 );
}

// changer les couleurs des fond et buttons
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    pageContainer: {
      padding: 15,
    },

    // top page articles
    topContainer: {
      justifyContent: 'space-around',
      marginBottom: 10,
      padding: 5,
    },
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      height: 40,
      alignItems: 'center',
      borderColor: '#D5D8DC',
      borderWidth: 2,
      borderRadius: 25,
      paddingLeft: 10,
      marginBottom: 20
    },
    searchIcon: {
      marginRight: 5,
    },
    inputSearch: {
      width: '100%'
    },
    bottomTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    button: {
      backgroundColor: '#D5D8DC',
      justifyContent: 'center', 
      alignItems: 'center',
      borderRadius: 50,
      width: 90,
      height: 40,
    },
    textButton: {
      fontSize: 14,
      color: '#566573',
    },

    // article container
    articlesContainer: {
      height: '72%'
    },
   });

