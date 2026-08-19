// somRecompensa.js
// Gerencia o som de ganho de moedas/recompensa

class SomRecompensa {
    constructor() {
        this.audio = new Audio('assets/recompensa.mp3');
        this.audio.volume = 0.6; // Volume um pouco mais alto para destacar a conquista
        
        // Pré-carrega o som
        this.audio.load();
    }

    // Toca o som de recompensa
    tocar() {
        this.audio.currentTime = 0; // Reseta para o início
        this.audio.play().catch(e => {
            // Ignora erros de interação
        });
    }
}