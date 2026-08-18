// Sound.js
// Classe responsável por gerenciar e executar os efeitos sonoros do jogo

class Sound {
    constructor() {
        // Mapeia os sons disponíveis
        this.sons = {
            motor: 'assets/motor.mp3',
            recompensa: 'assets/recompensa.mp3',
            clique: 'assets/clique.mp3'
        };

        // Armazenará os objetos de áudio carregados
        this.audioCache = {};
        this.todosCarregados = false;
        this.totalSons = Object.keys(this.sons).length;
        this.sonsCarregados = 0;

        // Inicia o carregamento
        this.carregarSons();
    }

    // Método para carregar todos os sons
    carregarSons() {
        const nomes = Object.keys(this.sons);

        nomes.forEach(nome => {
            const audio = new Audio(this.sons[nome]);
            
            // Configurações específicas para cada som
            if (nome === 'motor') {
                audio.loop = true;       // O motor toca em loop
                audio.volume = 0.25;     // Volume mais baixo para não ficar irritante
            } else if (nome === 'recompensa') {
                audio.volume = 0.5;
            } else if (nome === 'clique') {
                audio.volume = 0.4;
            }

            // Evento para saber quando o som carregou
            audio.oncanplaythrough = () => {
                this.sonsCarregados++;
                if (this.sonsCarregados === this.totalSons) {
                    this.todosCarregados = true;
                    console.log("🔊 Todos os sons carregados com sucesso!");
                }
            };

            // Tratamento de erro caso o arquivo não seja encontrado
            audio.onerror = () => {
                console.error(`❌ Erro ao carregar o som: ${this.sons[nome]}`);
                this.sonsCarregados++; // Contabiliza para não travar o jogo
                if (this.sonsCarregados === this.totalSons) {
                    this.todosCarregados = true;
                }
            };

            this.audioCache[nome] = audio;
        });
    }

    // --- MÉTODOS PÚBLICOS PARA TOCAR OS SONS ---

    // Toca o som do motor (liga o motor)
    ligarMotor() {
        if (!this.todosCarregados) return;
        const audio = this.audioCache.motor;
        audio.currentTime = 0; // Começa do início
        audio.play().catch(e => console.log("Interação necessária para tocar áudio.", e));
    }

    // Pausa o som do motor (desliga o motor)
    desligarMotor() {
        if (!this.todosCarregados) return;
        const audio = this.audioCache.motor;
        audio.pause();
        audio.currentTime = 0; // Reseta o som ao ser desligado
    }

    // Toca o som de recompensa
    tocarRecompensa() {
        if (!this.todosCarregados) return;
        const audio = this.audioCache.recompensa;
        audio.currentTime = 0; // Reseta caso tenha sido tocado recentemente
        audio.play().catch(e => console.log("Interação necessária para tocar áudio.", e));
    }

    // Toca o som de clique
    tocarClique() {
        if (!this.todosCarregados) return;
        const audio = this.audioCache.clique;
        audio.currentTime = 0;
        audio.play().catch(e => console.log("Interação necessária para tocar áudio.", e));
    }
}