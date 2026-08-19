// somLoja.js
// Gerencia os sons de interação dentro da loja (comprar upgrades)

class SomLoja {
    constructor() {
        this.audio = new Audio('assets/Up.mp3');
        this.audio.volume = 0.4; // Volume confortável para um som de "upgrade"
        
        // Pré-carrega o som
        this.audio.load();
    }

    // Toca o som de compra/upgrade
    tocar() {
        this.audio.currentTime = 0; // Reseta para o início
        this.audio.play().catch(e => {
            // Ignora erros de interação
        });
    }
}