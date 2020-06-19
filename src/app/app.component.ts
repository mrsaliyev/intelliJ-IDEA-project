import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from './service/user.service';
import {HttpClient} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table/table-module';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  template: `<div>
    <router-outlet></router-outlet>
  </div>`
})

export class AppComponent implements OnInit{
  title = 'my-dream-app';
  userForm: FormGroup;

  displayedColumns: string[] = ['id', 'name', 'lastName', 'gender', 'actions'];
  dataSource: any = [];

  newUser = false;
  gender: any[] = ['Male', 'Female'];

  constructor(private formBuilder: FormBuilder, private service: UserService, private http: HttpClient) {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      gender: [''],
    });
  }

  ngOnInit(): void {
    this.getUsers();
    this.userForm = this.setFormUser();
  }
  submit() {
    this.service.create(this.userForm.getRawValue()).subscribe(res => {
      alert(res.name);
    });
  }

  getUsers() {
    this.service.getUsers().subscribe(res => {
      this.dataSource = res;
    });
  }

  delete(id) {
    this.service.delete(id).subscribe(res => {
      console.log('Success');
      this.getUsers();
    });
  }

  update(user: any) {
    this.userForm = new FormGroup({
      id: new FormControl(user.id),
      name: new FormControl(user.name, Validators.required),
      lastName: new FormControl(user.lastName, Validators.required),
      gender: new FormControl(user.gender),
    });
    this.newUser = true;
  }

  setFormUser(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      gender: new FormControl(''),
    });
  }
  putUser() {
    this.service.put(this.userForm.getRawValue()).subscribe(res => {
      this.getUsers();
    })
  }

  cancelPutUser() {
    this.newUser = false;
    this.userForm = this.setFormUser();
  }
}
