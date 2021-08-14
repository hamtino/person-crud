import { Component } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'person-crud';
  iconsave = faSave
  iconclose = faWindowClose
  
  simpleAlert(){
    Swal.fire('Hello world!');
  }
   
  alertWithSuccess(){
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
  }
   
  confirmBox(){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
}
