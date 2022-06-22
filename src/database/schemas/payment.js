mongoose = require("mongoose");

/**
 * Example:
 *  {
 *      "id": 1,
 *      "address": "0xBD62d38B33bD0C82cb6EB8A22181528f910e7568",
 *      "privateKey": "0xeb85bbeb0f136f09f55a15a963433bd17ae32887c1f8857d7fb03f48ca33a5f8",
 *      "uid": "some_uid"
 *  }
 */

const schema = () => {
  return mongoose.model("Payment", {
    address: String,
    privateKey: String,
    uid: String,
  });
};

module.exports.schema = schema;
