import Quote from "../models/quote.model.js";
import User from "../models/user.model.js";

export const createQuote = async (req, res) => {
    try {
        const { text, author, category, imgUrl } = req.body;
        const createdBy = req.user._id;

        const newQuote = await Quote.create({ text, author, category, imgUrl, createdBy });
        
        // Add the quote to the user's favoriteQuotes
        await User.findByIdAndUpdate(createdBy, { $push: { favoriteQuotes: newQuote._id } });

        res.status(201).json(newQuote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getQuotes = async (req, res) => {
    try {
        const quotes = await Quote.find().populate('createdBy', 'username profileImageUrl').populate('likes', 'username profileImageUrl');
        res.status(200).json(quotes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const OneQuote = async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id).populate('createdBy', 'username profileImageUrl').populate('likes', 'username profileImageUrl');
        if (!quote) {
            return res.status(404).json({ message: "Quote not found" });
        }
        res.status(200).json(quote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateQuote = async (req, res) => {
    try {
        const { text, author, category, imgUrl } = req.body;
        const updatedQuote = await Quote.findByIdAndUpdate(
            req.params.id,
            { text, author, category, imgUrl },
            { new: true }
        );

        if (!updatedQuote) {
            return res.status(404).json({ message: "Quote not found" });
        }

        res.status(200).json(updatedQuote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteQuote = async (req, res) => {
    try {
        const deletedQuote = await Quote.findByIdAndDelete(req.params.id);
        if (!deletedQuote) {
            return res.status(404).json({ message: "Quote not found" });
        }

        // Remove the quote from the user's favoriteQuotes
        await User.updateMany(
            { favoriteQuotes: deletedQuote._id },
            { $pull: { favoriteQuotes: deletedQuote._id } }
        );

        res.status(200).json({ message: "Quote deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const likeQuote = async (req, res) => {
    try {
        const quoteId = req.params.id;
        const userId = req.user._id;

        const quote = await Quote.findById(quoteId);
        if (!quote) {
            return res.status(404).json({ message: "Quote not found" });
        }

        const alreadyLiked = quote.likes.includes(userId);

        if (alreadyLiked) {
            // Remove like
            quote.likes.pull(userId);
            await quote.save();
            return res.status(200).json({ message: "Quote unliked successfully", quote });
        } else {
            // Add like
            quote.likes.push(userId);
            await quote.save();
            return res.status(200).json({ message: "Quote liked successfully", quote });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const searchQuotes = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search || typeof search !== 'string' || !search.trim()) {
      return res.status(400).json({ message: "Search query must be a non-empty string." });
    }

    const sanitizedSearch = search.trim();

    console.log(`[Search API] Search term: "${sanitizedSearch}"`);

    const regex = new RegExp(sanitizedSearch, 'i');

    const quotes = await Quote.find({
      $or: [
        { text: regex },
        { author: regex },
        { category: regex }
      ]
    });

    res.status(200).json({
      quotes,
      message: quotes.length === 0 ? "No quotes found." : "Quotes retrieved successfully."
    });
  } catch (error) {
    console.error('[Search Error]', error.message);
    res.status(500).json({ message: "An error occurred while searching for quotes." });
  }
};


export const getQuotesByUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch quotes and populate related fields
    const quotes = await Quote.find({ createdBy: userId })
      .populate('createdBy', 'username profileImageUrl')
      .populate('likes', 'username profileImageUrl');

    // Wrap response to match frontend structure: res.data.quotes
    res.status(200).json({ quotes });
  } catch (error) {
    console.error('[getQuotesByUser] Error:', error);
    res.status(500).json({ quotes: [], message: 'Failed to fetch quotes' });
  }
};


export const getFavoriteQuotesbyUser = async (req, res) => {
    try {
        const userId = req.user._id; // Use authenticated user's ID
        const user = await User.findById(userId).populate('favoriteQuotes');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.favoriteQuotes.length === 0) {
            return res.status(404).json({ message: "No favorite quotes found for this user" });
        }

        res.status(200).json(user.favoriteQuotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const toggleFavorite = async (req, res) => {
        try {
            const quote = await Quote.findById(req.params.id);
            if (!quote) {
                return res.status(404).json({ error: "Quote not found" });
            }

            quote.isFavorite = !quote.isFavorite;
            await quote.save();

            res.status(200).json({ msg: "Image favorite status updated", quote });
        } catch (err) {
            console.error("Error toggling favorite:", err);
            res.status(500).json({ error: "Failed to update favorite status" });
        }
}

