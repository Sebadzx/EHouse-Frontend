import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {Usuario} from "../../model/usuario";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatInputModule} from "@angular/material/input";
import {UsuarioService} from '../../services/usuario.service';
import {ActivatedRoute,Params, Router} from '@angular/router';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButton} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {HotelService} from '../../services/hotel.service';
import {Hotel} from '../../model/hotel';

@Component({
  selector: 'app-new-usuario',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatHint,
    MatLabel,
    ReactiveFormsModule,
    MatDatepickerModule,//add
    MatNativeDateModule, //add
    MatInputModule,
    MatButton,
    MatDialogModule
  ],
  templateUrl: './new-usuario.component.html',
  styleUrl: './new-usuario.component.css'
})
export class NewUsuarioComponent {
  usuarioForm: FormGroup;
  fb= inject(FormBuilder);
  //Crear una instancia de usuarioService
  //inject sinonimo al @Autorrider de Spring
  usuarioService: UsuarioService = inject(UsuarioService);
  router: Router = inject(Router);
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;

  constructor() {
    console.log("Constructor NewUsuarioComponent")
    this.usuarioForm = this.fb.group({
      idUsuario: [''],
      nombreUsuario: ['', Validators.required],
      apellidoUsuario: ['', Validators.required],
      telefonoUsuario: ['', [Validators.required, Validators.pattern("^\\d{9}$")]],
      fechaNacimientoUsuario: ['', Validators.required],
      emailUsuario: ['', Validators.required],
      usernameUsuario: ['', Validators.required],
      passwordUsuario: ['', Validators.required],
      enabledUsuario: ['', Validators.required],
    })
  }

  ngOnInit():void {
    this.route.params.subscribe((data: Params) => {
      console.log("ngOnInit de NewHotelComponent");
      console.log(data);
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.cargarForm();
    });
  }

  cargarForm() {
    if(this.edicion){
      this.usuarioService.listID(this.id).subscribe((data: Usuario) =>{
        console.log(data);
        this.usuarioForm.patchValue( {
          nombreUsuario: data.nombreUsuario,
          apellidoUsuario: data.apellidoUsuario,
          telefonoUsuario: data.telefonoUsuario,
          fechaNacimientoUsuario: data.fechaNacimientoUsuario,
          emailUsuario: data.emailUsuario,
          usernameUsuario: data.usernameUsuario,
          passwordUsuario: data.passwordUsuario,
          enabledUsuario: data.enabledUsuario,
        })
      })
    }
  }

  onSubmit(){
    if(this.usuarioForm.valid){
      const usuario: Usuario = new Usuario();
      usuario.idUsuario = this.id;
      usuario.nombreUsuario = this.usuarioForm.value.nombreUsuario;
      usuario.apellidoUsuario = this.usuarioForm.value.apellidoUsuario;
      usuario.telefonoUsuario = this.usuarioForm.value.telefonoUsuario;
      usuario.fechaNacimientoUsuario = this.usuarioForm.value.fechaNacimientoUsuario;
      usuario.emailUsuario = this.usuarioForm.value.emailUsuario;
      usuario.usernameUsuario = this.usuarioForm.value.usernameUsuario;
      usuario.passwordUsuario = this.usuarioForm.value.passwordUsuario;
      usuario.enabledUsuario = this.usuarioForm.value.enabledUsuario;

      if(!this.edicion){
        console.log("Datos ingresados: ", usuario);
        //suscribe -> asincrono para que no nos bloquee
        this.usuarioService.insert(usuario).subscribe((data: object): void =>{
          console.log("Datos insertados:", data);
        })
      }else{
        console.log("Datos ingresados: ", usuario);
        //suscribe -> asincrono para que no nos bloquee
        this.usuarioService.update(usuario).subscribe((data: Object): void =>{
          console.log("Datos actualizados:", data);
        })
      }
      this.router.navigate(['usuarios']);
    }else {
      console.log("Formulario no valido");
    }
  }
}
