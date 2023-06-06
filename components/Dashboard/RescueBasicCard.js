import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function RescueBasicCard(props) {
  //USE STATE TO SHOW MODAL
  const [modalVisible, setModalVisible] = useState(false);

  const paragraphes = props.paragraphes.map((data, i) => {
    return (
      <View key={i} style={styles.textContainer}>
        <Image
          source={{ uri: data.uri }}
          style={{ width: "100%", height: 200, resizeMode: "contain" }}
        />
        <Text
          style={{
            ...styles.h4,
            textAlign: "center",
            paddingVertical: 20,
          }}
        >
          {data.title}
        </Text>
        <Text
          style={{
            ...styles.p,
            textAlign: "center",
          }}
        >
          {data.text}
        </Text>
      </View>
    );
  });

  let modal = (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalView}>
        <View style={styles.iconContainer}>
          <FontAwesome
            name="close"
            size={20}
            color="#D5D8DC"
            style={styles.plus}
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
        <ScrollView>
          <Text
            style={{
              ...styles.h2,
              textAlign: "center",
              paddingVertical: 20,
            }}
          >
            {props.bigTitle}
          </Text>
          <Text
            style={{
              ...styles.p,
              textAlign: "center",
            }}
          >
            {props.description}
          </Text>
          {paragraphes}
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <>
      {modal}
      <View style={styles.cardsContainerRescueBasics}>
        <TouchableOpacity
          style={styles.cardSectionRescueBasics}
          onPress={() => setModalVisible(!modalVisible)}
          activeOpacity={1}
        >
          <Image source={props.img} style={styles.cardImageRescueBasics} />
          <View style={styles.rescueBasicsCardHeader}>
            <View >
              <View style={styles.cardArc}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                >
                  <Path
                    style={styles.cardArcPath}
                    d="M40 80 c 22 0 40 -22 40 -40 v 40 Z"
                  />
                </Svg>
              </View>
              <View style={styles.textHeaderContainerRescueBasics}>
                <Text style={styles.articleTitle}>{props.bigTitle}</Text>
                <Text
                  style={styles.linkRescueBasics}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  Détail
                </Text>
                <Text style={styles.p}>{styles.rescueBasicName}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({

  // CARDS RESCUE
  cardsContainerRescueBasics: {
    flexDirection: "row",
    marginTop: 10,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 80,
  },
  cardSectionRescueBasics: {
    width: 190,
    height: 230,
    marginLeft: 15,
  },
  cardImageRescueBasics: {
    width: 190,
    height: 230,
    borderRadius: 20,
  },
  cardArc: {
    position: "absolute",
    bottom: "100%",
    right: 0,
    width: 80,
    height: 80,
    zIndex: 1,
  },
  cardArcPath: {
    fill: "#FFFFFF",
  },
  textHeaderContainerRescueBasics: {
    padding: 30,
  },
  rescueBasicsCardHeader: {
    top: "60%",
    height: "40%",
    backgroundColor: "#FFFFFF",
    width: "100%",
    position: "absolute",
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  linkRescueBasics: {
    color: "#8B9EAB",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },

  //TEXT
  h2: {
    fontSize: 26,
    fontWeight: "bold",
  },
  h4: {
    fontSize: 18,
    fontWeight: "bold",
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  p: {
    fontSize: 13,
  },

  // MODAL
  modalView: {
    height: "80%",
    margin: "5%",
    marginTop: "20%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    justifyContent: "space-evenly",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
