import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const CriticalPatientsScreen = ({ navigation }) => {
  // State to store the list of critical patients
  const [criticalPatients, setCriticalPatients] = useState([]);

  useEffect(() => {
    // Fetch critical patients from the server
    fetch("http://localhost:3000/patients/critical")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update the state with the fetched critical patients
        setCriticalPatients(data);
      })
      .catch((error) => {
        console.error("Error fetching critical patients:", error);
      });
  }, []);
  // Render each critical patient as a touchable card
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.patientCard}
      onPress={() => {
        // Navigate to the "Patient Detail" screen with the selected patient
        navigation.navigate("Patient Detail", { patient: item });
      }}
    >
      <Icon name="user" size={30} color="#007ACC" />
      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>
          {item.firstName} {item.lastName}
        </Text>
        <Text style={styles.patientAge}>Age: {item.age}</Text>
        <Text style={styles.patientContact}>Contact: {item.contactNumber}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={criticalPatients}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  clearIcon: {
    padding: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  patientCard: {
    backgroundColor: "white",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },
  patientInfo: {
    flex: 1,
    marginLeft: 10,
  },
  patientContact: {
    color: "#007ACC",
  },
  patientName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  patientAge: {
    color: "#888",
  },
});

export default CriticalPatientsScreen;
