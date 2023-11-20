import Motion from "../motion";

const WalletSection = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  return (
    <Motion key={"Wallet"} fullHeight>
      <div className="w-full h-full">Wallet</div>
    </Motion>
  );
};

export default WalletSection;
