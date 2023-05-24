import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
} from "react-native";
import React, { useState } from "react";

import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from "react-redux";
import { addItinerarySecondtPart, removeItinerary } from "../reducers/itineraries";
import { useNavigation } from "@react-navigation/native";

export default function SwipeItemFull() {

  const dispatch = useDispatch()

  const [itineraryName, setItineraryName] = useState("");
  const [numberParticipants, setNumberParticipants] = useState(0);
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
  
  // handle members input
  const [members, setmembers] = useState('');
  const [ allMembers, setAllMembers ] = useState([])


  const handleMembers = () => {
    // state contenant tous les membres
    setAllMembers(allMembers.concat(members))
    setmembers('')
  }

  // Affiche tous les membres dans la modal swipe Full
  const showMembers = allMembers?.map((data, i) => {
    return (
      <View key={i} style={styles.memberName}>
        <Text >{data}</Text>
      </View>
    )
  })

  // IF certaines infos pour le post de la db sont null PAS FETCH
  // useSelector dispatch itinéraire
  const myItinerary = useSelector((state) => state.itineraries.value)

  const itinerary = {
    itineraryName: itineraryName,
    membersNumber: numberParticipants,
    date: date,
    members: allMembers,
    supervisor: supervisor,
    discipline: discipline,
  }

  // quand appuie sur button save dispatch les info pour tous récup quand fetch
  const handleSave = () => {
    dispatch(addItinerarySecondtPart(itinerary))
  }

  const token = useSelector((state) => state.user.token)

  const navigation = useNavigation()

  // fetch des données de l'itinéraire et remove les infos du réducer
  const handleSubmit = () => {
    if(myItinerary.arrival !== null && myItinerary.departure  !== null && myItinerary.time !== null) {
      fetch(`https://sauve-ta-pow-backend.vercel.app/itineraries/newItinerary/${token}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(myItinerary)
      }).then(response => response.json()).then(data => {
        // une fois post delete itineraire du reducer
        // dispatch(removeItinerary())

        // navigue vers la page de résumé de l'itinéraire
        navigation.navigate('EntireItinerary')
      })
    }
  };
  
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
          <TextInput 
            style={styles.input}
            placeholder="Ajouter un encadrant" 
            onChangeText={(value) => setSupervisor(value)}
            value={supervisor}
            />
           <View style={styles.membersInput}>
              <TextInput
              // style={styles.input} 
              placeholder="Ajouter un membre" 
              onChangeText={(value) => setmembers(value)}
              value={members}
              />
              <FontAwesome name='check' size={20} onPress={() => handleMembers()}/>
           </View>
           <View horizontal={true} style={styles.membersName}>
            {showMembers}
           </View>
          <Text style={styles.h3}>Discipline</Text>
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
          <View style={styles.saveButtons}>
            <TouchableOpacity
              style={styles.buttonLong}
              activeOpacity={0.8}
              onPress={() => handleSave()}
            >
              <Text style={styles.textButtonWhite}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonLong}
              activeOpacity={0.8}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.textButtonWhite}>Continue</Text>
            </TouchableOpacity>
          </View>
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
  membersInput: {
    flexDirection: 'row',
    backgroundColor: "#EDEDED",
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  membersName: {
    flexDirection :'row',
  },
  memberName: {
    backgroundColor: '#EDEDED',
    width: '20%',
    justifyContent: 'center',
    alignItems :'center',
    height: 25,
    marginRight: 10,
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
  saveButtons: {
    flexDirection: 'row'
  },
  buttonLong: {
    width: "40%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8B9EAB",
    borderRadius: 50,
    marginTop: "10%",
    marginRight: 60,
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
