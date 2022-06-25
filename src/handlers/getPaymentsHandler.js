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

function handler({ paymentsSerive }) {
  return async function (req, reply) {
    const body = await paymentsSerive.getAll(req.params.uid);
    return reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
