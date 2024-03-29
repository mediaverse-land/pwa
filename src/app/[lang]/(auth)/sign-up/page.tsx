import OTPForm from "@/components/Forms/OTPForm";
import Motion from "@/components/motion";
import Image from "next/image";
import Link from "next/link";

const SignUp = () => {
  return (
    <Motion>
      <div className="mt-36 lg:mt-28">
        <OTPForm />
      </div>
    </Motion>
  );
};

export default SignUp;
