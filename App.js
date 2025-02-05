import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListPatients from "./Components/ListPatients";
import PatientDetailScreen from "./Components/PatientDetailScreen";
import HomeScreen from "./Components/HomeScreen";
import CriticalPatients from "./Components/CriticalPatients";
import AddClinicalData from "./Components/AddClinicalData";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; // Import the icon library
import AddPatient from "./Components/AddPatient";
import EditPatient from "./Components/EditPatient";


//create stack and bottom nav
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Define a function for the Home stack navigator
function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Dashboard" component={HomeScreen} />
      <Stack.Screen name="List Patients" component={ListPatients} />
      <Stack.Screen name="Add Patient" component={AddPatient} />
      <Stack.Screen name="Edit Patient" component={EditPatient} />
      <Stack.Screen name="Patient Detail" component={PatientDetailScreen} />
      <Stack.Screen name="Critical Patients" component={CriticalPatients} />
      <Stack.Screen name="Clinical Data" component={AddClinicalData} />
    </Stack.Navigator>
  );
}

// Main App component
export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "List Patients") {
                iconName = "format-list-bulleted";
              } else if (route.name === "Critical Patients") {
                iconName = "alert-circle";
              }

              return (
                <MaterialCommunityIcons name={iconName} color={color} size={size} />
              );
            },
          })}
          tabBarStyle={{
            backgroundColor: "#F5FCFF", // Background color of the tab bar
          }}
          tabBarActiveTintColor="#007ACC" // Color when tab is active
          tabBarInactiveTintColor="gray" // Color when tab is inactive
        >
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              animationEnabled: true, // Enable animation for this screen
            }}
          />
          <Tab.Screen
            name="List Patients"
            component={ListPatients}
            options={{
              animationEnabled: true, // Enable animation for this screen
            }}
          />
          <Tab.Screen
            name="Critical Patients"
            component={CriticalPatients}
            options={{
              animationEnabled: true, // Enable animation for this screen
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
});
