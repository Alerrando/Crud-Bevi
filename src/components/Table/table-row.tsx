import { Pencil, Trash } from "lucide-react";
import { DataListProductsResponse } from "../../api/get-infos-products";
import styles from "./table-row.module.scss";

type TableRowProps = {
  product: DataListProductsResponse;
  editProduct: (id: number) => void;
  openDeleteModal: (id: number) => void;
};

export function TableRow({ product, editProduct, openDeleteModal }: TableRowProps) {
  return (
    <tr className={styles.tr}>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>{product.status === 1 ? "Em estoque" : product.status === 2 ? "Em reposição" : "Em Falta"}</td>
      <td>{product.stock_quantity}</td>
      <td className={styles["actions-td"]}>
        <Pencil
          size={18}
          onClick={() => editProduct(product.id)}
          data-testid={`pencil-${product.id}`}
          aria-label={`Editar produto ${product.name}`}
        />
        <Trash
          size={18}
          onClick={() => openDeleteModal(product.id)}
          data-testid={`trash-${product.id}`}
          aria-label={`Deletar produto ${product.name}`}
        />
      </td>
    </tr>
  );
}
