import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(request: HttpRequest < unknown > , next: HttpHandler): Observable < HttpEvent < unknown >> {
        return next.handle(request).pipe(
            map((event: HttpEvent < any > ) => {
                if (event instanceof HttpResponse) {
                    const { data }: any = event.body;

                    return event.clone({ body: data });
                }
                return event;
            }))
    }
}