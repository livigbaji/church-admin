import { OTPInput } from "@/components/auth";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAppDispatch } from "@/store";
import { setCredentials } from "@/features";
// import OTPInput from "./OTPInput";

const EnterOTPPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  function handleClick() {
    dispatch(
      setCredentials({
        rememberMe: false,
        user: {
          first_name: "John",
          last_name: "Doe",
          fullName: "John Doe",
        },
        access_token: "yyyyyyyy",
        // userType: data.userType,
      })
    );
    navigate("/dashboard");
  }
  const handleOTPComplete = (otp: string) => {
    // Here, you can implement the logic to verify the OTP entered by the user.
    // For example, make API calls to verify the OTP with a backend service.
    setOtp(otp);
  };

  console.log(otp);

  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <section className=" flex flex-col justify-center items-center ">
        <h1 className="text-black text-2xl md:text-[35px] font-bold">
          Tech Unit Attendance
        </h1>
        <p className="text-text_light text-sm font-normal text-center mt-4xx">
          Code has been sent to +234 903 847 6802
        </p>
        <div className="mt-10">
          <OTPInput length={6} onComplete={handleOTPComplete} />
        </div>
        <p className="text-text_light text-sm font-normal text-center mt-10">
          Didn’t receive code? Request again
        </p>
        <button
          className="bg-primary h-10 w-full text-white mt-6 rounded-md hover:scale-105 hover:opacity-80 transition"
          onClick={handleClick}
        >
          CONTINUE
        </button>
      </section>
    </main>
  );
};

export default EnterOTPPage;
