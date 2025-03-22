import { Endereco } from "./endereco.model";

export interface Cliente {
    id?: string;
    nome: string;
    cpF_CNPJ: string;
    dataNascimento: string;
    telefone: string;
    email: string;
    endereco: Endereco;
}