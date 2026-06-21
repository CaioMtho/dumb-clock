export class ValidationError extends Error {
    constructor(reason: string, message?: string) {
        super(message ?? reason);

        this.name = "ValidationError";
    }
}
