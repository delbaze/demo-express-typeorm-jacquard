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

router.get("/list", (req, res) => {});
router.delete("/delete/:id", (req, res) => {});
router.patch("update/:id", (req, res) => {});
// router
//   .route("/create")
//   .post((req, res) => {})
//   .get((req, res) => {});

export default router;
