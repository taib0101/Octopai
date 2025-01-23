import swaggerJSDoc from "swagger-jsdoc";

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a file to Cloudinary
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: URL of the uploaded file on Cloudinary
 *                 size:
 *                   type: integer
 *                   description: Size of the uploaded file in bytes
 *                 type:
 *                   type: string
 *                   description: MIME type of the uploaded file
 *       401:
 *         description: Unauthorized. Missing or invalid authentication token.
 */

const options = {
    definition: {
      openapi: "3.1.0",
      servers: [
        {
          url: "http://127.0.0.1:3000",
        },
      ],
    },
    apis: ["./swagger.mjs"],
  };
  
export const specs = swaggerJSDoc(options);
