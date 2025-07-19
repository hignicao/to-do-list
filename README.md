# Gerenciador de Tarefas - Desafio Técnico

Uma aplicação web full-stack de gerenciamento de tarefas (To-Do List) com autenticação de usuário, CRUD de tarefas, filtros e paginação.

## Descrição do Projeto

Este projeto foi desenvolvido como parte do processo seletivo para a vaga de Desenvolvedor Python Jr. na AdviceHealth. O objetivo foi criar uma API REST com Django REST Framework e um frontend reativo com React, seguindo as melhores práticas de desenvolvimento.

## Funcionalidades Implementadas

* [x] **Autenticação de Usuário:** Sistema completo de registro e login com tokens.
* [x] **CRUD de Tarefas:** Usuários podem Criar, Ler, Atualizar e Deletar suas próprias tarefas.
* [x] **Marcação de Status:** Tarefas podem ser marcadas como concluídas ou pendentes.
* [x] **Filtragem:** A lista de tarefas pode ser filtrada por status (Todas, Pendentes, Concluídas).
* [x] **Paginação:** A API pagina os resultados para melhor performance.
* [x] **Interface Reativa:** Frontend desenvolvido em React com uma interface moderna inspirada no Material Design.

## Tecnologias Utilizadas

**Backend:**
* Python 3
* Django
* Django REST Framework (para a API)
* SQLite3 (banco de dados padrão)

**Frontend:**
* React
* MUI (Material-UI) para componentes de UI
* Axios (para chamadas à API)
* React Router DOM (para navegação)

## Como Rodar o Projeto Localmente

Siga as instruções abaixo para executar o projeto na sua máquina.

### **Pré-requisitos**
* Python 3.x
* Node.js e npm
* Git

### **1. Backend**

```bash
# Clone o repositório
git clone https://github.com/hignicao/to-do-list
cd to-do-list/backend

# Crie e ative o ambiente virtual
# No Windows:
python -m venv venv
venv\Scripts\activate
# No Linux/macOS:
# python3 -m venv venv
# source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt

# Aplique as migrações no banco de dados
python manage.py migrate

# Inicie o servidor do backend
python manage.py runserver
# O backend estará rodando em http://127.0.0.1:8000
```

### **2. Frontend**

```bash
# Em outro terminal, navegue até a pasta do frontend
cd ../frontend

# Instale as dependências
npm install

# Inicie a aplicação React
npm start
# O frontend estará rodando em http://localhost:3000
```

## Arquitetura e Decisões de Design

* **Arquitetura Cliente-Servidor:** O projeto é dividido em um backend (API REST) e um frontend (Single Page Application), o que permite desacoplamento e escalabilidade.
* **Autenticação baseada em Token:** Optei pela autenticação por token (`TokenAuthentication`) do DRF por ser simples, segura e ideal para SPAs, evitando a complexidade de sessões e cookies.
* **Serializers do DRF:** Utilizados para validar e converter dados entre o formato do banco de dados e JSON, garantindo a integridade dos dados na API.
* **Estrutura de Componentes React:** O frontend foi organizado em `pages`, `components` e `services` para separar responsabilidades. A pasta `services` centraliza a lógica de comunicação com a API, seguindo o princípio DRY.
* **Biblioteca de UI (MUI):** Escolhi o MUI para agilizar o desenvolvimento da interface e garantir um visual profissional e consistente, inspirado no Material Design do Google.