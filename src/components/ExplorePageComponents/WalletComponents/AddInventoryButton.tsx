import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { INACTIVE_PLUS } from "@/components/SVG/svgs";
import { getStripeGateway } from "@/services/contactService";
import { getServerSession } from "next-auth";
import Link from "next/link";
const getGatewayData = async (token: string) => {
  try {
    const req = await getStripeGateway({ token });
    return {
      data: await req.json(),
      status: req.status,
    };
  } catch (error) {
    console.error(error);
  }
};

const AddInventoryButton = async () => {
  const session = await getServerSession(authOptions);
  // check to see user info is complete or not
  if (!session?.user.name || !session.user.email) {
    return (
      <div className="w-full text-center bg-[#666680] rounded-2xl py-2 space-x-2">
        <span className="font-semibold">
          Please complete your informatoin first:
        </span>
        <Link
          href={`/explore?section=setting&page=info`}
          className="underline hover:text-[#3f3f6f]"
        >
          Click Here
        </Link>
      </div>
    );
  }
  const token = session?.user.token || "";
  const gateway = await getGatewayData(token);
  console.log(gateway, "gateway");
  return gateway?.status === 200 ? (
    <Link
      href={`${gateway?.data.url}`}
      className="rounded-2xl border border-dashed border-[#666680] text-[14px] leading-none capitalize text-center text-[#A2A2B5] flex items-center justify-center gap-2 py-5"
    >
      <span>Add Inventory</span>
      <span>
        <INACTIVE_PLUS fill="#A2A2B5" />
      </span>
    </Link>
  ) : (
    <div className="w-full text-center bg-[#666680] rounded-2xl py-2 space-x-2">
      Can not connet to Stripe in this moment. Please try again later.
    </div>
  );
};

export default AddInventoryButton;
