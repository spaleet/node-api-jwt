export class ApiError extends Error {
    status = 400;

    constructor(status: number, message: string) {
        super(message);

        this.status = status;
    }
}