import { Router } from "express";
import { createQuote, getQuotes, OneQuote, updateQuote, deleteQuote, likeQuote } from "../controllers/quote.controller.js";
import { register, login, logout, checkAuth, getUserById, updateUser, addFavoriteQuote, removeFavoriteQuote } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.js"; // Import your auth middleware

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/check-auth").get(authenticate, checkAuth); // Protected
router.route("/user/:id").get(authenticate, getUserById); // Protected
router.route("/user/update/:id").put(authenticate, updateUser); // Protected
router.route("/user/favorite-quote/add/:id").post(authenticate, addFavoriteQuote); // Protected
router.route("/user/favorite-quote/remove/:id").post(authenticate, removeFavoriteQuote); // Protected

// Quotes related routes (RESTful)
router.route("/quotes").post(authenticate, createQuote); // Protected
router.route("/quotes").get(getQuotes);
router.route("/quotes/:id").get(OneQuote);
router.route("/quotes/:id").put(authenticate, updateQuote); // Protected
router.route("/quotes/:id").delete(authenticate, deleteQuote); // Protected
router.route("/quotes/:id/like").post(authenticate, likeQuote); // Protected

export default router;