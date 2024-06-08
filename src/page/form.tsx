import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronsLeft, Package } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { editProduct } from "../api/edit-product";
import { DataListProductsResponse, getInfosProducts } from "../api/get-infos-products";
import { login } from "../api/login";
import { registerProduct } from "../api/register-product";
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
          <div className={styles["form-input"]}>
            <label htmlFor="">Nome</label>
            <input type="text" {...register("name")} />
            {errors.name && <span className={styles["error-input"]}>{errors.name?.message}</span>}
          </div>

          <div className={styles["form-input"]}>
            <label htmlFor="">Descrição</label>
            <input type="text" {...register("description")} />
            {errors.description && <span className={styles["error-input"]}>{errors.description?.message}</span>}
          </div>

          <div className={styles["form-input"]}>
            <label htmlFor="">Preço</label>
            <input type="number" {...register("price")} />
            {errors.price && <span className={styles["error-input"]}>{errors.price?.message}</span>}
          </div>

          <div className={styles["form-input"]}>
            <label htmlFor="">Quantidade</label>
            <input type="number" {...register("stock_quantity")} />
            {errors.stock_quantity && <span className={styles["error-input"]}>{errors.stock_quantity?.message}</span>}
          </div>

          {edit && Object.keys(edit).length > 0 && (
            <div className={styles["form-input"]}>
              <label htmlFor="">Status</label>
              <select {...register("status")} onChange={(e) => handleChangeStatus(e)}>
                <option value={1}>Em Estoque</option>
                <option value={2}>Em Reposição</option>
                <option value={3}>Em Falta</option>
              </select>

              {errors.status && <span className={styles["error-input"]}>{errors.status?.message}</span>}
            </div>
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
      await registerProductFn({
        name: e.name,
        description: e.description,
        price: e.price,
        stockQuantity: e.stock_quantity,
        status: parseInt(e.status ?? "1"),
        token: infosLogin?.access_token,
      });

      toast.success("Produto cadastrado com sucesso!");
    } catch (error) {
      toast.error("Erro ao cadastrar produto");
    }
  }

  async function submitEditProduct(e: SchemaModalType) {
    try {
      await editProductFn({
        id: parseInt(searchParams.get("id") as string),
        name: e.name,
        description: e.description,
        price: e.price,
        stockQuantity: e.stock_quantity,
        status: parseInt(e.status as string),
        token: infosLogin?.access_token as string,
      });

      toast.success("Produto editado com sucesso!");
    } catch (error) {
      toast.error("Erro ao editar produto!");
    }
  }
}
