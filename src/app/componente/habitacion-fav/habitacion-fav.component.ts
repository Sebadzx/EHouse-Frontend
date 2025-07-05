import {Component, OnInit} from '@angular/core';
import {NroHabitaciones} from '../../model/NroHabitaciones';
import {HotelService} from '../../services/hotel.service';
import {MatPaginator} from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {HabitacionService} from '../../services/habitacion.service';
import {HabitacionFab} from '../../model/habitacionFab';

@Component({
  selector: 'app-hotel-numero-habitaciones',
  standalone: true,
  imports: [MatPaginator, MatTable, MatHeaderCell, MatColumnDef, MatCell, MatCellDef, MatHeaderCellDef, MatHeaderRowDef, MatHeaderRow, MatRow, MatRowDef],
  templateUrl: './habitacion-fav.component.html',
  styleUrl: './habitacion-fav.component.css'
})
export class HabitacionFavComponent implements OnInit{
  displayedColumns: string[] = ['idHotel', 'nombreHotel', 'tipoHabitacion', 'idHabitacionFavorita'];
  dataSource: HabitacionFab[] = [];
  hotelService: HotelService = new HotelService();
  habitacionService: HabitacionService = new HabitacionService();

  constructor() {}

  ngOnInit(): void {
    this.habitacionService.getHabFav().subscribe(
      (data) => {
        this.dataSource = data;
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );

  }

}

