import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { format } from "date-fns"; // Import the date-fns library for date formatting

const AddPatient = () => {
  const navigation = useNavigation();
  // Regular expressions for validation
  const nameRegex = /^[a-zA-Z]+$/;
  const phoneRegex = /^[0-9]{10}$/; // Assuming a 10-digit phone number
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const dateOfBirthRegex = /^\d{4}-\d{2}-\d{2}$/;

  const [patientData, setPatientData] = useState({
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
  });
  // Function to check if the data matches the expected format
  const isValidFormat = (field, value) => {
    switch (field) {
      case "firstName":
      case "lastName":
      case "city":
      case "province":
      case "identificationType":
      case "purposeOfVisit":
      case "primaryCarePhysician":
      case "listOfAllergies":
      case "currentMedications":
      case "emergencyContactPerson":
        return nameRegex.test(value);
      case "contactNumber":
      case "physicianContactNumber":
      case "insuranceContactNumber":
      case "emergencyContactNumber":
        return phoneRegex.test(value);
      case "email":
        return emailRegex.test(value);
      case "dateOfBirth":
        return dateOfBirthRegex.test(value);
      default:
        return true; // No validation for other fields
    }
  };

  const isSaveDisabled = () => {
    return Object.values(patientData).some((field) => !field);
      };

  const savePatient = async () => {
    try {
      // Check for incomplete or invalid fields
      const invalidFields = Object.entries(patientData).filter(
        ([field, value]) => !value || !isValidFormat(field, value)
      );

      if (invalidFields.length > 0) {
        Alert.alert(
          "Invalid Fields",
          `Please check the following fields:\n${invalidFields
            .map(([field]) => field)
            .join("\n")}`
        );
        return;
      }
      // Format the date of birth using date-fns
      const formattedDateOfBirth = format(
        new Date(patientData.dateOfBirth),
        "yyyy-MM-dd"
      );

      // Include the formatted date of birth in the patientData
      const updatedPatientData = {
        ...patientData,
        dateOfBirth: formattedDateOfBirth,
      };

      // save patient data
      const response = await fetch("http://localhost:3000/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPatientData),
      });

      if (response.ok) {
        Alert.alert("Success", "Patient details saved successfully!");

        // Successfully added a patient, navigate to the Patient Detail screen
        const savedPatient = await response.json();
        navigation.navigate("Patient Detail", { patient: savedPatient });
      } else {
        console.error("Error saving patient data:", response.statusText);
        Alert.alert("Error", "Failed to save patient data. Please try again.");
      }
    } catch (error) {
      console.error("Error saving patient data:", error);
      Alert.alert("Error", "Failed to save patient data. Please try again.");
    }
  };

  const handleInputChange = (field, value) => {
    setPatientData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        {/* Personal Information */}
        <Text style={styles.sectionHeader}>Personal Information</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>First Name:</Text>
          <TextInput
            style={styles.input}
            value={patientData.firstName}
            onChangeText={(value) => handleInputChange("firstName", value)}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.input}
            value={patientData.lastName}
            onChangeText={(value) => handleInputChange("lastName", value)}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Date of Birth:</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={patientData.dateOfBirth}
            onChangeText={(value) => handleInputChange("dateOfBirth", value)}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Age:</Text>
          <TextInput
            style={styles.input}
            value={patientData.age}
            onChangeText={(value) => handleInputChange("age", value)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Gender:</Text>
          <TextInput
            style={styles.input}
            placeholder="Male, Female, Other Gender"
            value={patientData.gender}
            onChangeText={(value) => handleInputChange("gender", value)}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Height:</Text>
          <TextInput
            style={styles.input}
            placeholder="in cm"
            value={patientData.height}
            onChangeText={(value) => handleInputChange("height", value)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Weight:</Text>
          <TextInput
            style={styles.input}
            placeholder="in kg"
            value={patientData.weight}
            onChangeText={(value) => handleInputChange("weight", value)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Address:</Text>
          <TextInput
            style={styles.input}
            value={patientData.address}
            onChangeText={(value) => handleInputChange("address", value)}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>City:</Text>
          <TextInput
            style={styles.input}
            value={patientData.city}
            onChangeText={(value) => handleInputChange("city", value)}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Province:</Text>
          <TextInput
            style={styles.input}
            value={patientData.province}
            onChangeText={(value) => handleInputChange("province", value)}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Postal Code:</Text>
          <TextInput
            style={styles.input}
            value={patientData.postalCode}
            onChangeText={(value) => handleInputChange("postalCode", value)}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Contact Number:</Text>
          <TextInput
            style={styles.input}
            value={patientData.contactNumber}
            onChangeText={(value) => handleInputChange("contactNumber", value)}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={patientData.email}
            onChangeText={(value) => handleInputChange("email", value)}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Identification #:</Text>
          <TextInput
            style={styles.input}
            value={patientData.identification}
            onChangeText={(value) => handleInputChange("identification", value)}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Identification Type:</Text>
          <TextInput
            style={styles.input}
            value={patientData.identificationType}
            onChangeText={(value) =>
              handleInputChange("identificationType", value)
            }
          />
        </View>

        {/* Medical Information */}
        <Text style={styles.sectionHeader}>Medical Information</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Purpose of Visit:</Text>
          <TextInput
            style={styles.input}
            value={patientData.purposeOfVisit}
            onChangeText={(value) => handleInputChange("purposeOfVisit", value)}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Primary Care Physician:</Text>
          <TextInput
            style={styles.input}
            value={patientData.primaryCarePhysician}
            onChangeText={(value) =>
              handleInputChange("primaryCarePhysician", value)
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Physician Contact Number:</Text>
          <TextInput
            style={styles.input}
            value={patientData.physicianContactNumber}
            onChangeText={(value) =>
              handleInputChange("physicianContactNumber", value)
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>List of Allergies:</Text>
          <TextInput
            style={styles.input}
            value={patientData.listOfAllergies}
            onChangeText={(value) =>
              handleInputChange("listOfAllergies", value)
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Current Medications:</Text>
          <TextInput
            style={styles.input}
            value={patientData.currentMedications}
            onChangeText={(value) =>
              handleInputChange("currentMedications", value)
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Medical Conditions:</Text>
          <TextInput
            style={styles.inputTall}
            value={patientData.medicalConditions}
            onChangeText={(value) =>
              handleInputChange("medicalConditions", value)
            }
          />
        </View>

        {/* Insurance Information */}
        <Text style={styles.sectionHeader}>Insurance Information</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Insurance Provider:</Text>
          <TextInput
            style={styles.input}
            value={patientData.insuranceProvider}
            onChangeText={(value) =>
              handleInputChange("insuranceProvider", value)
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Insurance ID Number:</Text>
          <TextInput
            style={styles.input}
            value={patientData.insuranceIdNumber}
            onChangeText={(value) =>
              handleInputChange("insuranceIdNumber", value)
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Insurance Contact Number:</Text>
          <TextInput
            style={styles.input}
            value={patientData.insuranceContactNumber}
            onChangeText={(value) =>
              handleInputChange("insuranceContactNumber", value)
            }
          />
        </View>

        {/* Emergency Contact */}
        <Text style={styles.sectionHeader}>Emergency Contact</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Emergency Contact Person:</Text>
          <TextInput
            style={styles.input}
            value={patientData.emergencyContactPerson}
            onChangeText={(value) =>
              handleInputChange("emergencyContactPerson", value)
            }
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Emergency Contact Number:</Text>
          <TextInput
            style={styles.input}
            value={patientData.emergencyContactNumber}
            onChangeText={(value) =>
              handleInputChange("emergencyContactNumber", value)
            }
          />
        </View>

        {/* Save Button */}
        <Button
          mode="contained"
          onPress={savePatient}
          disabled={isSaveDisabled()}
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
    backgroundColor: "#FFFFFF", // Background color
    borderWidth: 1,
    marginTop: 4,
    padding: 8,
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

export default AddPatient;
