import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { useEffect, useState } from 'react';
import selectBraIcon from './BraIcons';

export default function braSection() {
  const [bra, setBra] = useState([]);

  // ajout de tous les BRA

  useEffect(() => {
    fetch(`http://10.0.2.110:3000/meteo/bra/`)
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

  // map sur le usestate pour afficher tous les BRA
  const mountainBra = bra.map((data, i) => {
    const currentBraIcon = selectBraIcon(data.risk);

    return (
      <View key={i} style={styles.massifContainer}>
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
      <ScrollView horizontal={true}>
        <View style={styles.riskContainer}>{mountainBra}</View>
      </ScrollView>
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
    width: 150,
  },
  iconBraContainer: {
    height: 150,
    width: 150,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  riskIcon: {
    height: '80%',
    width: '80%',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#fff',
    resizeMode: 'contain',
  },
  massifNameContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingLeft: 10,
    marginTop: 10,
  },
  massifName: {
    color: '#fff',
    fontWeight: 900,
  },
  majBra: {
    color: '#fff',
    fontWeight: 100,
    fontSize: 9,
  },
});
