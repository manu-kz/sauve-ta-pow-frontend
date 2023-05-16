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
import { importArticles, importNumber } from '../reducers/articles';


// install react native element pour search bar 
// yarn add react-native-vector-icons
// yarn add react-native-elements


export default function NewsScreen({ navigation }) {

  const dispatch = useDispatch()
  // fetch des articles alpinismes
  useEffect(() => {
    fetch('http://10.0.1.87:3000/articles/').then((response) => response.json()).then(data => {
      // console.log(data.number)
      // dispatch articles dans le store 
      dispatch(importArticles(data.articles))
      dispatch(importNumber(data.number))
    })
  }, []);

  // récupération données articles du store 
  const {articles, number} = useSelector((state) => state.articles.value)
  console.log(articles.length)
  const allArticles = articles.map((data, i) => {
    return (
      <View key={i} style={styles.article}>
        {/* image = titre = description = en savoir + */}
        <Image style={styles.articleImage} source={{
          uri: data.urlToImage,
        }}/>
        <Text>{data.title}</Text>
        <Text>{data.description}</Text>
      </View>
    )
  })
  // OnChangeText pour la recherche d'articles 
  // Faire route avec un body qui vient modif l'url de la recherche
  // const [search, setSearch] = useState('')

  // const updateSearch = (search) => {
  //   setSearch(search)
    // fetch get avec params de search
  // }

  // map sur le fetch de get all articles alpinisme

 return (
  <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.pageContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.title}>Articles</Text>
              <SearchBar
              placeholder="Recherche..."
              // onChangeText={setSearch}
              // value={search}
              containerStyle={styles.searchBar}
              lightTheme={true}
              platform='android'
              placeholderTextColor='#D6DBDF'
              
              />
            <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>Favoris</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.articlesContainer}>
            <ScrollView style={styles.articlesContainer}>
              {allArticles}
            </ScrollView>
          </View>
          {/* button favoris vers nouveau composant favoris */}
          {/* nombres articles */}
          {/* liste articles */}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </SafeAreaView>
 );
}

// changer les couleurs des fond et buttons
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    title: {
      fontSize: 35,
      fontWeight: 'bold',
    },
    pageContainer: {
      padding: 30,
    },
    topContainer: {
      height: '20%',
      // backgroundColor: 'pink',
      justifyContent: 'space-around',
      marginBottom: 10,
    },
    searchBar: {
      width: '100%',
      backgroundColor: 'white',
      borderColor: '#D5D8DC',
      borderWidth: 2,
      borderRadius: 25,
      height: 40,
      justifyContent: 'center',
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
    articlesContainer: {
      // height: 200
    },
    article: {
      marginBottom: 20
    },
    articleImage: {
      height: 200,
      borderRadius: 20,
    }
   });
{/* .btn{

font-family: Roboto, sans-serif;
font-weight: 0;
font-size: 14px;
color: #566573;
background-color: #D5D8DC;
padding: 10px 30px;
border: solid #D5D8DC 2px;
box-shadow: rgb(0, 0, 0) 0px 0px 0px 0px;
border-radius: 50px;
transition : 1000ms;
transform: translateY(0);
display: flex;
flex-direction: row;
align-items: center;
cursor: pointer;
}

.btn:hover{

transition : 1000ms;
padding: 10px 39px;
transform : translateY(-0px);
background-color: #566573;
color: #ffffff;
border: solid 2px #566573;
} */}

