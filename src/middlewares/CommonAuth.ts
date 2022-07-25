import { NextFunction, Request, Response } from "express";
import { AuthPayload } from "../dto/Auth.dto";
import { ValidateSignature } from "../utils";

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload
        }
    }
}

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const validate = await ValidateSignature(req)

    if(validate){
        next();
    }else{
        res.json({ "Message": "User not Authorized" })
    }
}