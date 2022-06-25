const ethers = require("ethers");
const paymentRepository = require("../repository/paymentRepository.js");

const TRANSACTION_SUCCESS = 1;

const getContract = (config, wallet) => {
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};

const deposit = ({ config }) => async (senderWallet, amountToSend, uid) => {
  //Not best practice, but for now it works
  const basicPayments = await getContract(config, senderWallet);
  const tx = await basicPayments.deposit({
    value: await ethers.utils.parseEther(amountToSend).toHexString(),
  });
  await tx.wait(TRANSACTION_SUCCESS).then(
    receipt => async () => {
      console.log("Transaction mined");
      const firstEvent = receipt && receipt.events && receipt.events[0];
      console.log(firstEvent);
      if (!(firstEvent && firstEvent.event == "DepositMade")) {
        console.error(`Payment not created in tx ${tx.hash}`);
      }
    },
    error => {
      const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
      const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
      console.error("reasons List");
      console.error(reasonsList);

      console.error("message");
      console.error(message);
    },
  );
  await paymentRepository.save(tx.hash, uid, Date.now());
  return tx;
};

const getDepositReceipt = ({}) => async depositTxHash => {
  return paymentRepository.get(depositTxHash);
};

module.exports = dependencies => ({
  deposit: deposit(dependencies),
  getDepositReceipt: getDepositReceipt(dependencies),
});
