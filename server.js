import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session"; // Import session
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
    secret: process.env.SESSION_SECRET || "mysecret", // Secret key for encrypting session data
    resave: false, // Don't save session if not modified
    saveUninitialized: false, // Don't save empty sessions
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Your MongoDB connection string
      collectionName: "sessions", // This will create a separate collection named "sessions"
      ttl: 3600, // Session TTL in seconds (Optional, e.g., 3600 = 1 hour)
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 3600000, // Session expiration time (1 hour)
    },
  })
);

app.use(express.json());
app.use(cors());

// Static files & view setup
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
