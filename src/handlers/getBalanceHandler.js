function schema() {
  return {
    params: {
      type: "object",
      properties: {
        uid: {
          type: "string",
        },
        current_user: {
          type: "string",
        },
        admin: {
          type: "boolean",
        },
      },
    },
    required: ["uid"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    const body = await walletService.getWalletBalance(req.query.uid);
    response = {
      status: "success",
      ether: body / Math.pow(10, 18) + " ETH",
    };
    return reply.code(201).send(response);
  };
}

module.exports = { handler, schema };
