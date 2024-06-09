import { Plus, Search } from "lucide-react";

import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styles from "./header.module.scss";

export function Header() {
  const [search, setSearch] = useState<string>("");
  // eslint-disable-next-line no-unused-vars
  const [_, setSearchParams] = useSearchParams();

  return (
    <header className={styles["header-container"]}>
      <h1>Cadastro de Produtos</h1>

      <div className={styles.wrap}>
        <div className={styles.search}>
          <input name="search" type="text" placeholder="Nome do produto" onChange={(e) => setSearch(e.target.value)} />
          <button
            type="submit"
            className={styles.searchButton}
            onClick={() => handleSearchProductFilter()}
            data-testid="button-search"
          >
            <Search size={16} />
          </button>
        </div>
      </div>

      <Link to="/form?modal=true">
        <Plus size={16} />
        <span>Adicionar</span>
      </Link>
    </header>
  );

  function handleSearchProductFilter() {
    setSearchParams({ search });
  }
}
