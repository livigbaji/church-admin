// OTPInput.tsx
import React, { useState, useRef } from "react";

interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({ length, onComplete }) => {
  const inputRefs = Array.from({ length }, () =>
    useRef<HTMLInputElement | null>(null)
  );
  const [otp, setOTP] = useState<string[]>(Array(length).fill(""));

  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const updatedOTP = [...otp];
      updatedOTP[index] = value;
      setOTP(updatedOTP);

      if (value !== "" && index < length - 1) {
        const nextInput = inputRefs[index + 1].current;
        if (nextInput) {
          nextInput.focus();
        }
      }

      if (value === "" && index > 0) {
        const prevInput = inputRefs[index - 1].current;
        if (prevInput) {
          prevInput.focus();
        }
      }

      if (updatedOTP.every((digit) => digit !== "")) {
        onComplete(updatedOTP.join(""));
      }
    } else if (value === "") {
      // Handle deletion properly by setting the current input value to empty and moving focus to the same input.
      const updatedOTP = [...otp];
      updatedOTP[index] = "";
      setOTP(updatedOTP);

      const currentInput = inputRefs[index].current;
      if (currentInput) {
        currentInput.focus();
      }
    }
  };

  return (
    <div>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          value={otp[index]}
          maxLength={1}
          onChange={(event) => handleChange(index, event.target.value)}
          ref={(el) => (inputRefs[index].current = el)}
          className="bg-white h-12 w-12 mx-2.5 border border-[#999] rounded-[5px] outline-none pl-4"
        />
      ))}
    </div>
  );
};

// export default OTPInput;

// export default OTPInput;

// export default OTPInput;

// className="bg-white h-12 w-12 mx-2.5 border border-[#999] rounded-[5px] outline-none pl-4"
