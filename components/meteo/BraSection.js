import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { keepFavoriteBra } from '../../reducers/user';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import selectBraIcon from './BraIcons';

export default function braSection(props) {
  const [bra, setBra] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.user.token);

  // ajout de tous les BRA

  useEffect(() => {
    fetch(`https://sauve-ta-pow-backend.vercel.app/meteo/bra/`)
      .then((response) => response.json())
      .then((fetchdata) => {
        if (fetchdata) {
          const newBra = fetchdata.bra.map((data) => {
            const date = new Date(
              data.BULLETINS_NEIGE_AVALANCHE.DateValidite[0]
            );
            const year = date.getUTCFullYear();
            const month = date.getUTCMonth() + 1;
            var day = date.getUTCDate();
            var hour = date.getUTCHours();

            return {
              massif: data.BULLETINS_NEIGE_AVALANCHE.$.MASSIF,
              date: `${day}/${month}/${year}, ${hour}h`,
              risk: data.BULLETINS_NEIGE_AVALANCHE.CARTOUCHERISQUE[0].RISQUE[0]
                .$.RISQUE1,
            };
          });
          setBra([...newBra]);
        }
      });
  }, []);

  const handleFav = async (props) => {
    const fetchObj = {
      token: token,
      favoriteBra: props,
    };
    dispatch(keepFavoriteBra(props));
   
    const rawRes = await fetch(
      'https://sauve-ta-pow-backend.vercel.app/users/update',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fetchObj),
      }
    );
    const jsonRes = await rawRes.json();
    const { result, message } = jsonRes;
    if (!result) {
      setError("Il'y a un problème, merci de réessayer");
    } else {
      //Message d'erreur
      setError('Informations Enregistrés');
    }
  };

  const filteredBra = bra.filter(data => data.massif.toLowerCase().includes(search.toLowerCase()));


  // map sur le usestate pour afficher tous les BRA
  const mountainBra = filteredBra.map((data, i) => {
    const currentBraIcon = selectBraIcon(data.risk);


    return (
      <View key={i} style={styles.massifContainer}>
        <View style={styles.topContainer}>
          {user.favoriteBra === data.massif && (
            <FontAwesome
              name="heart"
              size={18}
              color={'red'}
              onPress={() => handleFav(data.massif)}
              style={styles.heart}
            />
          )}
          {user.favoriteBra !== data.massif && (
            <FontAwesome
              name="heart"
              size={18}
              color={'#D5D8DC'}
              onPress={() => handleFav(data.massif)}
              style={styles.heart}
            />
          )}
        </View>
        <View style={styles.iconBraContainer}>
          <Image source={currentBraIcon} style={styles.riskIcon} />
        </View>
        <View style={styles.massifNameContainer}>
          <Text style={styles.massifName}>{data.massif}</Text>
          <Text style={styles.massifName}>risk {data.risk}</Text>
          <Text style={styles.majBra}>Date de validité {data.date}</Text>
        </View>
      </View>
    );
  });



  return (
    <>
      <View style={ styles.inputView }>
        <TextInput
          style={styles.input}
          placeholder="Rechercher un massif"
          inputMode="search"
          onChangeText={(value) => setSearch(value)}
          onClearText={() => setSearch('')}
          value={search}
        />
      </View>
      <ScrollView horizontal={true}>
        <View style={styles.riskContainer}>{mountainBra}</View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  riskContainer: {
    marginTop: 30,
    marginBottom: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  massifContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8B9EAB',
    marginHorizontal: 10,
    borderRadius: 20,
    width: 200,
  },
  topContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  heart: {
    height: 20,
    width: 20,
    marginRight: 10,
    marginTop: 10,
  },
  iconBraContainer: {
    height: 100,
    width: 100,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  riskIcon: {
    height: '100%',
    width: '100%',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#fff',
    resizeMode: 'contain',
  },
  massifNameContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 30,
    marginBottom: 1,
    marginLeft: 30,
  },
  massifName: {
    color: '#fff',
    fontWeight: 900,
    fontSize: 12,
  },
  majBra: {
    color: '#fff',
    fontWeight: 100,
    fontSize: 9,
  },
  inputView: {
    zIndex: 1,
    top:-20,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#8B9EAB',
    paddingLeft: 10,
    margin: 5,
  },
});
