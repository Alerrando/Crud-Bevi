import { useMutation, useQuery } from "@tanstack/react-query";
import { Key, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { deleteProduct } from "../../api/delete-product";
import { DataListProductsResponse, getInfosProducts } from "../../api/get-infos-products";
import { LoginProps, login } from "../../api/login";
import { queryClient } from "../../util/react-query";
import { ConfirmDialog } from "../ConfirmDialog";
import { SkeletonTable } from "./skeleton-table";
import { TableRow } from "./table-row";
import styles from "./table.module.scss";

export type ModalType = {
  status: boolean;
  confirm: boolean;
  productId: number | null;
};

export function Table() {
  const [openModal, setOpenModal] = useState<ModalType>({} as ModalType);
  const [searchParams] = useSearchParams(); // Captura os parâmetros da URL
  const searchName = searchParams.get("search") ?? "";

  /* useQuery da função de fazer login */
  const { data: infosLogin } = useQuery<LoginProps | undefined>({
    queryFn: login,
    queryKey: ["login-token"],
    staleTime: Infinity,
  });
  const navigate = useNavigate();

  /* useMutation da função de buscar produtos */
  const {
    mutateAsync: infosProductsFn,
    isPending: isLoadingInfosProducts,
    data: infosTable,
  } = useMutation({
    mutationFn: getInfosProducts,
    gcTime: Infinity,
  });

  /* useMutation da função de deletar produto */
  const { mutateAsync: deleteProductFn } = useMutation({
    mutationFn: deleteProduct,
    mutationKey: ["delete-product"],
    onSuccess: () => {
      toast.success("Produto deletado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["login-token"] });
      getInfosProductsFunction();
    },
  });

  useEffect(() => {
    (async () => {
      await callBackInfosProducts();
    })();
  }, [infosLogin]); // Atualiza os produtos quando o usuário faz login

  useEffect(() => {
    handleModal();
  }, [openModal.confirm]); // Lida com a ação de confirmação de exclusão de produto

  return (
    <>
      {/* Exibe a quantidade de produtos */}
      <span>Quantidade de produtos: {isLoadingInfosProducts ? true : infosTable?.data?.length ?? 0}</span>
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

          {/* Exibe uma tabela ou um esqueleto de tabela durante o carregamento */}
          {isLoadingInfosProducts || (infosTable && infosTable?.data?.length === 0) ? (
            <SkeletonTable />
          ) : (
            <>
              <tbody>
                {/* Mapeia os produtos para exibição na tabela */}
                {infosTable?.data
                  ?.sort((data1: DataListProductsResponse, data2: DataListProductsResponse) => data1.id - data2.id)
                  .filter((product: DataListProductsResponse) =>
                    product.name.toLowerCase().includes(searchName.toLowerCase().trim()),
                  )
                  .map((product: DataListProductsResponse, index: Key) => (
                    <TableRow
                      product={product}
                      editProduct={editProduct}
                      openDeleteModal={openDeleteModal}
                      key={index}
                    />
                  ))}
              </tbody>
            </>
          )}
        </table>
      </div>

      {/* Exibe o modal de confirmação de exclusão */}
      {openModal.status && <ConfirmDialog openModal={openModal} setOpenModal={setOpenModal} />}
    </>
  );

  async function callBackInfosProducts() {
    if (infosLogin?.access_token !== undefined) await infosProductsFn(infosLogin?.access_token as string);
  }

  function handleModal() {
    if (openModal.confirm && openModal.productId !== null) {
      deleteProducts(openModal.productId);
      setOpenModal({ status: false, confirm: false, productId: null });
    }
  }

  // Função de atualizar a lista de produtos
  async function getInfosProductsFunction() {
    await infosProductsFn(infosLogin?.access_token as string);
  }

  // Função de deletar um produto
  async function deleteProducts(id: number) {
    try {
      await deleteProductFn({ id, token: infosLogin?.access_token ?? "" });
    } catch (error) {
      toast.error("Erro ao deletar produto!");
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
