// Ambient.js
// Gerencia o carregamento e desenho das imagens de fundo (estrelas, planetas, nebulosas)

class Ambient {
    constructor() {
        // Lista de imagens que serão carregadas
        this.assets = {
            estrelaPequena: 'assets/ambiente/estrela-pequena.png',
            estrelaMedia: 'assets/ambiente/estrela-media.png',
            estrelaGrande: 'assets/ambiente/estrela-grande.png',
            planeta: 'assets/ambiente/planeta.png',
            nebulosa: 'assets/ambiente/nebulosa.png'
        };

        // Objeto para armazenar as imagens carregadas
        this.imagens = {};
        this.todasCarregadas = false;
        this.imagensPendentes = 0;

        this.carregarImagens();
    }

    // Método para carregar todas as imagens da lista
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
                    console.log("🌌 Todas as imagens de ambiente carregadas!");
                }
            };

            img.onerror = () => {
                console.error(`❌ Erro ao carregar a imagem: ${this.assets[nome]}`);
                this.imagensPendentes--;
                if (this.imagensPendentes === 0) {
                    this.todasCarregadas = true; // Considera carregado para não travar o jogo
                }
            };
        });
    }

    // Método para desenhar o fundo no canvas
    desenhar(ctx, canvasW, canvasH, offsetY) {
        if (!this.todasCarregadas) {
            // Se ainda não carregou, pinta um fundo escuro para não quebrar
            ctx.fillStyle = '#0a111f';
            ctx.fillRect(0, 0, canvasW, canvasH);
            return;
        }

        // 1. Fundo base escuro
        ctx.fillStyle = '#0a111f';
        ctx.fillRect(0, 0, canvasW, canvasH);

        // 2. Desenhar Nebulosas (decorativas)
        if (this.imagens.nebulosa) {
            ctx.globalAlpha = 0.15; // Transparência suave
            for (let i = 0; i < 5; i++) {
                const nx = 100 + i * 150 + Math.sin(i * 0.5) * 30;
                const ny = ((i * 80 + 30) + offsetY * 0.2) % (canvasH + 100) - 50;
                ctx.drawImage(this.imagens.nebulosa, nx - 50, ny - 50, 100, 100);
            }
            ctx.globalAlpha = 1.0;
        }

        // 3. Desenhar Estrelas (com parallax lento)
        // Estrelas pequenas
        if (this.imagens.estrelaPequena) {
            for (let i = 0; i < 60; i++) {
                const x = (i * 37 + 13) % canvasW;
                const y = ((i * 23 + 7) + offsetY * 0.3) % canvasH;
                ctx.globalAlpha = 0.4 + Math.sin(i * 0.7) * 0.2;
                ctx.drawImage(this.imagens.estrelaPequena, x, y, 6, 6);
            }
        }

        // Estrelas médias
        if (this.imagens.estrelaMedia) {
            for (let i = 0; i < 40; i++) {
                const x = (i * 53 + 29) % canvasW;
                const y = ((i * 41 + 17) + offsetY * 0.6) % canvasH;
                ctx.globalAlpha = 0.5 + Math.cos(i * 0.5) * 0.3;
                ctx.drawImage(this.imagens.estrelaMedia, x, y, 10, 10);
            }
        }

        // Estrelas grandes (as mais brilhantes)
        if (this.imagens.estrelaGrande) {
            for (let i = 0; i < 25; i++) {
                const x = (i * 67 + 41) % canvasW;
                const y = ((i * 53 + 31) + offsetY * 1.0) % canvasH;
                ctx.globalAlpha = 0.6 + Math.sin(i * 0.9) * 0.4;
                ctx.drawImage(this.imagens.estrelaGrande, x, y, 16, 16);
            }
        }
        ctx.globalAlpha = 1.0;

        // 4. Desenhar Planeta
        if (this.imagens.planeta) {
            const planetaY = 120 + offsetY * 0.15;
            // Tamanho do planeta (largura, altura). Ajuste conforme sua imagem
            ctx.drawImage(this.imagens.planeta, 680 - 45, planetaY - 45, 90, 90);
        }
    }
}