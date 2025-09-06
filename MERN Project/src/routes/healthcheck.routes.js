import express from 'express'
const router = express.Router();

import healthCheck from '../controllers/healthcheck.controller';

// router.get("/" , healthCheck)
router.route("/").get(healthCheck);

export default router;