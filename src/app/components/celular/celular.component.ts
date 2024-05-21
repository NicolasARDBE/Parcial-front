import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { Celular } from '../../models/celular';
import { CelularService } from '../../services/celular.service';

@Component({
  selector: 'app-celular',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './celular.component.html',
  styleUrl: './celular.component.css'
})

export class CelularComponent implements OnInit {
  celulares: Celular[] = [];
  celular: Celular = new Celular();
  editing: boolean = false;

  constructor(private celularService: CelularService) {}

  ngOnInit() {
    this.getCelulares();
  }

  resetCelular() {
    this.celular = new Celular(); // Crea una nueva instancia de Finca
    this.editing = false;    // Actualiza el estado de edición
  }

  getCelulares() {
    this.celularService.getAllCelulares().then(data => {
      this.celulares = data;
    }).catch(error => console.error('Error fetching celulares:', error));
  }

  saveCelular() {
    this.celularService.saveCelular(this.celular).then(() => {
      this.getCelulares(); // Refresh the list
      this.celular = new Celular(); // Reset the form
      this.editing = false;
    }).catch(error => console.error('Error saving Celular:', error));
  }

  editCelular(celular: Celular) {
    this.celular = { ...celular };
    this.editing = true;
  }

  deleteCelular(id: number | null | undefined) {
    if (id !== null && id !== undefined) { // Asegura que id no sea null ni undefined
      this.celularService.deleteCelular(id).then(() => {
        this.getCelulares(); // Refresca la lista
      }).catch(error => console.error('Error deleting finca:', error));
    }
  }
}