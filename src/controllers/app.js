import responseUtility from '../utilities/responseUtility';
import covid19ImpactEstimator from '../estimator';
import logsController from 'logs';

const appController = {};

appController.makeEsimate = (req, res) => {
  const { data } = req.body;
  const response = covid19ImpactEstimator(data);
  logsController.logNewRequest(req, res);
  responseUtility.success(res, response);
};

export default appController;
