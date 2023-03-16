import { IWilderUpdateKey } from "./../services/services.d";
import express, { Request, Response } from "express";
import WilderService from "../services/Wilder.service";
import { IWilderCreate, IParams } from "./routes.d";
const router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
  // http://localhost/wilder/create
  console.log(req.body);
  const { first_name, last_name, email, notes }: IWilderCreate = req.body;
  try {
    const wilder = await new WilderService().createWilder({
      first_name,
      last_name,
      email,
      notes,
    });

    res.json(wilder);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/list", async (req: Request, res: Response) => {
  try {
    const wilderList = await new WilderService().list();
    res.json(wilderList);
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
    const wilder = await new WilderService().findById(id);
    res.json(wilder);
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
    const result = await new WilderService().delete(id);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
router.patch("/update/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { first_name, last_name, email, notes }: IWilderUpdateKey = req.body;

  try {
    const wilder = await new WilderService().update({
      id,
      notes, 
      first_name,
      last_name,
      email,
    });
    res.json(wilder);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.post("/assignNote", async (req: Request, res: Response) => {
  const { wilderId, languageId, note } = req.body;
  try {
    //faire l'assignation
    const result = await new WilderService().assignNote({
      languageId,
      wilderId,
      note,
    });
    res.json(result);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
