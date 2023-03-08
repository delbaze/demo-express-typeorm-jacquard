import express from "express";
import WilderService from "../services/Wilder.service";
const router = express.Router();

router.post("/create", async (req, res) => {
  // http://localhost/wilder/create
  const { first_name, last_name, email } = req.body;
  try {
    const wilder = await new WilderService().createWilder({
      first_name,
      last_name,
      email,
    });

    res.json(wilder);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/list", async (req, res) => {
  try {
    const wilderList = await new WilderService().list();
    res.json(wilderList);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
router.get("/find/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const wilder = await new WilderService().findById(id);
    res.json(wilder);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await new WilderService().delete(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
router.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email } = req.body;

  try {
    const wilder = await new WilderService().update({
      id,
      first_name,
      last_name,
      email,
    });
    res.json(wilder);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.post("/assignNote", async function (req, res) {
  const { wilderId, languageId, note } = req.body;
  try {
    let result = await new WilderService().assignNote({
      languageId,
      wilderId,
      note,
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
