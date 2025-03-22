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
  displayedColumns = ['nome', 'cpf_cnpj', 'email', 'acoes'];

  constructor(private clienteService: ClienteService, private router: Router) {
    this.clienteService.listar().subscribe(data => this.clientes = data);
  }

  novo() {
    this.router.navigate(['/clientes/novo']);
  }

  editar(id: string) {
    this.router.navigate(['/clientes/editar', id]);
  }

  remover(id: string) {
    if (confirm('Deseja realmente remover este cliente?')) {
      this.clienteService.remover(id).subscribe(() => {
        this.clientes = this.clientes.filter(c => c.id !== id);
      });
    }
  }
}
