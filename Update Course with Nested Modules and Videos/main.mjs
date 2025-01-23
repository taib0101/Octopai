import express from "express";
import {
  connectDatabase,
  insertModules,
  insertVideos,
  updateModulesAndVideos,
  deleteModules,
  deleteVideos
} from "./model.mjs";

connectDatabase();

const app = express();
const router = express.Router();

app.use(router);
router.use(express.json());

/**
 * title: Math
 * description: Fundamentals
 *
 * modules
 * moduleName: Algorithm
 *
 * videos
 * videoTitle: Algorithm 01
 * url: www.bro.com
 */
router.post("/insertModules", (req, res) => {
  insertModules(req);
  return res.status(200).send("inserted successfully");
});

router.post("/insertVideos", (req, res) => {
  insertVideos(req);
  return res.status(200).send("inserted successfully");
});

router.put("/updateModulesAndVideos", (req, res) => {
  updateModulesAndVideos(req);
  return res.status(200).send("updated successfully");
});

router.delete("/deleteModules", (req, res) => {
    deleteModules(req);
    return res.status(200).send("deleted successfully");
});

router.delete("/deleteVideos", (req, res) => {
    deleteVideos(req);
    return res.status(200).send("deleted successfully");
});

app.listen(3000, () => {
  console.log("Listening port is 3000 .... ");
});
