import TextField from "@/app/components/common/TextField/TextField";
import PhoneField from "@/app/components/common/phoneField/phoneFiled";

interface StepTwoProps {
  values: {
    companyName: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    region: string;
    zipCode: string;
  };
  setFieldValue: (field: string, value: string) => void;
}

export default function StepTwo({ values, setFieldValue }: StepTwoProps) {
  return (
    <div className="space-y-4">
      <TextField
        placeholder="Enter your company name"
        label="Company Name"
        name="companyName"
        type="text"
      />
      <PhoneField
        name="phoneNumber"
        label="Phone Number"
        setFieldValue={setFieldValue}
        value={values.phoneNumber}
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
    </div>
  );
}
