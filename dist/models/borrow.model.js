import mongoose, { Schema, Document, Types } from "mongoose";
const borrowSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book reference is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"],
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be an integer",
        },
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"],
    },
}, {
    timestamps: true,
});
const Borrow = mongoose.model("Borrow", borrowSchema);
export default Borrow;
//# sourceMappingURL=borrow.model.js.map