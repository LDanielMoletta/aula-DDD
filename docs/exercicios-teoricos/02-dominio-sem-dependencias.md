# Pergunta 2 — Domínio sem dependências de infraestrutura

## Pergunta

Por que a camada de domínio não deve depender de bibliotecas como o Express ou o driver do MongoDB?

## Resposta

Porque a camada de domínio deve cuidar somente das **regras de negócio**. Se ela depender dessas bibliotecas, ficará presa a tecnologias específicas. Separando essas responsabilidades, podemos trocar o banco de dados ou o framework sem precisar alterar as regras do sistema.
