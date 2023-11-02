import EditUserInfoForm from "@/components/Forms/EditUserInfo";
import Motion from "@/components/motion";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SignUpInfo = () => {
  const isEditing = cookies().get("EditUserInfo");
  if (!isEditing || isEditing.value !== "true") {
    redirect("/sign-up");
  }
  return (
    <Motion>
      <div className="mt-28">
        <div
          style={{
            background: `rgba(78, 78, 97, 0.20)`,
          }}
          className="mx-auto max-w-[674px] auth-border-image-source rounded-3xl px-[8rem] pt-[3.5rem] pb-[3rem] backdrop-blur-[5px]"
        >
          <EditUserInfoForm />
        </div>
      </div>
    </Motion>
  );
};

export default SignUpInfo;
