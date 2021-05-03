const apiUrl = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changableUrl = apiUrl;
  if (country) {
    changableUrl = `${apiUrl}/countries/${country}`;
  }
  const { confirmed, recovered, deaths, lastUpdate } = await fetch(
    changableUrl
  ).then((response) => response.json());
  return {
    confirmed,
    recovered,
    deaths,
    lastUpdate,
  };
};

export const fetchDataDaily = async () => {
  const data = await fetch(
    "https://api.covidtracking.com/v1/us/daily.json/"
  ).then((res) => res.json());
  const modifiedData = data.slice(0, 30).map((dailyData) => ({
    positive: dailyData.totalTestResultsIncrease,
    deaths: dailyData.negativeIncrease,
    date: dailyData.dateChecked,
  }));
  return modifiedData;
};

export const fetchedCountries = async () => {
  const { countries } = await fetch(`${apiUrl}/countries`).then((response) =>
    response.json()
  );
  return countries.map((country) => country.name);
};
