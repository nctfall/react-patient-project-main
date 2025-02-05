import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import { format } from "date-fns"; // Import the date-fns library for date formatting

const EditPatientScreen = ({ route, navigation }) => {
  const { patientId } = route.params;
  // Function to format the date in a consistent way
  const formatDate = (date) => {
    return date ? format(new Date(date), "yyyy-MM-dd") : ""; // Adjust the date format as needed
  };

  const [editedPatient, setEditedPatient] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    contactNumber: "",
    email: "",
    identification: "",
    identificationType: "",

    // Medical Information
    purposeOfVisit: "",
    primaryCarePhysician: "",
    physicianContactNumber: "",
    listOfAllergies: "",
    currentMedications: "",
    medicalConditions: "",

    // Insurance Information
    insuranceProvider: "",
    insuranceIdNumber: "",
    insuranceContactNumber: "",

    // Emergency Contact
    emergencyContactPerson: "",
    emergencyContactNumber: "",
  });

  useEffect(() => {
    // Fetch existing patient data from the API
    fetchPatient(patientId)
      .then((patientData) => {
        setEditedPatient(patientData);
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
        setIsLoading(false);
      });
  }, [patientId]);

  const fetchPatient = async (patientId) => {
    // fetch patient details based on patientId
    const response = await fetch(
      `http://localhost:3000/patients/${patientId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const patientData = await response.json();
      return patientData;
    } else {
      throw new Error(`Error fetching patient data: ${response.statusText}`);
    }
  };

  const handleSave = async () => {
    // Check for empty fields
    const emptyFields = Object.entries(editedPatient).filter(
      ([field, value]) => {
        return typeof value === "string" && value.trim() === "";
      }
    );

    if (emptyFields.length > 0) {
      Alert.alert(
        "Empty Fields",
        "All fields are required. Please fill in all the fields."
      );
      return;
    }
    try {
      // Perform API call to update patient details in the backend
      const response = await fetch(
        `http://localhost:3000/patients/${patientId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedPatient),
        }
      );

      if (response.ok) {
        // Display success message
        Alert.alert("Success", "Patient details updated successfully!");
        // Navigate back to PatientDetailScreen with updated data
        navigation.navigate("Patient Detail", { patient: editedPatient });
      } else {
        throw new Error(
          `Error updating patient details: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error updating patient details:", error);
      Alert.alert(
        "Error",
        "Failed to update patient details. Please try again."
      );
    }
  };

  //generate the input fields
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        {/* Display existing patient details for editing */}
        <Text style={styles.sectionHeader}>Edit Patient Details:</Text>
        {/* Personal Information */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>First Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={editedPatient.firstName}
            onChangeText={(value) =>
              setEditedPatient({ ...editedPatient, firstName: value })
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={editedPatient.lastName}
            onChangeText={(value) =>
              setEditedPatient({ ...editedPatient, lastName: value })
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Date of Birth:</Text>
          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            value={formatDate(editedPatient.dateOfBirth)}
            onChangeText={(value) =>
              setEditedPatient({ ...editedPatient, dateOfBirth: value })
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Age:</Text>
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={editedPatient.age.toString()}
            onChangeText={(value) =>
              setEditedPatient({ ...editedPatient, age: value })
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Gender:</Text>
          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={editedPatient.gender}
            onChangeText={(value) =>
              setEditedPatient({ ...editedPatient, gender: value })
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Address:</Text>
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={editedPatient.address}
            onChangeText={(value) =>
              setEditedPatient({ ...editedPatient, address: value })
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>City:</Text>
          <TextInput
            style={styles.input}
            placeholder="City"
            value={editedPatient.city}
            onChangeText={(value) =>
              setEditedPatient({ ...editedPatient, city: value })
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Province:</Text>
          <TextInput
            style={styles.input}
            placeholder="Province"
            value={editedPatient.province}
            onChangeText={(value) =>
              setEditedPatient({ ...editedPatient, province: value })
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Postal Code:</Text>
          <TextInput
            style={styles.input}
            placeholder="Postal Code"
            value={editedPatient.postalCode}
            onChangeText={(value) =>
              setEditedPatient({ ...editedPatient, postalCode: value })
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Contact Number:</Text>
          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            value={editedPatient.contactNumber}
            onChangeText={(value) =>
              setEditedPatient({ ...editedPatient, contactNumber: value })
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={editedPatient.email}
            onChangeText={(value) =>
              setEditedPatient({ ...editedPatient, email: value })
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Identification #:</Text>
          <TextInput
            style={styles.input}
            placeholder="Identification #"
            value={editedPatient.identification}
            onChangeText={(value) =>
              setEditedPatient({ ...editedPatient, identification: value })
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Identification Type:</Text>
          <TextInput
            style={styles.input}
            placeholder="Identification Type"
            value={editedPatient.identificationType}
            onChangeText={(value) =>
              setEditedPatient({ ...editedPatient, identificationType: value })
            }
          />
        </View>

        {/* Medical Information */}
        <Text style={styles.sectionHeader}>Medical Information</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Purpose of Visit:</Text>
          <TextInput
            style={styles.input}
            placeholder="Purpose of Visit"
            value={editedPatient.purposeOfVisit}
            onChangeText={(value) =>
              setEditedPatient({ ...editedPatient, purposeOfVisit: value })
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Primary Care Physician:</Text>
          <TextInput
            style={styles.input}
            placeholder="Primary Care Physician"
            value={editedPatient.primaryCarePhysician}
            onChangeText={(value) =>
              setEditedPatient({
                ...editedPatient,
                primaryCarePhysician: value,
              })
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Physician Contact Number:</Text>
          <TextInput
            style={styles.input}
            placeholder="Physician Contact Number"
            value={editedPatient.physicianContactNumber}
            onChangeText={(value) =>
              setEditedPatient({
                ...editedPatient,
                physicianContactNumber: value,
              })
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>List of Allergies:</Text>
          <TextInput
            style={styles.input}
            placeholder="List of Allergies"
            value={editedPatient.listOfAllergies}
            onChangeText={(value) =>
              setEditedPatient({ ...editedPatient, listOfAllergies: value })
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Current Medications:</Text>
          <TextInput
            style={styles.input}
            placeholder="Current Medications"
            value={editedPatient.currentMedications}
            onChangeText={(value) =>
              setEditedPatient({ ...editedPatient, currentMedications: value })
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Medical Conditions:</Text>
          <TextInput
            style={styles.inputTall}
            placeholder="Medical Conditions"
            value={editedPatient.medicalConditions}
            onChangeText={(value) =>
              setEditedPatient({ ...editedPatient, medicalConditions: value })
            }
          />
        </View>

        {/* Insurance Information */}
        <Text style={styles.sectionHeader}>Insurance Information</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Insurance Provider:</Text>
          <TextInput
            style={styles.input}
            placeholder="Insurance Provider"
            value={editedPatient.insuranceProvider}
            onChangeText={(value) =>
              setEditedPatient({ ...editedPatient, insuranceProvider: value })
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Insurance ID Number:</Text>
          <TextInput
            style={styles.input}
            placeholder="Insurance ID Number"
            value={editedPatient.insuranceIdNumber}
            onChangeText={(value) =>
              setEditedPatient({ ...editedPatient, insuranceIdNumber: value })
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Insurance Contact Number:</Text>
          <TextInput
            style={styles.input}
            placeholder="Insurance Contact Number"
            value={editedPatient.insuranceContactNumber}
            onChangeText={(value) =>
              setEditedPatient({
                ...editedPatient,
                insuranceContactNumber: value,
              })
            }
          />
        </View>

        {/* Emergency Contact */}
        <Text style={styles.sectionHeader}>Emergency Contact</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Emergency Contact Person:</Text>
          <TextInput
            style={styles.input}
            placeholder="Emergency Contact Person"
            value={editedPatient.emergencyContactPerson}
            onChangeText={(value) =>
              setEditedPatient({
                ...editedPatient,
                emergencyContactPerson: value,
              })
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Emergency Contact Number:</Text>
          <TextInput
            style={styles.input}
            placeholder="Emergency Contact Number"
            value={editedPatient.emergencyContactNumber}
            onChangeText={(value) =>
              setEditedPatient({
                ...editedPatient,
                emergencyContactNumber: value,
              })
            }
          />
        </View>

        {/* Save button */}
        <Button
          mode="contained"
          onPress={handleSave}
          style={[
            styles.button,
            { backgroundColor: "#66ccff", alignSelf: "center" },
          ]}
        >
          Save{" "}
        </Button>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 16,
    backgroundColor: "#F5FCFF", // Background color for the entire screen
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 5,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 4,
    padding: 8,
    backgroundColor: "#FFFFFF", // Background color
  },
  inputTall: {
    height: 60,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 4,
    padding: 8,
    backgroundColor: "#FFFFFF", // Background color
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  button: {
    width: 150,
  },
});

export default EditPatientScreen;
