import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import PatientDetailScreen from "./PatientDetailScreen";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const AddClinicalData = ({ route }) => {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");
  const [bloodOxygenLevel, setBloodOxygenLevel] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [clinicStaff, setClinicStaff] = useState("");
  const [clinicalData, setClinicalData] = useState([]);

  // Function to check if any of the required fields are empty
  const isSaveDisabled = () => {
    return (
      !systolic ||
      !diastolic ||
      !respiratoryRate ||
      !bloodOxygenLevel ||
      !heartRate ||
      !clinicStaff
    );
  };

  // Helper function to check if a value is numeric and limited to 3 digits
  const isNumeric = (value) => {
    return /^\d{1,3}$/.test(value);
  };

  //extract patientId from route parameters
  const { patientId, patient } = route.params;
  const navigation = useNavigation();

  console.log(route.params);

  // Function to fetch clinical data after adding new clinical data
  const fetchClinicalData = async (patientId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/patients/${patientId}/clinicaldata`
      );
      if (response.ok) {
        const clinicalData = await response.json();
        return clinicalData; // Return the fetched clinical data
      } else {
        console.error("Error fetching clinical data:", response.statusText);
        return [];
      }
    } catch (error) {
      console.error("Error fetching clinical data:", error);
      return [];
    }
  };
  // Function to handle the save button press
  const saveClinicalData = async () => {
    try {
      // Check if any of the required fields are empty
      //or not valid 3 digits
      if (
        isSaveDisabled() ||
        !isNumeric(systolic) ||
        !isNumeric(diastolic) ||
        !isNumeric(respiratoryRate) ||
        !isNumeric(bloodOxygenLevel) ||
        !isNumeric(heartRate)
      ) {
        // Display an alert or provide feedback to the user
        Alert.alert(
          "Invalid Input ",
          "Please check that there are no invalid entries or empty fields."
        );
        return;
      }

      // Proceed with the POST request to save clinical data
      const response = await fetch(
        `http://localhost:3000/patients/${patientId}/clinicaldata`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bp_systolic: systolic,
            bp_diastolic: diastolic,
            respiratory_rate: respiratoryRate,
            blood_oxygen_level: bloodOxygenLevel,
            pulse_rate: heartRate,
            clinic_staff: clinicStaff,
          }),
        }
      );

      if (response.ok) {
        // Display success message
        Alert.alert("Success", "Clinical data added successfully!", [
          {
            text: "OK",
            onPress: async () => {
              // Fetch clinical data after adding new clinical data
              const updatedClinicalData = await fetchClinicalData(patientId);

              // Update the state with the fetched clinical data
              setClinicalData(updatedClinicalData);

              navigation.goBack();
              console.log(patientId, patient);
            },
          },
        ]);
      } else {
        console.error("Error saving clinical data:", response.statusText);
        Alert.alert("Error", "Failed to save clinical data. Please try again.");
      }
    } catch (error) {
      console.error("Error saving clinical data:", error);
      Alert.alert("Error", "Failed to save clinical data. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Blood Pressure (Systolic):</Text>
      <TextInput
        style={styles.input}
        value={systolic}
        onChangeText={setSystolic}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Blood Pressure (Diastolic):</Text>
      <TextInput
        style={styles.input}
        value={diastolic}
        onChangeText={setDiastolic}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Respiratory Rate:</Text>
      <TextInput
        style={styles.input}
        value={respiratoryRate}
        onChangeText={setRespiratoryRate}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Blood Oxygen Level:</Text>
      <TextInput
        style={styles.input}
        value={bloodOxygenLevel}
        onChangeText={setBloodOxygenLevel}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Heart Rate:</Text>
      <TextInput
        style={styles.input}
        value={heartRate}
        onChangeText={setHeartRate}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Clinic Staff:</Text>
      <TextInput
        style={styles.input}
        value={clinicStaff}
        onChangeText={setClinicStaff}
      />

      <Button title="Save Record" onPress={saveClinicalData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5FCFF", // Background color for the entire screen
  },
  container_beside: {
    flex: 1,
    flexDirection: "row", // Display items horizontally
    justifyContent: "space-around", // adjust this property to change the space between fields
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    backgroundColor: "#FFFFFF", // Background color
  },
});

export default AddClinicalData;
