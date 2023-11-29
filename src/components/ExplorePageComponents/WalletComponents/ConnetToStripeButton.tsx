import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connetToStripe_Fetch } from "@/services/contactService";
import { getServerSession } from "next-auth";
import Link from "next/link";

const connectToStripe = async (token: string) => {
  try {
    const req = await connetToStripe_Fetch({ token });
    return {
      data: await req.json(),
      status: req.status,
    };
  } catch (error) {
    console.error(error);
  }
};
const ConnetToStripeButton = async () => {
  const session = await getServerSession(authOptions);
  // check to see user info is complete or not
  if (!session?.user.name || !session.user.email) {
    return (
      <div className="w-full text-center bg-[#666680] rounded-2xl py-2 space-x-2">
        <span className="text-white">
          Please complete your informatoin first:
        </span>
        <Link
          href={`/web-app/setting/account/general-info`}
          className="underline hover:text-[#3f3f6f]"
        >
          Click Here
        </Link>
      </div>
    );
  }
  const token = session?.user.token || "";
  const stripe = await connectToStripe(token);
  //   console.log(stripe, "stripe");
  return stripe?.status === 200 ? (
    <Link
      href={`${stripe?.data.url}`}
      className="rounded-2xl border border-dashed border-[#666680] text-[14px] leading-none capitalize text-center text-[#A2A2B5] flex items-center justify-center gap-2 py-5"
    >
      <span>Connet To Stripe</span>
    </Link>
  ) : (
    <div className="w-full text-center bg-[#666680] rounded-2xl py-2 space-x-2">
      Can not connet to Stripe at this moment. Please try again later.
    </div>
  );
};

export default ConnetToStripeButton;
