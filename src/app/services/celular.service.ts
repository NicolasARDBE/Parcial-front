import { Injectable } from '@angular/core';
import axios from 'axios';
import { Celular } from '../models/celular';

@Injectable({
  providedIn: 'root'
})
export class CelularService {
  private apiUrl = 'http://localhost:8080/celulares';

  constructor() { }

  getAllCelulares(): Promise<Celular[]> {
    return axios.get<Celular[]>(this.apiUrl).then(response => {
      console.log("Celulares recibidas:", response.data);
      return response.data;
    }).catch(error => {
      console.error("Error al obtener los celulares", error);
      throw error;
    });
  }

  getCelularById(id: number): Promise<Celular> {
    return axios.get<Celular>(`${this.apiUrl}/${id}`).then(response => {
      console.log("Celular recibido:", response.data);
      return response.data;
    }).catch(error => {
      console.error("Error al obtener el celular", error);
      throw error;
    });
  }

  saveCelular(celular: Celular): Promise<Celular> {
    const url = celular.id ? `${this.apiUrl}/${celular.id}` : this.apiUrl;
    const method = celular.id ? 'put' : 'post';

    return axios({
      method: method,
      url: url,
      data: celular
    }).then(response => {
      console.log(`Celular ${celular ? 'actualizada' : 'guardada'}:`, response.data);
      return response.data;
    }).catch(error => {
      console.error(`Error al ${celular.id ? 'actualizar' : 'guardar'} el celular`, error);
      throw error;
    });
  }

  deleteCelular(id: number): Promise<void> {
    return axios.delete(`${this.apiUrl}/${id}`).then(() => {
      console.log("Celular eliminada con éxito");
    }).catch(error => {
      console.error("Error al eliminar celular", error);
      throw error;
    });
  }
}
