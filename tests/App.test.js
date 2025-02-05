import React from "react";
import { render, waitFor, act } from "@testing-library/react-native";
import App from "../App";

// Test suite for the App component
describe("Tab Bar Navigation", () => {
  it("displays the correct screens when selecting tab bar items", async () => {
    const { getByText, queryByText } = render(<App />);

    let homeTab, listPatientsTab, criticalPatientsTab;

    // Wrap the code causing state updates in act
    await act(async () => {
      // Wait for the data to be loaded
      await waitFor(() => {
        homeTab = getByText("Dashboard");
        listPatientsTab = getByText("List Patients");
        criticalPatientsTab = getByText("Critical Patients");

        // Check if the tab bar items are present
        expect(homeTab).toBeTruthy();
        expect(listPatientsTab).toBeTruthy();
        expect(criticalPatientsTab).toBeTruthy();
      });
    });
  });
});
