import { NextFunction, Request, Response } from "express";
import * as core from "express-serve-static-core";
// export interface MyRequest<
// 	Req extends  | null ,
// 	ReqBody = any,
// 	Params = core.ParamsDictionary,
// 	ResBody = any,
// 	ReqQuery = core.Query,
// 	Locals extends Record<string, any> = Record<string, any>
// > extends Request<Params, ResBody, ReqBody, ReqQuery, Locals> {
// 	// user?: Req extends  ? Req : Req | null;
// }


// export interface UserRouter<T extends  | null > {
// 	controller: (req: MyRequest<T>, res: Response, next: NextFunction) => any;
// }


