const sampleData = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

const compareObjectKeys = (a, b) => {
  const aKeys = Object.keys(a).sort();
  const bKeys = Object.keys(b).sort();
  return JSON.stringify(aKeys) === JSON.stringify(bKeys);
};

const compareObjectKeysValueTypes = (a, b) => {
  const aValues = Object.values(a).sort();
  const bValues = Object.values(b).sort();

  let aTypes = '';
  let bTypes = '';

  aValues.forEach(value => {
    aTypes = aTypes.concat(typeof value);
  });
  bValues.forEach(value => {
    bTypes = bTypes.concat(typeof value);
  });
  return aTypes === bTypes;
};

const validateTypesForValues = (data, sample) => compareObjectKeysValueTypes(data, sample);

export default {
  validateInput: data => {
    const equalKeys = compareObjectKeys(data, sampleData);
    const valueTypesValid = validateTypesForValues(data, sampleData);
    const regionValueTypesValid = validateTypesForValues(data.region, sampleData.region);

    if (!equalKeys) {
      return { succes: false, message: 'Invalid Inputs Provided' };
    }if (!(valueTypesValid && regionValueTypesValid)) {
      return { succes: false, message: 'Invalid data types provided' };
    }

    return { succes: equalKeys && valueTypesValid };
  }
};
//# sourceMappingURL=appUtilities.js.map