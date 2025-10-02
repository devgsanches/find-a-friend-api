# 🐾 Find a Friend API

Uma API RESTful para conectar pets que precisam de adoção com pessoas que querem adotar. O Find a Friend facilita o processo de adoção de animais através de organizações cadastradas.

## 📋 Sobre o Projeto

O Find a Friend é uma plataforma que permite:

- **Organizações** cadastrarem pets disponíveis para adoção
- **Usuários** buscarem pets por filtros específicos (cidade, idade, porte, etc.)
- Gerenciamento completo de informações dos pets, incluindo imagens e requisitos para adoção
- Sistema de autenticação para organizações e usuários

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação
- **Fastify** - Framework web rápido e eficiente
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **Docker** - Containerização
- **JWT** - Autenticação via tokens
- **bcryptjs** - Hash de senhas
- **Zod** - Validação de dados
- **Vitest** - Framework de testes
- **Axios** - Cliente HTTP para integração com APIs externas

## 📊 Fluxo Principal da Aplicação

```mermaid
graph TD
    A[👤 Usuário/Organização] --> B{Tipo de Usuário}

    B -->|Organização| C[📝 Cadastro de Organização]
    B -->|Usuário| D[👤 Cadastro de Usuário]

    C --> E[🔑 Login Organização]
    D --> F[🔑 Login Usuário]

    E --> G[🐕 Cadastrar Pet]
    G --> H[📸 Adicionar Imagens do Pet]
    G --> I[📋 Definir Requisitos de Adoção]

    F --> J[🔍 Buscar Pets por Filtros]
    J --> K{Filtros Aplicados}

    K --> L[🏙️ Por Cidade]
    K --> M[🎂 Por Idade]
    K --> N[📏 Por Porte]
    K --> O[⚡ Por Nível de Energia]
    K --> P[🏠 Por Independência]

    L --> Q[📋 Lista de Pets Filtrados]
    M --> Q
    N --> Q
    O --> Q
    P --> Q

    Q --> R[👁️ Visualizar Detalhes do Pet]
    R --> S[📞 Contatar Organização]

    style A fill:#e1f5fe
    style G fill:#c8e6c9
    style J fill:#fff3e0
    style Q fill:#f3e5f5
    style S fill:#ffebee
```

## 🏗️ Estrutura do Banco de Dados

### Entidades Principais

- **User** - Usuários que buscam pets para adoção
- **Organization** - ONGs e organizações que cadastram pets
- **Pet** - Animais disponíveis para adoção
- **PetImage** - Imagens dos pets
- **AdoptionRequirement** - Requisitos necessários para adoção

### Relacionamentos

- Uma **Organização** pode ter vários **Pets**
- Um **Pet** pode ter várias **Imagens**
- Um **Pet** pode ter vários **Requisitos de Adoção**

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js (versão 18+)
- Docker e Docker Compose
- npm ou yarn

### 1. Clone o repositório

```bash
git clone https://github.com/devgsanches/find-a-friend-api.git
cd find-a-friend-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
NODE_ENV=dev
PORT=3333
DATABASE_URL="postgresql://app:1q2w3e4r@localhost:5432/find-a-friend-db"
JWT_SECRET="seu-jwt-secret-aqui"
```

### 4. Inicie o banco de dados

```bash
docker-compose up -d
```

### 5. Execute as migrações

```bash
npx prisma migrate dev
```

### 6. Inicie o servidor

```bash
npm run start:dev
```

O servidor estará rodando em `http://localhost:3333` 🚀

## 📚 Endpoints da API

### 👤 Usuários

- `POST /users` - Cadastrar novo usuário
- `POST /users/login` - Login de usuário

### 🏢 Organizações

- `POST /org` - Cadastrar nova organização
- `POST /org/login` - Login de organização
- `GET /org/:id` - Buscar organização por ID

### 🐾 Pets

- `POST /pets` - Cadastrar novo pet (requer autenticação da organização)
- `GET /pets/:id` - Buscar pet por ID
- `GET /pets` - Buscar pets com filtros

### Filtros Disponíveis para Busca de Pets

- `city` (obrigatório) - Cidade onde o pet está localizado
- `name` - Nome do pet
- `age` - Idade (Filhote, Adulto, Idoso)
- `size` - Porte do animal
- `energyLevel` - Nível de energia (1-5)
- `levelOfIndependence` - Nível de independência

## 🧪 Testes

Execute os testes unitários:

```bash
npm test
```

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** e **SOLID**:

- **Controllers** - Responsáveis por receber e responder requisições HTTP
- **Use Cases** - Contêm a lógica de negócio da aplicação
- **Repositories** - Abstraem o acesso aos dados
- **Factories** - Criam instâncias dos use cases com suas dependências

### Padrões Utilizados

- **Repository Pattern** - Para abstração do acesso a dados
- **Factory Pattern** - Para criação de instâncias
- **Dependency Injection** - Para inversão de dependências
- **In-Memory Testing** - Para testes unitários isolados

## 🔒 Autenticação

A API utiliza **JWT (JSON Web Tokens)** para autenticação:

- Organizações precisam estar autenticadas para cadastrar pets
- Tokens são enviados via header `Authorization: Bearer <token>`
- Diferentes roles: `ORG` (organizações) e `USER` (usuários)

## 🌐 Integração Externa

- **ViaCEP API** - Para buscar informações de cidade baseado no CEP da organização

## 📝 Regras de Negócio

1. **Busca de Pets**: A cidade é um filtro obrigatório
2. **Cadastro de Organização**: O CEP é validado via API externa
3. **Autenticação**: Apenas organizações autenticadas podem cadastrar pets
4. **Senhas**: São criptografadas usando bcrypt antes de serem salvas
5. **Pets**: Devem estar associados a uma organização válida

## 👨‍💻 Autor

Desenvolvido com ❤️ por [devgsanches](https://github.com/devgsanches)

---

- **Find a Friend API** -
