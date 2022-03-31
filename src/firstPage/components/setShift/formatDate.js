const formatDate = (count = 0) => {
  const dateObj = new Date();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  dateObj.setDate(new Date().getDate() + count);

  return {
    year: dateObj.getFullYear(),
    day: dateObj.getDate(),
    month: dateObj.getMonth() + 1,
    dayName: dayNames[dateObj.getDay()],
  };
};

export default formatDate;
