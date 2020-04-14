const InfectionRateByRequestedTime = (currentlyInfected, periodType, timeToElapse) => {
    let days = 0;
    switch (periodType) {
      case 'days':
        days = 1 * timeToElapse;
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
    return (currentlyInfected * 1024 * days) / 30;
  };
  
  const EstimateBestCase = (data) => {
    const currentlyInfected = data.reportedCases * 10;
    const infectionsByRequestedTime = InfectionRateByRequestedTime(currentlyInfected,
      data.periodType, data.timeToElapse);
    const severeCasesByRequestedTime = InfectionRateByRequestedTime * (15 / 100);
    const hospitalBedsByRequestedTime = data.totalHospitalBeds * (35 / 100);
    const casesForICUByRequestedTime = infectionsByRequestedTime * (5 / 100);
    const casesForVentilatorsByRequestedTime = infectionsByRequestedTime * (2 / 100);
    const dollarsInFlight = (
      infectionsByRequestedTime * 0.65) * data.avgDailyIncomeInUSD * data.timeToElapse;
  
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
    const severeCasesByRequestedTime = InfectionRateByRequestedTime * (15 / 100);
    const hospitalBedsByRequestedTime = data.totalHospitalBeds * (35 / 100);
    const casesForICUByRequestedTime = infectionsByRequestedTime * (5 / 100);
    const casesForVentilatorsByRequestedTime = infectionsByRequestedTime * (2 / 100);
    const dollarsInFlight = (
      infectionsByRequestedTime * 0.65) * data.avgDailyIncomeInUSD * data.timeToElapse;
  
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
  