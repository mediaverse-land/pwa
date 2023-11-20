export const getCurrencySymbol = (currencyCode: string) => {
  return (
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    })
      .formatToParts(0)
      .find((part) => part.type === "currency")?.value || ""
  );
};
