import express from "express";
import {
  adminLogin,
  adminDashboard,
  userList,
  deleteUser,
  storiesList,
  deleteStory,
} from "../controllers/adminController.js";

const isAuthenticated = (req, res, next) => {
  console.log("Session User in adminRoute:", req.session.user); // Debugging line
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.redirect("/api/admin/login");
  }
};

const router = express.Router();

router.get("/login", (req, res) => {
  if (req.session && req.session.user) {
    return res.redirect("/api/admin/dashboard");
  }
  res.render("login", { message: null });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to destroy session.");
    }
    res.redirect("/api/admin/login");
  });
});

router.post("/login", adminLogin);

router.get("/dashboard", isAuthenticated, adminDashboard);
router.get("/users", isAuthenticated, userList);
router.post("/delete_user/:user_id", isAuthenticated, deleteUser);
router.get("/stories", isAuthenticated, storiesList);
router.post("/delete_story/:story_id", isAuthenticated, deleteStory);

export default router;
