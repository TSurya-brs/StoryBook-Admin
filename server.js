import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

// MongoDB connection
import connectdb from "./src/config/db.js";

// Error Handlers
import { notfound, errorhandler } from "./src/middlewares/errMiddleware.js";

// Routes
import adminRoute from "./src/routes/adminRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
connectdb();

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mysecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
      ttl: 3600,
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    },
  })
);

app.use(express.json());
app.use(cors());

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/api/admin/login");
});

app.get("/api", (req, res) => {
  res.redirect("/api/admin/login");
});

app.use("/api/admin", adminRoute);

// Error Handlers
app.use(notfound);
app.use(errorhandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
