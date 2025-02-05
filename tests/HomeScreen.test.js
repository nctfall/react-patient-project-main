import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../Components/HomeScreen';

// Test suite for the HomeScreen component
describe('HomeScreen', () => {
  it('navigates to "Add Patient" screen when the "Add Patient" button is clicked', async () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const { getByText } = render(<HomeScreen navigation={navigation} />);
    
    // Wait for the data to be loaded
    await waitFor(() => {
      // Assuming there's at least one patient
      const addPatientButton = getByText('Add Patient');

      // Check if the "Add Patient" button itself is present
      expect(addPatientButton).toBeTruthy();

      // Simulate a click event on the "Add Patient" button
      fireEvent.press(addPatientButton);

      // Assert that the navigation to 'Add Patient' occurred
      expect(navigation.navigate).toHaveBeenCalledWith('Add Patient');
    });
  });

  it('navigates to "Critical Patients" screen when the "Critical List" button is clicked', async () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const { getByText } = render(<HomeScreen navigation={navigation} />);
    
    // Wait for the data to be loaded
    await waitFor(() => {
      // Assuming there's at least one patient
      const criticalListButton = getByText('Critical List');

      // Check if the "Critical List" button itself is present
      expect(criticalListButton).toBeTruthy();

      // Simulate a click event on the "Critical List" button
      fireEvent.press(criticalListButton);

      // Assert that the navigation to 'Critical Patients' occurred
      expect(navigation.navigate).toHaveBeenCalledWith('Critical Patients');
    });
    
  });
});
