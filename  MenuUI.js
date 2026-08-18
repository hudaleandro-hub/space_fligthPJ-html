// MenuUI.js
// Classe responsável por carregar e desenhar os elementos visuais do menu (Título, Play, Loja)

class MenuUI {
    constructor() {
        // Lista de imagens que serão carregadas da pasta assets/modelos
        this.assets = {
            titulo: 'assets/modelos/titulo.png',
            play: 'assets/modelos/play.png',
            loja: 'assets/modelos/loja.png'
        };

        // Armazena as imagens carregadas
        this.imagens = {};
        this.todasCarregadas = false;
        this.imagensPendentes = 0;

        // Configuração de posição e tamanho dos botões (calculados dinamicamente)
        this.btnPlay = { x: 0, y: 0, w: 0, h: 0 };
        this.btnLoja = { x: 0, y: 0, w: 0, h: 0 };

        this.carregarImagens();
    }

    carregarImagens() {
        const nomes = Object.keys(this.assets);
        this.imagensPendentes = nomes.length;

        nomes.forEach(nome => {
            const img = new Image();
            img.src = this.assets[nome];
            
            img.onload = () => {
                this.imagens[nome] = img;
                this.imagensPendentes--;
                if (this.imagensPendentes === 0) {
                    this.todasCarregadas = true;
                    console.log("🖼️ Todas as imagens de menu carregadas!");
                }
            };

            img.onerror = () => {
                console.error(`❌ Erro ao carregar a imagem do menu: ${this.assets[nome]}`);
                this.imagensPendentes--;
                if (this.imagensPendentes === 0) {
                    this.todasCarregadas = true;
                }
            };
        });
    }

    // Método para desenhar o menu no canvas
    desenhar(ctx, canvasW, canvasH) {
        if (!this.todasCarregadas) return; // Aguarda o carregamento das imagens

        // 1. Desenhar Título (centro-topo)
        if (this.imagens.titulo) {
            const titulo = this.imagens.titulo;
            const tituloLargura = 500;
            const tituloAltura = 80; // Ajuste a altura conforme a proporção da sua imagem
            ctx.drawImage(titulo, (canvasW - tituloLargura) / 2, 80, tituloLargura, tituloAltura);
        }

        // 2. Desenhar Botão Play (centro)
        if (this.imagens.play) {
            const play = this.imagens.play;
            // Tamanho do botão
            this.btnPlay.w = 200;
            this.btnPlay.h = 70;
            this.btnPlay.x = (canvasW - this.btnPlay.w) / 2;
            this.btnPlay.y = 260; // Posição Y

            ctx.drawImage(play, this.btnPlay.x, this.btnPlay.y, this.btnPlay.w, this.btnPlay.h);
        }

        // 3. Desenhar Botão Loja (abaixo do Play)
        if (this.imagens.loja) {
            const loja = this.imagens.loja;
            // Tamanho do botão
            this.btnLoja.w = 160;
            this.btnLoja.h = 60;
            this.btnLoja.x = (canvasW - this.btnLoja.w) / 2;
            this.btnLoja.y = 350; // Posição Y

            ctx.drawImage(loja, this.btnLoja.x, this.btnLoja.y, this.btnLoja.w, this.btnLoja.h);
        }
    }

    // Método para verificar se o jogador clicou no botão Play
    clicouPlay(mouseX, mouseY) {
        return this.verificarClique(this.btnPlay, mouseX, mouseY);
    }

    // Método para verificar se o jogador clicou no botão Loja
    clicouLoja(mouseX, mouseY) {
        return this.verificarClique(this.btnLoja, mouseX, mouseY);
    }

    // Função auxiliar para checar colisão entre clique e retângulo
    verificarClique(btn, mouseX, mouseY) {
        if (!this.todasCarregadas) return false;
        return mouseX >= btn.x && mouseX <= btn.x + btn.w &&
               mouseY >= btn.y && mouseY <= btn.y + btn.h;
    }
}