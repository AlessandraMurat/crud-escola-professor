import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Professor } from '../professor';
import { ProfessorService } from '../professor.service';


@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {

 
  profName: string = '';
  profCpf: string = '';

  professores:Professor[] = [];

  profEdit:Professor = null;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(private professorService:ProfessorService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.professorService.get()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((profs)=> this.professores = profs)
  }

  save() {
    if (this.profEdit) {
      this.professorService.update(
        { name: this.profName, cpf: this.profCpf, _id: this.profEdit._id }
      ).subscribe(
        (prof) => {
          this.notify('UPDATED')
        },
        (err) => {
          this.notify('ERROR');
          console.error(err)
        }
      )
    }
    else {
      if (this.profName.length == 0) {
        this.cancel();
      }
      else {
        this.professorService.add({ name: this.profName, cpf: this.profCpf })
          .subscribe(
            (prof) => {
              console.log(prof);
              this.notify('INSERTED!');
            },
            (err) => {
              console.error(err);
            }
          )
      }
    }
    this.clearFields();
  }

  edit(prof:Professor){
    this.profName = prof.name;
    this.profCpf = prof.cpf;
    this.profEdit = prof;
  }

  delete(prof:Professor){
    this.professorService.del(prof)
    .subscribe(
      ()=> this.notify('REMOVED!'),
      (err)=> this.notify(err.error.msg)
      )
  }


  clearFields(){
    this.profName = '';
    this.profCpf = '';
    this.profEdit = null;
  }

  cancel(){
    this.clearFields();
  }

  notify(msg: string){
    this.snackbar.open(msg, "OK", {duration: 3000})
  }

  ngOnDestroy(){
    this.unsubscribe$.next()
  }

}
