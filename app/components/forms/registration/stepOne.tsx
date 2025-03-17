import TextField from "@/app/components/common/TextField/TextField";
import PasswordStrengthMeter from "@/app/components/common/PasswordStrengthMeter/PasswordStrengthMeter";
import Select from "@/app/components/common/Select/Select";
import CheckBox from "@/app/components/common/CheckBox/CheckBox";
import Link from "next/link";

const countries = [
  { value: "at", label: "Austria" },
  { value: "be", label: "Belgium" },
  { value: "br", label: "Brazil" },
  { value: "bg", label: "Bulgaria" },
  { value: "cl", label: "Chile" },
  { value: "co", label: "Colombia" },
  { value: "cy", label: "Cyprus" },
  { value: "cz", label: "Czech Republic" },
  { value: "dk", label: "Denmark" },
  { value: "ee", label: "Estonia" },
  { value: "fi", label: "Finland" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "gr", label: "Greece" },
  { value: "hu", label: "Hungary" },
  { value: "ie", label: "Ireland" },
  { value: "it", label: "Italy" },
  { value: "lv", label: "Latvia" },
  { value: "lt", label: "Lithuania" },
  { value: "lu", label: "Luxemburg" },
  { value: "mt", label: "Malta" },
  { value: "mx", label: "Mexico" },
  { value: "nl", label: "Netherlands" },
  { value: "no", label: "Norway" },
  { value: "pe", label: "Peru" },
  { value: "pl", label: "Poland" },
  { value: "pt", label: "Portugal" },
  { value: "ro", label: "Romania" },
  { value: "sk", label: "Slovakia" },
  { value: "si", label: "Slovenia" },
  { value: "es", label: "Spain" },
  { value: "se", label: "Sweden" },
  { value: "ch", label: "Switzerland" },
  { value: "gb", label: "United Kingdom" },
  { value: "us", label: "United States" },
];

interface StepOneProps {
  values: {
    email: string;
    password: string;
    country: string;
    terms: boolean;
    newsLetterSubscription: boolean;
  };
  setFieldValue: (field: string, value: string | boolean) => void;
}

export default function StepOne({ values, setFieldValue }: StepOneProps) {
  return (
    <div className="mb-8">
      <TextField
        label="Email address"
        name="email"
        type="email"
        placeholder="you@example.com"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        placeholder=""
      />
      <PasswordStrengthMeter password={values.password} className="mb-8" />
      <Select
        name="country"
        label="Country of your business"
        options={countries}
        value={values.country}
        onChange={(value) => setFieldValue("country", value)}
        showFlag={true}
      />
      <CheckBox name="terms">
        <p>
          By ticking this box you accept the{" "}
          <Link href="/terms" className="underline">
            Terms and Conditions
          </Link>{" "}
          and acknowledge that you have read and understood the{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
        </p>
      </CheckBox>
      <CheckBox name="newsLetterSubscription">
        <p>
          (Optional) We will occasionally contact you with our latest news and
          offers. You can unsubscribe at any time. By ticking this box you
          indicate that you do not want to be contacted.
        </p>
      </CheckBox>
    </div>
  );
}
