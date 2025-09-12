import express from 'express'
const router = express.Router();

import healthcheck from '../controllers/healthcheck.controller';

// router.get("/" , healthCheck)
router.route("/").get(healthcheck);

export default router;