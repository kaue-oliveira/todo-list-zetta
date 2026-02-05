# Quick Start Guide - TaskFlow

## 🚀 Iniciar em 5 Minutos com Docker

### Pré-requisito
- Docker e Docker Compose instalados

### Passos

```bash
# 1. Clone ou extraia o projeto
cd todo-app-complete

# 2. Inicie todos os serviços
docker-compose -f docker/docker-compose.yml up -d

# 3. Aguarde alguns segundos para inicialização completa

# 4. Acesse a aplicação
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080/api
# Swagger: http://localhost:8080/api/swagger-ui.html
```

### Parar a aplicação

```bash
docker-compose -f docker/docker-compose.yml down
```

---

## 💻 Instalação Local (Desenvolvimento)

### Backend

```bash
# 1. Instale Java 17+
# Verifique: java -version

# 2. Instale Maven
# Verifique: mvn -version

# 3. Crie o banco de dados
mysql -u root -p < scripts/init_database.sql

# 4. Navegue até o backend
cd backend

# 5. Compile e execute
mvn clean install
mvn spring-boot:run

# Backend rodando em http://localhost:8080/api
```

### Frontend

```bash
# 1. Instale Node.js 20+
# Verifique: node --version

# 2. Navegue até o frontend
cd frontend

# 3. Instale dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev

# Frontend rodando em http://localhost:3000
```

---

## 🧪 Testar a API

### 1. Registrar Novo Usuário

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123",
    "passwordConfirm": "senha123"
  }'
```

### 2. Fazer Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

Salve o `token` retornado.

### 3. Criar uma Tarefa

```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Minha primeira tarefa",
    "description": "Descrição da tarefa"
  }'
```

### 4. Listar Tarefas

```bash
curl -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  http://localhost:8080/api/tasks
```

---

## 🌐 Acessar a Interface Web

1. Abra o navegador
2. Acesse http://localhost:3000
3. Clique em "Register here" para criar uma conta
4. Preencha o formulário e clique em "Create Account"
5. Você será redirecionado para o dashboard
6. Comece a criar tarefas!

---

## 📊 Acessar Documentação da API

Swagger UI: http://localhost:8080/api/swagger-ui.html

Aqui você pode:
- Ver todos os endpoints disponíveis
- Testar os endpoints diretamente
- Ver exemplos de requisição e resposta

---

## 🔧 Configurações Importantes

### Alterar Porta do Frontend

Edite `frontend/vite.config.ts`:
```ts
server: {
  port: 5173, 
}
```

### Alterar Porta do Backend

Edite `backend/src/main/resources/application.yml`:
```yaml
server:
  port: 9090
```

### Alterar Credenciais do Banco de Dados

Edite `backend/src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/todo_db
    username: seu_usuario
    password: sua_senha
```

---

## 🐛 Problemas Comuns

### "Porta 3000 já está em uso"
```bash
# Encontre o processo
lsof -i :3000
# Mate o processo
kill -9 <PID>
```

### "Conexão recusada ao banco de dados"
```bash
# Verifique se MySQL está rodando
mysql -u root -p -e "SELECT 1;"
```

---

## 📚 Próximos Passos

1. Leia a documentação completa em `README.md`
2. Explore a API em `docs/API_DOCUMENTATION.md`
3. Entenda o modelo de dados em `docs/MER.md`
4. Customize o design Memphis em `frontend/tailwind.config.js`
5. Adicione novos recursos conforme necessário

---

