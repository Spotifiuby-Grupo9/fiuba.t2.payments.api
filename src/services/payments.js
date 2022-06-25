const paymentRepository = require("../repository/paymentRepository.js");

const get = () => async depositTxHash => {
  return paymentRepository.get(depositTxHash);
};

const save = () => async (date, depositTxHash, uid) => {
  validateData(date, depositTxHash, uid);
  return paymentRepository.save(date, depositTxHash, uid);
};

const getAll = () => async uid => {
  return paymentRepository.getAll(uid);
};

const validateData = () => (date, depositTxHash, uid) => {
  if (!date) {
    throw new Error("invalid date");
  } else if (!depositTxHash) {
    throw new Error("invalid depositTxHash");
  } else if (!uid) {
    throw new Error("invalid uid");
  }
};

module.exports = {
  get: get(),
  save: save(),
  getAll: getAll(),
};
