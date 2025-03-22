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
  styleUrl: './formulario.component.scss',
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
    cpF_CNPJ: ['', Validators.required],
    dataNascimento: ['', Validators.required],
    telefone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    endereco: this.fb.group({
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
    }),
  });

  id: string | null = null;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.clienteService.obterPorId(this.id).subscribe(res => {
        if (res.success && res.data) {
          this.form.patchValue(res.data);
        } else {
          alert(res.errors?.join('\n') || 'Erro ao carregar cliente');
          this.router.navigate(['/clientes']);
        }
      });
    }
  }

  salvar() {
    if (this.form.invalid) return;
  
    const cliente = this.form.value as Cliente;
  
    const obs = this.id
      ? this.clienteService.atualizar(this.id, cliente)
      : this.clienteService.criar(cliente);
  
    obs.subscribe(res => {
      if (res.success) {
        alert(res.message || 'Cliente salvo com sucesso!');
        this.router.navigate(['/clientes']);
      } else {
        alert(res.errors?.join('\n') || 'Erro ao salvar cliente');
      }
    });
  }
}
