function schema() {
  return {
    params: {
      type: "object",
      properties: {
        id: {
          type: "integer",
        },
        uid: {
          type: "string",
        },
      },
    },
    required: ["id", "uid"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    const body = await walletService.createWallet(req.body.uid);
    return reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
