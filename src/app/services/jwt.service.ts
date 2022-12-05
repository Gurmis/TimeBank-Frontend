import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }


  DecodeToken(token: string): any {
    return helper.decodeToken(token);
    }
}
