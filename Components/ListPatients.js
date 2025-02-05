import React, { useEffect, useState } from 'react';
import {useFocusEffect} from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, NativeAppEventEmitter } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with the desired icon library

/** renders patients list screen that fetches data from an API
and displays it in a scrollable list.
Clicking a patient displays the patient details  */
 
const ListPatients = ({ navigation }) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/patients')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPatients(data);
      })
      .catch((error) => {
        console.error('Error fetching patient data:', error);
      });
  }, []);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.patientCard}
      onPress={() => {
        navigation.navigate('Patient Detail', { patient: item});

      }}
      testID={`patient-card-${index}`} // Add testID with a unique identifier

    >

<Icon name="user" size={30} color="#007ACC" /> 
      <View style={styles.patientInfo}>
      <Text testID={`patient-name-${index}`} style={styles.patientName}>{item.firstName} {item.lastName}</Text>
        <Text testID={`patient-age-${index}`} style={styles.patientAge}>Age: {item.age}</Text>
        <Text testID={`patient-contact-${index}`} style={styles.patientContact}>Contact: {item.contactNumber}</Text>
        {/* Add more patient details here */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <FlatList
        data={patients}
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
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  patientCard: {
    backgroundColor: 'white',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },
  patientInfo: {
    flex: 1,
    marginLeft: 10,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  patientAge: {
    color: '#888',
  },
  patientContact: {
    color: "#007ACC",
  },
});

export default ListPatients;