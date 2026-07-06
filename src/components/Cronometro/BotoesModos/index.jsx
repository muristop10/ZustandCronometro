import styles from "./styles.module.css";

import BotaoModo from "./BotaoModo";
import { MODO_CRONOMETRO } from "../../Store";

export default function BotoesModos() {
  const modos = [
    MODO_CRONOMETRO.FOCO,
    MODO_CRONOMETRO.DECANSO_LONGO,
    MODO_CRONOMETRO.DESCANSO_CURTO,
  ];

  return (
    <ul className={styles["cronometer-modes"]}>
      {modos.map((modo) => {
        return (
          <li key={modo.id}>
            <BotaoModo modoBotao={modo}>{modo.nome}</BotaoModo>
          </li>
        );
      })}
    </ul>
  );
}
