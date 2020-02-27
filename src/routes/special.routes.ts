// Aca van a estar la Rutas protegidas por la Autenticacion


import { Router } from "express";
import passport from "passport";

const router = Router();

import { special } from "../controllers/special.controller";

router.get(
  "/special",
  passport.authenticate("jwt", { session: false }),
  special
);

export default router;
