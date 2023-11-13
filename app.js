import express from "express";
import { pollRouter } from "./src/route/index.js";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(cors());

app.use(express.json());
app.use("/", pollRouter);

app.use((err, res) => {
  console.error(err.stack);
  res.status(500).send("Server error");
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
