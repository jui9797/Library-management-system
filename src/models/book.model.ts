import mongoose, { Schema, Document } from "mongoose";

export enum Genre {
  FICTION = "FICTION",
  NON_FICTION = "NON_FICTION",
  SCIENCE = "SCIENCE",
  HISTORY = "HISTORY",
  BIOGRAPHY = "BIOGRAPHY",
  FANTASY = "FANTASY",
}

interface BookModel extends mongoose.Model<IBook> {
  borrowCopies(bookId: string, quantity: number): Promise<IBook | null>;
}

export interface IBook extends Document {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    genre: {
      type: String,
      enum: Object.values(Genre),
      required: [true, "Genre is required"],
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Copies must be an integer",
      },
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Pre-save middleware
bookSchema.pre("save", function () {
  this.available = this.copies > 0;
});

// Post-save middleware
bookSchema.post("save", function (doc) {
  console.log(`Book saved successfully: ${doc.title}`);
});

bookSchema.statics.borrowCopies = async function (
  bookId: string,
  quantity: number,
) {
  return this.findOneAndUpdate(
    {
      _id: bookId,
      copies: { $gte: quantity },
    },
    [
      {
        $set: {
          copies: { $subtract: ["$copies", quantity] },
        },
      },
      {
        $set: {
          available: { $gt: ["$copies", 0] },
        },
      },
    ],
    { returnDocument: "after", updatePipeline: true },
  );
};

const Book = mongoose.model<IBook, BookModel>("Book", bookSchema);

export default Book;
