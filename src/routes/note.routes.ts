import express, { Request, Response, Router } from "express";
import NoteService from "../services/Note.service";
import NoteEntity from "../entity/Note.entity";
import { IParams } from "./routes.d";
import { IMessageWithSuccess } from "../services/services.d";
const router: Router = express.Router();

router.get("/list", async (req: Request, res: Response) => {
  try {
    const noteList: NoteEntity[] = await new NoteService().list();
    res.json(noteList);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
router.get("/find/:id", async (req: Request, res: Response) => {
  const { id }: IParams = req.params;
  try {
    const note: NoteEntity = await new NoteService().findById(id);
    res.json(note);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
router.delete("/delete/:id", async (req: Request, res: Response) => {
  const { id }: IParams = req.params;
  try {
    const result: IMessageWithSuccess = await new NoteService().delete(id);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
