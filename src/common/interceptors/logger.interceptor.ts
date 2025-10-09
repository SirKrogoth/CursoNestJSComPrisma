import { ExecutionContext, NestInterceptor, CallHandler, Injectable } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        const method = req.method;
        const url = req.url;
        const now = Date.now();
        console.log(`[REQUEST] ${method} ${url} - Inicio da Requisição`);

        return next.handle().pipe(
            tap(() => {
                console.log(`[RESPONSE] ${method} ${url} - ${Date.now() - now}ms - Fim da Requisição`);
            })
        )
    }
}