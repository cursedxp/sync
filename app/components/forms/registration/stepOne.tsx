import TextField from "@/app/components/common/TextField/TextField";
import PasswordStrengthMeter from "@/app/components/common/PasswordStrengthMeter/PasswordStrengthMeter";
import Select from "@/app/components/common/Select/Select";
import CheckBox from "@/app/components/common/CheckBox/CheckBox";
import Link from "next/link";
import { countries } from "@/app/lib/countries";

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
    <div className="space-y-4">
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
