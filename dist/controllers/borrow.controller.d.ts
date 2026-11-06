import type { Request, Response, NextFunction } from "express";
export declare const borrowBook: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getBorrowSummary: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=borrow.controller.d.ts.map