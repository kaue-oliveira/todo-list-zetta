# TaskFlow - Sistema de Gerenciamento de Tarefas

Um sistema completo e moderno de gerenciamento de tarefas com backend Spring Boot e frontend React, apresentando uma estética vibrante inspirada no design Memphis.

## 🎨 Características Principais

### Backend (Spring Boot)
- ✅ API REST completa com Spring Boot 3.2
- ✅ Autenticação JWT segura
- ✅ Banco de dados MySQL com Hibernate/JPA
- ✅ Validação de dados com Bean Validation
- ✅ Documentação Swagger/OpenAPI
- ✅ Testes unitários e de integração
- ✅ Tratamento robusto de erros
- ✅ CORS configurado para desenvolvimento

### Frontend (React)
- ✅ Interface moderna com React 18
- ✅ Estética Memphis vibrante (fundo pêssego, cores pastel)
- ✅ Tailwind CSS 3 para estilização
- ✅ TypeScript para type safety
- ✅ Roteamento com React Router
- ✅ Gerenciamento de estado com Context API
- ✅ Responsivo e mobile-friendly
- ✅ Animações suaves e interativas

### DevOps
- ✅ Docker e Docker Compose
- ✅ Multi-stage builds otimizados
- ✅ Health checks automáticos
- ✅ Volumes persistentes para banco de dados

## 📋 Pré-requisitos

### Para Desenvolvimento Local

- **Java 17+** (para backend)
- **Maven 3.9+** (para build do backend)
- **Node.js 20+** (para frontend)
- **MySQL 8.0+** (ou Docker)
- **Git**

### Para Docker

- **Docker 20.10+**
- **Docker Compose 2.0+**

## 🚀 Instalação e Execução

### Opção 1: Docker Compose (Recomendado)

A forma mais simples de executar toda a aplicação:

```bash
# Clone o repositório
git clone 
cd todo-app-complete

# Inicie os containers
docker-compose -f docker/docker-compose.yml up -d

# Aguarde alguns segundos para o banco de dados inicializar
sleep 10

# Acesse a aplicação
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080/api
# Swagger UI: http://localhost:8080/api/swagger-ui.html
```

### Opção 2: Execução Local

#### Backend

```bash
# Navegue até o diretório do backend
cd backend

# Crie o banco de dados (execute o script SQL)
mysql -u root -p < ../scripts/init_database.sql

# Configure as variáveis de ambiente em src/main/resources/application.yml
# Atualize os dados de conexão do MySQL se necessário

# Compile e execute
mvn clean install
mvn spring-boot:run

# O backend estará disponível em http://localhost:8080/api
```

#### Frontend

```bash
# Navegue até o diretório do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# O frontend estará disponível em http://localhost:3000
```

## 📁 Estrutura do Projeto

```
todo-app-complete/
├── backend/                          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/todoapp/
│   │   │   │   ├── controller/       # Controladores REST
│   │   │   │   ├── service/          # Lógica de negócio
│   │   │   │   ├── entity/           # Entidades JPA
│   │   │   │   ├── repository/       # Repositórios
│   │   │   │   ├── security/         # Configuração de segurança
│   │   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   ├── config/           # Configurações
│   │   │   │   └── TodoApiApplication.java
│   │   │   └── resources/
│   │   │       └── application.yml   # Configurações da aplicação
│   │   └── test/                     # Testes unitários
│   └── pom.xml                       # Dependências Maven
│
├── frontend/                         # React Frontend
│   ├── src/
│   │   ├── pages/                    # Páginas da aplicação
│   │   ├── components/               # Componentes reutilizáveis
│   │   ├── contexts/                 # Context API
│   │   ├── types/                    # Tipos TypeScript
│   │   ├── config/                   # Configurações
│   │   ├── App.tsx                   # Componente principal
│   │   ├── main.tsx                  # Entrada da aplicação
│   │   └── index.css                 # Estilos globais
│   ├── index.html                    # HTML principal
│   ├── package.json                  # Dependências npm
│   ├── vite.config.ts                # Configuração Vite
│   ├── tailwind.config.js            # Configuração Tailwind
│   └── tsconfig.json                 # Configuração TypeScript
│
├── docker/                           # Arquivos Docker
│   ├── Dockerfile.backend            # Build do backend
│   ├── Dockerfile.frontend           # Build do frontend
│   └── docker-compose.yml            # Orquestração
│
├── scripts/                          # Scripts úteis
│   └── init_database.sql             # Script de inicialização do BD
│
└── docs/                             # Documentação
    ├── API_DOCUMENTATION.md          # Documentação da API
    └── MER.md                        # Modelo de Entidade-Relacionamento
```


