import { HttpException, HttpStatus, Logger } from "@nestjs/common";

export class RecoveryHttpException extends HttpException{ 

    private readonly logger = new Logger(RecoveryHttpException.name);

    constructor(message: string, httpStatus: HttpStatus, err?: any){
        super(message, httpStatus);
        this.logger.error(`[USER] - ${err} ${message}`)
    }
    
}