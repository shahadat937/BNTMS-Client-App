import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../models/user';
import { Role } from '../models/role';

const users: User[] = [
  {
    id: 1,
    img: 'assets/images/user/admin.jpg',
    username: 'admin@school.org',
    password: 'admin@123',
    firstName: 'Sarah',
    lastName: 'Smith',
    role: Role.MasterAdmin,
    token: 'admin-token',
    branchId:'145',
    traineeId:'265'
  },
  {
    id: 2,
    img: 'assets/images/user/teacher.jpg',
    username: 'teacher@school.org',
    password: 'teacher@123',
    firstName: 'Ashton',
    lastName: 'Cox',
    role: Role.MasterAdmin,
    token: 'teacher-token',
    branchId:'145',
    traineeId:'265'
  },
  {
    id: 3,
    img: 'assets/images/user/student.jpg',
    username: 'student@school.org',
    password: 'student@123',
    firstName: 'Ashton',
    lastName: 'Cox',
    role: Role.Student,
    token: 'student-token',
    branchId:'145',
    traineeId:'265'
  },
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(handleRoute));

    function handleRoute() {
      switch (true) {
        case url.endsWith('/authenticate') && method === 'POST':
          return authenticate();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { username, password } = body;
      const user = users.find(
        (x) => x.username === username && x.password === password
      );
      if (!user) {
        return error('Username or password is incorrect');
      }
      return ok({
        id: user.id,
        img: user.img,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: user.token,
      });
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
