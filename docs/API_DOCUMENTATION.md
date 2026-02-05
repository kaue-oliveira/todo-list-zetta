# Documentação da API - Todo List System

## Visão Geral

A API Todo List é uma aplicação RESTful construída com Spring Boot que fornece endpoints para gerenciamento de tarefas e autenticação de usuários. A API utiliza autenticação baseada em JWT (JSON Web Token) para proteger endpoints.

**Base URL:** `http://localhost:8080/api`

**Documentação Swagger:** `http://localhost:8080/api/swagger-ui.html`

## Autenticação

A API utiliza JWT (JSON Web Token) para autenticação. Após fazer login ou se registrar, você receberá um token que deve ser incluído em todas as requisições subsequentes.

### Header de Autenticação

```
Authorization: Bearer {token}
```

### Exemplo com cURL

```bash
curl -H "Authorization: Bearer seu_token_aqui" \
  http://localhost:8080/api/tasks
```

## Endpoints

### 1. Autenticação

#### 1.1 Login

**Endpoint:** `POST /auth/login`

**Descrição:** Autentica um usuário e retorna um JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "type": "Bearer",
  "expiresIn": 86400,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Exemplo com cURL:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

#### 1.2 Registro

**Endpoint:** `POST /auth/register`

**Descrição:** Cria uma nova conta de usuário.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}
```

**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "type": "Bearer",
  "expiresIn": 86400,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Validações:**
- Email deve ser único
- Senha deve ter entre 6 e 100 caracteres
- Senhas devem ser idênticas
- Nome deve ter entre 2 e 100 caracteres

**Exemplo com cURL:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "user@example.com",
    "password": "password123",
    "passwordConfirm": "password123"
  }'
```

#### 1.3 Health Check

**Endpoint:** `GET /auth/health`

**Descrição:** Verifica se a API está funcionando.

**Response (200 OK):**
```
API is running
```

**Exemplo com cURL:**
```bash
curl http://localhost:8080/api/auth/health
```

### 2. Tarefas

Todos os endpoints de tarefas requerem autenticação (JWT token).

#### 2.1 Listar Todas as Tarefas

**Endpoint:** `GET /tasks`

**Descrição:** Retorna todas as tarefas do usuário autenticado.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Comprar leite",
    "description": "Ir ao mercado e comprar leite integral",
    "status": "PENDING",
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": "2024-01-15T10:30:00"
  },
  {
    "id": 2,
    "name": "Fazer exercício",
    "description": "30 minutos de corrida",
    "status": "COMPLETED",
    "createdAt": "2024-01-14T08:00:00",
    "updatedAt": "2024-01-15T18:00:00"
  }
]
```

**Exemplo com cURL:**
```bash
curl -H "Authorization: Bearer seu_token" \
  http://localhost:8080/api/tasks
```

#### 2.2 Listar Tarefas por Status

**Endpoint:** `GET /tasks/status/{status}`

**Descrição:** Retorna tarefas filtradas por status (PENDING ou COMPLETED).

**Parâmetros:**
- `status` (path): PENDING ou COMPLETED

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Comprar leite",
    "description": "Ir ao mercado e comprar leite integral",
    "status": "PENDING",
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": "2024-01-15T10:30:00"
  }
]
```

**Exemplo com cURL:**
```bash
curl -H "Authorization: Bearer seu_token" \
  http://localhost:8080/api/tasks/status/PENDING
```

#### 2.3 Obter Tarefa por ID

**Endpoint:** `GET /tasks/{id}`

**Descrição:** Retorna uma tarefa específica pelo ID.

**Parâmetros:**
- `id` (path): ID da tarefa

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Comprar leite",
  "description": "Ir ao mercado e comprar leite integral",
  "status": "PENDING",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

**Exemplo com cURL:**
```bash
curl -H "Authorization: Bearer seu_token" \
  http://localhost:8080/api/tasks/1
```

#### 2.4 Criar Nova Tarefa

**Endpoint:** `POST /tasks`

**Descrição:** Cria uma nova tarefa para o usuário autenticado.

**Request Body:**
```json
{
  "name": "Comprar leite",
  "description": "Ir ao mercado e comprar leite integral"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "name": "Comprar leite",
  "description": "Ir ao mercado e comprar leite integral",
  "status": "PENDING",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

**Validações:**
- Nome é obrigatório (1-255 caracteres)
- Descrição é opcional (máx 5000 caracteres)

**Exemplo com cURL:**
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Authorization: Bearer seu_token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Comprar leite",
    "description": "Ir ao mercado e comprar leite integral"
  }'
```

