import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "GET All Users",
  });
});

router.get("/cool", (req, res) => {
  res.json({
    message: "You're so cool!",
  });
});

export { router as usersController };
