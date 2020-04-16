const getElapsedDays = (periodType, timeToElapse) => {
  let days = 0;
  switch (periodType) {
    case 'days':
      days = timeToElapse;
      break;
    case 'weeks':
      days = 7 * timeToElapse;
      break;
    case 'months':
      days = 30 * timeToElapse;
      break;
    default:
      days = 30;
      break;
  }
  return days;
};

//  const factor = 2 ** Math.trunc(days / 3);
const InfectionRateByRequestedTime = (currentlyInfected, days) => currentlyInfected
  * 1024 * (days / 30);

const EstimateBestCase = (data) => {
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = data.region;
  const { periodType, timeToElapse, reportedCases } = data;

  const elapsedDays = getElapsedDays(periodType, timeToElapse);

  const currentlyInfected = Math.trunc(reportedCases * 10);
  const infectionsByRequestedTime = InfectionRateByRequestedTime(currentlyInfected, elapsedDays);
  const severeCasesByRequestedTime = Math.trunc(infectionsByRequestedTime * (15 / 100));
  const hospitalBedsByRequestedTime = Math.trunc(data.totalHospitalBeds * (35 / 100));
  const casesForICUByRequestedTime = Math.trunc(infectionsByRequestedTime * (5 / 100));
  const casesForVentilatorsByRequestedTime = Math.trunc(infectionsByRequestedTime * (2 / 100));
  const dollarsInFlight = Math.trunc(
    (infectionsByRequestedTime * avgDailyIncomePopulation)
    * avgDailyIncomeInUSD
    * elapsedDays
  );

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

const EstimateSevereCase = (data) => {
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = data.region;
  const { periodType, timeToElapse, reportedCases } = data;

  const elapsedDays = getElapsedDays(periodType, timeToElapse);

  const currentlyInfected = Math.trunc(reportedCases * 10);
  const infectionsByRequestedTime = InfectionRateByRequestedTime(currentlyInfected, elapsedDays);
  const severeCasesByRequestedTime = Math.trunc(infectionsByRequestedTime * (15 / 100));
  const hospitalBedsByRequestedTime = Math.trunc(data.totalHospitalBeds * (35 / 100));
  const casesForICUByRequestedTime = Math.trunc(infectionsByRequestedTime * (5 / 100));
  const casesForVentilatorsByRequestedTime = Math.trunc(infectionsByRequestedTime * (2 / 100));
  const dollarsInFlight = Math.trunc(
    (infectionsByRequestedTime * avgDailyIncomePopulation)
    * avgDailyIncomeInUSD
    * elapsedDays
  );

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

const covid19ImpactEstimator = (data) => ({
  data,
  impact: EstimateBestCase(data),
  severeImpact: EstimateSevereCase(data)
});

export default covid19ImpactEstimator;
