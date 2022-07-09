const ethers = require("ethers");
const Web3 = require("web3");
const walletRepository = require("../repository/walletRepository.js");

const getDeployerWallet = ({ config }) => () => {
  const provider = new ethers.providers.InfuraProvider(config.network, config.infuraApiKey);
  const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
  return wallet;
};

const createWallet = () => async uid => {
  const maybeWallet = await walletRepository.get(uid);
  if (uid === undefined) {
    throw new Error("uid is required");
  } else if (maybeWallet != null) {
    throw new Error("user already have a wallet");
  }

  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  // This may break in some environments, keep an eye on it
  const wallet = ethers.Wallet.createRandom().connect(provider);

  return walletRepository.saveWallet(wallet, uid);
};

const getWalletsData = () => () => {
  return walletRepository.getAll(); //TODO: add pagination here
};

const getWalletData = () => uid => {
  return walletRepository.get(uid);
};

const getWallet = ({}) => async uid => {
  const wallet = await walletRepository.get(uid);
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  return new ethers.Wallet(wallet.privateKey, provider);
};

const getWalletBalance = ({ config }) => async uid => {
  const web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/v3/" + config.infuraApiKey));
  console.log("uid", uid);
  const wallet = await walletRepository.get(uid);
  console.log("wallet", wallet);
  return web3.eth.getBalance(wallet.address, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      const ether = web3.utils.fromWei(result, "ether");
      console.log(ether + " ETH");
    }
  });
};

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWallet: getWallet({ config }),
  getWalletBalance: getWalletBalance({ config }),
});
