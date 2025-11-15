# Sol Nascente Portal

Portal institucional com catálogo de produtos, painel administrativo e integração com Supabase.

## Visão Geral

- Framework: Next.js (App Router) 16.0.3
- Linguagem: TypeScript
- UI: React 19, Tailwind CSS 4
- Banco e Storage: Supabase
- Testes E2E: Playwright

## Arquitetura

- Páginas públicas:
  - `/` Home com navegação e seções institucionais.
  - `/produtos` Catálogo com busca e filtro por categoria.
  - `/produtos/[id]` Página de detalhes (implementação atual com mock; ver observações).
- Painel admin:
  - `/admin/login` Login administrativo.
  - `/admin/dashboard` CRUD de produtos com proteção de rota.
- APIs (App Router):
  - `/api/products` GET público; POST/PUT/DELETE protegidos (admin).
  - `/api/upload` Upload de imagens para bucket público `products` no Supabase.
  - `/api/admin/login` Login que emite cookie de sessão HMAC.
  - `/api/admin/session` Verificação de sessão admin.
  - `/api/seed` Seed opcional de dados e conta admin.

## Requisitos

- Node.js 18+
- Conta Supabase com projeto e credenciais
- Navegador Playwright instalado (via `npx playwright install`)

## Configuração

Crie um arquivo `.env.local` na raiz com as variáveis:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<sua-instancia>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>

# Sessão admin via HMAC
ADMIN_SESSION_SECRET=<segredo-forte>

# Senha admin (hash usa salt + senha)
ADMIN_PASSWORD_SALT=<salt-forte>
ADMIN_DEFAULT_USERNAME=Admsolnascente
ADMIN_DEFAULT_PASSWORD=<defina-uma-senha>

# Seed opcional
ALLOW_SEED=true
ADMIN_TOKEN=<token-de-seed>

# (Opcional) OAuth Google se desejar
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<client-id>
GOOGLE_CLIENT_SECRET=<client-secret>
```

Observações:
- `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` são usados no cliente.
- `SUPABASE_SERVICE_ROLE_KEY` é usado no servidor para operações privilegiadas (CRUD/Storage).
- `ADMIN_SESSION_SECRET` assina o token de sessão admin.
- `ADMIN_PASSWORD_SALT` participa do hash da senha (`sha256(salt:senha)`).

## Instalação e Execução

```bash
npm install
npx playwright install
npm run dev
```

- O dev server roda em `http://localhost:3000` (se a porta 3000 estiver ocupada, Next pode alternar para `3001`).
- Build/produção:

```bash
npm run build
npm start
```

## Testes

- Executar todos os testes:

```bash
npx playwright test
```

- Executar um teste específico:

```bash
npx playwright test -g "CRUD de produtos e filtro público"
```

Os testes E2E ficam em `tests/playwright/`.

## Banco de Dados e Seed

- Endpoint de seed cria/atualiza produtos demo e a conta admin:

```bash
curl -X POST http://localhost:3000/api/seed \
  -H "x-admin-token: $ADMIN_TOKEN"
```

- Tabelas esperadas:
  - `products`: `id,name,description,image,images[],category,available,active,created_at`
  - `admin_accounts`: `id,username,password_hash,active`
  - `profiles` (se usar OAuth): `id,role,updated_at`

- Bucket de storage:
  - Nome: `products` (criado automaticamente se não existir).
  - Público: imagens acessíveis via URL pública.
  - Tipos permitidos: `image/jpeg`, `image/png`, `image/webp`.

## Autenticação Administrativa

- Sessão admin via cookie `sn_admin_token` assinado com HMAC.
- Fluxo de login:
  - POST `/api/admin/login` com `{ username, password }`.
  - Se credenciais válidas, cookie é setado e o usuário é redirecionado para `/admin/dashboard`.
- Verificação de sessão:
  - GET `/api/admin/session` retorna `{ isAuthenticated, isAdmin, username }`.

Referências no código:
- Verificação da sessão: `src/lib/adminSession.ts:1–30` e `src/app/api/admin/session/route.ts:1–11`.
- Login admin e fallback por env: `src/app/api/admin/login/route.ts:7–43`.

## Endpoints Principais

- `GET /api/products`: Lista produtos ativos. Se Supabase não estiver configurado, retorna vazio e a UI mantém mock local.
- `POST /api/products`: Cria produto (admin). Requer `name`, `category` e ao menos 1 imagem (`image` ou `images[]`).
- `PUT /api/products?id=<id>`: Atualiza campos (admin). Mantém validação de imagem.
- `DELETE /api/products?id=<id>`: Remove produto (admin).
- `POST /api/upload`: Recebe `FormData(files[])` e salva no bucket `products`, retornando URLs públicas.

Referências no código:
- CRUD de produtos: `src/app/api/products/route.ts:18–47` (GET), `50–110` (POST), `112–189` (PUT), `191–225` (DELETE).
- Upload: `src/app/api/upload/route.ts:1–41`.

## Uso do Site

- Catálogo (`/produtos`):
  - Busca: campo “Buscar produtos...”.
  - Filtro: botões por categoria ou busca textual.
  - Cartas mostram imagem, categoria, nome, descrição e botão “Ver Detalhes”.
- Detalhes do produto (`/produtos/[id]`):
  - A implementação atual usa dados mock e pode não refletir itens do banco. Integre com Supabase para produção.
- Painel Admin (`/admin/dashboard`):
  - Adicionar: botão “Adicionar Produto” abre modal com Nome, Descrição, Categoria, Imagens e Disponibilidade.
  - Editar: ícone de lápis abre modal para atualização.
  - Deletar: ícone de lixeira remove o item.

Referências no código:
- Dashboard: `src/app/admin/dashboard/page.tsx:53–107` (carregar e adicionar), `117–152` (salvar edição), `250–340` (modal de adicionar), `449–496` (modal de editar), `415–425` (deletar).
- Catálogo público: `src/app/produtos/page.tsx:97–117` (filtro e busca), `163–169` (campo de busca).

## Configuração de Imagens

- Domínios remotos permitidos estão em `next.config.ts`:
  - `trae-api-us.mchost.guru`, `images.unsplash.com`, seu `supabase.co` de storage público.
- Se usar outros domínios (ex.: `via.placeholder.com`), adicione em `next.config.ts` ou use domínio já permitido para evitar erro do `next/image`.

## Dicas e Troubleshooting

- Porta 3000 ocupada: Next alterna para 3001 automaticamente.
- Lock do dev server: encerre instância anterior se aparecer “Unable to acquire lock ... .next/dev/lock”.
- “Supabase não configurado”: verifique variáveis do `.env.local` e o service role.
- Erro de imagem não configurada: ajuste `next.config.ts` para incluir o domínio ou troque a URL.

## Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

- Lint: `npm run lint`
- (Opcional) Typecheck: `npx tsc --noEmit`

## Licença

Projeto interno da Sol Nascente. Ajuste a licença conforme necessidade da empresa.
