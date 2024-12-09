import express from "express";
import { submitEnquiry } from "../controllers/enquiry.controller.js";

const router = express.Router();

router.post('/api/submit-enquiry', submitEnquiry);

export default router;