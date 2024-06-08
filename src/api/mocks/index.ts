import { setupWorker } from "msw/browser";
import { env } from "../../env";
import { ProductReturn } from "../register-product";
import { deleteProductMock } from "./delete-product-mock";
import { editProductMock } from "./edit-product-mock";
import { getInfosProductsMock } from "./get-infos-products-mock";
import { loginMock } from "./login-mock";
import { registerProductMock } from "./register-product-mock";

export const productsData: ProductReturn[] = [
  {
    id: 0,
    name: "Produto1",
    description: "Descrição do produto 1",
    price: 10,
    status: 1,
    stock_quantity: 20,
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
  {
    id: 1,
    name: "Produto2",
    description: "Descrição do produto 2",
    price: 10,
    status: 1,
    stock_quantity: 20,
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
  {
    id: 2,
    name: "Produto3",
    description: "Descrição do produto 3",
    price: 10,
    status: 1,
    stock_quantity: 20,
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
  {
    id: 3,
    name: "Produto4",
    description: "Descrição do produto 4",
    price: 10,
    status: 1,
    stock_quantity: 20,
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
];

export async function enableMSW() {
  if (env.MODE !== "test") {
    return;
  }

  const worker = setupWorker(loginMock, getInfosProductsMock, registerProductMock, deleteProductMock, editProductMock);
  await worker.use();
}
