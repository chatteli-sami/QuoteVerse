import { Router } from "express";
import { createQuote, getQuotes, OneQuote, updateQuote, deleteQuote, likeQuote, getFavoriteQuotesbyUser, searchQuotes, getQuotesByUser, toggleFavorite } from "../controllers/quote.controller.js";
import { register, login, logout, checkAuth, getUserById, updateUser } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.js"; // Import your auth middleware

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/check-auth").get(authenticate, checkAuth); // Protected
router.route("/user/:id").get(authenticate, getUserById); // Protected
router.route("/user/update/:id").put(authenticate, updateUser); // Protected/ Protected

// Quotes related routes (RESTful)
router.route("/quotes").post(authenticate, createQuote); // Protected
router.route("/all/quotes").get(getQuotes);
router.route("/quotes/:id").get(OneQuote);
router.route("/quotes/:id").put(authenticate, updateQuote); // Protected
router.route("/quotes/:id").delete(authenticate, deleteQuote); // Protected
router.route("/quotes/:id/like").post(authenticate, likeQuote); // Protected
router.route("/quotes/search").post(searchQuotes); // Public
router.route("/quotes/user/:userId").get(authenticate, getQuotesByUser); // Protected
router.route("/quotes/favorites").get(authenticate, getFavoriteQuotesbyUser); // Protected
router.route("/quotes/:id/favorite").patch(toggleFavorite); 

export default router;