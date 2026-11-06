import Book, { Genre } from "../models/book.model.js";
// Create Book
export const createBook = async (req, res, next) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
};
// Get All Books with Filtering, Sorting and Limiting
export const getAllBooks = async (req, res, next) => {
    try {
        const { filter, sortBy = "createdAt", sort = "asc", limit = "10", } = req.query;
        const query = {};
        if (filter) {
            if (!Object.values(Genre).includes(filter)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid genre filter",
                });
            }
            query.genre = filter;
        }
        const allowedSortFields = ["title", "author", "createdAt", "copies"];
        const sortField = allowedSortFields.includes(sortBy)
            ? sortBy
            : "createdAt";
        const sortOrder = sort === "desc" ? -1 : 1;
        const parsedLimit = Number(limit);
        const safeLimit = Number.isInteger(parsedLimit) && parsedLimit > 0
            ? Math.min(parsedLimit, 100)
            : 10;
        const books = await Book.find(query)
            .sort({ [sortField]: sortOrder })
            .limit(safeLimit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        next(error);
    }
};
// Get Single Book
export const getSingleBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
};
// Update Book
export const updateBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
            returnDocument: "after",
            runValidators: true,
        });
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
};
// Delete Book
export const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=book.controller.js.map