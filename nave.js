// nave.js
// Este arquivo gerencia o carregamento e desenho da nave personalizada

class NavePersonalizada {
    constructor() {
      // Lista de naves disponíveis (adicione mais se quiser)
      this.naves = {
        principal: 'assets/nave-principal.png', // Certifique-se que o arquivo existe nessa pasta
        // Exemplo de outras naves (comente ou descomente conforme tiver as imagens)
        // especial: 'assets/nave-especial.png',
        // dragao: 'assets/nave-dragao.png'
      };
  
      // Define a nave que será usada no início (pode ser alterada depois)
      this.naveAtual = 'principal';
      this.imagem = new Image();
      this.carregada = false;
      this.largura = 80;  // Tamanho padrão (ajuste conforme a imagem)
      this.altura = 80;
    }
  
    // Método para carregar uma nave específica
    carregarNave(nomeNave) {
      if (!this.naves[nomeNave]) {
        console.error(`Nave "${nomeNave}" não encontrada na lista.`);
        return;
      }
  
      this.naveAtual = nomeNave;
      this.carregada = false;
      this.imagem.src = this.naves[nomeNave];
  
      // Evento para saber quando a imagem carregou
      this.imagem.onload = () => {
        this.carregada = true;
        // Ajusta o tamanho baseado na proporção da imagem (opcional)
        // this.largura = this.imagem.naturalWidth / 2;
        // this.altura = this.imagem.naturalHeight / 2;
        console.log(`🚀 Nave "${nomeNave}" carregada com sucesso!`);
      };
  
      this.imagem.onerror = () => {
        console.error(`❌ Erro ao carregar a imagem: ${this.naves[nomeNave]}`);
        this.carregada = false;
      };
    }
  
    // Método para desenhar a nave no canvas com o fogo
    desenhar(ctx, x, y, motorLigado, combustivel) {
      // 1. Desenhar o Fogo (sempre atrás da nave)
      if (motorLigado && combustivel > 0) {
        ctx.shadowColor = '#ffaa33';
        ctx.shadowBlur = 40;
        
        // Fogo externo (gradiente laranja)
        const grad = ctx.createRadialGradient(x, y + 24, 4, x, y + 40, 30);
        grad.addColorStop(0, '#ffb347');
        grad.addColorStop(0.5, '#ff7b00');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(x, y + 28, 14, 28, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Fogo interno (núcleo amarelo)
        ctx.shadowBlur = 60;
        ctx.fillStyle = '#ffdd77';
        ctx.beginPath();
        ctx.ellipse(x, y + 30, 6, 16, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
  
      // 2. Desenhar a Imagem da Nave
      if (this.carregada) {
        // Centraliza a imagem no ponto (x, y)
        ctx.drawImage(
          this.imagem, 
          x - this.largura / 2, 
          y - this.altura / 2, 
          this.largura, 
          this.altura
        );
      } else {
        // Fallback: Se a imagem não carregou, desenha um quadrado para não quebrar o jogo
        ctx.fillStyle = '#ff3333';
        ctx.fillRect(x - 20, y - 20, 40, 40);
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Erro', x, y + 5);
        ctx.textAlign = 'left';
      }
    }
  }