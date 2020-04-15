import logsController from './logs';
import responseUtility from '../utilities/responseUtility';
import covid19ImpactEstimator from '../estimator';
import appUtilities from '../utilities/appUtilities';

const defaultRegion = {
  name: 'Africa',
  avgAge: 19.7,
  avgDailyIncomeInUSD: 5,
  avgDailyIncomePopulation: 0.71
};

const appController = {};

appController.makeEsimate = (req, res) => {
  const data = req.body;
  if (!req.body.region) {
    data.region = defaultRegion;
  }
  const inputValidator = appUtilities.validateInput(data);

  if (inputValidator.success !== false) {
    const response = covid19ImpactEstimator(data);
    logsController.logNewRequest(req, res);
    responseUtility.success(res, response);
  } else {
    responseUtility.error(res, inputValidator.message);
  }
};

export default appController;
