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

const getDailyIncome = (avgDailyIncome, avgDailyIncomePopulation, days) => avgDailyIncome * avgDailyIncomePopulation / days;

const InfectionRateByRequestedTime = (currentlyInfected, days) => {
  const factor = 2 ** Math.trunc(days / 3);
  return Math.trunc(currentlyInfected * factor);
};

const EstimateBestCase = data => {
  const {
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds
  } = data;

  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = data.region;

  const elapsedDays = getElapsedDays(periodType, timeToElapse);
  const dailyIncome = getDailyIncome(avgDailyIncomeInUSD, avgDailyIncomePopulation, elapsedDays);
  const vacantHospitalBeds = totalHospitalBeds * 0.35;

  const currentlyInfected = Math.trunc(reportedCases * 10);
  const infectionsByRequestedTime = InfectionRateByRequestedTime(currentlyInfected, elapsedDays);
  const severeCasesByRequestedTime = Math.trunc(infectionsByRequestedTime * (15 / 100));
  const hospitalBedsByRequestedTime = Math.trunc(vacantHospitalBeds - severeCasesByRequestedTime);
  const casesForICUByRequestedTime = Math.trunc(infectionsByRequestedTime * (5 / 100));
  const casesForVentilatorsByRequestedTime = Math.trunc(infectionsByRequestedTime * (2 / 100));
  const dollarsInFlight = Math.trunc(dailyIncome * infectionsByRequestedTime);

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

const EstimateSevereCase = data => {
  const {
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds
  } = data;

  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = data.region;

  const elapsedDays = getElapsedDays(periodType, timeToElapse);
  const dailyIncome = getDailyIncome(avgDailyIncomeInUSD, avgDailyIncomePopulation, elapsedDays);
  const vacantHospitalBeds = totalHospitalBeds * 0.35;

  const currentlyInfected = Math.trunc(reportedCases * 50);
  const infectionsByRequestedTime = InfectionRateByRequestedTime(currentlyInfected, elapsedDays);
  const severeCasesByRequestedTime = Math.trunc(infectionsByRequestedTime * (15 / 100));
  const hospitalBedsByRequestedTime = Math.trunc(vacantHospitalBeds - severeCasesByRequestedTime);
  const casesForICUByRequestedTime = Math.trunc(infectionsByRequestedTime * (5 / 100));
  const casesForVentilatorsByRequestedTime = Math.trunc(infectionsByRequestedTime * (2 / 100));
  const dollarsInFlight = Math.trunc(dailyIncome * infectionsByRequestedTime);

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

const covid19ImpactEstimator = data => ({
  data,
  impact: EstimateBestCase(data),
  severeImpact: EstimateSevereCase(data)
});

export default covid19ImpactEstimator;
//# sourceMappingURL=estimator.js.map