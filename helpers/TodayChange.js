import NigerianDifferentDay from "./NegerianDifferentDay";

export const TodayPerChange = (accountValue, perchange) => {
  const temp = (perchange * 100) / (accountValue == 0 ? 1 : accountValue);
  return temp;
};

export const AnnualReturn = (investmentValue, currentValue, createDate) => {

  console.log('..................', (NigerianDifferentDay(createDate) % 365)==0?1:(NigerianDifferentDay(createDate) % 365));

 const daydiffresult = (NigerianDifferentDay(createDate) % 365)==0?1:(NigerianDifferentDay(createDate) % 365)
  const temp =
    ((1 +
      (currentValue - investmentValue) /
        (investmentValue == 0 ? 1 : investmentValue)) **
      (365 / daydiffresult) -
      1) *
    100;
  return temp;
};
