import NigerianDifferentDay from "./NegerianDifferentDay";

export const TodayPerChange = (accountValue, perchange) => {
  const temp = (perchange * 100) / (accountValue == 0 ? 1 : accountValue);
  return temp;
};

export const AnnualReturn = (investmentValue, currentValue, createDate) => {
  const temp =
    ((1 +
      (currentValue - investmentValue) /
        (investmentValue == 0 ? 1 : investmentValue)) **
      (365 / (NigerianDifferentDay(createDate) % 365)==0?1:(NigerianDifferentDay(createDate) % 365)) -
      1) *
    100;
  return temp;
};
