# Digital Project — Web of Arquitects

Recriação responsiva do site de arquitetura apresentado nos protótipos da pasta `Design`, feita com React, Vite e React Router. O projeto preserva os textos em inglês e a identidade visual das referências.

## Integrantes

- Lavínia Harumi Harakawa Manzan
- Mirella Ferreira Silva

## Executar

Requer Node.js 22.12 ou superior e npm.

```sh
npm install
npm run dev
```

No Windows, se o PowerShell bloquear `npm.ps1`, use `npm.cmd` no lugar de `npm`. O servidor local usa o endereço exibido no terminal, normalmente http://127.0.0.1:5173.

```sh
npm run lint
npm run build
npm run preview
```

O build é gerado em `dist`. As fontes Roboto e as imagens são locais: o site não depende de serviços externos para renderizar seu conteúdo.

## Páginas

| Menu | URL |
| --- | --- |
| Main | `/` |
| Gallery | `/galeria` |
| Projects | `/projetos` |
| Certifications | `/certificacoes` |
| About | `/sobre` |
| Contact | `/contato` |
| Detalhes dos projetos | `/projetos/1`, `/projetos/2`, `/projetos/3` |

A rota `/projetos/:id` lê o identificador com `useParams`. Os três projetos compartilham o conteúdo e o layout de `Example of Project.png`, inclusive o título, conforme solicitado. IDs desconhecidos e endereços inexistentes redirecionam para a página inicial. O menu usa `NavLink`, e a navegação interna usa `Link`, sem recarregar a aplicação.

## Organização

- `src/pages`: componentes das páginas.
- `src/components`: layout, elementos visuais, seções compartilhadas e formulário.
- `src/data.js`: navegação, contatos, projetos e textos compartilhados.
- `src/styles.css`: estilos e adaptações para desktop, tablet e celular.
- `public/images`: recortes dos assets dos protótipos.
- `scripts/extract-assets.ps1`: extração reproduzível das imagens originais no Windows com System.Drawing.
- `tests`: verificações de navegação e comportamento com Playwright.

Os PNGs em `Design` são as referências fornecidas. As fotos, o mapa e a marca foram recortados deles, mantendo a resolução disponível. Não foram usadas capturas de páginas inteiras como interface. O primeiro espaço cinza da galeria e a área vazia de Certifications fazem parte do protótipo. A página About reutiliza as seções About e missão da Home. O rodapé foi padronizado em inglês.

## Interações

O destaque da Home alterna entre dois projetos. Projects e Gallery contêm apenas uma página de conteúdo e exibem `01/01`, com setas desabilitadas. Os cartões abrem os detalhes dos projetos.

Contact Us leva ao formulário da Home. Telefone, e-mail e mensagem são obrigatórios; o formulário usa validação nativa do navegador. Send Email abre o aplicativo de e-mail via `mailto:` com a mensagem preenchida. É necessário um aplicativo configurado, e o usuário conclui o envio nele. Não há backend nem envio automático ou confirmação de entrega. Os símbolos de redes sociais são visuais, pois o protótipo não fornece perfis reais.

## Testes

```sh
npm run test:e2e
```

Os testes usam Google Chrome instalado e iniciam o servidor Vite automaticamente. Verificam todas as rotas e atualizações, imagens, links dinâmicos, slider, paginação, formulário, redirecionamento de URLs inválidas, navegação por teclado, menu móvel e ausência de rolagem horizontal em 1440, 768 e 375 pixels. Para usar o Chromium do Playwright em outra máquina, instale-o com `npx playwright install chromium` e remova `channel: 'chrome'` de `playwright.config.js`.

Com o servidor local rodando na porta 5173, `node scripts/capture-previews.js` gera capturas de todas as páginas nas três larguras em `.cache/previews` para revisão visual. As capturas não entram no repositório.

## Entrega e hospedagem

O projeto está preparado para entrega no repositório `https://github.com/haruvinia/Web-of-Arquitects`. A publicação não é realizada automaticamente. Antes de entregar o link, publique os arquivos e confirme que o repositório está público.

Como a aplicação usa `BrowserRouter`, a hospedagem precisa servir `index.html` para URLs que não correspondem a arquivos, incluindo `/projetos/1`. Essa regra evita erro 404 ao acessar diretamente ou atualizar uma rota. GitHub Pages exige uma solução adicional de fallback para SPAs e configuração de base se o site estiver em um subdiretório; o link do repositório exigido pela atividade não depende de hospedar o site no Pages.
