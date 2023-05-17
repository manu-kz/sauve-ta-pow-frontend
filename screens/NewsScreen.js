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
import { importArticles } from '../reducers/articles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


// install react native element pour search bar 
// yarn add react-native-vector-icons
// yarn add react-native-elements


export default function NewsScreen({ navigation }) {

  const dispatch = useDispatch()

  // fetch des articles alpinismes
  useEffect(() => {
    fetch('https://sauve-ta-pow-backend.vercel.app/articles/').then((response) => response.json()).then(data => {
      // dispatch articles dans le store 
      dispatch(importArticles(data.articles))
    })
  }, []);

  // récupération données articles du store 
  const articles = useSelector((state) => state.articles.value.articles)

  const numberOfArticles = articles.length

  // map sur le fetch de get all articles alpinisme
  const allArticles = articles.map((data, i) => {
    return (
      <View key={i} style={styles.article}>
        {/* image = titre = description = en savoir + */}
        <Image style={styles.articleImage} source={{
          uri: data.urlToImage,
        }}/>
        <View style={styles.infoContainer}>
        <Text style={styles.titleArticle}>{data.title}</Text>
        <Text style={styles.plus} >En savoir plus...</Text>
        </View>
      </View>
    )
  })


  // OnChangeText pour la recherche d'articles 
  const [search, setSearch] = useState('')

  // handle la recherche d'articles
  const handleSearch = () => {
    fetch(`https://sauve-ta-pow-backend.vercel.app/articles/${search}`).then((response) => response.json()).then(data => {
      // dispatch articles dans le store 
      dispatch(importArticles(data.articles))
      setSearch('')
    })
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
              <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                  <Text style={styles.textButton}>Favoris</Text>
              </TouchableOpacity>
              <Text>{numberOfArticles} articles</Text>
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
      // flex: 1,
      padding: 25,
    },
    // top page articles
    topContainer: {
      justifyContent: 'space-around',
      // alignItems: 'center',
      marginBottom: 10,
      // height: '20%'
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
      height: 510
    },
    article: {
      marginBottom: 20
    },
    articleImage: {
      height: 200,
      borderRadius: 20,
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
    },
   });

