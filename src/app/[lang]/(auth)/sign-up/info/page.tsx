import { authOptions } from "@/data/Auth";
import EditUserInfoForm from "@/components/Forms/EditUserInfo";
import Motion from "@/components/motion";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignUpInfo = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-up");
  }
  return (
    <Motion>
      <div className="mt-28">
        <div className="mx-auto max-w-[500px] lg:max-w-[674px] lg:auth-border-image-source lg:bg-[rgba(78,78,97,0.20)] lg:rounded-3xl px-[2rem] lg:px-[8rem] lg:pt-[3.5rem] lg:pb-[3rem] lg:backdrop-blur-[5px]">
          <EditUserInfoForm />
        </div>
      </div>
    </Motion>
  );
};

export default SignUpInfo;
