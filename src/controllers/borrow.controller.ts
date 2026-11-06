import mongoose from "mongoose";
import type { Request, Response, NextFunction } from "express";
import Book from "../models/book.model.js";
import Borrow from "../models/borrow.model.js";

// Borrow Book
export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID",
      });
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive integer",
      });
    }

    if (!dueDate || Number.isNaN(Date.parse(dueDate))) {
      return res.status(400).json({
        success: false,
        message: "A valid due date is required",
      });
    }

    const updatedBook = await Book.borrowCopies(bookId, quantity);

    if (!updatedBook) {
      const existingBook = await Book.findById(bookId);

      if (!existingBook) {
        return res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }

      return res.status(400).json({
        success: false,
        message: "Not enough copies available",
      });
    }

    const borrow = await Borrow.create({
      book: bookId,
      quantity,
      dueDate: new Date(dueDate),
    });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    next(error);
  }
};

// Get Borrow Summary
export const getBorrowSummary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrow summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    next(error);
  }
};
