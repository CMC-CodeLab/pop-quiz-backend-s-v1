import { Either } from "fp-ts/lib/Either";
export interface IOutputBoundary {
    error?: any;
    payload?:any;
    message?:string;
    success(payload:any, statusCode:number): void;
    fail(error:Error,statusCode:number): void;
    ouput(): void;
}