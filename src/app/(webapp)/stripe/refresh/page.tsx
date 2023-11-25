const StripeRefresh = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <p className="border rounded-2xl py-14 px-8 text-[14px] max-w-[286px] lg:px-20 lg:py-20 text-white lg:text-[18px] font-semibold bg-[rgba(78,78,97,0.50)] md:max-w-[568px] md:text-[16px] lg:max-w-[768px] mx-auto text-center">
        We're sorry, but it seems your session has ended. Creating an account
        requires a bit of time, and it looks like yours has run out. What can
        you do now? No worries! You can simply go back to the beginning and
        start the account creation process again. Just click the button below,
        and you'll be on your way to enjoying all the benefits of our service.
      </p>
    </div>
  );
};

export default StripeRefresh;
