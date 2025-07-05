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
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {Resenia} from '../../model/resernia';
import {ReseniaService} from '../../services/resenia.service';
import {ConfirmarDialogoComponent} from '../habitacion-listar/confirmar-dialogo/confirmar-dialogo.component';

@Component({
  selector: 'app-resenia-listar',
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
    RouterLink,
    MatHeaderCellDef
  ],
  templateUrl: './resenia-listar.component.html',
  styleUrl: './resenia-listar.component.css'
})
export class ReseniaListarComponent {
  lista: Resenia[] = [];
  displayedColumns = ['idResenia', 'puntuacion', 'fechaResenia', 'descripcionResenia', 'usuario', 'accion01', 'accion02'];
  dataSource: MatTableDataSource<Resenia> = new MatTableDataSource<Resenia>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  reseniaService: ReseniaService = inject(ReseniaService);
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
    this.reseniaService.getList().subscribe(data => {
      this.dataSource.data = data;
    });
    this.loadlista();
  }

  loadlista():void {
    this.reseniaService.list().subscribe({
      next: (data) => {
        this.reseniaService.setList(data);//enviar la nueva lista a los suscriptores
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
    this.reseniaService.delete(id).subscribe(() => {
      this.reseniaService.list().subscribe(data => {
        this.reseniaService.setList(data);//enviar la nueva lista a los suscriptores
      });
    });
  }
}
