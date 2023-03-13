import express from "express";
import NoteService from "../services/Note.service";
const router = express.Router();



router.get("/list", async (req, res) => {
  try {
    const noteList = await new NoteService().list();
    res.json(noteList);
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
    const note = await new NoteService().findById(id);
    res.json(note);
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
    const result = await new NoteService().delete(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


export default router;
