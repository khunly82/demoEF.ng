import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SponsorService {
    constructor(private readonly http: HttpClient) {}

    public get(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:5021/api/sponsor')
    }

    public post(sponsor: any): Observable<void[]> {
        const fd = new FormData();
        fd.append('name', sponsor.name);
        fd.append('logoFile', sponsor.logoFile);
        return this.http.post<any[]>('http://localhost:5021/api/sponsor', fd)
    }
}