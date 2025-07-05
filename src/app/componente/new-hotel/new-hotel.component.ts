import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Hotel} from '../../model/hotel';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HotelService} from '../../services/hotel.service';
import {MatButton} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-new-hotel',
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
    //add
  ],
  templateUrl: './new-hotel.component.html',
  styleUrl: './new-hotel.component.css'
})
export class NewHotelComponent {
  hotelForm: FormGroup;
  fb= inject(FormBuilder);
  //Crear una instancia de usuarioService
  //inject sinonimo al @Autorrider de Spring
  hotelService: HotelService = inject(HotelService);
  router: Router = inject(Router);
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;

  constructor() {
    console.log("Constructor NewHotelComponent")
    this.hotelForm = this.fb.group({
      idHotel: [''],
      nombreHotel: ['', Validators.required],
      direccionHotel: ['', Validators.required],
      telefonoHotel: ['', [Validators.required, Validators.pattern("^\\d{9}$")]],
      correoHotel: ['', Validators.required],
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
      this.hotelService.listID(this.id).subscribe((data: Hotel) =>{
        console.log(data);
        this.hotelForm.patchValue( {
          nombreHotel: data.nombreHotel,
          direccionHotel: data.direccionHotel,
          telefonoHotel: data.telefonoHotel,
          correoHotel: data.correoHotel
        })
      })
    }
  }

  onSubmit(){
    if(this.hotelForm.valid){
      const hotel: Hotel = new Hotel();
      hotel.idHotel = this.id;
      hotel.nombreHotel = this.hotelForm.value.nombreHotel;
      hotel.direccionHotel = this.hotelForm.value.direccionHotel;
      hotel.telefonoHotel = this.hotelForm.value.telefonoHotel;
      hotel.correoHotel = this.hotelForm.value.correoHotel;

      if(!this.edicion){
        console.log("Datos ingresados: ", hotel);
        //suscribe -> asincrono para que no nos bloquee
        this.hotelService.insert(hotel).subscribe((data: object): void =>{
          console.log("Datos insertados:", data);
        })
      }else{
        console.log("Datos ingresados: ", hotel);
        //suscribe -> asincrono para que no nos bloquee
        this.hotelService.update(hotel).subscribe((data: Object): void =>{
          console.log("Datos actualizados:", data);
        })
      }
      this.router.navigate(['hoteles']);
    }else {
      console.log("Formulario no valido");
    }
  }
}
