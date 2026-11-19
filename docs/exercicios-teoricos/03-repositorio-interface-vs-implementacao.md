# Pergunta 3 — Interface de repositório no domínio

## Pergunta

Qual a vantagem de definir a interface do repositório no domínio e a sua implementação na infraestrutura?

## Resposta

A principal vantagem é separar o que o sistema precisa fazer de como isso será feito. O domínio define as operações necessárias, como salvar e buscar pedidos, enquanto a infraestrutura implementa essas operações usando o MongoDB, por exemplo. Assim, podemos trocar o banco sem modificar as regras de negócio.
