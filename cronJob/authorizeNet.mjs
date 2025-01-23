// URL: https://developer.authorize.net/api/reference/index.html#payment-transactions
// https://github.com/AuthorizeNet/sdk-node?tab=readme-ov-file

import AuthorizeNet from "authorizenet";
import { Model } from "./model.mjs";

const users = ["Taib", "Tajin", "Sakib"];

const {
  MerchantAuthenticationType,
  CreditCardType,
  PaymentType,
  TransactionRequestType,
  CreateTransactionRequest,
  CreateTransactionResponse,
} = AuthorizeNet.APIContracts;

const { CreateTransactionController } = AuthorizeNet.APIControllers;

export const authorizeNet = async () => {
  try {
    const apiLoginId = "API_LOGIN_ID";
    const transactionKey = "TRANSACTION_KEY";

    const merchantAuthenticationType = await new MerchantAuthenticationType({
      name: apiLoginId,
      transactionKey: transactionKey,
    });

    for (let i = 0; i < users.length; ++i) {
      // read data from database
      const UserData = await Model.findOne({ name: users[i] });

      if (UserData.status != "active" || UserData === null) {
        throw new Error("User is not active or User does not exists");
      }

      const creditCardType = await new CreditCardType({
        cardNumber: UserData.paymentDetails.cardNumber,
        cardCode: UserData.paymentDetails.cvc,
        expirationDate: UserData.paymentDetails.expiryDate,
      });

      const paymentType = await new PaymentType({
        creditCard: creditCardType,
      });

      const transactionRequestType = await new TransactionRequestType({
        transactionRequestType:
          AuthorizeNet.APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION,
        payment: paymentType,
        amount: 97.0,
      });

      const createTransactionRequest = await new CreateTransactionRequest({
        merchantAuthentication: merchantAuthenticationType,
        transactionRequest: transactionRequestType,
      });

      const createTransactionController = await new CreateTransactionController(
        createTransactionRequest.getJSON()
      );

      await createTransactionController.execute(async () => {
        try {
          const apiResponse = await createTransactionController.getResponse();

          if (apiResponse === null) throw new Error("Transaction failed");
          const response = await new CreateTransactionResponse(apiResponse);

          //pretty print response
          // console.log(JSON.stringify(response, null, 2));

          if (response === null) throw new Error("Transaction failed");

          if (response.messages.resultCode !== "Error") {
            console.log("Successfully charged user:", UserData.name);
          } else {
            throw new Error(response.messages.message[0].text);
          }

          // user delete after giving payment
          await Model.deleteOne({ name: UserData.name });
        } catch (error) {
          console.log("Transaction Error :", error.message);
        }
      });
    }
  } catch (error) {
    console.log("AuthorizedNet Error :", error.message);
  }
};
