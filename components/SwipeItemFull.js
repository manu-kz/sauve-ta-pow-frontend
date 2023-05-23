import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import React, { useState } from "react";

import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function SwipeItemFull() {
  const [itineraryName, setItineraryName] = useState("");
  const [numberParticipants, setNumberParticipants] = useState(0);
  const [members, setmembers] = useState([]);
  const [supervisor, setSupervisor] = useState([]);
  
  const today = moment().format('DD-MM-YYYY');
  
  
  // handle click on a discipline
  const [hike, setHike] = useState(false);
  const [snowshoe, setSnowshoe] = useState(false);
  const [mountaineering, setMountaineering] = useState(false);
  const [ski, setSki] = useState(false);
  const [snowBoard, setSnowBoard] = useState(false);
  const [ discipline, setDiscipline ] = useState('')
  
  // fonction qui passe les state a true si discipline selectionnée
  const handleDiscipline = (discipline) => {
    if(discipline === 'hike') {
      setHike(!hike)
    } else if(discipline === 'snowshoe') {
      setSnowshoe(!snowshoe)
    } else if(discipline === 'mountaineering') {
      setMountaineering(!mountaineering)
    } else if(discipline === 'ski') {
      setSki(!ski)
    } else if(discipline === 'snowboard') {
      setSnowBoard(!snowBoard)
    }
    setDiscipline(discipline)
  }
  // set les style a gris
  let styleDisciplicehike = {
    backgroundColor: "#EDEDED",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  }
  let styleDisciplicesnowshoe = {
    backgroundColor: "#EDEDED",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  }
  let styleDisciplicemountaineering = {
    backgroundColor: "#EDEDED",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  }
  let styleDiscipliceski = {
    backgroundColor: "#EDEDED",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  }
  let styleDisciplicesnowBoard = {
    backgroundColor: "#EDEDED",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  }
  // change le style des disciplines si selectionnée
  if(hike) {
    styleDisciplicehike = {
      backgroundColor: "#FFB703",
      width: 60,
      height: 60,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    }
  } else if(snowshoe) {
    styleDisciplicesnowshoe = {
      backgroundColor: "#FFB703",
      width: 60,
      height: 60,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    }  
  } else if(mountaineering) {
    styleDisciplicemountaineering = {
      backgroundColor: "#FFB703",
      width: 60,
      height: 60,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    }  
  } else if(ski) {
    styleDiscipliceski = {
      backgroundColor: "#FFB703",
      width: 60,
      height: 60,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    }  
  } else if(snowBoard) {
    styleDisciplicesnowBoard = {
      backgroundColor: "#FFB703",
      width: 60,
      height: 60,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    }  
  } 
  
  // handle date picker 
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };
  
  // save dans la db et set le reducer itinerary a une array vide après
  // faire le fetch post en changeant les input de string a number car textInput n'accepte pas les number 
  const handleSubmit = () => {
    console.log(itineraryName, numberParticipants, date, members, supervisor, discipline);
  };
  
  const handleSaveitinerary = () => {
    // fetch post de l'itinéraire après avoir useSelector les premières infos 
  }
  

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.ligneIconContainer}>
        <View style={styles.ligneIcon}></View>
      </View>
      <Text style={styles.h2}>Planifier mon trajet</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputSection}>
            <Image style={styles.itinaryImg} />
            <View style={styles.inputSectionTwo}>
              <TextInput
                style={styles.input}
                placeholder="Nom de l'itinéraire"
                inputMode = 'text'
                // maxLength="20"
                onChangeText={(value) => setItineraryName(value)}
                value={itineraryName}
              />
              <View style={styles.inputSectionThree}>
                <TextInput
                  style={styles.inputSmall}
                  placeholder="Participants"
                  inputMode="numeric"
                  onChangeText={(value) => setNumberParticipants(value)}
                  value={numberParticipants}
                />
                <View style={styles.dateInput}>
                  <DateTimePicker
                      testID='dateTimePicker'
                      value={date}
                      mode='date'
                      is24Hour={true}
                      onChange={onChange}
                      style={styles.datePicker}
                  />
                </View>
              </View>
            </View>
          </View>
          <TextInput style={styles.input} placeholder="Ajouter un membre" />
          <TextInput style={styles.input} placeholder="Ajouter un encadrant" />
          <Text style={styles.h3}>Discipline(s)</Text>
          <View style={styles.disciplinesContainer}>
            <TouchableOpacity  activeOpacity={0.8} style={styleDisciplicesnowshoe} onPress={() => handleDiscipline('snowshoe')}>
              <Image
                style={styles.disciplineImg}
                source={require("../assets/diciplinesIcons/snowshoe.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}  style={styleDisciplicehike} onPress={() => handleDiscipline('hike')}>
              <Image
                style={styles.disciplineImg}
                source={require("../assets/diciplinesIcons/hike.png")}
              />
            </TouchableOpacity  >
            <TouchableOpacity activeOpacity={0.8}  style={styleDisciplicemountaineering} onPress={() => handleDiscipline('mountaineering')}>
              <Image
                style={styles.disciplineImg}
                source={require("../assets/diciplinesIcons/mountaineering.png")}
              />
            </TouchableOpacity >
            <TouchableOpacity activeOpacity={0.8}  style={styleDiscipliceski} onPress={() => handleDiscipline('ski')}>
              <Image
                style={styles.disciplineImg}
                source={require("../assets/diciplinesIcons/ski.png")}
              />
            </TouchableOpacity >
            <TouchableOpacity activeOpacity={0.8}  style={styleDisciplicesnowBoard} onPress={() => handleDiscipline('snowboard')}>
              <Image
                style={styles.disciplineImg}
                source={require("../assets/diciplinesIcons/snowboard.png")}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.buttonLong}
            activeOpacity={0.8}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.textButtonWhite} onPress={() => handleSaveitinerary()}>Enregistrer</Text>
          </TouchableOpacity>
        </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
    // marginBottom: 40,
  },
  // infosContainer: {
  //   marginBottom: 40,
  // },
  h2: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "10%",
  },
  formContainer: {
    marginTop: "5%",
  },
  input: {
    backgroundColor: "#EDEDED",
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
  },
  dateInput: {
    width: 120,
    backgroundColor: "#EDEDED",
    borderRadius: 50,
    borderWidth: 0,
    marginLeft: 12,
    marginRight: 10
  },
  datePicker: {
    color: '#EDEDED'
  },
  disciplinesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "5%",
  },
  disciplinesTitle: {
    marginTop: "5%",
  },
  discipline: {
    backgroundColor: "#EDEDED",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  disciplineImg: {
    width: 40,
    height: 40,
  },
  buttonLong: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8B9EAB",
    borderRadius: 50,
    marginTop: "10%",
  },
  textButtonWhite: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
  h3: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: "5%",
  },
  itinaryImg: {
    backgroundColor: "#EDEDED",
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  inputSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputSectionTwo: {
    width: "65%",
  },
  inputSectionThree: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputSmall: {
    width: "40%",
    backgroundColor: "#EDEDED",
    padding: 10,
    borderRadius: 20,
  },
  ligneIconContainer: {
    alignItems: "center",
  },
  ligneIcon: {
    backgroundColor: "#A8A4A4",
    width: "15%",
    height: 3,
    borderRadius: 5,
  },
});
