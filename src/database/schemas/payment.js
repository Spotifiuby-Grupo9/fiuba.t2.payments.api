mongoose = require("mongoose");

/**
 * Example:
 *  {
 *      "hash": "0x08bd553e7bed42d2e7ddc3b4fc478d48f1633544a470d1cc5169d184f0c2ceea",
 *      "date": "2020-01-01T00:00:00.000Z",
 *      "senderUid": "JASfRcNOyFZzLJjSlPPWLFAMghD3"
 *  }
 */

const schema = () => {
  return mongoose.model("Payment", {
    hash: String,
    date: String,
    senderUid: String,
  });
};

module.exports.schema = schema;
