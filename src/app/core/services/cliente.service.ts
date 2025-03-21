import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private api = 'https://localhost:7221/api/cliente';

  constructor(private http: HttpClient) {}

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.api);
  }

  obterPorId(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.api}/${id}`);
  }

  criar(cliente: Cliente): Observable<any> {
    return this.http.post(this.api, cliente);
  }

  atualizar(id: string, cliente: Cliente): Observable<any> {
    return this.http.put(`${this.api}/${id}`, cliente);
  }

  remover(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}