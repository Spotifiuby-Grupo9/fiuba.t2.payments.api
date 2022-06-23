const wallet = require("../database/schemas/wallet.js");

const Wallet = wallet.schema();

const saveWallet = () => async (wallet, uid) => {
  const newWallet = new Wallet({
    address: wallet.address,
    privateKey: wallet.privateKey,
    uid: uid,
  });

  newWallet.save().then(() => console.log("new wallet added: ", newWallet));

  const result = {
    id: newWallet._id.toString(),
    address: wallet.address,
    privateKey: wallet.privateKey,
    uid: uid,
  };

  return result;
};

const getAll = () => () => {
  return Wallet.find();
};

const get = () => uid => {
  return Wallet.find({ uid: uid });
};

module.exports = {
  saveWallet: saveWallet(),
  getAll: getAll(),
  get: get(),
};
