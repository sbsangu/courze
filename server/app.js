import express from "express";
import { config } from "dotenv";
import { ErrorMiddleware } from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import payment from "./routes/paymentRoutes.js";

import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";
import other from "./routes/otherRoutes.js";
import cors from "cors";

config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
console.log(process.env.FRONTEND_URL)

app.use(
  cors(
    // origin: "http://localhost:3000",
    { credentials: true}
    // methods: ["GET", "POST", "PUT", "DELETE"],
  )
);

// app.get("/", (req, res) => {
//   res.send(`<h1>Site is workin fine.click to get frontend</h1>`)
// })

app.use("/api/v1", user);
app.use("/api/v1", course);

app.use("/api/v1", payment);

app.use("/api/v1", other);

export default app;

app.get("/", (req, res) =>
  res.send(
    `<h1>Server is Running..Click <a href=${process.env.FRONTEND_URL}>Here </a> </h1>`
  )
);

app.use(ErrorMiddleware);
