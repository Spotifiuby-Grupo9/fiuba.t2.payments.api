const ethers = require("ethers");
const payment = require("../database/schemas/payment.js");
// const accounts = [];

const Payment = payment.schema();

const getDeployerWallet = ({ config }) => () => {
  const provider = new ethers.providers.InfuraProvider(config.network, config.infuraApiKey);
  const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
  console.log("Deployer wallet" + wallet.address);
  return wallet;
};

const createWallet = () => async () => {
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  // This may break in some environments, keep an eye on it
  const wallet = ethers.Wallet.createRandom().connect(provider);

  const uid = "jasfRcNOyFZzLJjSlPPWLFAMghD2"; //TODO: remove harcoding, bring param

  const newPayment = new Payment({
    address: wallet.address,
    privateKey: wallet.privateKey,
    uid: uid,
  });

  newPayment.save().then(() => console.log("paymentAdded: ", newPayment));

  const result = {
    id: "TODO", //TODO get from answer
    address: wallet.address,
    privateKey: wallet.privateKey,
    uid: uid,
  };
  return result;
};

const getWalletsData = () => () => {
  return Payment.find();
};

const getWalletData = () => index => {
  return accounts[index - 1]; //TODO
};

const getWallet = ({}) => index => {
  //TODO
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);

  return new ethers.Wallet(accounts[index - 1].privateKey, provider);
};

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWallet: getWallet({ config }),
});
