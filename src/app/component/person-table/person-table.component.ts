import { Component, OnInit, AfterViewInit,  ViewChild} from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { APIService } from 'src/app/services/api.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DatePipe } from '@angular/common';

import { faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css'],
  providers: [DatePipe]
})
export class PersonTableComponent implements AfterViewInit {
  

  displayedColumns: string[] = ['id', 'fullname', 'birth', 'datereg', 'option'];
  public dataSource: MatTableDataSource<UserData>;

  faTrash = faTrash;
  faEdit = faEdit;
  id = ''
 

  Persons:any;

  dataTable(){
    this.APIservice.getPersons().subscribe(res=>{
      this.dataArray  = res;
      this.dataSource = new MatTableDataSource<UserData>(this.dataArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  trashPerson(id:any){
    console.log(id)
    Swal.fire({
      title: 'Seguro desea borrar persona?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.APIservice.trashPerson(id).subscribe(resp=>{
          console.log(resp);
          this.dataTable();
          Swal.fire({
            icon: 'success',
            title: 'Eliminado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        })
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    })
  }

  editPerson(person:any){
    console.log(person)
    this.id=person['id']
    this.formEdit.setValue({
      fullname:person['fullname'],
      birth:this.DatePipe.transform(person['birth'], 'yyyy-MM-dd', '+0500' )
    })
  }
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private dataArray: any;
  ngAfterViewInit() {
    this.dataTable()
  }

  iconsave = faSave
  iconclose = faWindowClose
  
  formPerson:FormGroup;
  formEdit:FormGroup;

  constructor(private DatePipe: DatePipe, public form:FormBuilder, public formEditP:FormBuilder, private APIservice:APIService) {
    this.formEdit=this.form.group({
      fullname:['', Validators.required],
      birth:['', Validators.required]
    });
    this.formPerson=this.form.group({
      fullname:['', Validators.required],
      birth:['', Validators.required]
    });
  }
  sendData():any{
    console.log(this.formPerson.value);
    this.APIservice.sendPerson(this.formPerson.value).subscribe(resp=>{
      console.log(resp);
      this.dataTable();
      this.formPerson.reset;
    });
  }

  updateData():any{
    console.log(this.formEdit.value);
    this.APIservice.updatePerson(this.id,this.formEdit.value).subscribe(resp=>{
      console.log(resp);
      this.dataTable();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

export interface UserData {
  id: string;
  fullname: string;
  bith: string;
}
