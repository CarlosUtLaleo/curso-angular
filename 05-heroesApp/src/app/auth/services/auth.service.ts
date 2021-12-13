import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { tap } from 'rxjs/operators';
import { Observable, of, map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private baseUrl: string = environment.baseUrl;
	constructor(private http: HttpClient) {}

	verificaAutenticacion(): Observable<boolean> {
		if (!localStorage.getItem('id')) {
			return of(false);
		}
		return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
			map((auth) => {
				this._auth = auth;
				return true;
			})
		);
	}

	private _auth: Auth | undefined;

	get auth(): Auth {
		return { ...this._auth! };
	}

	login() {
		return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
			tap((resp) => (this._auth = resp)),
			tap((auth) => localStorage.setItem('id', auth.id))
		);
	}
}
