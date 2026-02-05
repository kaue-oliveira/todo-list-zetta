# Modelo de Entidade-Relacionamento (MER)

## Diagrama ER

```
┌─────────────────────────────────────────┐
│                 USERS                   │
├─────────────────────────────────────────┤
│ PK  id (BIGINT)                         │
│ UQ  email (VARCHAR 100)                 │
│     name (VARCHAR 100)                  │
│     password (VARCHAR 255)              │
│     created_at (TIMESTAMP)              │
│     updated_at (TIMESTAMP)              │
└─────────────────────────────────────────┘
           │
           │ 1:N
           │
           ▼
┌─────────────────────────────────────────┐
│                 TASKS                   │
├─────────────────────────────────────────┤
│ PK  id (BIGINT)                         │
│ FK  user_id (BIGINT)                    │
│     name (VARCHAR 255)                  │
│     description (TEXT)                  │
│     status (VARCHAR 20)                 │
│     created_at (TIMESTAMP)              │
│     updated_at (TIMESTAMP)              │
└─────────────────────────────────────────┘
```

## Descrição das Entidades

### USERS (Usuários)

Armazena informações dos usuários do sistema.

| Campo | Tipo | Constraints | Descrição |
|-------|------|-------------|-----------|
| id | BIGINT | PK, AUTO_INCREMENT | Identificador único do usuário |
| email | VARCHAR(100) | UNIQUE, NOT NULL | Email único do usuário |
| name | VARCHAR(100) | NOT NULL | Nome completo do usuário |
| password | VARCHAR(255) | NOT NULL | Senha criptografada com BCrypt |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Data de criação da conta |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Data da última atualização |

**Índices:**
- PRIMARY KEY: id
- UNIQUE: email
- INDEX: email (para buscas rápidas)

### TASKS (Tarefas)

Armazena as tarefas criadas pelos usuários.

| Campo | Tipo | Constraints | Descrição |
|-------|------|-------------|-----------|
| id | BIGINT | PK, AUTO_INCREMENT | Identificador único da tarefa |
| user_id | BIGINT | FK, NOT NULL | Referência ao usuário proprietário |
| name | VARCHAR(255) | NOT NULL | Nome/título da tarefa |
| description | TEXT | NULL | Descrição detalhada da tarefa |
| status | VARCHAR(20) | NOT NULL, DEFAULT 'PENDING' | Status: PENDING ou COMPLETED |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Data da última atualização |

**Índices:**
- PRIMARY KEY: id
- FOREIGN KEY: user_id → users(id) ON DELETE CASCADE
- INDEX: user_id (para buscas por usuário)
- INDEX: status (para filtros por status)

## Relacionamentos

### 1:N (Um para Muitos)

**USERS → TASKS**

- Um usuário pode ter múltiplas tarefas
- Uma tarefa pertence a exatamente um usuário
- Quando um usuário é deletado, todas as suas tarefas são deletadas (CASCADE)

## Integridade Referencial

- **Chave Estrangeira:** user_id em TASKS referencia id em USERS
- **Ação em DELETE:** CASCADE (deleta todas as tarefas quando o usuário é deletado)
- **Ação em UPDATE:** RESTRICT (impede atualização de user_id se houver tarefas)

## Características de Design

1. **Timestamps:** Ambas as tabelas possuem created_at e updated_at para auditoria
2. **Status Enum:** O status da tarefa é armazenado como VARCHAR para compatibilidade
3. **Segurança:** Senhas são armazenadas criptografadas (nunca em texto plano)
4. **Índices:** Estrategicamente colocados para otimizar consultas comuns
5. **Charset:** UTF-8 para suporte a caracteres especiais
