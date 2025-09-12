<!-- FindAFriend API -->

# Requisitos Funcionais (RF's)

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características // pelos query params (optional)
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [ ] Deve ser possível se cadastrar como uma ORG @@FIX-ME: puxar city automaticamente pelo cep informado > API
- [x] Deve ser possível realizar login como uma ORG
- [ ] Deve ser possível realizar login como um usuário

# Regras de Negócio (RN's)

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada @@FIX-ME: add role in orgs

# Requisitos Não-Funcionais (RNF's)

- [x] Os dados da app devem ser salvos em um banco PostgreSQL
- [x] A senha do usuário deve ir ao banco criptografada
- [x] O usuário deve se autenticar por um token (JWT)
