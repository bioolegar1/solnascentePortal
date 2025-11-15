# Google OAuth Setup Guide

## Configuração do Google OAuth no Supabase

Para habilitar login com Google, configure o provedor no Supabase.

### Passos
1. Dashboard do Supabase → Authentication → Providers → Google → Enable
2. Preencha:
   - Client ID: `<client-id>`
   - Client Secret: `<client-secret>`
   - Authorized redirect URIs:
     - `http://localhost:3000/auth/callback`
     - `https://seu-dominio.com/auth/callback`

### Google Cloud Console
- APIs & Services → Credentials → OAuth 2.0 Client
- Adicione as mesmas redirect URIs
- Ajuste o consent screen (application name, authorized domains, contatos)

### Scopes
- `email`, `profile`, `openid`

## Variáveis de ambiente
Coloque credenciais apenas em `.env.local`:
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<client-id>
GOOGLE_CLIENT_SECRET=<client-secret>
```

Nunca commit secrets. Se algum segredo foi commitado, rotacione as credenciais e remova do histórico.

## Teste
- Acesse `http://localhost:3000/admin/login`
- Clique em “Entrar com Google”

## Troubleshooting
- invalid_request: verifique Client ID e redirect URIs
- CORS: ajuste domínios autorizados no Google/Supabase