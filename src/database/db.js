mongoose = require("mongoose");

const connection = async () => {
  const uri = "mongodb+srv://user:FOrKF9muEfWunnQ8@spotifiuby-g9.wrf52.mongodb.net/payments-test?retryWrites=true";

  mongoose.connect(uri);

  try {
    await mongoose.connect(uri);
    return mongoose;
  } catch (e) {
    console.error(e);
  }
};

module.exports.connection = connection;
