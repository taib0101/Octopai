import cron from "node-cron";
import { databaseConnect, insertUserToDatabase } from "./model.mjs";
import { authorizeNet } from "./authorizeNet.mjs";

// connect database
databaseConnect();

// make and insert users
const users = [
  {
    name: "Taib",
    email: "taib@gmail.com",
    cardNumber: "123456",
    cvc: "4321",
    expiryDate: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 30
    ).toLocaleString(),
  },
  {
    name: "Tajin",
    email: "tajin@gmail.com",
    cardNumber: "413256",
    cvc: "8765",
    expiryDate: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 30
    ).toLocaleString(),
  },
  {
    name: "Sakib",
    email: "sakib@gmail.com",
    cardNumber: "321456",
    cvc: "3942",
    expiryDate: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 30
    ).toLocaleString(),
  },
];

// insert user to database
insertUserToDatabase(users);

// this cron schedule run every 24 hours
const job = cron.schedule("0 0 0 * * *", authorizeNet);

job.start();
