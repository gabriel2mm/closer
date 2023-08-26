import { HttpException, HttpStatus, Logger } from "@nestjs/common";

export class ProfileHttpException extends HttpException{ 

    private readonly logger = new Logger(ProfileHttpException.name);

    constructor(message: string, httpStatus: HttpStatus, err?: any){
        super(message, httpStatus);
        this.logger.error(`[USER] - ${err} ${message}`)
    }
}