import { 
    StyleSheet, 
    Text, 
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
  } from 'react-native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { importBookmarks } from '../../reducers/bookmarks';
import ArticlesScreen from './ArticleScreen';
  
export default function FavorisScreen({ navigation }) {

const dispatch = useDispatch()

const token = useSelector((state) => state.user.token)

//  useEffect fetch get les favoris d'un user
useEffect(() => {
    fetch(`https://sauve-ta-pow-backend.vercel.app/bookmarks/bookmarks/${token}`).then((response) => response.json()).then(data => {
      // dispatch favoris dans le store 
      dispatch(importBookmarks(data.bookmarks))
    })
  }, []);

// récup les favoris depuis le store apres le dispatch
const bookmarks = useSelector((state) => state.bookmarks.value)

const handleArticlesNavigation = () => {
    navigation.navigate('Articles')
}

let favoris = <Text>Pas de favoris enregistrés</Text>

if(bookmarks?.length) {
    favoris = bookmarks.map((data, i) => {
        const isBookmarked = bookmarks.some(bookmark => bookmark.title === data.title);
        return (
            <ArticlesScreen key={i} {...data} isBookmarked={isBookmarked} />
        )
    })
}

// gère le texte du nombre de favoris
const numberOfFavoris = () => {
    if(bookmarks.length > 1) {
        return `${bookmarks.length} articles favoris`
    } else if(bookmarks.length === 1){
        return '1 article favori'
    } else {
        return '0 article favoris'
    }
}

return (
    <SafeAreaView style={styles.container}>
    <View style={styles.pageContainer}>
        <View style={styles.topContainer}>
            <View style={styles.backOfTop}>
                <Text style={styles.title}>Articles favoris</Text>
            </View>
            <View style={styles.bottomTop}>
              <TouchableOpacity style={styles.button} onPress={() => handleArticlesNavigation()} activeOpacity={0.8}>
                  <Text style={styles.textButton}>Articles</Text>
              </TouchableOpacity>
              <Text>{numberOfFavoris()}</Text>
            </View>
        </View>
        <View style={styles.articlesContainer}>
        <ScrollView style={styles.articlesContainer}>
        {favoris}
        </ScrollView>
        </View>
    </View>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    pageContainer: {
        padding: 25,
    },
    topContainer: {
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    backIcon: {
        marginBottom: 10,
    },
    backOfTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 20,
    },    
    articlesContainer: {
        height: 510
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
            height: '83%'
          },
          article: {
            marginBottom: 20
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