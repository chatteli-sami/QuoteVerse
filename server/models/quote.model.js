import {model, Schema} from "mongoose";

const QuoteSchema = new Schema({
    text:{
        type: String,
        required: [true, "Quote text is required!"],
        minLenght: [1, "Quote text must be at least 1 character long!"],
    },
    author:{
        type: String,
        required: [true, "Author name is required!"],
    },
    category:{
        type: String,
        required: [true, "Category is required!"],
    },
    imgUrl:{
        type: String,
    },
    favorites: [{
        type: Boolean,
        default: false,
    }],
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }]
}, {
    timestamps: true,
    versionKey: false,
});

const Quote = model("Quote", QuoteSchema);

export default Quote;