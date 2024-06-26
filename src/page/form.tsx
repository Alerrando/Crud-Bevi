import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronsLeft, Package } from "lucide-react";
import React, { Key } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { editProduct } from "../api/edit-product";
import { DataListProductsResponse, getInfosProducts } from "../api/get-infos-products";
import { login } from "../api/login";
import { registerProduct } from "../api/register-product";
import { Input } from "../components/Input";
import { queryClient } from "../util/react-query";
import styles from "./form.module.scss";

// Definindo o schema Zod para validação de dados do formulário
const schemaModal = z.object({
  name: z.string().min(3, "Nome deve ter até 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter até 10 caracteres"),
  price: z
    .string({ invalid_type_error: "Preço não pode ser 0 ou vazio" })
    .min(1, "Preço não pode ser 0 ou vazio")
    .transform((val) => parseInt(val)),
  stock_quantity: z
    .string({ invalid_type_error: "Quantidade não pode ser 0 ou vazio" })
    .min(1, "Quantidade não pode ser 0 ou vazio")
    .transform((val) => parseInt(val)),
  status: z.string().nullish(),
});

type SchemaModalType = z.infer<typeof schemaModal>;

export function Form() {
  const [searchParams, setSearchParams] = useSearchParams(); // Pega os parâmetros da URL
  const cacheData: DataListProductsResponse[] | undefined = queryClient.getQueryData(["products-list-cache"]);
  const edit: DataListProductsResponse | undefined = cacheData?.filter(
    (data: DataListProductsResponse) => data.id === parseFloat(searchParams.get("id") ?? "-1"),
  )[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SchemaModalType>({
    resolver: zodResolver(schemaModal),
    defaultValues: {
      name: edit?.name ?? "",
      description: edit?.description ?? "",
      price: parseInt(String(edit?.price ?? 0)),
      stock_quantity: parseInt(String(edit?.stock_quantity ?? 0)),
      status: String(edit?.status ?? "1"),
    },
  });
  const navigate = useNavigate();

  /* useQuery da função de buscar o token */
  const { data: infosLogin } = useQuery({
    queryFn: login,
    queryKey: ["login-token"],
    staleTime: Infinity,
  });

  /* useMutation da função de buscar produtos */
  const { mutateAsync: infosProductsFn } = useMutation({
    mutationFn: getInfosProducts,
    gcTime: Infinity,
  });

  /* useMutation da função de registrar produto */
  const { mutateAsync: registerProductFn } = useMutation({
    mutationFn: registerProduct,
    onSuccess: () => {
      toast.success("Produto cadastrado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["products-list"] });
      getInfosProductsFunction();
    },
  });

  /* useMutation da função de editar produto */
  const { mutateAsync: editProductFn } = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      toast.success("Produto editado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["products-list"] });
    },
  });

  // Configurando o useForm para controlar o formulário
  const inputs: React.ComponentProps<"input">[] = [
    {
      name: "name",
      placeholder: "Digite o nome do Produto",
      type: "text",
      title: "Nome do Produto",
    },
    {
      name: "description",
      placeholder: "Digite a descrição do Produto",
      type: "text",
      title: "Descrição do Produto",
    },
    {
      name: "price",
      placeholder: "Digite o preço do Produto",
      type: "number",
      title: "Preço do Produto",
    },
    {
      name: "stock_quantity",
      placeholder: "Digite a quantidade do produto que tem no estoque",
      type: "number",
      title: "Quantidade do Produto",
    },
  ];

  return (
    <div className={styles["form-container"]}>
      <div className={styles.form}>
        <header className={styles["header-form"]}>
          <div className={styles["header-form-title"]}>
            <Package size={22} />
            <h2>Cadastro de Produtos</h2>
          </div>

          <ChevronsLeft className={styles.return} size={24} onClick={() => handleModalClick()} />

          <span>Cadastre um novo produto para a sua loja!</span>
        </header>

        <form onSubmit={handleSubmit(submit)}>
          {/* Renderização dos inputs do formulário */}
          {inputs.map((input, index: Key) => (
            <Input
              name={input.name}
              placeholder={input.placeholder}
              register={register}
              error={errors}
              type={input.type}
              title={input.title}
              select={false}
              key={index}
            />
          ))}

          {/* Renderizando o input de status, apenas se estiver editando */}
          {edit && Object.keys(edit).length > 0 && (
            <Input
              register={register}
              error={errors}
              name="status"
              title="Status"
              handleChangeStatus={handleChangeStatus}
              select={true}
            />
          )}

          <button type="submit">{searchParams.get("edit") === "true" ? "Editar" : "Cadastrar"}</button>
        </form>
      </div>

      <img src="/aside-img-form.png" alt="" />
    </div>
  );

  function handleModalClick() {
    setSearchParams({});
    navigate("/");
  }

  function handleChangeStatus(e: React.ChangeEvent<HTMLSelectElement>) {
    setValue("status", e.target.value);
  }

  async function getInfosProductsFunction() {
    await infosProductsFn(infosLogin?.access_token as string);
  }

  async function submit(e: SchemaModalType) {
    if (searchParams.get("edit") === "true") {
      await submitEditProduct(e);
    } else {
      await submitRegisterProduct(e);
    }

    setSearchParams({});
    navigate("/");
  }

  // Função de registro de um novo produto
  async function submitRegisterProduct(e: SchemaModalType) {
    try {
      const { status, stock_quantity: stockQuantity, ...rest } = e;
      await registerProductFn({
        status: parseInt(status ?? "1"),
        token: infosLogin?.access_token,
        stockQuantity,
        ...rest,
      });
    } catch (error) {
      toast.error("Erro ao cadastrar produto!");
    }
  }

  // Função de edição de um produto
  async function submitEditProduct(e: SchemaModalType) {
    try {
      const { status, stock_quantity: stockQuantity, ...rest } = e;
      await editProductFn({
        id: parseInt(searchParams.get("id") as string),
        status: parseInt(status as string),
        token: infosLogin?.access_token as string,
        stockQuantity,
        ...rest,
      });
    } catch (error) {
      toast.error("Erro ao editar produto!");
    }
  }
}
