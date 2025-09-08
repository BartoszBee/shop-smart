import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "../../components/ProductCard";
import { ToastProvider } from "../../state/toast-context"; // <--- dodaj import
import type { Product } from "../../types/types";

const product: Product = {
  id: "p-xyz",
  name: "Słuchawki Test",
  description: "Opis testowy",
  price: 25999,
  imageUrl: "https://picsum.photos/seed/test/600/400",
  tags: ["audio"],
  rating: 4.2,
};

// helper
function renderWithToast(ui: React.ReactElement) {
  return render(<ToastProvider>{ui}</ToastProvider>);
}

describe("ProductCard", () => {
  it("renderuje nazwę, opis i przycisk Dodaj", () => {
    renderWithToast(<ProductCard product={product} onAddToCart={() => {}} />);
    expect(screen.getByText(/Słuchawki Test/i)).toBeInTheDocument();
    expect(screen.getByText(/Opis testowy/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /dodaj/i })).toBeInTheDocument();
  });

  it("wywołuje onAddToCart z produktem po kliknięciu", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    renderWithToast(<ProductCard product={product} onAddToCart={onAdd} />);
    await user.click(screen.getByRole("button", { name: /dodaj/i }));

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith(product);
  });
});
