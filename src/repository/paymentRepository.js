const payment = require("../database/schemas/payment.js");

const Payment = payment.schema();

const save = () => async (payment, senderUid, date) => {
  const newPayment = new Payment({
    hash: payment.hash,
    senderUid: senderUid,
    date: date,
  });

  newPayment.save().then(() => console.log("new payment added: ", newPayment));

  const result = {
    id: newPayment._id.toString(),
    hash: payment.hash,
    senderUid: senderUid,
  };

  return result;
};

const getAll = () => () => {
  return Payment.find();
};

const get = () => hash => {
  return Payment.findOne({ hash: hash });
};

module.exports = {
  save: save(),
  getAll: getAll(),
  get: get(),
};
