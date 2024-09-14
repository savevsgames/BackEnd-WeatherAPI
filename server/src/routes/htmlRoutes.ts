import path from "node:path";
import { fileURLToPath } from "node:url";
import { Router } from "express";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// TODO: Define route to serve index.html
try {
  console.log("Serving index.html");
  router.get("/", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "../../../client/dist/index.html"));
  });
} catch (error) {
  console.log(error);
}

export default router;
