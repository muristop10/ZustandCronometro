import styles from "./styles.module.css";
import play_arrowImg from "/src/assets/imgs/play_arrow.png";
import pauseImg from "/src/assets/imgs/pause.png";
import audioPlaySom from "/src/assets/sons/play.wav";
import audioPauseSom from "/src/assets/sons/pause.mp3";
import { useCronometroStore } from "../../Store";


export default function BotaoCronometro() {
  const audioPlay = new Audio(audioPlaySom);
  const audioPause = new Audio(audioPauseSom);

  const intervaloId = useCronometroStore((state) => state.intervaloId);
  const iniciarCronometro = useCronometroStore((state) => state.iniciarCronometro);
  const pausarCronometro = useCronometroStore((state) => state.pausarCronometro);

  function cronometroAtivo() {
    if (intervaloId) {
      audioPause.play();
      pausarCronometro();
    } else {
      console.log(intervaloId)
      audioPlay.play();
      iniciarCronometro();
    }
  } 

  const textoIniciarOuPausar = intervaloId ? "Pausar" : "Começar";
  const iconIniciarOuPausar = intervaloId ? pauseImg : play_arrowImg;

  return (
    <div className={styles["cronometer__primary-button-wrapper"]}>
      <button className={styles["cronometer__primary-button"]}
      onClick={cronometroAtivo}>
        <img className={styles["cronometer__primary-button-icon"]} src={iconIniciarOuPausar} alt="" />
        <span>{textoIniciarOuPausar}</span>
      </button>
    </div>
  );
}
