import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  email: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  planStartDate: Date,
  planEndDate: Date,
  paymentDetails: {
    cardNumber: String,
    cvc: String,
    expiryDate: String,
  }
}, {
    versionKey: false
});

export const Model = mongoose.model("cronJob", schema);

export const databaseConnect = () => {
  const URI = "mongodb://127.0.0.1/Octopi";
  mongoose.connect(URI);
  console.log("Database Connected");
};

export const insertUserToDatabase = (users) => {
  try {
    users.forEach((value) => {
      const data = Model({
        name: value.name,
        email: value.email,
        planStartDate: new Date(Date.now()).toLocaleString(),
        planEndDate: new Date(
          Date.now() + 1000 * 60 * 60 * 24
        ).toLocaleString(),
        paymentDetails: {
          cardNumber: value.cardNumber,
          cvc: value.cvc,
          expiryDate: value.expiryDate,
        },
      });

      data.save();
    });
  } catch (error) {
    console.log("Insert Error: ", error.message);
  }
};
