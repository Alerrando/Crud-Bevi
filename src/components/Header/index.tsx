import { Plus } from "lucide-react";

import { Link } from "react-router-dom";
import styles from "./header.module.scss";

export function Header() {
  return (
    <header className={styles["header-container"]}>
      <h1>Cadastro de Produtos</h1>

      <Link to="/form?modal=true">
        <Plus size={16} />
        Adicionar
      </Link>
    </header>
  );
}
