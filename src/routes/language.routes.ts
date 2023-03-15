import express, { Router, Request, Response } from "express";
import LanguageService from "../services/Language.service";
import LanguageEntity from "../entity/Language.entity";
import {
  ILanguageCreate,
  IParams,
  ILanguageUpdateData
} from "./routes.d";

import { IMessageWithSuccess } from "../services/services.d";

const router: Router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
  // http://localhost/wilder/create

  const { label }: ILanguageCreate = req.body;
  try {
    const language: LanguageEntity = await new LanguageService().createLanguage(
      {
        label,
      }
    );

    res.json(language);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/list", async (req: Request, res: Response) => {
  try {
    const languageList: LanguageEntity[] = await new LanguageService().list();
    res.json(languageList);
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
    const language: LanguageEntity = await new LanguageService().findById(id);
    res.json(language);
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
    const result: IMessageWithSuccess = await new LanguageService().delete(id);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
router.patch("/update/:id", async (req: Request, res: Response) => {
  const { id }: IParams = req.params;
  const { label }: ILanguageUpdateData = req.body;

  try {
    const language: LanguageEntity = await new LanguageService().update({
      id,
      label,
    });
    res.json(language);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
