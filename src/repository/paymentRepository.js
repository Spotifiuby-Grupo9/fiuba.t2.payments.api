const payment = require("../database/schemas/payment.js");

const Payment = payment.schema();

const save = () => async (hash, senderUid, date) => {
  const newPayment = new Payment({
    hash: hash,
    senderUid: senderUid,
    date: date,
  });

  newPayment.save().then(() => console.log("new payment added: ", newPayment));

  const result = {
    id: newPayment._id.toString(),
    hash: hash,
    senderUid: senderUid,
  };

  return result;
};

const getAll = () => async uid => {
  return Payment.find({ uid: uid });
};

const get = () => async hash => {
  return Payment.findOne({ hash: hash });
};

module.exports = {
  save: save(),
  getAll: getAll(),
  get: get(),
};
