import mongoose, { Schema, Document } from "mongoose";

export interface Book extends Document {
    title: string;
    author: string;
   stock: number;
    subject: string;
   image: string;
    description: string;
    rating: number;
    price: number;
}

const bookSchema: Schema<Book> = new Schema({

    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    price: {
        type : Number,
        required: true
    },

    stock: {
        type: Number,
        required: true
    }

});
const Book = (mongoose.models.books as mongoose.Model<Book>) || mongoose.model<Book>("books", bookSchema);
export default Book
    