import axios from "axios";

export default () => {
  return axios.create({
    baseURL: `http://cinefinanzas.gear.host/api/Finance/IncomeRegister`
  });
};
