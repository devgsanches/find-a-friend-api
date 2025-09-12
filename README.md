<!-- FindAFriend API -->

# Requisitos Funcionais (RF's)

- [x] Deve ser possível cadastrar um pet
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [ ] Deve ser possível filtrar pets por suas características
- [ ] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [ ] Deve ser possível realizar login como uma ORG

# Regras de Negócio (RN's)

- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [ ] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

# Requisitos Não-Funcionais (RNF's)

- [x] Os dados da app devem ser salvos em um banco PostgreSQL
- [x] A senha do usuário deve ir ao banco criptografada
- [x] O usuário deve se autenticar por um token (JWT)
