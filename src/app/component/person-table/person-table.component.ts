import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { APIService } from 'src/app/services/api.service';

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

  ngOnInit(): void {
    this.APIservice.getPerson().subscribe(res=>{
      console.log(res);
    })
  }

}