#### 2.5 Atualizar Tarefa

**Endpoint:** `PUT /tasks/{id}`

**Descrição:** Atualiza uma tarefa existente.

**Parâmetros:**
- `id` (path): ID da tarefa

**Request Body:**
```json
{
  "name": "Comprar leite desnatado",
  "description": "Ir ao mercado e comprar leite desnatado",
  "status": "PENDING"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Comprar leite desnatado",
  "description": "Ir ao mercado e comprar leite desnatado",
  "status": "PENDING",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T11:00:00"
}
```

**Exemplo com cURL:**
```bash
curl -X PUT http://localhost:8080/api/tasks/1 \
  -H "Authorization: Bearer seu_token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Comprar leite desnatado",
    "description": "Ir ao mercado e comprar leite desnatado",
    "status": "PENDING"
  }'
```

#### 2.6 Alternar Status da Tarefa

**Endpoint:** `PUT /tasks/{id}/toggle`

**Descrição:** Alterna o status da tarefa entre PENDING e COMPLETED.

**Parâmetros:**
- `id` (path): ID da tarefa

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Comprar leite",
  "description": "Ir ao mercado e comprar leite integral",
  "status": "COMPLETED",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T18:00:00"
}
```

**Exemplo com cURL:**
```bash
curl -X PUT http://localhost:8080/api/tasks/1/toggle \
  -H "Authorization: Bearer seu_token"
```

#### 2.7 Deletar Tarefa

**Endpoint:** `DELETE /tasks/{id}`

**Descrição:** Deleta uma tarefa.

**Parâmetros:**
- `id` (path): ID da tarefa

**Response (204 No Content)**

**Exemplo com cURL:**
```bash
curl -X DELETE http://localhost:8080/api/tasks/1 \
  -H "Authorization: Bearer seu_token"
```

## Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 204 | No Content - Recurso deletado com sucesso |
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Autenticação necessária |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro do servidor |

## Tratamento de Erros

### Erro de Validação (400)

```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "Email already exists",
  "path": "/api/auth/register"
}
```

### Erro de Autenticação (401)

```json
{
  "status": 401,
  "error": "Unauthorized",
  "message": "Invalid JWT token",
  "path": "/api/tasks"
}
```

### Erro de Recurso Não Encontrado (404)

```json
{
  "status": 404,
  "error": "Not Found",
  "message": "Task not found",
  "path": "/api/tasks/999"
}
```

## Exemplos de Uso Completo

### Fluxo de Login e Criar Tarefa

```bash
# 1. Fazer login
TOKEN=$(curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }' | jq -r '.token')

# 2. Usar o token para criar uma tarefa
curl -X POST http://localhost:8080/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Minha primeira tarefa",
    "description": "Descrição da tarefa"
  }'
```

## Postman Collection

Importe a seguinte coleção no Postman para testar todos os endpoints:

```json
{
  "info": {
    "name": "Todo List API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "http://localhost:8080/api/auth/login",
            "body": {
              "mode": "raw",
              "raw": "{\"email\": \"user@example.com\", \"password\": \"password123\"}"
            }
          }
        },
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "url": "http://localhost:8080/api/auth/register",
            "body": {
              "mode": "raw",
              "raw": "{\"name\": \"John Doe\", \"email\": \"user@example.com\", \"password\": \"password123\", \"passwordConfirm\": \"password123\"}"
            }
          }
        }
      ]
    },
    {
      "name": "Tasks",
      "item": [
        {
          "name": "Get All Tasks",
          "request": {
            "method": "GET",
            "url": "http://localhost:8080/api/tasks",
            "header": {
              "Authorization": "Bearer {{token}}"
            }
          }
        }
      ]
    }
  ]
}
```

## Notas de Segurança

1. **Senhas:** Sempre criptografadas com BCrypt
2. **JWT:** Assinado com HS512
3. **CORS:** Configurado para localhost:3000 e localhost:5173
4. **HTTPS:** Recomendado em produção
5. **Tokens:** Armazenar com segurança no cliente (localStorage/sessionStorage)

## Suporte

Para dúvidas ou problemas, consulte a documentação Swagger em:
`http://localhost:8080/api/swagger-ui.html`
