import { ValidationError } from "@/domain/errors/validation-error";

export class Storage {
    static getAsObject<T>(key : string) : T | null {
        const item = localStorage.getItem(key);

        if (item === null) {
            return null;
        }

        try {
            return JSON.parse(item) as T;
        }catch (error : unknown) {
            if(error instanceof SyntaxError) {
                throw new ValidationError(`Invalid data format for ${key} in localStorage`)
            }

            throw error;
        }
    }

    static setAsObject<T>(key : string, value : T, overwrite : boolean = false) {
        if(localStorage.getItem(key) !== null) {
            if(!overwrite) {
                return;
            }
        }
        localStorage.setItem(key, JSON.stringify(value));
    }

    static removeItem(key : string) {
        localStorage.removeItem(key);
    }
}