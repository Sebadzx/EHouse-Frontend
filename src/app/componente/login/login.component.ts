import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {RequestDto} from '../../model/request-dto';
import {ResponseDto} from '../../model/response-dto';
import {CommonModule} from '@angular/common';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButton, MatCard, MatCardContent, MatCardTitle, MatFormField, MatInput, MatLabel, MatOption, MatSelect, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  router: Router = inject(Router);
  loginForm: FormGroup;
  fb = inject(FormBuilder);
  loginService: LoginService = inject(LoginService);

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit() {
    if(localStorage.getItem('token')!=null){
      localStorage.removeItem('token');
      console.log("Token eliminado");
    }
    this.loadForm()
  }

  loadForm(): void {
    console.log("Form");
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const jwtRequest: RequestDto = new RequestDto()
      jwtRequest.username = this.loginForm.value.username;
      jwtRequest.password = this.loginForm.value.password;
      let responseDTO: ResponseDto = new ResponseDto();
      this.loginService.login(jwtRequest).subscribe({
        next: (data: ResponseDto): void => {
          console.log("Login response ROLs:", data.roles);
          console.log("Login response ROL:", data.roles[0]);
          localStorage.setItem('rol', data.roles[0]);
        },
        error: (error: any) => {
          console.error(error);
          this.router.navigate(['login']);
        }
      })
      alert("Login ok!")
      this.router.navigate(['/home'])
    } else {
      alert("Formulario no valido!")
      console.log("Formulario no valido");
    }
  }
/*  ngOnInit(): void {}
  login() {
    let request = new RequestDto();
    request.username = this.username;
    request.password = this.password;
    this.loginService.login(request).subscribe(
      (data: any) => {
        localStorage.setItem('jwttoken', data.jwttoken);
        console.log("Token1 recuperado:", data.jwttoken);

        this.router.navigate(['/home']);
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
  }*/
}
