import TextField from "@/app/components/common/TextField/TextField";

export default function StepTwo() {
  return (
    <>
      <TextField
        placeholder="Enter your company name"
        label="Company Name"
        name="companyName"
        type="text"
      />
      <TextField
        placeholder="Enter your phone number"
        label="Phone Number"
        name="phoneNumber"
        type="text"
      />
      <TextField
        placeholder="Enter your address line 1"
        label="Address Line 1"
        name="addressLine1"
        type="text"
      />
      <TextField
        placeholder="Enter your address line 2"
        label="Address Line 2"
        name="addressLine2"
        type="text"
      />
      <TextField
        placeholder="Enter your city"
        label="City"
        name="city"
        type="text"
      />
      <TextField
        placeholder="Enter your region"
        label="Region"
        name="region"
        type="text"
      />
      <TextField
        placeholder="Enter your zip code"
        label="Zip Code"
        name="zipCode"
        type="text"
      />
    </>
  );
}
