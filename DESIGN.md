# DESIGN.md SelfEvoPI site

## Leitura

site de produto para engenheiros de código, em linguagem monocromática de engenharia com motivo de hélice, com ritmo variado e movimento que explica estado.

Discos: ENERGY 2 / RHYTHM 3 / MOTION 3. O MOTION subiu de 2 para 3 porque carregamento, recepção, rolagem e ponteiro passaram a dirigir a interface. ENERGY e RHYTHM permanecem.

## Entrada e comparação pesquisada

A recepção não mostra dica de rolagem. Ela repete a gramática da entrada do portfólio do autor: nome grande e definição à esquerda, links de repositório e referência abaixo. À direita está a marca DNA original do projeto, em rotação lenta. O carregamento usa a mesma marca em rotação mais rápida. A navegação virou uma caixa sobreposta ao site, com fundo escuro e borda fina, fixa no topo.

A linha que passava atrás dos quatro pontos da trilha foi removida. O mapa da tese ganhou uma explicação em prosa, porque os nós sozinhos não diziam o que cada fator significa. As linhas dos diagramas internos ficaram mais visíveis.

As notas de comparação foram escritas a partir de fontes primárias consultadas em 22 de novembro de 2026, listadas em cada nota e consolidadas em `claims.md`. Onde a fonte oficial não cobre um item, a célula diz "not verified". O dado de ERNIE 5.5 saiu da página por ser uso interno de desenvolvimento.

A seção de arquitetura ganhou o fluxo de quatro eventos normalizados, as sondas por tipo de artefato e as garantias de sandbox, memória, governança e grafo. A comparação ganhou um mapa de agrupamento, notas em prosa com fonte e a tabela de dados.

## Destaque do SelfEvoPI e navegação

A comparação destaca o SelfEvoPI pelo que ele faz, não por uma caixa com a marca repetida. Uma lista de capacidades e diferenças abre a seção em texto, com peso maior no rótulo de cada item. Cada nota dos outros harnesses termina com uma linha dizendo o que o SelfEvoPI acrescenta, ancorada nas fontes de cada projeto. A linha correspondente na tabela também recebe fundo e peso maiores, e a tese da comparação vem antes da do Unharnessed. O wordmark da navegação usa o SVG oficial com inversão para branco, sem repetir a marca na comparação. A seção de primeiros comandos virou uma tabela de duas colunas, alinhada com as tabelas de evidência e comparação.

## Fonte dos tokens

