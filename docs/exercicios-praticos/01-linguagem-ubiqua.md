# Exercício 1 — Mapeando a linguagem ubíqua

## Cenário da LionsShop

> "Clientes fazem pedidos de produtos do catálogo; um pedido pode ser cancelado enquanto não for enviado; clientes VIP ganham 5% de desconto."

## Glossário

| Termo de negócio | O que significa | Nome no código | Classificação DDD |
| --- | --- | --- | --- |
| Cliente | Pessoa que realiza pedidos | `Customer` | Entidade |
| Cliente VIP | Cliente com benefício de 5% de desconto | `Customer.isVip()` | Regra de negócio |
| Produto | Item disponível para venda | `Product` | Entidade |
| Catálogo | Conjunto de produtos disponíveis para pedido | `Catalog` (módulo) | Contexto delimitado |
| Pedido | Solicitação de compra feita por um cliente | `Order` | Entidade (raiz de agregado) |
| Item do pedido | Produto, quantidade e preço dentro de um pedido | `OrderItem` | Entidade (dentro do agregado `Order`) |
| Status do pedido | Estado atual: `PENDING`, `PAID`, `SHIPPED`, `CANCELED` | `OrderStatus` | Objeto de valor (enum) |
| Cancelamento | Ação de cancelar um pedido ainda não enviado | `Order.cancel()` | Regra de negócio |
| Envio | Despacho do pedido; impede o cancelamento | `SHIPPED` | Regra de negócio |
| Desconto VIP | 5% de desconto para clientes VIP | `DiscountService` + `Customer.isVip()` | Serviço de domínio |
| Preço / Dinheiro | Valor monetário | `Money` | Objeto de valor |
| E-mail | Contato do cliente, com formato validado | `Email` | Objeto de valor |

## Classificação

### Entidades

Possuem identidade própria e ciclo de vida:

- `Customer` — dois clientes com o mesmo nome continuam sendo clientes diferentes.
- `Product` — o preço pode mudar, mas o produto continua o mesmo.
- `Order` — dois pedidos com os mesmos itens continuam sendo pedidos diferentes.
- `OrderItem` — item interno do agregado `Order` (identificado dentro do pedido).

### Objetos de valor

Definidos pelos seus valores, imutáveis e auto-validados:

- `Money` — valor + moeda.
- `Email` — formato válido; dois e-mails iguais são o mesmo e-mail.
- `OrderStatus` — enum com os estados válidos do pedido.
- `Address` — endereço de entrega, se necessário.

### Regras de negócio

- Um pedido **não pode ser criado sem itens**.
- Um pedido **só pode ser cancelado enquanto não foi enviado** (`SHIPPED`).
- Um **cliente VIP recebe 5% de desconto**.
- Um cupom precisa estar **dentro da validade** e **só pode ser usado uma vez por cliente** (regra do PDF).

## Onde cada regra fica

| Regra | Onde implementar |
| --- | --- |
| Pedido sem itens | Construtor de `Order` (entidade) |
| Cancelar apenas antes do envio | `Order.cancel()` (entidade) |
| Desconto VIP de 5% | `DiscountService` (serviço de domínio, envolve `Order` + `Customer`) |
| Persistência de pedidos | `OrderRepository` (interface no domínio, implementação na infraestrutura) |

## Detalhe sobre o `OrderItem`

`OrderItem` pode ser tratado como **entidade interna do agregado `Order`** (como no material) ou como objeto de valor. O importante é que ele não seja alterado diretamente por fora do pedido: o `Order` é quem protege as regras do agregado.
