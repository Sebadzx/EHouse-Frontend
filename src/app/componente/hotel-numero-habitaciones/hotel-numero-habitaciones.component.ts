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

@Component({
  selector: 'app-hotel-numero-habitaciones',
  standalone: true,
  imports: [MatPaginator, MatTable, MatHeaderCell, MatColumnDef, MatCell, MatCellDef, MatHeaderCellDef, MatHeaderRowDef, MatHeaderRow, MatRow, MatRowDef],
  templateUrl: './hotel-numero-habitaciones.component.html',
  styleUrl: './hotel-numero-habitaciones.component.css'
})
export class HotelNumeroHabitacionesComponent implements OnInit{
  displayedColumns: string[] = ['idHotel', 'nombreHotel', 'nroHabitaciones'];
  dataSource: NroHabitaciones[] = [];
  hotelService: HotelService = new HotelService();

  constructor() {}

  ngOnInit(): void {
    this.hotelService.getNumeroHabitaciones().subscribe(
      (data) => {
        this.dataSource = data;
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

}
