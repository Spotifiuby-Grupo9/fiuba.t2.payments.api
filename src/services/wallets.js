const ethers = require("ethers");
const wallet = require("../database/schemas/wallet.js");
// const accounts = [];

const Wallet = wallet.schema();

const getDeployerWallet = ({ config }) => () => {
  const provider = new ethers.providers.InfuraProvider(config.network, config.infuraApiKey);
  const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
  console.log("Deployer wallet" + wallet.address);
  return wallet;
};

const createWallet = () => async uid => {
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  // This may break in some environments, keep an eye on it
  const wallet = ethers.Wallet.createRandom().connect(provider);

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

const getWalletsData = () => () => {
  return Wallet.find();
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
