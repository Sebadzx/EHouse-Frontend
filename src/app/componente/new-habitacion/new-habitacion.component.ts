import {Component, inject, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";import {Hotel} from '../../model/hotel';
import {Habitacion} from '../../model/habitacion';
import {HabitacionService} from '../../services/habitacion.service';
import {HotelService} from '../../services/hotel.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {NavbarComponent} from "../navbar/navbar.component";;


@Component({
  selector: 'app-new-habitacion',
  standalone: true,
  imports: [
    FormsModule,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    NgForOf,
    MatButton,
    NavbarComponent
  ],
  templateUrl: './new-habitacion.component.html',
  styleUrl: './new-habitacion.component.css'
})
export class NewHabitacionComponent {
  habitacionForm: FormGroup;
  fb = inject(FormBuilder);
  habitacionService: HabitacionService = inject(HabitacionService);
  hotelService: HotelService = inject(HotelService);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute)
  edicion: boolean = false;

  id: number = 0;
  public idHotelSeleccionado: number = 0;
  lista: Hotel[] = [];
  hotel: Hotel = new Hotel();


  constructor() {
    console.log("Constructor ProveedorNuevoEditComponent")
    this.habitacionForm = this.fb.group({
      idhabitacion: [''],
      tipoHabitacion: ['', Validators.required],
      disponibilidad: ['', Validators.required],
      descripcionHabitacion: ['', Validators.required],
      hotel: ['', Validators.required]
    })
  }

  ngOnInit(): void { //sólo una vez luego del constructor
    console.log("ngOnInit de ProductoComponent, Load Lista de Tipos Productos")
    this.loadLista();
  }

  loadLista(): void {
    this.hotelService.list().subscribe({
      next: (data: Hotel[]) => {
        this.lista = data;
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  onSubmit() {
    if (this.habitacionForm.valid) {
      const habitacion: Habitacion = new Habitacion();
      habitacion.idHabitacion = 0;
      habitacion.tipoHabitacion = this.habitacionForm.value.tipoHabitacion;
      habitacion.descripcionHabitacion = this.habitacionForm.value.descripcionHabitacion;
      habitacion.disponibilidad = this.habitacionForm.value.disponibilidad;
      habitacion.hotel = this.hotel;
      habitacion.hotel.idHotel = this.habitacionForm.value.hotel;
      console.log("Producto validado para registrar:", habitacion);
      this.habitacionService.insert(habitacion).subscribe({
        next: (data: Object): void => {
          console.log("Producto registrado:", data);
        }
      })
      alert("Producto registrado!")
      this.router.navigate(['habitacion'])
    } else {
      alert("Formulario no valido!")
      console.log("Formulario no valido");
    }
  }
  /*ngOnInit(): void {
    this.id = this.data.id;
    this.edicion = this.data.id != 0;
    if (this.edicion) {
      this.init()
      this.titulo = "Modificar"
    }

    this.habitacionForm = this.formBuilder.group({
      tipoHabitacion:['',Validators.required],
      disponibilidad:['',Validators.required],
      descripcionHabitacion:['',Validators.required],
      hoteL: ['',Validators.required]
    });

    this.hotelService.list().subscribe((data) => {
      this.listaHoteles = data;
    });
  }

  registrar(): void {
    if (this.habitacionForm.valid) {
      this.habitacion.tipoHabitacion=this.habitacionForm.value.tipoHabitacion
      this.habitacion.idHabitacion=this.id
      this.habitacion.disponibilidad=this.habitacionForm.value.disponibilidad
      this.habitacion.descripcionHabitacion=this.habitacionForm.value.descripcionHabitacion
      this.habitacion.hotel.idHotel = this.habitacionForm.value.hoteL;

      if (this.edicion) {
        this.habitacionService.update(this.habitacion).subscribe((data)=>{
          this.habitacionService.list().subscribe((data)=>{
            this.habitacionService.setList(data)
          })
          this.mostrarMensaje(false);
        })
      }
      else{
        this.habitacionService.insert(this.habitacion).subscribe((data)=>{
          this.habitacionService.list().subscribe((data)=>{
            this.habitacionService.setList(data)
          })
          this.mostrarMensaje(false);
        })
      }
      this._matDialogRef.close()
    }
  }

  mostrarMensaje(esError: boolean) {
    let mensaje = esError
      ? '¡Ha ocurrido un error!'
      : '¡Has registrado exitosamente!';
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }

  init() {
    this.habitacionService.listID(this.id).subscribe((data) => {
      this.habitacionForm = new FormGroup({
        tipoHabitacion: new FormControl(data.tipoHabitacion),
        disponibilidad: new FormControl(data.disponibilidad),
        descripcionHabitacion: new FormControl(data.descripcionHabitacion),
        hoteL: new FormControl(data.hotel.idHotel),
      })
    })
  }*/
}
