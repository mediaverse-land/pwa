import { redirect } from "next/navigation";
import { DELETE_ICON, INACTIVE_PLUS } from "../SVG/svgs";
import Motion from "../motion";
import AddCardAndInventory from "../shared/AddCardAndInventory";
import WalletMainPage from "./WalletComponents/WalletMainPage";
import WalletHistory from "./WalletComponents/WalletHistory";
import BuyAsset from "./WalletComponents/BuyAsset";
import PurchaseResult from "./WalletComponents/PurchaseResult";

const WalletSection = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const walletComponents: {
    [key: string]: {
      component: JSX.Element;
    };
  } = {
    main: {
      component: <WalletMainPage />,
    },
    history: {
      component: <WalletHistory />,
    },
    buy: {
      component: <BuyAsset searchParams={searchParams} />,
    },
    result: {
      component: <PurchaseResult searchParams={searchParams} />,
    },
  };
  const page = searchParams.page || "main";
  return (
    <Motion key={"Wallet"} fullHeight>
      <div className="w-full h-full relative">
        {walletComponents[page]?.component ||
          redirect("/explore?section=wallet&page=main")}
      </div>
    </Motion>
  );
};

export default WalletSection;