### Exemplo de Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

## 📚 Documentação

### API Documentation

A documentação completa da API está disponível em:

- **Swagger UI:** http://localhost:8080/api/swagger-ui.html
- **OpenAPI JSON:** http://localhost:8080/api/v3/api-docs
- **Arquivo Markdown:** [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)

### Modelo de Dados

Consulte o Modelo de Entidade-Relacionamento em: [docs/MER.md](docs/MER.md)

## 🧪 Testes

### Backend - Testes Unitários

```bash
cd backend

# Executar todos os testes
mvn test

# Executar testes de uma classe específica
mvn test -Dtest=AuthServiceTest

# Executar com cobertura de código
mvn test jacoco:report
```

### Testes Inclusos

- `AuthServiceTest` - Testes de autenticação e registro
- `TaskServiceTest` - Testes de operações com tarefas

## 🎨 Design Memphis

A aplicação apresenta uma estética vibrante inspirada no design Memphis com:

- **Cores Pastel:** Pêssego, menta, lilás e amarelo
- **Tipografia:** Sans-serif em negrito e maiúscula
- **Formas Geométricas:** Círculos, triângulos e retângulos flutuantes
- **Animações:** Flutuação suave e transições elegantes
- **Acessibilidade:** Contraste adequado e navegação clara

## 🔧 Configuração

### Backend - application.yml

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/todo_db
    username: root
    password: root

app:
  jwt:
    secret: your_super_secret_key_here
    expiration: 86400000  # 24 horas em ms
```

### Frontend - .env

```
VITE_API_URL=http://localhost:8080/api
```

## 📝 Endpoints Principais

### Autenticação
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de novo usuário
- `GET /api/auth/health` - Verificação de saúde da API

### Tarefas
- `GET /api/tasks` - Listar todas as tarefas
- `GET /api/tasks/status/{status}` - Filtrar por status
- `GET /api/tasks/{id}` - Obter tarefa específica
- `POST /api/tasks` - Criar nova tarefa
- `PUT /api/tasks/{id}` - Atualizar tarefa
- `PUT /api/tasks/{id}/toggle` - Alternar status
- `DELETE /api/tasks/{id}` - Deletar tarefa

## 🐛 Troubleshooting

### Erro de conexão com MySQL

Verifique se o MySQL está rodando:

```bash
# Docker
docker ps | grep mysql

# Local
mysql -u root -p -e "SELECT 1;"
```

## 📦 Dependências Principais

### Backend
- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- MySQL Connector
- JJWT (JWT)
- Springdoc OpenAPI (Swagger)
- Lombok

### Frontend
- React 18.2
- React Router 6.20
- Tailwind CSS 3.3
- TypeScript 5.3
- Vite 5.0
- Axios
- Lucide React (Icons)
- Date-fns


## 👥 Contribuidores

- Desenvolvido como um projeto completo de gerenciamento de tarefas

## 📞 Suporte

Para dúvidas ou problemas:

1. Consulte a documentação em `/docs`
2. Verifique a seção Troubleshooting
3. Acesse o Swagger UI para testar endpoints
4. Verifique os logs da aplicação

---
