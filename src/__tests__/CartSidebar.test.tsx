import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartSidebar from "../../components/CartSidebar";
import { CartProvider } from "../../state/cart-context";
import { ToastProvider } from "../../state/toast-context";
import type { CartState } from "../../types/types";

// Czyścimy persist między testami (CartProvider używa localStorage)
beforeEach(() => {
  try {
    localStorage.clear();
  } catch { /* empty */ }
});

// Start: jedna pozycja w koszyku
const initialState: CartState = {
  items: {
    "p-1": {
      product: {
        id: "p-1",
        name: "Mysz Testowa",
        description: "Opis",
        price: 19900,
        imageUrl: "https://picsum.photos/seed/mouse/600/400",
        rating: 4.5,
        tags: ["peripherals"],
      },
      quantity: 1,
    },
  },
};

function renderWithProviders(ui: React.ReactElement, state = initialState) {
  return render(
    <CartProvider initialState={state}>
      <ToastProvider>{ui}</ToastProvider>
    </CartProvider>
  );
}

describe("CartSidebar", () => {
  it("renderuje listę koszyka i sekcję sumy", () => {
    renderWithProviders(<CartSidebar />);

    expect(screen.getByRole("heading", { name: /koszyk/i })).toBeInTheDocument();

    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(1);

    expect(screen.getByText(/Suma/i)).toBeInTheDocument();
  });

  it("minus disabled przy ilości 1, plus zwiększa ilość", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CartSidebar />);

    const list = screen.getByRole("list");
    const [item] = within(list).getAllByRole("listitem");

    const minus = within(item).getByRole("button", { name: /zmniejsz ilość/i });
    const plus = within(item).getByRole("button", { name: /zwiększ ilość/i });

    expect(minus).toBeDisabled(); // start = 1
    await user.click(plus);        // -> 2
    expect(minus).not.toBeDisabled();
  });

  it("input normalizuje po blur (pusty -> 1)", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CartSidebar />);

    const list = screen.getByRole("list");
    const [item] = within(list).getAllByRole("listitem");

    // INPUT po roli 'textbox' i nazwie
    const qtyInput = within(item).getByRole("textbox", { name: /ilość/i }) as HTMLInputElement;

    // wyczyść (fokusuje i czyści)
    await user.clear(qtyInput);
    expect(qtyInput.value).toBe(""); // lokalny draft może być pusty

    // zrób "user blur" – przejście Tabem
    await user.tab(); // przenosi fokus dalej -> wywoła onBlur

    // poczekaj aż state się zaktualizuje
    await waitFor(() => {
      expect((within(item).getByRole("textbox", { name: /ilość/i }) as HTMLInputElement).value).toBe("1");
    });
  });

  it("usuwa pozycję przy kliknięciu 'Usuń'", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CartSidebar />);

    const removeBtn = screen.getByRole("button", { name: /usuń .* z koszyka/i });
    await user.click(removeBtn);

    expect(screen.getByText(/Koszyk jest pusty/i)).toBeInTheDocument();
    expect(screen.queryByRole("list")).toBeNull();
  });

  it("czyści koszyk przy 'Wyczyść'", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CartSidebar />);

    const clearBtn = screen.getByRole("button", { name: /wyczyść koszyk/i });
    await user.click(clearBtn);

    expect(screen.getByText(/Koszyk jest pusty/i)).toBeInTheDocument();
    expect(screen.queryByRole("list")).toBeNull();
  });
});
