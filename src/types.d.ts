import { Request, Response } from "express";

export type Context = {
  req: Request;
  res: Response;
};
