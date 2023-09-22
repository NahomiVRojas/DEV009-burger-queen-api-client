import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AllOrders from "./AllOrdersTable";
import { allOrders, deleteOrder } from "../../Services/Request";

jest.mock("../../Services/Request", () => ({
    allOrders: jest.fn(),
    deleteOrder: jest.fn().mockResolvedValue({ ok: true }),
}));

jest.spyOn(console, "error").mockImplementation(() => { });

const ordersMock = [
    {
        id: 1,
        table: "Table 1",
        client: "Client 1",
        products: [{ qty: 1, name: "Burger" }],
        dataEntry: "2023-09-21T10:00:00.000Z",
        status: "Pending",
        dateProcessed: "2023-09-21T11:00:00.000Z",
    },
];

beforeEach(() => {
    allOrders.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(ordersMock),
    });
    localStorage.setItem("token", "mockedToken");
    localStorage.setItem("role", "Admin");
});

describe("AllOrders", () => {

    beforeEach(() => {
        render(
            <MemoryRouter>
                <AllOrders />
            </MemoryRouter>
        );
    });

    it("should display orders table", async () => {
        await waitFor(() => {
            const orderCells = screen.getAllByTestId(/^table_cell_/);
            expect(orderCells.length).toBeGreaterThan(0);
        });
        const deleteButtons = screen.getAllByTestId("delete_button");
        expect(deleteButtons.length).toBeGreaterThan(0);
    });

    it("should delete an order when the delete button is clicked", async () => {

        await waitFor(() => {
            const orderCells = screen.getAllByTestId(/^table_cell_/);
            expect(orderCells.length).toBeGreaterThan(0);
        });

        const deleteButtons = screen.getAllByTestId("delete_button");
        expect(deleteButtons.length).toBeGreaterThan(0);
        fireEvent.click(deleteButtons[0]);

        const modal = screen.getByTestId("modal");
        expect(modal).toBeTruthy();

        const btnModal = screen.getByTestId("btn_modal");
        fireEvent.click(btnModal);

        deleteOrder.mockResolvedValue({ ok: true });

        await waitFor(() => {
            const orderCells = screen.queryAllByTestId(/^table_cell_/);
            expect(orderCells.length).toBe(0);
        });

        expect(deleteOrder).toHaveBeenCalledWith(1, "mockedToken");

    });

    it("should refresh orders when refresh icon is clicked", async () => {

        allOrders.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(ordersMock),
        });

        const refreshIcon = screen.getByTestId("refresh_icon");
        fireEvent.click(refreshIcon);

        await waitFor(() => {
            expect(allOrders).toHaveBeenCalled();
        });
    });

});