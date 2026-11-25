# Registro de afirmações

Classificação: **verificada** quando reproduzida em fonte primária; **inferida** quando decorre de fonte lida mas não foi testada de forma independente; **assumida** quando é premissa de projeto sem verificação.

## SelfEvoPI

| Afirmação | Classe | Fonte |
|:--|:--|:--|
| 1303 testes, 1296 passam, 7 pulados | verificada | `npm test` na árvore 2.0.0, 23 Nov 2026 |
| Equipes persistentes com quadro e passo determinístico | verificada | `core/agent/team.mjs` e `core/agent/team.test.mjs` |
| Barramento de eventos com cursor persistido | verificada | `core/forge/events.mjs` e `core/forge/events.test.mjs` |
| Memória automática com redação de segredo | verificada | `core/agent/memory-auto.mjs` e `core/agent/memory-auto.test.mjs` |
| Célula persistente restrita com limites de chamada e saída | verificada | `core/agent/cells.mjs` e `core/agent/cells.test.mjs` |
| Definições de agente e permissões ordenadas | verificada | `core/agent/agent-defs.mjs` e `core/agent/agent-defs.test.mjs` |
| Auditoria de refutação com juiz externo na CLI | verificada | `core/agent/refutation-audit.mjs` e `core/agent/refutation-audit.test.mjs` |
| `npm run verify` com exit 0 e 33 de 33 URLs 200 | verificada | `docs/estado.md` §2, 22 Nov 2026 |
| Cold start médio de ~82 ms em 7 execuções | verificada | `docs/estado.md` §2, cronômetro sobre `node apps/cli.mjs --version` |
| Acréscimo de +499 tokens sobre teto de 1500 | verificada | `docs/estado.md` §2, `node scripts/measure-selfevopi-overhead.mjs --runs 3` |
| 48 de 48 modelos com capacidades conferidas | verificada | `docs/estado.md` §2, `npm run models:check` |
| Tarefa Node em 7,4 s e site HTML em 9,2 s | verificada | `docs/estado.md` §2, tarefa em workspace temporário |
| Dois subagentes em paralelo em 3,1 s | verificada | `docs/estado.md` §2, `runSwarmExecution` |
| Quatro eventos normalizados, text, tool, settled e error | verificada | `core/agent/pi-rpc.mjs` linhas 129, 136, 148, 158 e 174 |
| Sondas por kind com initialize, tools/list e flags do contrato | verificada | `docs/fase2/forge.md` §probe e `core/forge/probe.mjs` linha 55 |
| Memória em session, project e skills com poda por evidência | verificada | `docs/fase2/memoria.md` §7 e §95 |
| Gate estático antes da execução, Permission Model e contenção de árvore | verificada | `docs/fase2/sandbox.md` §53, §78 e §117. A contagem de regras diverge entre fontes e foi retirada da página. |
| Rollback verificado e last-known-good só com verify verde | verificada | `docs/fase2/governanca.md` §28 e §85 |
| Grafo com checkpoint, pausa e retomada atrelados a git | verificada | `docs/fase3/grafo.md` §14, §18 e §20 |
| Hooks de ciclo de vida: seis eventos, sem shell, timeout e redação | verificada | `docs/estado.md` §2, 22 Nov 2026, `core/agent/hooks.test.mjs` |
| Ledger de segurança: decisões block e warn com trecho redigido | verificada | `docs/estado.md` §2, 22 Nov 2026, `core/sandbox/telemetry.test.mjs` |
| Contraste dos papéis de texto acima de 7:1 em todos os temas | verificada | `docs/estado.md` §2, 22 Nov 2026, `core/agent/theme.test.mjs` |
| Saída em pipe sem retorno de carro nem apagamento de cursor em doze tarefas | verificada | `docs/estado.md` §2, 22 Nov 2026 |
| Erro 429 seguido de resposta não é reportado como falha | verificada | `docs/estado.md` §2, 22 Nov 2026, `apps/cli.test.mjs` |
| Limites atuais: skills lexicais, auto-disparo por relógio e ledger, quatro modelos sem texto, /btw e keybindings ausentes | verificada | `docs/estado.md` §6, 22 Nov 2026 |

## Harnesses comparados

| Afirmação | Classe | Fonte |
|:--|:--|:--|
| Claude Code: seis modos de permissão e /goal com avaliador separado | verificada | code.claude.com/docs/en/permission-modes e /goal, 22 Nov 2026 |
| Claude Code: não há evidência primária de auto modificação do código | verificada | ausência nas fontes oficiais consultadas, 22 Nov 2026 |
| OpenCode: agnóstico, regras allow/ask/deny por agente | verificada | opencode.ai/docs e /docs/agents, 22 Nov 2026 |
| OpenCode: /goal e /loop não confirmados no inventário de 34 comandos | verificada | inventário em código da TUI v2.3.0 citado em `opencode.md`, 17 Nov 2026 |
| Codex CLI: sandbox e aprovações são eixos separados, /permissions | verificada | developers.openai.com/codex/permission-modes, 22 Nov 2026 |
| Codex CLI: /goal com condição verificável | verificada | developers.openai.com/codex/cli/slash-commands, 22 Nov 2026 |
| Hermes Agent: auto-evolução declarada, skills e revisão em background | verificada | README e docs oficiais em github.com/NousResearch/hermes-agent, 22 Nov 2026 |
| Hermes Agent: oito camadas de segurança documentadas | verificada | hermes-agent.nousresearch.com/docs/user-guide/security, 22 Nov 2026 |
| DeepSeek Harness: tudo é plugin sobre Cordis | verificada | `docs/architecture.md` em github.com/deepseek-ai/deepseek-harness, 22 Nov 2026 |
| DeepSeek Harness: developer preview sem auditoria, sandbox não garante isolamento | verificada | `SAFETY.md` no mesmo repositório, 22 Nov 2026 |
| DeepSeek Harness: MCP, REPL, skills, memória de longo prazo e auto-evolução | não verificada | ausência nos cinco documentos oficiais lidos; site de docs não renderizou |
| Unharnessed: um tool, REPL Python, sem memória e sem permissões | verificada | README e unharnessed.dev/en, 22 Nov 2026 |
| Unharnessed: afirmação 47 de 66 não verificável | verificada | seção de benchmark mostra Placeholder data; `docs/research/unharnessed.md` §7 |
| PI Coding Agent: sem subagentes, sem plan mode e sem sistema de permissões | verificada | README em github.com/earendil-works/pi, 22 Nov 2026 |
| Precedência histórica de /goal e /loop entre harnesses | não verificada | nenhuma fonte primária consultada estabelece ordem |

