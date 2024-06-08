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
import { env } from "../env";
import { queryClient } from "../lib/react-query";
import styles from "./form.module.scss";

const schemaModal = z.object({
  name: z.string().min(3, "Nome deve ter até 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter até 10 caracteres"),
  price: z
    .string()
    .min(1, "Preço não pode ser 0 ou vazio")
    .transform((val) => parseInt(val)),
  stock_quantity: z
    .string()
    .min(1, "Quantidade é obrigatório")
    .transform((val) => parseInt(val)),
  status: z
    .string({
      message: "Status é obrigatório",
    })
    .nullish(),
});

type SchemaModalType = z.infer<typeof schemaModal>;

export function Form() {
  const [searchParams, setSearchParams] = useSearchParams();
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

  const { data: infosLogin } = useQuery({
    queryFn: login,
    queryKey: ["login-token"],
    staleTime: Infinity,
  });

  const { mutateAsync: infosProductsFn } = useMutation({
    mutationFn: getInfosProducts,
    gcTime: Infinity,
  });

  const { mutateAsync: registerProductFn } = useMutation({
    mutationFn: registerProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products-list"],
      });
      if (env.MODE === "test") getInfosProductsFunction();
    },
  });

  const { mutateAsync: editProductFn } = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products-list"],
      });
    },
  });

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
          {inputs.map((input, index: Key) => (
            <Input
              name={input.name}
              placeholder={input.placeholder}
              register={register}
              error={errors}
              type={input.type}
              title={input.title}
              key={index}
            />
          ))}

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

  async function submitRegisterProduct(e: SchemaModalType) {
    try {
      const { status, ...rest } = e;
      await registerProductFn({
        status: parseInt(status ?? "1"),
        token: infosLogin?.access_token,
        ...rest,
      });

      toast.success("Produto cadastrado com sucesso!");
    } catch (error) {
      toast.error("Erro ao cadastrar produto");
    }
  }

  async function submitEditProduct(e: SchemaModalType) {
    try {
      const { status, ...rest } = e;
      await editProductFn({
        id: parseInt(searchParams.get("id") as string),
        status: parseInt(status as string),
        token: infosLogin?.access_token as string,
        ...rest,
      });

      toast.success("Produto editado com sucesso!");
    } catch (error) {
      toast.error("Erro ao editar produto!");
    }
  }
}
