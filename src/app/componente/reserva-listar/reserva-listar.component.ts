import {Component, inject, ViewChild} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Router, RouterLink} from '@angular/router';
import {Hotel} from '../../model/hotel';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {HotelService} from '../../services/hotel.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmarDialogoComponent} from '../hotel-listar/confirmar-dialogo/confirmar-dialogo.component';
import {Reserva} from '../../model/reserva';
import {ReservaService} from '../../services/reserva.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-new-reserva-listar',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    DatePipe,
    MatSort,
    MatSortHeader,
    MatButton,
    RouterLink
  ],
  templateUrl: './reserva-listar.component.html',
  styleUrl: './reserva-listar.component.css'
})
export class ReservaListarComponent {
  lista: Reserva[] = [];
  displayedColumns = ['idReserva', 'cantidadPersonas', 'fecha_reserva', 'fechaInicio', 'fechaFin','precioTotal', 'estadoReserva', 'habitacion', 'sAdicionales', 'accion01', 'accion02'];
  dataSource: MatTableDataSource<Reserva> = new MatTableDataSource<Reserva>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  reservaService: ReservaService = inject(ReservaService);
  route: Router = inject(Router);
  dialog=inject(MatDialog);

  constructor() {
    console.log('Load constructor');
  }

  ngAfterViewInit():void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void{
    console.log('Load Lista');
    // Suscribirse al observable de la lista de reservas
    this.reservaService.getList().subscribe(data => {
      this.dataSource.data = data;
    });
    this.loadlista();
  }

  loadlista():void {
    this.reservaService.list().subscribe({
      next: (data) => {
        this.reservaService.setList(data);//enviar la nueva lista a los suscriptores
      },
      error: (error)=>console.log("Error en consulta", error)
    })
  }

  openDialog(id:number){
    const dialogRef = this.dialog.open(ConfirmarDialogoComponent);
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.delete(id);
      }else{
        console.log("Diálogo respondió no eliminar");
      }
    });
  }

  delete(id:number) {
    this.reservaService.delete(id).subscribe(() => {
      this.reservaService.list().subscribe(data => {
        this.reservaService.setList(data);//enviar la nueva lista a los suscriptores
      });
    });
  }
}
