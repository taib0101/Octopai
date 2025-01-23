import jwt from "jsonwebtoken";

const user = "taib";
const password = "1234";
const secretKey = "Symectric Secret Key but Assymetric Secret we need to generate public and private key";

const token = jwt.sign(
  {
    user,
    password,
  },
  secretKey
);

// console.log("token :", token);

const generatedToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGFpYiIsInBhc3N3b3JkIjoiMTIzNCIsImlhdCI6MTczNzYyNDkxN30.c9XiKwDdSlPzzcAvX_2fKB330C25yJww8sXfPzhpvJM";

export const verify = async (req, res, next) => {
  try {
    const verified = await jwt.verify(req.headers.token, secretKey);
    console.log(verified);
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};
