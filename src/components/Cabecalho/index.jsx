import styles from "./styles.module.css";
import logoImg from "/src/assets/imgs/logo.png";
import foco from "../../assets/imgs/foco.png";
import descansoCurto from '../../assets/imgs/descanso-curto.png';
import descansoLongo from '../../assets/imgs/descanso-longo.png'
import { useCronometroStore } from "../Store";

export default function Cabecalho() {
  const modoCronometro = useCronometroStore((state) => state.modoCronometro)

  function renderImg () {
    if (modoCronometro.id === 'foco') {
      return foco
    } else if (modoCronometro.id === 'descanso-longo') {
      return descansoLongo
    } else {
      return descansoCurto
    }
  }
  const [primeiroTexto, segundoTexto] = modoCronometro.frase;

  return (
    <header className="header">
      <figure className={styles["header__logo-figure"]}>
        <img src={logoImg} alt="Logotipo do Fokus" />
      </figure>

      <section className={styles["header__section-banner-container"]}>
        <h1 className={styles["header__title"]}>
          {primeiroTexto} <strong className={styles["header__title-strong"]}>{segundoTexto}</strong>
        </h1>

        <figure className={styles["header__image-figure"]}>
          <img className={styles["header__image"]} src={renderImg()} alt="" />
        </figure>
      </section>
    </header>
  );
}
