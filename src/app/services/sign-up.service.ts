import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserSignUp} from "./user-sign-up";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private readonly api = "https://demo-api.now.sh"

  constructor(private readonly http: HttpClient) {}

  public signUp(userSignUpData: UserSignUp): Observable<unknown> {
    return this.http.post(`${this.api}/users`, userSignUpData)
  }
}
