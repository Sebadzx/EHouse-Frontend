import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Router, RouterLink} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {Habitacion} from '../../model/habitacion';
import {HabitacionService} from '../../services/habitacion.service';
import {ConfirmarDialogoComponent} from './confirmar-dialogo/confirmar-dialogo.component';

@Component({
  selector: 'app-habitacion-listar',
  standalone: true,
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    RouterLink
  ],
  templateUrl: './habitacion-listar.component.html',
  styleUrl: './habitacion-listar.component.css'
})
export class HabitacionListarComponent implements OnInit, AfterViewInit{
  lista: Habitacion[] = [];
  displayedColumns = ['idHabitacion', 'tipoHabitacion', 'disponibilidad', 'descripcionHabitacion', 'hotel', 'accion01', 'accion02'];
  dataSource: MatTableDataSource<Habitacion> = new MatTableDataSource<Habitacion>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  habitacionService: HabitacionService = inject(HabitacionService);
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
    // Suscribirse al observable de la lista de habitacion
    this.habitacionService.getList().subscribe(data => {
      this.dataSource.data = data;
    });
    this.loadlista();
  }

  loadlista():void {
    this.habitacionService.list().subscribe({
      next: (data) => {
        this.habitacionService.setList(data);//enviar la nueva lista a los suscriptores
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
    this.habitacionService.delete(id).subscribe(() => {
      this.habitacionService.list().subscribe(data => {
        this.habitacionService.setList(data);//enviar la nueva lista a los suscriptores
      });
    });
  }
}
