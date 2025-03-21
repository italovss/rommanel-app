import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../../../core/services/cliente.service';
import { Cliente } from '../../../../core/models/cliente.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  standalone: true,
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule
  ],
})
export class FormularioComponent implements OnInit {
  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form = this.fb.group({
    nome: ['', Validators.required],
    cpf_cnpj: ['', Validators.required],
    dataNascimento: ['', Validators.required],
    telefone: [''],
    email: ['', [Validators.required, Validators.email]],
    endereco: this.fb.group({
      cep: [''],
      logradouro: [''],
      numero: [''],
      bairro: [''],
      cidade: [''],
      estado: [''],
    }),
  });

  id: string | null = null;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.clienteService.obterPorId(this.id).subscribe(cliente => {
        this.form.patchValue(cliente);
      });
    }
  }

  salvar() {
    if (this.form.invalid) return;

    const cliente = this.form.value as Cliente;

    const obs = this.id
      ? this.clienteService.atualizar(this.id, cliente)
      : this.clienteService.criar(cliente);

    obs.subscribe(() => {
      alert('Cliente salvo com sucesso!');
      this.router.navigate(['/clientes']);
    });
  }
}
