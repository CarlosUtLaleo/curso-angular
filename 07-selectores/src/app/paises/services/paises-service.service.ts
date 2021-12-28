import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaisSmall } from '../interfaces/paises.interface';

@Injectable({
	providedIn: 'root',
})
export class PaisesServiceService {
	private _baseUrl: string = 'https://restcountries.com/v3.1';
	private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

	get regiones() {
		return [...this._regiones];
	}

	constructor(private http: HttpClient) {}

	getPaisesPorRegion(region: string): Observable<PaisSmall[]> {
		const url: string = `${this._baseUrl}/region/${region}`;
		return this.http.get<PaisSmall[]>(url);
	}
}