import mongoose, { Document, Types } from "mongoose";
export interface IBorrow extends Document {
    book: Types.ObjectId;
    quantity: number;
    dueDate: Date;
}
declare const Borrow: mongoose.Model<IBorrow, {}, {}, {}, Document<unknown, {}, IBorrow, {}, mongoose.DefaultSchemaOptions> & IBorrow & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IBorrow & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
export default Borrow;
//# sourceMappingURL=borrow.model.d.ts.map