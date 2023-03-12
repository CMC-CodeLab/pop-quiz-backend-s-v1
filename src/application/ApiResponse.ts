import { Injectable } from "@nestjs/common";
import { IOutputBoundary } from "src/usecases/itf.output-boundary";

type ApiResponseSuccess = {
    statusCode:number;
    payload?:any;
    message?:string;
}

type ApiResponseFail = {
    statusCode: number;
    message: string;
}
@Injectable()
export class ApiResponse implements IOutputBoundary {
    statusCode?:number;
    error?: Error;
    payload?: any;
    message?: string;
    success(payload, statusCode:number=200): void {
        this.payload = payload;
        this.statusCode = statusCode;
    }
    fail(error:Error,statusCode:number=200, message?:string) {
        this.error = error;
    }
    ouput(): ApiResponseSuccess | ApiResponseFail {
        if (this.error !== undefined) return {statusCode:this.statusCode|| 400,  message: this.message?? this.error.message}
        else return {statusCode: this.statusCode||200, payload: this.payload};
    }

}