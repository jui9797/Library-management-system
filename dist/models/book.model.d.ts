import mongoose, { Document } from "mongoose";
export declare enum Genre {
    FICTION = "FICTION",
    NON_FICTION = "NON_FICTION",
    SCIENCE = "SCIENCE",
    HISTORY = "HISTORY",
    BIOGRAPHY = "BIOGRAPHY",
    FANTASY = "FANTASY"
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
declare const Book: BookModel;
export default Book;
//# sourceMappingURL=book.model.d.ts.map