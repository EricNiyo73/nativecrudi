import Router from "express";
const router = Router();
import {
  upload,
  create,
  findAll,
  findOne,
  updatep,
  deletep,
} from "../controllers/post.controllers.js";
router.post("/create", upload.single("photo"), create);
router.get("/", findAll);
router.get("/:id", findOne);
router.put("/:id", updatep);
router.delete("/:id", deletep);
export default router;
