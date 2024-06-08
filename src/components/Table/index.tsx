import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Pencil, Trash } from "lucide-react";
import { Key, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { deleteProduct } from "../../api/delete-product";
import { DataListProductsResponse, getInfosProducts } from "../../api/get-infos-products";
import { LoginProps, login } from "../../api/login";
import { env } from "../../env";
import { queryClient } from "../../lib/react-query";
import styles from "./table.module.scss";

export function Table() {
  const [openModal, setOpenModal] = useState({
    status: false,
    confirm: false,
    productId: null as number | null,
  });
  const { data: infosLogin } = useQuery<LoginProps | undefined>({
    queryFn: login,
    queryKey: ["login-token"],
    staleTime: Infinity,
  });
  const navigate = useNavigate();

  const {
    mutateAsync: infosProductsFn,
    isPending: isLoadingInfosProducts,
    data: infosTable,
  } = useMutation({
    mutationFn: getInfosProducts,
    gcTime: Infinity,
  });

  const { mutateAsync: deleteProductFn } = useMutation({
    mutationFn: deleteProduct,
    mutationKey: ["delete-product"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products-list"] });
      if ((env as unknown as string) === "test") getInfosProductsFunction();
    },
  });

  useEffect(() => {
    (async () => {
      if (infosLogin !== undefined) {
        await getInfosProductsFunction();
      }
    })();
  }, [infosLogin]);

  useEffect(() => {
    if (openModal.confirm && openModal.productId !== null) {
      deleteProducts(openModal.productId);
    }
  }, [openModal.confirm]);

  return (
    <>
      <span>Quantidade de produtos: {isLoadingInfosProducts ? 0 : infosTable?.data?.length ?? 0}</span>
      <div className={`${styles["table-container"]} ${styles[String(infosProductsFn === undefined)]}`}>
        <table className={`${styles.table} ${styles[String(isLoadingInfosProducts)]}`}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Status</th>
              <th>Quantidade no Estoque</th>
              <th>Ações</th>
            </tr>
          </thead>

          {isLoadingInfosProducts ? (
            <tbody>
              <tr>
                <td className={styles.loading}>
                  <div className={styles.bar}></div>
                </td>
                <td className={styles.loading}>
                  <div className={styles.bar}></div>
                </td>
                <td className={styles.loading}>
                  <div className={styles.bar}></div>
                </td>
                <td className={styles.loading}>
                  <div className={styles.bar}></div>
                </td>
                <td className={styles.loading}>
                  <div className={styles.bar}></div>
                </td>
                <td className={styles.loading}>
                  <div className={styles.bar}></div>
                </td>
              </tr>
            </tbody>
          ) : (
            <>
              {infosProductsFn === undefined ? (
                <div className={styles["container-empty"]}>
                  <img src="/undraw_no_data_re_kwbl.svg" alt="" />
                  <span>Sem dados para mostrar</span>
                </div>
              ) : (
                <tbody>
                  {infosTable?.data
                    .sort((data1: DataListProductsResponse, data2: DataListProductsResponse) => data1.id - data2.id)
                    .map((product: DataListProductsResponse, index: Key) => (
                      <tr key={index}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>
                          {product.status === 1 ? "Em estoque" : product.status === 2 ? "Em reposição" : "Em Falta"}
                        </td>
                        <td>{product.stock_quantity}</td>
                        <td className={styles["actions-td"]}>
                          <Pencil
                            size={18}
                            onClick={() => editProduct(product.id)}
                            data-testid={`pencil-${product.id}`}
                          />
                          <Trash
                            size={18}
                            onClick={() => openDeleteModal(product.id)}
                            data-testid={`trash-${product.id}`}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              )}
            </>
          )}
        </table>
      </div>

      {openModal.status && (
        <Dialog open={openModal.status} aria-labelledby="draggable-dialog-title">
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Você realmente quer deletar esse produto?
          </DialogTitle>
          <DialogActions>
            <Button autoFocus onClick={() => setOpenModal({ ...openModal, status: false })}>
              Cancelar
            </Button>
            <Button onClick={() => setOpenModal({ ...openModal, confirm: true, status: false })}>Confirmar</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );

  async function getInfosProductsFunction() {
    await infosProductsFn(infosLogin?.access_token as string);
  }

  async function deleteProducts(id: number) {
    try {
      await deleteProductFn({ id, token: infosLogin?.access_token ?? "" });
      toast.success("Produto deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar produto!");
    } finally {
      setOpenModal({ status: false, confirm: false, productId: null });
    }
  }

  function openDeleteModal(productId: number) {
    setOpenModal({ status: true, confirm: false, productId });
  }

  function editProduct(id: number) {
    queryClient.setQueryData(["products-list-cache"], infosTable?.data);
    navigate(`form?modal=true&edit=true&id=${id}`);
  }
}
