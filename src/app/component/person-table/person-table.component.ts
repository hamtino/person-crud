import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { APIService } from 'src/app/services/api.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css']
})
export class PersonTableComponent implements OnInit {
  faTrash = faTrash;
  faEdit = faEdit;

  Persons:any;

  constructor(private APIservice:APIService) { }

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

  ngOnInit(): void {
    this.dataTable();
  }

}
