# PDV WITH MERCADOPAGO

- Crie e gerencie a sua loja
- Crie caixas e gera ordens de pagamento
- Integre com sua máquina do Mercado Pago, e deixe de digitar o valor
- Crie um catálogo de produtos [Em breve]
- Gerencie seu produtos [Em breve]
- Controle seu estoque [Em breve]
- Entenda seu fluxo de pedidos [Em breve]


## Tecnologias utilizadas

- [ ] [NextJs](https://nextjs.org/)
- [ ] [Typescript](https://www.typescriptlang.org/)
- [ ] [React](https://reactjs.org/)

Esse projeto utiliza a tecnologia de backend do NextJs, portanto dispensa um servidor exclusivo para backend.

## Instalação

Front End
```bash
    git clone
    yarn install
    yarn build
    yarn start
```

MongoDB

Para configurar o banco de dados, é necessário instalar o mongoDB.
Acesse o arquivo `.env` e configure o banco de dados.


## API REST

- [POST] /order: Cria uma ordem de pagamento [Requer autenticação]
- [POST] /pos: Cria um caixa [Requer autenticação]
- [POST] /auth: Faz Login e gera um token JWT
- [POST] /products: Cria um Produto [Requer autenticação]
- [GET] /products: Obtém todos os produtos[Requer autenticação]
- [POST] /store: Cria uma loja [Requer autenticação]