## Site

| Afirmação | Classe | Fonte |
|:--|:--|:--|
| A linha do carregamento mede imagens carregadas | verificada | contagem de eventos `load` e `error` em `script.js` |
| Evolução por scroll percorre as seis etapas do ciclo | verificada | progresso global mapeado em `script.js` |
| Conectores ganham força e poeira ganha densidade com a rolagem | verificada | variável `--evo` aplicada ao CSS e ao canvas |
| A marca DNA original gira na recepção e no carregamento | verificada | animação `logo-spin` aplicada aos dois `<img>` em `styles.css` |
| Entrada se assemelha ao portfólio do autor | inferida | estrutura observada em kelvinoliveiracode.github.io/portfolio |
| Quatro diagramas SVG originais (fluxo, sessão, promoção, orçamento) | verificada | `assets/diagram-*.svg`, referenciados em `index.html` |
| Sete diagramas SVG adicionais (fronteira, contrato, sandbox, memória, juiz, princípios, terminal) | verificada | `assets/diagram-ownership.svg`, `diagram-contract.svg`, `diagram-sandbox-layers.svg`, `diagram-memory-lifecycle.svg`, `diagram-judge.svg`, `diagram-principles.svg`, `diagram-terminal.svg` |
| Seções principles, judge, conversation, continuity, scope e faq | verificada | `index.html`, `data-source` em cada seção |
| Rodapé da CLI preso na primeira linha abaixo do prompt | verificada | `apps/cli.mjs` `drawInput`, teste `REPL: o rodapé fica sempre abaixo do prompt` em `apps/cli.test.mjs` |
| Oito regras de projeto listadas na seção principles | verificada | `PROJECT.md` §princípios e `README.md` |
| 29 tarefas de eval e 29 checkers | verificada | contagem de arquivos em `evals/tasks/` e `evals/checks/`, `docs/produto.md` §55 |
| Scroll spy marca a seção visível com `aria-current="page"` | verificada | `script.js`, IntersectionObserver sobre as seções |
| Botão voltar-ao-topo aparece após 600 px de rolagem | verificada | `script.js`, `.to-top` em `styles.css` |
| Tema claro/escuro alterna `data-theme` e persiste em `localStorage` | verificada | `script.js`, seletor `:root[data-theme="light"]` em `styles.css` |
| Service worker faz cache-first de assets estáticos | verificada | `sw.js`, registrado em `script.js` |
| Manifest PWA instalável com ícone e tema | verificada | `site.webmanifest`, `<link rel="manifest">` em `index.html` |
| Seções install, cli-surface, themes, keyboard e hooks | verificada | `index.html`, `data-source` em cada seção |
| Seção de equipes, eventos e memória na página | verificada | `index.html`, bloco `#teams` |
| Versão 2.0.0 nos números exibidos | verificada | `package.json` e `npm test`, 23 Nov 2026 |
| OG image SVG 1200×630 com wordmark e data | verificada | `assets/og.svg`, `<meta property="og:image">` em `index.html` |
| Release v2.0.0 com zip de 34257867 bytes e SHA256 `6dcfa611...` | verificada | API do GitHub, release `v2.0.0` do repo SelfEvoPI, download conferido |
| O zip inclui node.exe e o executável funciona sem Node no PATH | verificada | extração do zip e execução com PATH limitado a `C:\Windows` |
| Executável `SelfEvoPI.exe` abre a CLI e reporta 2.0.0 | verificada | execução do zip extraído em Windows, `--version` |
| Setup rápido puxa todos os modelos e grava a config | verificada | `apps/providers-quick.test.mjs`, gateway local com 3 modelos |
| A chave não aparece na saída do setup | verificada | `apps/providers-quick.test.mjs`, asserção sobre stdout |
| Seção download com link direto para o zip do release | verificada | `index.html`, `data-source` da seção |

## Premissas

- Nenhuma cor nova entrou; a evolução é estrutural.
- Números visíveis vêm de `docs/estado.md` ou de medição direta, sempre com comando e data.
- Citações aparecem em cada nota de harness; a lista completa fica neste arquivo.
- O dado de ERNIE 5.5 foi removido por ser detalhe de desenvolvimento, não mérito do produto.

## Números fora de fonte

Nenhum.
