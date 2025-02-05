import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  FlatList,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { format } from "date-fns"; // Import the date-fns library for date formatting

/** 
 * displays more details about the patient after a user clicks on the patient name
 * has 2 segmented controls for patient details and clinical data 
 * */ 
const PatientDetailScreen = ({ route }) => {
  const { patient } = route.params;
  const navigation = useNavigation();
  // Format the date using date-fns
  const dateOfBirth = new Date(patient.dateOfBirth);
  const formattedDateOfBirth = format(dateOfBirth, "yyyy - MM - dd");

  const [selectedSegment, setSelectedSegment] = useState(0);
  const [clinicalData, setClinicalData] = useState([]); //clinical data
  const [refreshClinicalData, setRefreshClinicalData] = useState(false);

  //trigger refresh when adding clinical data
  const handleRefreshClinicalData = () => {
    setRefreshClinicalData((prev) => !prev);
  };

  const handleAddClinicalData = async () => {
    // Navigate to AddClinicalData screen
    navigation.navigate("Clinical Data", {
      patientId: patient._id,
      patient: patient,
    });
  };

  //show an alert when deleting a record
  const showDeleteConfirmation = (patientName) => {
    Alert.alert(
      "Delete Record",
      `Are you sure you want to delete this patient and their clinical record? ${patientName}`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            //Use the patient._id to identify and delete the patient record
            try {
              const response = await fetch(
                `http://localhost:3000/patients/${patient._id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              if (response.ok) {
                console.log("Patient deleted successfully.");

                // Show a success alert
                Alert.alert("Success", "Patient record deleted successfully", [
                  {
                    text: "OK",
                    onPress: () => {
                      //return to home screen and reload the list
                      navigation.push("Dashboard");
                    },
                  },
                ]);
              } else {
                console.error("Error deleting patient:", response.statusText);
              }
            } catch (error) {
              console.error("Error deleting patient:", error);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    if (selectedSegment === 1) {
      // Fetch clinical data when the Clinical Data segment (1) is selected
      fetchClinicalData(patient._id);
    }
  }, [selectedSegment, patient._id, refreshClinicalData]);

  const fetchClinicalData = async (patientId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/patients/${patientId}/clinicaldata`
      );
      if (response.ok) {
        const clinicalData = await response.json();
        setClinicalData(clinicalData);
      } else {
        console.error("Error fetching clinical data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching clinical data:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* icons */}
      <View style={styles.iconsContainer}>
        {/* Edit icon to edit Patient Info */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Edit Patient", {
              patientId: patient._id,
            });
          }}
        >
          <FontAwesome
            name="edit"
            size={40}
            color="#66CC33"
            style={styles.icon}
          />
        </TouchableOpacity>
        {/* Plus icon to add Clinical Data */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Clinical Data", {
              patientId: patient._id,
            });
          }}
        >
          <FontAwesome
            name="plus-square"
            size={40}
            color="#007ACC"
            style={styles.icon}
          />
        </TouchableOpacity>
        {/* Refresh icon to refresh and update clinical data */}
        <TouchableOpacity onPress={handleRefreshClinicalData}>
          <FontAwesome
            name="refresh"
            size={40}
            color="#0099FF"
            style={styles.icon}
          />
        </TouchableOpacity>
        {/* Delete icon to delete patient record */}
        <TouchableOpacity
          onPress={() =>
            showDeleteConfirmation(`${patient.firstName} ${patient.lastName}`)
          }
        >
          <FontAwesome name="trash" size={40} color="red" style={styles.icon} />
        </TouchableOpacity>
      </View>
      {/*patient information  */}

      {/* Add segmented control for Personal Info and Clinical Data */}
      <SegmentedControl
        style={styles.segmentedControl}
        values={["Patient Info", "Clinical Data"]}
        selectedIndex={selectedSegment}
        onChange={(event) => {
          setSelectedSegment(event.nativeEvent.selectedSegmentIndex);
        }}
      />

      {/* Display content based on selected segment */}
      {selectedSegment === 0 ? (
        // Display Personal Info
        <FlatList
          data={[
            /* Personal Information */

            {
              section: "Personal Information",
              label: "Name",
              value: `${patient.firstName} ${patient.lastName}`,
            },
            { label: "Date of Birth", value: formattedDateOfBirth }, // Use formattedDateOfBirth here
            { label: "Age", value: patient.age },
            { label: "Gender", value: patient.gender },
            { label: "Height", value: `${patient.height} cm` },
            { label: "Weight", value: `${patient.weight} kg` },
            { label: "Address", value: patient.address },
            { label: "City", value: patient.city },
            { label: "Province", value: patient.province },
            { label: "Postal Code", value: patient.postalCode },
            { label: "Contact Number", value: patient.contactNumber },
            { label: "Email", value: patient.email },
            { label: "Identification", value: patient.identification },
            { label: "Identification Type", value: patient.identificationType },
            /* Medical Information */
            {
              section: "Medical Information",
              label: "Primary Care Physician",
              value: patient.primaryCarePhysician,
            },
            {
              label: "Physician Contact Number",
              value: patient.physicianContactNumber,
            },
            { label: "List of Allergies", value: patient.listOfAllergies },
            { label: "Current Medications", value: patient.currentMedications },
            { label: "Medical Conditions", value: patient.medicalConditions },

            /* Insurance Information */
            {
              section: "Insurance Information",
              label: "Insurance Provider",
              value: patient.insuranceProvider,
            },
            { label: "Insurance ID Number", value: patient.insuranceIdNumber },
            {
              label: "Insurance Contact Number",
              value: patient.insuranceContactNumber,
            },
            /* Emergency Contact Information */

            {
              section: "Emergency Contact",

              label: "Emergency Contact Person",
              value: patient.emergencyContactPerson,
            },
            {
              label: "Emergency Contact Number",
              value: patient.emergencyContactNumber,
            },
          ]}
          //prop used to extract a unique key for each item in the list.
          keyExtractor={(item) => item.label}
          renderItem={({ item }) => (
            <View style={styles.detailCard}>
              <Text style={styles.label}>{item.label}:</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          )}
          // Render section headers
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{section}</Text>
            </View>
          )}
        />
      ) : (
        // Display Clinical Data, there is a red border for records that classifies the patient in critical condition
        <FlatList
          data={clinicalData}
          keyExtractor={(item, index) => index.toString()} // Using index as a fallback key
          renderItem={({ item }) => (
            <View
              style={[
                styles.clinicalDataCard,
                //If item.is_critical_condition is true, it applies the red border on the clinical data
                item.is_critical_condition ? styles.criticalCard : null,
              ]}
            >
              <Text style={styles.label}>
                Critical Condition? {item.is_critical_condition ? "Yes" : "No"}
              </Text>
              <Text style={styles.label}>
                Date Taken:{" "}
                {new Date(item.updatedAt).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </Text>

              <Text style={styles.label}>
                Blood Pressure: {item.bp_systolic} / {item.bp_diastolic}
              </Text>
              <Text style={styles.label}>
                Respiratory Rate: {item.respiratory_rate}
              </Text>
              <Text style={styles.label}>
                Blood Oxygen Level: {item.blood_oxygen_level}
              </Text>
              <Text style={styles.label}>Heart Rate: {item.pulse_rate}</Text>
              <Text style={styles.label}>
                Clinic Staff: {item.clinic_staff}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  detailContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  detailCard: {
    flexDirection: "row", // Change flex direction to row
    backgroundColor: "white",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    justifyContent: "space-between", // Optional: Adjust the spacing between label and value
    alignItems: "center", // Align items to center vertically
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    // Optional: Add margin-right for spacing between label and value
    marginRight: 10,
  },
  value: {
    fontSize: 16,
  },
  headerContainer: {
    flexDirection: "row", // Align items horizontally
    justifyContent: "space-between", // Put space between items
    alignItems: "center", // Center items vertically
    paddingHorizontal: 16, // Add horizontal padding for spacing
    marginBottom: 16, // Add bottom margin for spacing
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
    padding: 5,
  },
  clinicalDataCard: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },
  criticalCard: {
    borderColor: "red",
    borderWidth: 2,
  },
  sectionHeader: {
    backgroundColor: '#f0f0f0',
    padding: 8,
  },

  sectionHeaderText: {
    fontWeight: 'bold',
  },
});

export default PatientDetailScreen;
