# 🎬 CineMestre - Sistema de Reserva de Assentos

![Status do Projeto](https://img.shields.io/badge/Status-Concluído-brightgreen)
![Tecnologias](https://img.shields.io/badge/Stack-HTML5%20|%20CSS3%20|%20JavaScript-blue)

Um sistema web interativo para reserva de poltronas de cinema, desenvolvido com foco em manipulação avançada de **Matrizes (Arrays Bidimensionais)**, persistência de dados e arquitetura baseada em **MVC**.

## 🚀 Funcionalidades

* **Autenticação Simples:** Tela de login inicial com validação de nome de usuário e suporte a eventos de teclado (`Enter`).
* **Mapeamento em Matriz:** O layout da sala de cinema é gerado de forma totalmente dinâmica através de uma matriz via JavaScript (onde `0 = Livre`, `1 = Ocupado`, `2 = Selecionado`).
* **Persistência Local:** Utiliza a Web API `localStorage` para manter o usuário logado e os assentos salvos mesmo após o recarregamento da página (F5).
* **Cálculo em Tempo Real:** Atualização dinâmica da quantidade de assentos no carrinho e valor total da compra.
* **UX/UI:** Feedback visual imediato com CSS Grid e bloqueio de cliques em assentos já vendidos.

## 🏗️ Arquitetura e Padrões de Projeto (MVC)

O projeto foi estruturado separando responsabilidades, facilitando a escalabilidade:
* **Model (Dados):** A matriz `matrizCinema` atua como o banco de dados temporário, armazenando os estados das poltronas com complexidade de busca O(1).
* **View (Interface):** Funções dedicadas unicamente a ler a matriz e renderizar o DOM (`desenharSala()`), aplicando as classes CSS correspondentes.
* **Controller (Lógica):** Funções de negócio (`selecionarAssento()`) que interpretam o clique do usuário, alteram o Model e disparam a atualização da View.

## 📁 Estrutura de Pastas

```text
/
├── index.html       # Tela principal (Sala de Cinema)
├── login.html       # Tela de entrada e identificação
├── css/
│   └── style.css    # Estilos globais e CSS Grid da matriz
└── js/
    ├── app.js       # Lógica principal, MVC e manipulação de carrinho
    └── login.js     # Lógica de validação e redirecionamento