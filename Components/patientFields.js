// patientFields.js
export const personalInformationFields = [
  "firstName",
  "lastName",
  "dateOfBirth",
  "age",
  "gender",
  "address",
  "city",
  "province",
  "postalCode",
  "contactNumber",
  "email",
  "identification",
  "identificationType",
];

export const medicalInformationFields = [
  "purposeOfVisit",
  "primaryCarePhysician",
  "physicianContactNumber",
  "listOfAllergies",
  "currentMedications",
  "medicalConditions",
];

export const insuranceInformationFields = [
  "insuranceProvider",
  "insuranceIdNumber",
  "insuranceContactNumber",
];

// Combined fields without redundancy
export const allFields = [
  ...personalInformationFields,
  ...medicalInformationFields.filter((field) => !personalInformationFields.includes(field)),
  ...insuranceInformationFields.filter(
    (field) => !personalInformationFields.includes(field) && !medicalInformationFields.includes(field)
  ),
];
