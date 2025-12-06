import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { User } from '../../services/user';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(User);
  const token = userService.getToken();

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
          Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }

  return next(req);
};
