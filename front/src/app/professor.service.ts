import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Professor } from './professor';
import { tap, delay} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  readonly url = 'http://localhost:3000/professores';

  private professoresSubject$: BehaviorSubject<Professor[]> = new BehaviorSubject<Professor[]>(null);

  private loaded: boolean = false;

  constructor(private http: HttpClient) { }

  get(): Observable<Professor[]>{
    if (!this.loaded) {
      this.http.get<Professor[]>(this.url)
      .pipe(
        tap((profs)=> console.log(profs)),
        delay(1000)
      )
      .subscribe(this.professoresSubject$);
      this.loaded = true
    }
    return this.professoresSubject$.asObservable();
  }

  add(p: Professor): Observable<Professor>{
    return this.http.post<Professor>(this.url, p)
    .pipe(
      tap((prof: Professor)=> this.professoresSubject$.getValue().push(prof))
    )
  }

  del(prof: Professor): Observable<any> {
    return this.http.delete(`${this.url}/${prof._id}`)
    .pipe(
      tap(()=>{
        let professores = this.professoresSubject$.getValue();
        let i = professores.findIndex(p => p._id === prof._id);
        if (i>=0) {
          professores.splice(i,1)
        }
      })
    )
  }


  update(prof: Professor): Observable<Professor> {
    return this.http.patch<Professor>(`${this.url}/${prof._id}`, prof)
    .pipe(
      tap((p)=>{
        let professores = this.professoresSubject$.getValue();
        let i = professores.findIndex(p => p._id === prof._id);
        if (i>=0) {
          professores[i].name = p.name;
        }
      })
    )
  }

}
