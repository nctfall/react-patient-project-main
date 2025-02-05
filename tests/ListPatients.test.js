import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import ListPatients from '../Components/ListPatients';

// Test suite for the ListPatients component
describe('ListPatients', () => {
  it('renders patient cards', async () => {
    const { getByTestId } = render(<ListPatients />);
    
    // Wait for the data to be loaded
    await waitFor(() => {
      const patientCard = getByTestId('patient-card-0'); // Assuming there's at least one patient
      expect(patientCard).toBeTruthy();
    });
  });
  //check if patient card has values
  it('checks that patient names are not null and have values', async () => {
    const { getByTestId } = render(<ListPatients />);
    
    // Wait for the data to be loaded
    await waitFor(() => {
      const patientName = getByTestId('patient-name-0'); // Assuming there's at least one patient

      // Check if the patient name element itself is present
      expect(patientName).toBeTruthy();

      // Check if the patient name element has non-null text content
      expect(patientName.props.children).toBeTruthy();
      
      // Retrieve and assert data from the first patient card
      const firstPatientCard = getByTestId('patient-card-0');
      const patientData = {
        name: patientName.props.children,
        // Add more properties based on your patient card structure
      };

      // Assert that the patient data is as expected
      expect(patientData.name).toBeTruthy();
    });
  });
});
//test to check if patient card is clickable
describe('ListPatients', () => {
    it('checks if patient cards are clickable', async () => {
      const navigation = {
        navigate: jest.fn(), // Mock the navigate function
      };
  
      const { getByTestId } = render(<ListPatients navigation={navigation} />);
      
      // Wait for the data to be loaded
      await waitFor(() => {
        // Assuming there's at least one patient
        const firstPatientCard = getByTestId('patient-card-0');
  
        // Check if the patient card itself is present
        expect(firstPatientCard).toBeTruthy();
  
        // Simulate a click event on the patient card
        fireEvent.press(firstPatientCard);
  
        // Assert that the navigation to 'Patient Detail' occurred with the correct patient data
        expect(navigation.navigate).toHaveBeenCalledWith('Patient Detail', expect.objectContaining({ patient: expect.any(Object) }));
      });
    });
  
    // Add more tests for other elements as needed
  });
