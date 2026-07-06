import { create } from "zustand"
import audioTempoFinalizadoSom from '../../assets/sons/beep.mp3'

const audioTempoFinalizado = new Audio(audioTempoFinalizadoSom)

export const MODO_CRONOMETRO = {
    FOCO: {
        id: 'foco',
        nome: 'Foco',
        frase: ['Otimize sua produtividade,', 'mergulhe no que importa!'],
        tempoInicialEmSegundos: 30
    },
    DESCANSO_CURTO: {
        id: 'descanso-curto',
        nome: 'Descanso Curto',
        frase: ['Que tal dar uma respirada?', 'Faça uma pausa curta.'],
        tempoInicialEmSegundos: 5
    },
    DECANSO_LONGO: {
        id: 'descanso-longo',
        nome: 'Descanso Longo',
        frase: ['Hora de volta à superfície.', 'Faça uma pausa longa.'],
        tempoInicialEmSegundos: 15
    }
}

export const useCronometroStore = create((set) => ({
    modoCronometro: MODO_CRONOMETRO.FOCO,
    tempoEmSegundos: MODO_CRONOMETRO.FOCO.tempoInicialEmSegundos,

    setModoCronometro: (novoModo) => {
        set({
            modoCronometro: novoModo,
            tempoEmSegundos: novoModo.tempoInicialEmSegundos
        })
    },

    intervaloId: null,
    iniciarCronometro: () => {
        const novoId = setInterval(computarContagemRegressiva, 1000) //milissegundos
        set({
            intervaloId: novoId
        })
    },

    pausarCronometro: () => {
        set((state) => {
            clearInterval(state.intervaloId)
            return { intervaloId: null };
        })
    }
}))

export function computarContagemRegressiva () {
    const modoAtualTempo = useCronometroStore.getState().tempoEmSegundos;
    const pausarCronometro = useCronometroStore.getState().pausarCronometro;

    if (modoAtualTempo > 0 ) { 
        diminuirTempo()
    } else {
        pausarCronometro();
        audioTempoFinalizado.play();
        redefTempo();
    }
}

function diminuirTempo () {
    useCronometroStore.setState((state) => ({
        tempoEmSegundos: state.tempoEmSegundos - 1
    }))
}

function redefTempo () {
    useCronometroStore.setState((state) => ({
        tempoEmSegundos: state.modoCronometro.tempoInicialEmSegundos
    }))
}