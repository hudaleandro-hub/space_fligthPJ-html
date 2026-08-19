// somAlerta.js
// Gerencia o som de alarme que toca quando o combustível acaba

class SomAlerta {
    constructor() {
        this.audio = new Audio('assets/Alerta.mp3');
        this.audio.loop = true;      // Toca em loop contínuo
        this.audio.volume = 0.5;     // Volume médio para chamar a atenção
        
        // Pré-carrega o som
        this.audio.load();
    }

    // Inicia o alarme (toca em loop)
    ligar() {
        this.audio.currentTime = 0; // Começa do início
        this.audio.play().catch(e => {
            // Ignora erros caso o som já esteja tocando ou interação pendente
        });
    }

    // Para o alarme imediatamente (corte seco)
    desligar() {
        this.audio.pause();
        this.audio.currentTime = 0; // Reseta para o início para o próximo toque
    }
}