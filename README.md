# ES Assistec

Site institucional e portfólio de serviços digitais da ES Assistec. Desenvolvido em HTML, CSS e JavaScript, sem etapa de compilação.

## Estrutura

- `index.html`: apresentação, soluções, portfólio, processo interativo, perguntas frequentes e contato.
- `assents/style.css`: identidade visual e layouts para computador, tablet e celular.
- `assents/script.js`: menu móvel, animações, navegação das etapas por teclado e preparação da mensagem de orçamento.
- `assents/images/`: imagens dos projetos existentes.
- `politica-de-privacidade.html`: documento de privacidade com a identidade visual compartilhada.

## Visualização local

Inicie um servidor estático na raiz do projeto. Com Python instalado:

```sh
python -m http.server 8080 --bind 127.0.0.1
```

Abra `http://127.0.0.1:8080`. Os recursos usam caminhos a partir da raiz, portanto o site deve ser servido por HTTP, e não aberto diretamente pelo protocolo `file://`.

## Conteúdo e contato

O formulário prepara uma mensagem para o WhatsApp `(31) 99318-2624`. O visitante revisa e envia a mensagem no próprio WhatsApp. Não há backend de envio ou armazenamento do formulário. Os links e o formulário abrem o WhatsApp diretamente na mesma aba, sem depender de pop-ups. Um link alternativo com a mensagem também é preparado.

O portfólio utiliza os projetos Bella Mares, Estética Automotiva Milagres e Auto Preencher / Br Super, já presentes no repositório. Os contatos, a marca e a configuração existente do Google Ads foram preservados.

## Publicação

Envie `index.html`, `politica-de-privacidade.html` e a pasta `assents` para a raiz da hospedagem. Não é necessário instalar dependências ou executar um build. Google Fonts e Google Ads dependem de acesso externo; o layout tem fontes de sistema como alternativa e os ícones da página principal são SVG locais. O ícone do WhatsApp utiliza Bootstrap Icons; sua licença está em `assents/bootstrap-icons-LICENSE.txt`.
