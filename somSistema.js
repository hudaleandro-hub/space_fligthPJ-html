// somSistema.js
// Gerencia os sons de interface (cliques, botões, interações)

class SomSistema {
    constructor() {
        this.audio = new Audio('assets/clique.mp3');
        this.audio.volume = 0.4; // Volume ajustado para não ser muito alto
        
        // Pré-carrega o som
        this.audio.load();
    }

    // Toca o som de clique
    tocarClique() {
        this.audio.currentTime = 0; // Reseta para o início
        this.audio.play().catch(e => {
            // Ignora erros de interação (o navegador precisa de um clique inicial para liberar o som)
        });
    }
}