import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { auth } from "../../Services/Request";
import LoginForm from "./LoginForm";

jest.mock("../../Services/Request", () => ({
  auth: jest.fn(),
}));

describe("LoginForm", () => {
  let emailElement, passwordElement, buttonElement;

  beforeEach(() => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    emailElement = screen.getByTestId("email_login");
    passwordElement = screen.getByTestId("password_login");
    buttonElement = screen.getByTestId("submit_login");
  });

  it("should handle user authentication", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        accessToken: "token123",
        user: { role: "admin", name: "Admin" },
      }),
    };

    auth.mockResolvedValueOnce(mockResponse);

    fireEvent.change(emailElement, { target: { value: "admin@bq.com" } });
    fireEvent.change(passwordElement, { target: { value: "123456" } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(auth).toHaveBeenCalledWith("admin@bq.com", "123456");
    });
  });

  it("should handle user authentication with incorrect credentials", async () => {
    const mockResponseBad = {
      ok: false,
      json: jest.fn().mockResolvedValue({ error: "Invalid credentials." }),
    };

    auth.mockResolvedValueOnce(mockResponseBad);

    fireEvent.change(emailElement, { target: { value: "admin@bq.com" } });
    fireEvent.change(passwordElement, { target: { value: "126" } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(auth).toHaveBeenCalledWith("admin@bq.com", "126");
      const errorElement = screen.getByTestId("error_login");
      expect(errorElement.textContent).toBe("Invalid credentials.");
    });
  });

  it("should handle user authentication for a waiter", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        accessToken: "token123",
        user: { role: "Waiter/Waitress", name: "WaiterName" },
      }),
    };

    auth.mockResolvedValueOnce(mockResponse);

    fireEvent.change(emailElement, { target: { value: "waiter@example.com" } });
    fireEvent.change(passwordElement, { target: { value: "password123" } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(auth).toHaveBeenCalledWith("waiter@example.com", "password123");
    });
  });

  it("should handle user authentication for a chef", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        accessToken: "token456",
        user: { role: "Chef", name: "ChefName" },
      }),
    };

    auth.mockResolvedValueOnce(mockResponse);

    fireEvent.change(emailElement, { target: { value: "chef@example.com" } });
    fireEvent.change(passwordElement, { target: { value: "password456" } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(auth).toHaveBeenCalledWith("chef@example.com", "password456");
    });
  });
});
