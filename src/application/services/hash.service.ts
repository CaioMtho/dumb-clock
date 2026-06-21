import bcrypt from "bcrypt";
import { type HashService } from "@/domain/services/hash.service";

const saltRounds = 10;

export class HashServiceImpl implements HashService {
    async hash(value: string) : Promise<string> {
        const salt = await bcrypt.genSalt(saltRounds);
        return bcrypt.hash(value, salt);
    }

    async compare(value : string, hash : string) : Promise<boolean> {
        return bcrypt.compare(value, hash);
    }
}