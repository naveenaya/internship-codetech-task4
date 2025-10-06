import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let usageData = {};

app.post("/update", (req, res) => {
  usageData = { ...usageData, ...req.body };
  res.json({ success: true });
});

app.get("/data", (req, res) => res.json(usageData));

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
