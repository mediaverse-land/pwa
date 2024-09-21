"use client";

import { useState } from "react";
import RequestOTPForm from "./RequestOTP";
import RegisterOTPForm from "./RegisterOTP";

const OtpForm = () => {
  const [formState, setFormState] = useState<"requestOTP" | "registerOTP">(
    "requestOTP"
  );
  const [formFields, setFormFields] = useState({
    cellPhone: "",
    expireTime: 0,
  });

  return (
    <div className="flex flex-col items-stretch gap-4 justify-between grow">
      {formState === "requestOTP" ? (
        <RequestOTPForm
          setFormFields={setFormFields}
          setFormState={setFormState}
          cellphone={formFields.cellPhone}
        />
      ) : (
        <RegisterOTPForm
          cellPhone={formFields.cellPhone}
          initialCounter={formFields.expireTime}
          setFormState={setFormState}
        />
      )}
    </div>
  );
};

export default OtpForm;
