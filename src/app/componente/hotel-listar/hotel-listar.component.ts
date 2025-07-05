import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Hotel} from '../../model/hotel';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {HotelService} from '../../services/hotel.service';
import {DatePipe} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {MatButton, MatButtonModule} from '@angular/material/button';
import{
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {ConfirmarDialogoComponent} from "./confirmar-dialogo/confirmar-dialogo.component";

@Component({
  selector: 'app-hotel-listar',
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
  templateUrl: './hotel-listar.component.html',
  styleUrl: './hotel-listar.component.css'
})
export class HotelListarComponent implements OnInit, AfterViewInit{
  lista: Hotel[] = [];
  displayedColumns = ['idHotel', 'nombreHotel', 'direccionHotel', 'telefonoHotel', 'correoHotel', 'accion01', 'accion02'];
  dataSource: MatTableDataSource<Hotel> = new MatTableDataSource<Hotel>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  hotelService: HotelService = inject(HotelService);
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
    // Suscribirse al observable de la lista de hoteles
    this.hotelService.getList().subscribe(data => {
      this.dataSource.data = data;
    });
    this.loadlista();
  }

  loadlista():void {
    this.hotelService.list().subscribe({
      next: (data) => {
        this.hotelService.setList(data);//enviar la nueva lista a los suscriptores
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
    this.hotelService.delete(id).subscribe(() => {
      this.hotelService.list().subscribe(data => {
        this.hotelService.setList(data);//enviar la nueva lista a los suscriptores
      });
    });
  }
}
