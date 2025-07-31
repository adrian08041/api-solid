# GymPass Style App

API inspirada no modelo do GymPass, com funcionalidades para autenticação de usuários, gerenciamento de academias, check-ins e mais.

---

## 📋 Requisitos Funcionais (RFs)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

---

## 📌 Regras de Negócio (RNs)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após ser criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

---

## 🛠 Requisitos Não Funcionais (RNFs)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);

---

## 🚀 Tecnologias Utilizadas

- Node.js
- TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- JWT (Autenticação)
- Zod (Validação)
- Vitest (Testes)

---

## ⚙️ Como rodar o projeto localmente

### Pré-requisitos

- Node.js (v18+ recomendado)
- PostgreSQL
- Docker

### Passos

1. Clone o repositório:

```bash
git clone https://github.com/adrian08041/api-solid
cd api-solid
```

2. Copie o .env.example e configure o .env:

```bash
   NODE_ENV

  JWT_SECRET

  DATABASE_URL
```

3. Instale as dependências:

```bash
   npm install
```

4. Rode as migrations:

```
npx prisma migrate dev
```

Inicie o servidor:

```
npm run start:dev
```

A API estará disponível em http://localhost:3333.

### 🧪 Como executar os testes

```
  npm run test
```

# 📬 Endpoints da API

### 👤 Usuários

| Método | Rota             | Descrição                           | Autenticação |
| ------ | ---------------- | ----------------------------------- | ------------ |
| POST   | `/users`         | Cadastrar novo usuário              | ❌           |
| POST   | `/sessions`      | Autenticar usuário (login)          | ❌           |
| PATCH  | `/token/refresh` | Renovar token JWT                   | ❌           |
| GET    | `/me`            | Obter perfil do usuário autenticado | ✅           |

### 🏋️ Academias (/gyms)

- Todas as rotas abaixo exigem autenticação JWT.

| Método | Rota           | Descrição                                      | Admin |
| ------ | -------------- | ---------------------------------------------- | ----- |
| POST   | `/gyms`        | Cadastrar nova academia                        | ✅    |
| GET    | `/gyms/search` | Buscar academias por nome                      | ❌    |
| GET    | `/gyms/nearby` | Listar academias próximas da localização atual | ❌    |

### 📍 Check-ins (/check-ins)

- Todas as rotas abaixo exigem autenticação JWT.

| Método | Rota                             | Descrição                               | Admin |
| ------ | -------------------------------- | --------------------------------------- | ----- |
| POST   | `/gyms/:gymId/check-ins`         | Realizar check-in em uma academia       | ❌    |
| GET    | `/check-ins/history`             | Obter histórico de check-ins do usuário | ❌    |
| GET    | `/check-ins/metrics`             | Obter total de check-ins realizados     | ❌    |
| PATCH  | `/check-ins/:checkInId/validate` | Validar um check-in realizado           | ✅    |

### 🛡 Autenticação e Autorização

A maioria das rotas exige um JWT no header:

```
Authorization: Bearer SEU_TOKEN
```

- Rotas com privilégios de administrador exigem que o token represente um usuário com papel "ADMIN".

# 📦 Exemplos de Requisição

### 🔹 Cadastro de usuário

```
POST /users
Content-Type: application/json

{
  "name": "Adrian Messias",
  "email": "adrian@email.com",
  "password": "123456"
}
```

### 🔹 Login

```
POST /sessions
Content-Type: application/json

{
  "email": "adrian@email.com",
  "password": "123456"
}
```

### 🔹 Renovar Token

```
PATCH /token/refresh
Authorization: Bearer SEU_REFRESH_TOKEN
```

### 🔹 Obter perfil

```
  GET /me
  Authorization: Bearer SEU_TOKEN
```

### 🔹 Criar academia (admin)

```
POST /gyms
Authorization: Bearer ADMIN_TOKEN

{
  "title": "SmartFit Vila Olímpia",
  "description": "Academia moderna com área funcional",
  "phone": "11988887777",
  "latitude": -23.6022,
  "longitude": -46.6753
}
```

### 🔹 Buscar academias por nome

```
  GET /gyms/search?query=SmartFit
  Authorization: Bearer SEU_TOKEN
```

### 🔹 Buscar academias próximas

```
  GET /gyms/nearby?latitude=-23.6&longitude=-46.67
  Authorization: Bearer SEU_TOKEN
```

### 🔹 Fazer check-in

```
  POST /gyms/gym-uuid/check-ins
  Authorization: Bearer SEU_TOKEN

 {
  "latitude": -23.601,
  "longitude": -46.674
  }
```

### 🔹 Histórico de check-ins

```
  GET /check-ins/history
  Authorization: Bearer SEU_TOKEN
```

### 🔹 Total de check-ins

```
GET /check-ins/metrics
Authorization: Bearer SEU_TOKEN
```

### 🔹 Validar check-in (admin)

```
PATCH /check-ins/checkin-uuid/validate
Authorization: Bearer ADMIN_TOKEN
```

