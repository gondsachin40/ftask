import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { User } from '../../services/user';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(User);
  const token = userService.getToken();

  console.log('Interceptor activated');
  console.log('Token:', token);

  if (token) {
    document.cookie = `token=${token}; path=/; Secure; HttpOnly`;
  }

  return next(req);
};
