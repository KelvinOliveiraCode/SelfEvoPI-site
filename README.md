# SelfEvoPI site

Página de produto de uma página, sem framework e sem dependências npm.

## Abrir

Abra `index.html` no navegador. Não há build, servidor obrigatório nem etapa de instalação. Para servir localmente, rode na pasta do site:

```powershell
python -m http.server 8080
```

Depois abra `http://localhost:8080`.

A entrada tem uma tela de carregamento com progresso real de imagens, uma recepção com o nome à esquerda e uma cena abstrata à direita, e a página de produto. Ao rolar, o site percorre as seis etapas do ciclo do SelfEvoPI e a interface evolui em preto e branco. A seção de equipes, eventos e memória cobre a versão 2.0.0.

## Verificar

1. Observe o carregamento. A linha fina avança conforme as imagens entram e a tela sai por fade.
2. Role a página. A recepção recua, a cena gira e a trilha de evolução avança por detect, specify, generate, verify, gate e promote. As conexões dos diagramas ganham força e a poeira ganha densidade. Nenhuma cor aparece.
3. Mude o idioma com o botão PT/EN no topo. O primeiro carregamento é inglês e a preferência fica em `localStorage` sob `selfevopi-lang`.
4. Navegue só com teclado: skip link, links, botão de idioma, eventos da trilha, botão de download e botões do dialog. O foco fica visível em todos. O dialog abre com `showModal()`, move o foco para "Close", fecha com Escape e devolve o foco ao botão de origem.
5. Redimensione para 390, 768 e 1440 px. Não deve haver rolagem horizontal da página. Os mapas viram listas em telas estreitas.
6. Ative "reduce motion" no sistema. A poeira para, as seções aparecem sem animação e o anel do cursor desaparece.

## Arquivos

- `index.html`: entrada, recepção, diagramas e conteúdo bilíngue.
- `styles.css`: tokens, carregamento, recepção, poeira, diagramas e responsividade.
- `script.js`: progresso de carga, scroll, poeira, idioma, menu, trilha e dialog.
- `DESIGN.md`: tokens e motivo de cada decisão importante.
- `claims.md`: registro de afirmações verificadas, inferidas e assumidas.
- `assets/`: SVGs oficiais da marca e placeholder honesto do og:image.
- `review/`: capturas de revisão, quando geradas.

## Fonte dos números

`docs/estado.md` versão 2.0.0 e `docs/produto.md`, no repositório em `C:\Users\Kelvin\Desktop\SelfEvoPI`. O número de testes foi medido em 23 de novembro de 2026. O repositório do projeto não foi modificado.
