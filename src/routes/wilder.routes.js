import express from "express";
import WilderService from "../services/Wilder.service";
const router = express.Router();

router.post("/create", async (req, res) => {
// router.post("/wilder/create", async (req, res) => {
  const { email, first_name, last_name } = req.body;
  let wilder = await new WilderService().createWilder({
    email,
    first_name,
    last_name,
  });
  console.log("wilder", wilder);
  res.send(wilder);
});

router.get("/list", (req, res) => {
// router.get("/wilder/list", (req, res) => {

})
export default router;
