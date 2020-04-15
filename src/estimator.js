const InfectionRateByRequestedTime = (currentlyInfected,
  periodType, timeToElapse) => {
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
  return Math.trunc(currentlyInfected * (2 ** (days / 3)));
};

const EstimateBestCase = (data) => {
  const currentlyInfected = Math.trunc(data.reportedCases * 10);
  const infectionsByRequestedTime = InfectionRateByRequestedTime(currentlyInfected,
    data.periodType, data.timeToElapse);
  const severeCasesByRequestedTime = Math.trunc(infectionsByRequestedTime * (15 / 100));
  const hospitalBedsByRequestedTime = Math.trunc(data.totalHospitalBeds * (35 / 100));
  const casesForICUByRequestedTime = Math.trunc(infectionsByRequestedTime * (5 / 100));
  const casesForVentilatorsByRequestedTime = Math.trunc(infectionsByRequestedTime * (2 / 100));
  const dollarsInFlight = (
    Math.trunc(infectionsByRequestedTime * 0.65)
      * data.region.avgDailyIncomeInUSD * data.timeToElapse);

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
  const currentlyInfected = data.reportedCases * 50;
  const infectionsByRequestedTime = InfectionRateByRequestedTime(currentlyInfected,
    data.periodType, data.timeToElapse);
  const severeCasesByRequestedTime = Math.trunc(infectionsByRequestedTime * (15 / 100));
  const hospitalBedsByRequestedTime = Math.trunc(data.totalHospitalBeds * (35 / 100));
  const casesForICUByRequestedTime = Math.trunc(infectionsByRequestedTime * (5 / 100));
  const casesForVentilatorsByRequestedTime = Math.trunc(infectionsByRequestedTime * (2 / 100));
  const dollarsInFlight = (
    Math.trunc(infectionsByRequestedTime * 0.65)
      * data.region.avgDailyIncomeInUSD * data.timeToElapse);

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
