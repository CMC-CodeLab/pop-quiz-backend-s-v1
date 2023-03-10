class DomainError {
    message: string;
    statusCode: number = 400;
    constructor(msg) {
        this.message = msg;
    }
}