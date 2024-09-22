
 export  const addDaysToDate = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days); // kun qo'shish
  return result;
};