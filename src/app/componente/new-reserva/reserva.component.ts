import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOption} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {ReservaService} from '../../services/reserva.service';
import {Reserva} from '../../model/reserva';
import {MatSelect} from '@angular/material/select';
import {HabitacionService} from '../../services/habitacion.service';
import {SadicionalesService} from '../../services/sadicionales.service';
import {Habitacion} from '../../model/habitacion';
import {Sadicionales} from '../../model/sadicionales';
import {Hotel} from '../../model/hotel';
import {NgForOf} from '@angular/common';


@Component({
  selector: 'app-new-reserva',
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
    MatSelect,
    MatOption,
    NgForOf,
    //add
  ],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent {
  reservaForm: FormGroup;
  fb= inject(FormBuilder);
  //Crear una instancia de usuarioService
  //inject sinonimo al @Autorrider de Spring
  reservaService: ReservaService = inject(ReservaService);
  habitacionService: HabitacionService = inject(HabitacionService);
  sAdicionalService: SadicionalesService = inject(SadicionalesService);
  router: Router = inject(Router);
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;
  public idHabitacionSelec: number = 0;
  public idServiciosAdicionalesSelec: number = 0;
  listaHab: Habitacion[] = [];
  listaSAd: Sadicionales[] = [];
  habitacion: Habitacion = new Habitacion();
  sAdicionales: Sadicionales = new Sadicionales();

  constructor() {
    console.log("Constructor ReservaComponent")
    this.reservaForm = this.fb.group({
      idReserva: [''],
      cantidadPersonas: ['', Validators.required],
      fecha_reserva: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      precioTotal: ['', Validators.required],
      estadoReserva: ['', Validators.required],
      habitacion: ['', Validators.required],
      sAdicionales: [''],
    })
  }

  ngOnInit(): void { //sólo una vez luego del constructor
    console.log("ngOnInit de ProductoComponent, Load Lista de Tipos Productos")
    this.loadLista1();
    this.loadLista2();
  }

  loadLista1(): void {
    this.habitacionService.list().subscribe({
      next: (data: Habitacion[]) => {
        this.listaHab = data;
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  loadLista2(): void {
    this.sAdicionalService.list().subscribe({
      next: (data: Sadicionales[]) => {
        this.listaSAd = data;
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  onSubmit(){
    if(this.reservaForm.valid){
      const reserva: Reserva = new Reserva();
      reserva.idReserva = this.id;
      reserva.cantidadPersonas = this.reservaForm.value.cantidadPersonas;
      reserva.fecha_reserva = this.reservaForm.value.fecha_reserva;
      reserva.fechaInicio = this.reservaForm.value.fechaInicio;
      reserva.fechaFin = this.reservaForm.value.fechaFin;
      reserva.precioTotal = this.reservaForm.value.precioTotal;
      reserva.estadoReserva = this.reservaForm.value.estadoReserva;
      reserva.habitacion = this.habitacion;
      reserva.habitacion.idHabitacion = this.reservaForm.value.habitacion;
      reserva.sAdicionales = this.sAdicionales;
      reserva.sAdicionales.idServiciosAdicionales = this.reservaForm.value.sAdicionales;
      if(!this.edicion){
        console.log("Datos ingresados: ", reserva);
        //suscribe -> asincrono para que no nos bloquee
        this.reservaService.insert(reserva).subscribe((data: object): void =>{
          console.log("Datos insertados:", data);
        })
      }else{
        console.log("Datos ingresados: ", reserva);
        //suscribe -> asincrono para que no nos bloquee
        this.reservaService.update(reserva).subscribe((data: Object): void =>{
          console.log("Datos actualizados:", data);
        })
      }
      this.router.navigate(['reservas']);
    }else {
      console.log("Formulario no valido");
    }
  }
}