Paleta, tipografia e escala transcritas do sistema do portfólio (https://kelvinoliveiracode.github.io/portfolio/css/tokens.css) e de `docs/design/marca.md` no repositório SelfEvoPI. O portfólio define o como; a marca SelfEvoPI define o quem.

## Paleta

| Token | Valor | Motivo em uma linha |
|:--|:--|:--|
| fundo | `#000000` | Campo absoluto, sem cor que não signifique algo. |
| superfície | `#0d0d0d` | Navegação, linhas de tabela e estados de hover. |
| painel e hover | `#1a1a1a` | Estado de interação, não decoração. |
| texto | `#ffffff` | Corpo e ênfase. O branco é o único acento. |
| secundário | `#787878` | Contraste 4,76:1 sobre preto, aprovado para texto AA. |
| linha | `rgba(255,255,255,.08)` | Hairline entre blocos, sem peso de caixa. |
| linha forte | `rgba(255,255,255,.18)` | Divisórias, arestas dos diagramas e partículas. |

Poeira, filamento, anel do cursor e linha de carregamento usam apenas branco com opacidade. Nenhuma cor nova entrou.

## Tipografia e escala

Uma família para tudo: `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`. Sem mono e sem serifa. Peso 400 no corpo, 500 em títulos e rótulos de diagrama. Corpo 15,5 px, lead 19,74 px, título de seção 31 px, título principal até 118 px. Base 8, gutter `clamp(20px, 5vw, 72px)`, medida de leitura 860 px, coluna máxima 1192 px. Raios 2 px e 8 px. Transição 200 ms com `cubic-bezier(.22, 1, .36, 1)` e revelações de 640 ms. Grão muito sutil por ruído SVG a 3,5%.

## Carregamento

Overlay preto com a marca DNA e uma linha fina. A linha mede imagens efetivamente carregadas, não um percentual inventado. A saída acontece por fade quando a página fica pronta, com tempo mínimo curto para evitar piscada.

## Recepção

Seção de uma altura de tela, presa no scroll dentro de um trecho de duas telas. Texto com "SelfEvoPI" e a definição à esquerda, marca em branco à direita. A rolagem controla opacidade e deslocamento da recepção, e a navegação ganha fundo ao entrar no conteúdo. Não há herói padrão com três cards. A marca reage ao ponteiro com deslocamento pequeno, ligado à posição real do mouse.

Motivo: a entrada é a porta do projeto; o gesto de rolar revela a página em vez de entregá-la de uma vez.

## Fundo de poeira

Canvas fixo com partículas cinzas semiopacas distribuídas por todo o fundo da página, em densidade baixa e sem agrupamento. O ponteiro afasta suavemente as partículas próximas e elas voltam a se espalhar pelo campo. Não há filamento lateral nem emissão de partículas ligada ao scroll.

Motivo: a poeira dá textura ao campo sem competir com o conteúdo. `prefers-reduced-motion` mantém a poeira parada e as seções visíveis.

A marca DNA aparece uma vez na recepção. O carregamento usa a mesma marca apenas enquanto a tela está visível, e a navegação traz o nome em texto, sem repetir o símbolo.

## Diagramas

Ciclo adaptativo e arquitetura viram mapas em estrela com nós e conectores de linha fina, sem pontas de seta. O nó preenchido continua sendo o único marcador de etapa ativa. A hierarquia de artefatos vira uma escada de larguras crescentes. Os rótulos continuam no HTML para leitores de tela e para a troca de idioma; em telas estreitas os mapas viram listas conectadas por uma linha.

Motivo: a estrutura do produto é a mensagem; desenhar os nós substitui parágrafos de descrição sem perder os fatos.

## Interatividade e scroll

Nós dos diagramas, linhas de tabela, itens de limite, comandos, eventos da trilha e links têm estados de hover com transição curta. A barra de rolagem é estilizada em cinza sobre preto. Um anel fino segue o ponteiro e cresce sobre elementos interativos, sem substituir o cursor real. Nenhum card usa `hover:scale`; nenhum ícone decorativo foi adicionado.

## Microtextos e rastreabilidade

Faixa de versão, linhas de fonte e legendas de comando saíram da superfície visível. Os comandos e as datas continuam na tabela Evidência, que é conteúdo principal, e a origem completa fica em `claims.md` e em atributos `data-source`. Isso atende ao pedido de remover textos pequenos sem quebrar a regra de que todo número tem origem.

## Evolução por scroll

A página começa em preto e branco absoluto. O progresso de rolagem controla seis etapas, detect, specify, generate, verify, gate e promote, exibidas em uma trilha lateral e em uma linha de texto em telas estreitas. À medida que o usuário avança, as conectores dos diagramas ganham força, a densidade da poeira aumenta e a cena abstrata da recepção gira. A cor não muda; a evolução é estrutural. A cena é uma órbita quebrada com hélice dupla e um nó preenchido, abstrata e técnica, sem的生物 ou laboratório.

## Limpeza de linhas

Divisórias decorativas entre seções e retas soltas foram removidas. Hairlines continuam apenas dentro de tabelas e diagramas, onde separam dados ou ligam nós.

## Sombra nas bordas e diagramas restantes

Uma camada fixa aplica sombra interna nas bordas da página, acima do conteúdo e abaixo da navegação. Ela reclina a atenção para o centro sem usar degradê. A navegação fica acima dela para manter contraste e alcançabilidade.

O rótulo "SelfEvoPI" do mapa de arquitetura foi deslocado para baixo do nó central, deixando de cobrir a bolinha. As seções que ainda eram prosa viraram diagramas: a tese mostra os três fatores decididos pelo harness, a tensão entre harnesses virou dois nós opostos, os limites viraram duas colunas de nós ligadas por uma espinha, e os primeiros comandos viraram uma cadeia de nós. As tabelas comparativa e de evidência permanecem tabelas, porque são dados.

## Rodapé

"Created by Kelvin Oliveira" substitui o rótulo genérico de autor. Os três links reais foram mantidos.

## Diagramas adicionais

Quatro diagramas SVG novos complementam os existentes, todos monocromáticos e sem setas:

- **Fluxo de eventos normalizado** (`diagram-flow.svg`): engine → RPC client → CLI, com os quatro tipos de evento (text, tool, settled, error) saindo do CLI. Inserido na seção de arquitetura, após o fluxo de dados em texto.
- **Estados da sessão** (`diagram-session-states.svg`): launch → active → (resume | fork | compacted). Inserido na seção CLI surface, após os modos.
- **Decisão de promoção** (`diagram-promotion.svg`): verify → gate → (promote se verde | revert se vermelho). Gate verde é nó preenchido; gate vermelho é oco com linha tracejada para revert, que volta a generate. Inserido na seção "How it adapts", após o ciclo adaptativo.
- **Orçamento de contexto** (`diagram-context-budget.svg`): barra de 1500 tokens com segmento de 499 destacado (overhead do SelfEvoPI) e标注 "skills/MCP on-demand". Inserido na seção de tese, após o mapa de fatores.

Os diagramas são imagens `<img>` com `loading="lazy"`, dentro de `.diagram-wrap` (flex, centrado, max-width 900px, borda hairline, fundo `var(--bg)`). Não competem com os diagramas SVG inline existentes; complementam-nos onde o texto era a única representação.

## Novas seções

Cinco seções foram adicionadas entre `limits` e `commands`:

- **Install**: terminal com `git clone`, `npm run verify`, `npm run cli` + requisitos (Windows nativo, Node ≥ 22.19.1, Git ≥ 2.55, motor CLI).
- **CLI surface**: modos (`/plan`, `/build`, `/manual`, `/ask`, `/goal`) em cadeia de nós + tabela de comandos agrupados por função (evolução, sessão, contexto, provedor, orquestração, edição).
- **Themes**: grade de 15 swatches (12 paletas + 3 customizados), nota WCAG AA e degradação ANSI-256.
- **Keyboard**: tabela de atalhos (Ctrl+O, Ctrl+K, Ctrl+P, Ctrl+T, Ctrl+,, Alt+T, Ctrl+C, Enter, !cmd, @file, q).
- **Hooks & Code Mode**: 6 eventos de hook + explicação do node:vm restrito (tools.call, sem process/require/fetch/eval/Function).

## Interação

- **Scroll spy**: IntersectionObserver marca `aria-current="page"` no link da nav correspondente à seção visível.
- **Voltar ao topo**: botão flutuante `.to-top` aparece após 600 px de rolagem, respeita `prefers-reduced-motion`.
- **Tema claro/escuro**: botão na nav alterna `data-theme` no `<html>`, persiste em `localStorage` sob `selfevopi-theme`, default `prefers-color-scheme`.
- **CTA sticky**: botão "Baixar" compacto na nav dispara o mesmo dialog `#downloadDialog` que o botão da abertura.

## Conteúdo adicional

Seis seções novas explicam as ideias do projeto, sem introduzir números sem fonte. `principles` mostra oito regras de projeto ao redor do harness. `judge` explica que o verificador fica fora do autor e lista o que o gate pergunta e o que não pode ser editado para fazê-lo passar. `conversation` descreve o quadro do terminal, com a resposta acima da entrada e o rodapé preso imediatamente abaixo dela. `continuity` mostra os três níveis de memória e o estado de equipes e eventos que sobrevive a reinícios. `scope` separa o que está no release do que ficou de fora por decisão. `faq` responde sete perguntas com fatos já presentes em README e PROJECT.

Sete diagramas SVG novos acompanham essas seções, no mesmo vocabulário dos anteriores: fundo preto, linha fina, sem setas e sem cor nova. `diagram-ownership.svg` desenha a fronteira entre motor e harness. `diagram-contract.svg` mostra as quatro entradas do contrato de uma tarefa. `diagram-sandbox-layers.svg` mostra as camadas de contenção. `diagram-memory-lifecycle.svg` mostra a promoção de fato para sessão, projeto e skills. `diagram-judge.svg` mostra o candidato, o workspace temporário, o checker e o gate. `diagram-principles.svg` dispõe as oito regras ao redor do núcleo. `diagram-terminal.svg` mostra a posição fixa do rodapé em relação à linha de entrada. Os rótulos usam `data-en` e `data-pt`, então acompanham o seletor de idioma.

A seção `conversation` registra o comportamento da CLI que mantém estado e dica nas duas primeiras linhas abaixo do prompt, inclusive com paleta aberta. A mudança correspondente está em `apps/cli.mjs` e tem teste em `apps/cli.test.mjs`.

## Download e configuração rápida

O botão Baixar da navegação e da recepção deixou de abrir um diálogo de aviso e passou a linkar direto o zip do release v2.0.0. O diálogo antigo e seu código em `script.js` foram removidos. A seção `download` explica o executável, mostra os quatro comandos de começo e descreve o `/providers quick`: um endpoint e uma chave entram, todos os modelos do gateway são puxados e gravados no perfil do usuário. A chave não aparece na saída.

A nota da seção Instalação deixou de prometer `npm run verify` verde no release público e passou a dizer que o ledger privado fica fora do pacote.

## PWA e OG

- `site.webmanifest` com `display:standalone`, `background_color:#000`, `theme_color:#000`, ícone `selfevopi.ico`.
- `sw.js` cache-first para assets estáticos (HTML, CSS, JS, SVGs).
- `og.svg` 1200×630 com wordmark e data, referenciado em `<meta property="og:image">`.
