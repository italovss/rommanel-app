import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private api = 'https://localhost:7221/api/cliente';

  constructor(private http: HttpClient) {}

  listar(): Observable<ApiResponse<Cliente[]>> {
    return this.http.get<ApiResponse<Cliente[]>>(this.api);
  }

  obterPorId(id: string): Observable<ApiResponse<Cliente>> {
    return this.http.get<ApiResponse<Cliente>>(`${this.api}/${id}`);
  }

  criar(cliente: Cliente): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.api, cliente);
  }

  atualizar(id: string, cliente: Cliente): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.api}/${id}`, cliente);
  }

  remover(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.api}/${id}`);
  }
}
