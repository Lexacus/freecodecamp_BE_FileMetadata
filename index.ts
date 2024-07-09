import cors from "cors";
import dayjs from "dayjs";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import mongoose, { Schema, model } from "mongoose";
import { LogsFilters } from "./types";
import multer from "multer";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

const upload = multer({ dest: "uploads/" });

app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res: Response) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post(
  "/api/fileanalyse",
  upload.single("upfile"),
  (req: Request, res: Response) => {
    return res.json({
      name: req.file?.originalname,
      type: req.file?.mimetype,
      size: req.file?.size,
    });
  }
);

app.listen(port, () => {
  console.log("Your app is listening on port " + port);
});
