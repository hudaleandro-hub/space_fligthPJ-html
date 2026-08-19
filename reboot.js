// reboot.js
// Gerencia o som de reinicialização do jogo (tecla R)

class Reboot {
    constructor() {
        this.audio = new Audio('assets/Reiniciar.mp3');
        this.audio.volume = 0.5; // Volume médio para um som de reinício impactante
        
        // Pré-carrega o som
        this.audio.load();
    }

    // Toca o som de reinicialização
    tocar() {
        this.audio.currentTime = 0; // Reseta para o início
        this.audio.play().catch(e => {
            // Ignora erros de interação
        });
    }
}