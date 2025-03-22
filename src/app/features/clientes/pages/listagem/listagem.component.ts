import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Cliente } from '../../../../core/models/cliente.model';
import { ClienteService } from '../../../../core/services/cliente.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiResponse } from '../../../../core/models/api-response.model';

@Component({
  standalone: true,
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,     
    ReactiveFormsModule
  ]
})
export class ListagemComponent {
  clientes: Cliente[] = [];
  displayedColumns = ['nome', 'cpF_CNPJ', 'email', 'acoes'];

  constructor(private clienteService: ClienteService, private router: Router) {
    this.carregarClientes();
  }

  carregarClientes() {
    this.clienteService.listar().subscribe((res: ApiResponse<Cliente[]>) => {
      if (res.success && res.data) {
        this.clientes = res.data;
      } else {
        alert(res.errors?.join('\n') || 'Erro ao carregar clientes');
      }
    });
  }

  novo() {
    this.router.navigate(['/clientes/novo']);
  }

  editar(id: string) {
    this.router.navigate(['/clientes/editar', id]);
  }

  remover(id: string) {
    if (confirm('Deseja realmente remover este cliente?')) {
      this.clienteService.remover(id).subscribe(res => {
        if (res.success) {
          this.clientes = this.clientes.filter(c => c.id !== id);
        } else {
          alert(res.errors?.join('\n') || 'Erro ao remover cliente');
        }
      });
    }
  }
}
