import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { APIService } from 'src/app/services/api.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DatePipe } from '@angular/common';

import { faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css'],
  providers: [DatePipe]
})
export class PersonTableComponent implements OnInit {
  faTrash = faTrash;
  faEdit = faEdit;
  id = ''
 

  Persons:any;

  dataTable(){
    this.APIservice.getPersons().subscribe(res=>{
      console.log(res);
      this.Persons=res;
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

  ngOnInit(): void {
    this.dataTable();
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
      
    });
  }

  updateData():any{
    console.log(this.formEdit.value);
    this.APIservice.updatePerson(this.id,this.formEdit.value).subscribe(resp=>{
      console.log(resp);
      this.dataTable();
    });
  }

}
