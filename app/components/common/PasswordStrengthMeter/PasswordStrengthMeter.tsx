"use client";
import React from "react";
import zxcvbn from "zxcvbn";

interface PasswordStrengthMeterProps {
  password: string;
}
const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = React.memo(
  ({ password }) => {
    const calculatePasswordStrength = (password: string) => {
      const result = zxcvbn(password);
      if (password.length < 8) {
        return (
          <span className="text-gray-500 font-semibold">
            Password must be at least 8 characters long.
          </span>
        );
      }
      if (result.score === 1 || result.score === 0) {
        return (
          <span className="text-red-500 font-semibold">
            This password could be easily guessed.
          </span>
        );
      }
      if (result.score === 2) {
        return (
          <>
            <span className="text-orange-500 font-semibold">
              This password is moderately strong.
            </span>
            <span> Add letters, numbers, and special characters.</span>
          </>
        );
      }
      if (result.score === 3) {
        return (
          <>
            <span className="text-orange-500 font-semibold">
              This password could be stronger.
            </span>
            <span> Add letters, numbers, and special characters.</span>
          </>
        );
      }
      if (result.score === 4) {
        return (
          <>
            <span className="text-green-500 font-semibold">
              This password is strong.
            </span>
            <span> Well done!</span>
          </>
        );
      }
      {
        return null;
      }
    };

    return (
      <>
        <div className="w-full bg-slate-300 h-1 rounded-full">
          <div
            className={`w-1/2 h-1 rounded-full ${
              password.length < 8
                ? "bg-gray-700"
                : zxcvbn(password).score === 4
                ? "bg-green-500"
                : zxcvbn(password).score === 3
                ? "bg-orange-500"
                : zxcvbn(password).score === 2
                ? "bg-orange-500"
                : zxcvbn(password).score === 1 || zxcvbn(password).score === 0
                ? "bg-red-500"
                : ""
            }`}
            style={{
              width: `${
                (zxcvbn(password).score === 0 ? 1 : zxcvbn(password).score) * 25
              }%`,
            }}
          ></div>
        </div>
        <p className="text-sm mt-2 mb-4">
          {calculatePasswordStrength(password)}
        </p>
      </>
    );
  }
);

PasswordStrengthMeter.displayName = "PasswordStrengthMeter";
export default PasswordStrengthMeter;
