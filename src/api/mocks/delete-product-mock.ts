import { HttpResponse, http } from "msw";
import { productsData } from ".";
import { DeleteProductProps } from "../delete-product";

export const deleteProductMock = http.delete<never, DeleteProductProps>(
  "http://34.71.240.100/api/product/delete",
  async ({ request }) => {
    const date = await request.json();
    const token = request.headers.get("Authorization")?.replace("Bearer", "");

    if (token?.trim() === "fake_access_token") {
      productsData.splice(date.id, 1);

      return HttpResponse.json({
        success: true,
        code: 200,
        message: "Produto deletado com sucesso.",
        data: {
          name: "Produto 4",
          description: "Descrição Produto 4",
          price: 50,
          status: 1,
          stock_quantity: 50,
          updated_at: "2024-04-10T14:46:24.000000Z",
          created_at: "2024-04-10T14:46:24.000000Z",
          id: 1,
        },
      });
    }

    return new HttpResponse(
      `{
        "success": false,
        "code": 422,
        "message": "Não foi possível deletar produto."
       }`,
      { status: 422 },
    );
  },
);
