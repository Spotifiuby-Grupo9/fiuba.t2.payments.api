function schema() {
  return {
    params: {
      type: "object",
      properties: {
        uid: {
          type: "string",
        },
      },
    },
    required: ["uid"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    const body = await walletService.getWalletData(req.params.uid);
    reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
