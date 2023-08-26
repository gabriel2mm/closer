import { HttpStatus } from "@nestjs/common";
import { UserHttpException } from "../exceptions/user-http.exception";

export abstract class EmailValidate {

    private static readonly DOMAINS_PERMITED: string[] = ['hotmail', 'gmail', 'yahoo', 'uol', 'icloud', 'outlook', 'aol', 'aim', 'yahoo', 'icloud', 'protonmail', 'pm', 'zoho'];

    public static ValidateEmail(email: string): void {

        if (!email)
           throw new UserHttpException('E-mail inválido', HttpStatus.BAD_REQUEST);

        if (!/^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email))
        throw new UserHttpException('E-mail inválido', HttpStatus.BAD_REQUEST);

        const match = email.match(/(?<=@)[^.]+(?=\.)/);
        if (!match || !EmailValidate.DOMAINS_PERMITED.includes(match[0]))
            throw new UserHttpException('E-mail com provedor desconhecido', HttpStatus.BAD_REQUEST);
    }
}