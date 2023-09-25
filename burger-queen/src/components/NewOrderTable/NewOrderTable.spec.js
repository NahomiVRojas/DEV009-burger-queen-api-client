import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { products, postOrder } from "../../Services/Request";
import NewOrderTable from "./NewOrderTable";

jest.mock("../../Services/Request", () => ({
  products: jest.fn(),
  postOrder: jest.fn(),
}));
jest.spyOn(console, "error").mockImplementation(() => {});

const handleAddOrder = jest.fn();
const handleAddToSelectedItems = jest.fn();
const handleRemoveSelectedItems = jest.fn();
const handleShowAlert = jest.fn();

const productsMock = [
  {
    id: 1,
    name: "Sandwich",
    price: 10,
    type: "Breakfast",
  },
];

beforeEach(() => {
  products.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(productsMock),
  });
  localStorage.setItem("token", "mockedToken");
  localStorage.setItem("role", "Waiter/Waitress");
});

describe("NewOrderTable component", () => {
  let client,
    table,
    menu,
    btnMenu,
    order,
    alert,
    btnAddMoreItem,
    btnRemoveItem,
    btnAddOrder;
  beforeEach(() => {
    render(
      <MemoryRouter>
        <NewOrderTable
          handleAddToSelectedItems={handleAddToSelectedItems()}
          handleRemoveSelectedItems={handleRemoveSelectedItems()}
          handleAddOrder={handleAddOrder()}
          handleShowAlert={handleShowAlert()}
        />
      </MemoryRouter>
    );
    client = screen.getByTestId("client_order");
    table = screen.getByTestId("table_order");
    btnMenu = screen.getByTestId("btn_breakfast");
  });

  it("should render the NewOrderTable component and have the menu available", async () => {
    fireEvent.click(btnMenu);
    await waitFor(() => {
      menu = screen.getAllByTestId(/^menu_/);
      expect(menu.length).toBeGreaterThan(0);
    });
  });

  it("It should render the item in the order when it is selected from the menu and be able to increase its quantity", async () => {
    fireEvent.click(btnMenu);

    await waitFor(() => {
      menu = screen.getAllByTestId(/^menu_/);
      expect(menu.length).toBeGreaterThan(0);
    });

    fireEvent.click(menu[0]);
    await waitFor(() => {
      order = screen.queryAllByTestId(/^order_/);
      expect(order.length).toBeGreaterThan(0);
      btnAddMoreItem = screen.getAllByTestId(/^add_item_/);
    });

    fireEvent.click(btnAddMoreItem[0]);
    expect(handleAddToSelectedItems).toHaveBeenCalled();
  });

  it("It should render the item in the order when it is selected from the menu and be able to increase its quantity", async () => {
    fireEvent.click(btnMenu);

    await waitFor(() => {
      menu = screen.getAllByTestId(/^menu_/);
      expect(menu.length).toBeGreaterThan(0);
    });

    fireEvent.click(menu[0]);
    await waitFor(() => {
      order = screen.queryAllByTestId(/^order_/);
      expect(order.length).toBeGreaterThan(0);
      btnRemoveItem = screen.getAllByTestId(/^remove_item_/);
    });

    fireEvent.click(btnRemoveItem[0]);
    expect(handleRemoveSelectedItems).toHaveBeenCalled();
  });

  it("Should add a new order", async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({
        table: "2",
        client: "Camila",
        products: productsMock[0],
        status: "Pending",
      }),
    };

    postOrder.mockResolvedValueOnce(mockResponse);

    fireEvent.change(client, { target: { value: "Camila" } });
    fireEvent.change(table, { target: { value: "2" } });

    await waitFor(() => {
      menu = screen.getAllByTestId(/^menu_/);
      expect(menu.length).toBeGreaterThan(0);
    });

    fireEvent.click(menu[0]);
    await waitFor(() => {
      order = screen.queryAllByTestId(/^order_/);
      expect(order.length).toBeGreaterThan(0);
      btnAddOrder = screen.getByTestId("send_order");
    });
    fireEvent.click(btnAddOrder);

    expect(postOrder).toHaveBeenCalledWith(
      expect.objectContaining({
        table: expect.anything(),
        client: "Camila",
        products: expect.anything(),
        status: expect.anything(),
        dataEntry: expect.anything(),
      }),
      expect.anything()
    );
    alert = screen.getByTestId("alert");
    expect(handleShowAlert).toHaveBeenCalled();
    expect(alert.textContent).toBe("Order successfully sent.Close");
  });

  it("Should throw an error if the Table input is empty", async () => {
    await waitFor(() => {
      menu = screen.getAllByTestId(/^menu_/);
      expect(menu.length).toBeGreaterThan(0);
    });

    fireEvent.click(menu[0]);
    await waitFor(() => {
      order = screen.queryAllByTestId(/^order_/);
      expect(order.length).toBeGreaterThan(0);
      btnAddOrder = screen.getByTestId("send_order");
    });

    fireEvent.click(btnAddOrder);
    alert = screen.getByTestId("alert");
    expect(handleShowAlert).toHaveBeenCalled();
    expect(alert.textContent).toBe(
      "Please, select a table or the Take Away (TA) option.Try again"
    );
  });

  it("Should throw an error if the Client input is empty", async () => {
    await waitFor(() => {
      menu = screen.getAllByTestId(/^menu_/);
      expect(menu.length).toBeGreaterThan(0);
    });

    fireEvent.click(menu[0]);
    await waitFor(() => {
      order = screen.queryAllByTestId(/^order_/);
      expect(order.length).toBeGreaterThan(0);
      btnAddOrder = screen.getByTestId("send_order");
    });

    fireEvent.change(table, { target: { value: "2" } });

    fireEvent.click(btnAddOrder);
    alert = screen.getByTestId("alert");
    expect(handleShowAlert).toHaveBeenCalled();
    expect(alert.textContent).toBe("Please, enter the client's name.Try again");
  });
});
