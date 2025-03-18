import TextField from "@/app/components/common/TextField/TextField";
import PasswordStrengthMeter from "@/app/components/common/PasswordStrengthMeter/PasswordStrengthMeter";
import Select from "@/app/components/common/Select/Select";
import CheckBox from "@/app/components/common/CheckBox/CheckBox";
import Link from "next/link";

const countries = [
  { value: "at", label: "Austria", areaCode: "+43" },
  { value: "be", label: "Belgium", areaCode: "+32" },
  { value: "br", label: "Brazil", areaCode: "+55" },
  { value: "bg", label: "Bulgaria", areaCode: "+359" },
  { value: "cl", label: "Chile", areaCode: "+56" },
  { value: "co", label: "Colombia", areaCode: "+57" },
  { value: "cy", label: "Cyprus", areaCode: "+357" },
  { value: "cz", label: "Czech Republic", areaCode: "+420" },
  { value: "dk", label: "Denmark", areaCode: "+45" },
  { value: "ee", label: "Estonia", areaCode: "+372" },
  { value: "fi", label: "Finland", areaCode: "+358" },
  { value: "fr", label: "France", areaCode: "+33" },
  { value: "de", label: "Germany", areaCode: "+49" },
  { value: "gr", label: "Greece", areaCode: "+30" },
  { value: "hu", label: "Hungary", areaCode: "+36" },
  { value: "ie", label: "Ireland", areaCode: "+353" },
  { value: "it", label: "Italy", areaCode: "+39" },
  { value: "lv", label: "Latvia", areaCode: "+371" },
  { value: "lt", label: "Lithuania", areaCode: "+370" },
  { value: "lu", label: "Luxemburg", areaCode: "+352" },
  { value: "mt", label: "Malta", areaCode: "+356" },
  { value: "mx", label: "Mexico", areaCode: "+52" },
  { value: "nl", label: "Netherlands", areaCode: "+31" },
  { value: "no", label: "Norway", areaCode: "+47" },
  { value: "pe", label: "Peru", areaCode: "+51" },
  { value: "pl", label: "Poland", areaCode: "+48" },
  { value: "pt", label: "Portugal", areaCode: "+351" },
  { value: "ro", label: "Romania", areaCode: "+40" },
  { value: "sk", label: "Slovakia", areaCode: "+421" },
  { value: "si", label: "Slovenia", areaCode: "+386" },
  { value: "es", label: "Spain", areaCode: "+34" },
  { value: "se", label: "Sweden", areaCode: "+46" },
  { value: "ch", label: "Switzerland", areaCode: "+41" },
  { value: "gb", label: "United Kingdom", areaCode: "+44" },
  { value: "us", label: "United States", areaCode: "+1" },
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
