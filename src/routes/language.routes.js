import express from "express";
import LanguageService from "../services/Language.service";
const router = express.Router();

router.post("/create", async (req, res) => {
  // http://localhost/wilder/create
  const { label } = req.body;
  try {
    const language = await new LanguageService().createLanguage({
      label,
    });

    res.json(language);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/list", async (req, res) => {
  try {
    const languageList = await new LanguageService().list();
    res.json(languageList);
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
    const language = await new LanguageService().findById(id);
    res.json(language);
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
    const result = await new LanguageService().delete(id);
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
  const { label } = req.body;

  try {
    const language = await new LanguageService().update({
      id,
      label,
    });
    res.json(language);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
