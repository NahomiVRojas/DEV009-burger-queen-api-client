import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { addProduct } from "../../Services/Request";
import AddProduct from "./AddProduct";

jest.mock("../../Services/Request", () => ({
  addProduct: jest.fn(),
}));

describe("AddProduct Component", () => {
  let idElement, nameElement, menuElement, priceElement, buttonElement;

  beforeEach(() => {
    render(
      <MemoryRouter>
        <AddProduct onClose={() => {}} token="token123" onAdd={() => {}} />
      </MemoryRouter>
    );

    idElement = screen.getByTestId("id_product");
    nameElement = screen.getByTestId("name_product");
    menuElement = screen.getByTestId("menu_product");
    priceElement = screen.getByTestId("price_product");
    buttonElement = screen.getByTestId("btn_modal");
  });

  it("should add a new product", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        id: "product123",
        name: "New Product",
        type: "Breakfast",
        price: "9.99",
      }),
    };

    addProduct.mockResolvedValueOnce(mockResponse);

    fireEvent.change(idElement, { target: { value: "product123" } });
    fireEvent.change(nameElement, { target: { value: "New Product" } });
    fireEvent.change(menuElement, { target: { value: "Breakfast" } });
    fireEvent.change(priceElement, { target: { value: "9.99" } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(addProduct).toHaveBeenCalledWith(
        {
          id: "product123",
          name: "New Product",
          price: "9.99",
          type: "Breakfast",
        },
        "token123"
      );
    });
  });

  it("should handle error when adding a product with duplicate ID", async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      json: jest.fn().mockResolvedValue({ error: "ID already in use" }),
    };

    addProduct.mockResolvedValueOnce(mockResponse);

    fireEvent.change(idElement, { target: { value: "product123" } });
    fireEvent.change(nameElement, { target: { value: "New Product" } });
    fireEvent.change(menuElement, { target: { value: "Breakfast" } });
    fireEvent.change(priceElement, { target: { value: "9.99" } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      const errorElement = screen.getByTestId("error_message");
      expect(errorElement.textContent).toBe("ID already in use");
    });
  });
});
