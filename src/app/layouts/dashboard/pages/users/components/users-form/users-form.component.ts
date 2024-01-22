import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.scss'
})
export class UsersFormComponent {

userForm : FormGroup;
@Output()
userSubmitted = new EventEmitter()



  constructor(private fb: FormBuilder) {
this.userForm = this.fb.group({
  firstName: this.fb.control('', Validators.required),
  lastName: this.fb.control('', Validators.required),
  password: this.fb.control('', Validators.required),
  course: this.fb.control('', Validators.required),
  email: this.fb.control('', [Validators.required, Validators.email]),
  role: this.fb.control('', Validators.required),

})


  }
onSubmit() : void {
  if (this.userForm.invalid)
  { this.userForm.markAllAsTouched();
  }
  else {
  this.userSubmitted.emit(this.userForm.value);}
  this.userForm.reset()
}
}
