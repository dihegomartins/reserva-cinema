# 🎬 Cinema Seat Reservation System

Um sistema web altamente funcional para reserva de assentos de cinema, construído com foco em manipulação de Matrizes (Arrays Bidimensionais) e separação de responsabilidades (conceitos de MVC).

## 🚀 Funcionalidades
* **Mapeamento em Matriz:** O layout da sala é gerado dinamicamente a partir de uma matriz no JavaScript.
* **Persistência de Dados:** Utiliza o `localStorage` da Web API para salvar as reservas. Se a página for recarregada, os assentos ocupados continuam salvos!
* **Cálculo Dinâmico:** Atualização em tempo real da quantidade de assentos selecionados e do valor total da compra.
* **Prevenção de Erros:** Bloqueio visual e lógico para impedir a compra de assentos já ocupados.

## 🛠️ Tecnologias Utilizadas
* **HTML5:** Estruturação semântica.
* **CSS3:** Estilização com CSS Grid para renderização perfeita da matriz visual.
* **JavaScript (Vanilla):** Lógica de negócios, manipulação do DOM e LocalStorage.

## 🧠 Lógica e Padrões
O projeto foi estruturado separando a camada de Dados (a matriz de assentos) da camada de Visualização (renderização do HTML). Cada poltrona na interface corresponde a um índice `[linha][coluna]` exato no cérebro da aplicação, permitindo buscas e atualizações com complexidade O(1).

## 💻 Como rodar o projeto
1. Clone este repositório: `git clone https://github.com/dihegomartins/projeto-cinema.git`
2. Abra o arquivo `index.html` em qualquer navegador moderno.