function schema() {
  return {
    params: {
      type: "object",
      properties: {
        senderId: {
          type: "string",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["senderId", "amountInEthers"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req, reply) {
    const senderWallet = await walletService.getWallet(req.body.senderId);
    const body = await contractInteraction.deposit(senderWallet, req.body.amountInEthers, req.body.senderId);
    return reply.code(201).send(body);    
  };
}

module.exports = { schema, handler };
