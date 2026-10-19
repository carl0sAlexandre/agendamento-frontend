# Plataforma de Agendamentos — Frontend SPA

Interface responsiva em React, com Vite e TanStack Router.

## Executar

```bash
npm install
npm run dev
```

## Verificar

```bash
npm run lint
npm run build
```

## Rotas

A árvore de rotas é definida em `src/router.jsx`, usando `createRootRoute`,
`createRoute` e `createRouter`. O `RouterProvider` é montado em `src/main.jsx`.
O layout compartilhado está em `src/App.jsx`, com `Link` para navegação SPA
 e `Outlet` para renderizar a página ativa.

| Endereço | Página |
| --- | --- |
| `/` | Início |
| `/login` | Acesso |
| `/agendar` | Novo agendamento |
| `/agendamentos` | Consulta de agendamentos |
| `/dashboard` | Visão geral operacional e financeira |
| `/servicos` | Cadastro de serviços |
| `/escala` | Escalas e bloqueios |
| `/clientes` | Clientes e histórico |

Endereços desconhecidos exibem a página de erro 404. As páginas de módulos são
iniciais, sem integração com a API. As rotas `/` e `/login` são públicas. As demais usam `beforeLoad: requireAuth`
para verificar a chave `token` no `localStorage` antes de renderizar a página.
Sem token, com valor vazio, `null`/`undefined` textual ou falha na leitura do storage,
a navegação é redirecionada para `/login`, substituindo a entrada no histórico.

Após o login real, salve o token retornado pela API com
`localStorage.setItem('token', token)` e navegue para uma rota protegida.
Após alterar ou remover o token, execute `await router.invalidate()` para
reavaliar as rotas ativas. O formulário de login envia as credenciais ao backend e salva o token retornado.

A presença do token apenas controla a navegação: assinatura, validade, permissões
por perfil e expiração de sessão devem ser verificadas pelo backend em cada
requisição. Qualquer token não vazio passa pela verificação local.
O projeto utiliza JavaScript; verificação estática de tipos de rotas requer TypeScript.

Para adicionar uma página, crie o componente em `src/pages`, defina uma rota com
`getParentRoute: () => rootRoute` e inclua-a nos filhos da raiz em `src/router.jsx`.

Ao hospedar a SPA, configure o servidor para servir `index.html` nas URLs da aplicação,
permitindo acessar e atualizar diretamente rotas como `/agendamentos`.

## Conexão com a API (Axios)

Copie `.env.example` para `.env.local` e ajuste `VITE_API_URL` para o endereço
real do backend PHP. Reinicie o Vite após alterar a variável. Sem configuração,
a instância usa `/api` no mesmo domínio do frontend.

Use a instância compartilhada em `src/services/api.js`:

```js
import { api } from './services/api.js'

// Exemplo: ajuste o endpoint ao contrato da API.
const { data } = await api.get('/Me')
```

O token é lido do `localStorage` a cada requisição e enviado no cabeçalho
`Authorization: Bearer <token>`. O timeout é de 15 segundos. Respostas 401 de
requisições com o token atual removem o token e redirecionam para `/login`.
Respostas 403 e erros de rede são devolvidos ao chamador sem encerrar a sessão.
O erro original do Axios continua disponível para tratamento na página.

A URL da API é pública no bundle; não coloque segredos em variáveis `VITE_`.
Para APIs em outro domínio, o backend precisa permitir a origem do frontend e
o cabeçalho `Authorization` via CORS. A conexão real depende da URL e dos
endpoints do backend; o login já está integrado.

## Estilização

Tailwind CSS integrado ao Vite com `@tailwindcss/vite`.
As cores do protótipo e a fonte Inter são definidas com `@theme` em
`src/index.css` e usadas como classes (`bg-primary`, `text-muted`, `font-inter`).
A tela de login usa classes utilitárias diretamente no JSX. Os estilos legados
das demais telas ficam na camada `components` para permitir substituição por
utilitários durante a migração.

## Login integrado

O formulário envia `POST /Login` com JSON `{ email, password }`, conforme a rota
registrada em `agendamento-backend/routes/Routes.php` (maiúsculas são relevantes).
A resposta deve conter `{ token, expira_em, usuario }`. O token é salvo na chave
`token` do localStorage. A rota é revalidada e o usuário segue para agendamentos
(ou dashboard para o tipo `administrador`). Nenhum token antigo é enviado no login.

Em desenvolvimento, inicie o backend na porta 8099:

```bash
cd ../agendamento-backend
php -S localhost:8099 -t public
```

No frontend, execute `npm run dev`. O proxy do Vite encaminha `/api/Login` para
`http://localhost:8099/Login`, evitando a necessidade de CORS entre essas origens.
Ajuste o `target` em `vite.config.js` se usar outra porta. Para uma URL direta em
`VITE_API_URL`, não acrescente `/api`: o backend atual registra `/Login`, `/Me` e
`/Logout` na raiz. Nesse caso, configure `CORS_ORIGIN` no backend para a origem do
frontend. O proxy do Vite só existe no servidor de desenvolvimento.

O formulário bloqueia envios duplicados e informa erros de credenciais, timeout e
conexão. Recuperação de senha, Google e cadastro continuam sem integração.
