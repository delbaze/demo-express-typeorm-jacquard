import { IWilderUpdateKey } from "./../services/services.d";
import express, { Request, Response } from "express";
import WilderService from "../services/Wilder.service";
import { IWilderCreate, IParams } from "./routes.d";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("DEST", file);
    cb(null, "./tmp");
  },
  filename: function (req, file, cb) {
    console.log("FILE0", file);
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ".png";
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post(
  "/create",
  upload.single("avatar"),
  async (req: Request, res: Response) => {
    // http://localhost/wilder/create
    console.log(req.body);

    console.log("FILE DEPUIS LA ROUTE", req.file);

    const { first_name, last_name, email, notes }: IWilderCreate = req.body;
    try {
      const wilder = await new WilderService().createWilder({
        first_name,
        last_name,
        email,
        notes: JSON.parse(`${notes}`),
      });

      res.json(wilder);
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);

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
