import path from "node:path";
import { fileURLToPath } from "node:url";
import { Router } from "express";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// TODO: Define route to serve index.html
try {
  router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
  });
} catch (error) {
  console.log(error);
}

export default router;
