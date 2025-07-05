import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {Usuario} from '../../model/usuario';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {UsuarioService} from '../../services/usuario.service';
import {DatePipe} from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {ConfirmarDialogoComponent} from "./confirmar-dialogo/confirmar-dialogo.component";
import {Hotel} from '../../model/hotel';
import {HotelService} from '../../services/hotel.service';

@Component({
  selector: 'app-usuario-listar',
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
  templateUrl: './usuario-listar.component.html',
  styleUrl: './usuario-listar.component.css'
})
export class UsuarioListarComponent implements OnInit, AfterViewInit{
  lista: Usuario[] = [];
  displayedColumns = ['idUsuario', 'nombreUsuario', 'apellidoUsuario', 'telefonoUsuario', 'fechaNacimientoUsuario','emailUsuario','usernameUsuario','passwordUsuario','enabledUsuario', 'accion01', 'accion02'];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  usuarioService: UsuarioService = inject(UsuarioService);
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
    this.usuarioService.getList().subscribe(data => {
      this.dataSource.data = data;
    });
    this.loadlista();
  }

  loadlista():void {
    this.usuarioService.list().subscribe({
      next: (data) => {
        this.usuarioService.setList(data);//enviar la nueva lista a los suscriptores
      },
      error: (error)=>console.log("Error en consulta", error)
    })
  }

  openDialog(id:number) {
    const dialogRef = this.dialog.open(ConfirmarDialogoComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      } else {
        console.log("Diálogo respondió no eliminar");
      }
    });
  }

  delete(id:number) {
    this.usuarioService.delete(id).subscribe(() => {
      this.usuarioService.list().subscribe(data => {
        this.usuarioService.setList(data);//enviar la nueva lista a los suscriptores
      });
    });
  }
}
