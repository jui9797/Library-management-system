import { Router } from "express";
import { borrowBook, getBorrowSummary, } from "../controllers/borrow.controller.js";
const router = Router();
router.post("/", borrowBook);
router.get("/", getBorrowSummary);
export default router;
//# sourceMappingURL=borrow.routes.js.map