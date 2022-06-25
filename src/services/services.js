const walletService = require("./wallets");
const contractInteraction = require("./contractInteraction");
const paymentsService = require("./payments.js");

module.exports = ({ config }) => ({
  walletService: walletService({ config }),
  contractInteraction: contractInteraction({ config }),
  paymentsSerive: paymentsService,
});
