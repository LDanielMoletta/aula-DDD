# Configuração do MongoDB

O projeto usa o **driver oficial do MongoDB** (`mongodb`) com a classe `MongoClient`.

## 1. Configurar as credenciais

O arquivo `.env` já existe localmente e **não é versionado** (está no `.gitignore`). Nele, substitua os placeholders:

```env
MONGODB_URI=mongodb+srv://<db_username>:<db_password>@cluster0.fxdbxxd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
MONGODB_DB=lionsshop
DNS_SERVERS=8.8.8.8,1.1.1.1
PORT=3000
```

- `<db_username>`: usuário criado em **Database Access** no MongoDB Atlas.
- `<db_password>`: senha desse usuário.
- `MONGODB_DB`: nome do banco que será usado pela aplicação.
- `DNS_SERVERS`: resolvedores usados quando o DNS local recusa consultas SRV (comum no Windows com Node 24).

O modelo fica em `.env.example`, que pode ser versionado sem segredos.

## 2. Liberar o acesso no Atlas

Em **Network Access**, adicione o IP da sua máquina (ou `0.0.0.0/0` apenas para desenvolvimento).

## 3. Validar a conexão

```bash
npm run db:check
```

Saída esperada:

```text
Conexão com o MongoDB OK — banco: lionsshop
```

### Se aparecer `querySrv ECONNREFUSED`

Esse erro vem do resolvedor DNS local do Node, não do Atlas. A solução aplicada no projeto é configurar `DNS_SERVERS` no `.env`:

```env
DNS_SERVERS=8.8.8.8,1.1.1.1
```

O `main.ts` e o `db:check` chamam `configureDns()` antes de conectar.

## 4. Iniciar a aplicação

```bash
npm run dev
```

Neste momento o `main.ts` apenas conecta ao banco e mantém a conexão aberta. Os módulos HTTP e os casos de uso serão adicionados nos próximos exercícios.

## Arquivos envolvidos

| Arquivo | Responsabilidade |
| --- | --- |
| `.env` | Credenciais locais (não versionado). |
| `.env.example` | Modelo das variáveis de ambiente. |
| `src/shared/infra/config/env.ts` | Leitura e validação das variáveis. |
| `src/shared/infra/config/dns.ts` | Fallback de DNS para consultas SRV. |
| `src/shared/infra/database/mongo-connection.ts` | Criação e encerramento da conexão. |
| `src/shared/infra/database/check-connection.ts` | Script `db:check` com `ping`. |
| `src/main.ts` | Composition root: conecta ao banco na inicialização. |

## Segurança

- Nunca commite o `.env` nem cole credenciais reais em arquivos versionados.
- Se uma senha for exposta, troque-a no Atlas imediatamente.
