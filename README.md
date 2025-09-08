# 🛒 ShopSmart

**ShopSmart** to przykładowa aplikacja e-commerce zbudowana w React + TypeScript + Tailwind.  
Projekt powstał jako część portfolio — pokazuje pełny przekrój umiejętności front-endowych: od zarządzania stanem, przez dostępność (a11y), po optymalizacje i testy.

---

## 🚀 Technologie

- [React 18](https://react.dev/) – komponenty i hooki
- [TypeScript](https://www.typescriptlang.org/) – typowanie
- [Vite](https://vitejs.dev/) – szybki bundler
- [Tailwind CSS v4](https://tailwindcss.com/) – stylowanie
- [lucide-react](https://lucide.dev/) – ikony
- Context + Reducer – globalny stan koszyka
- localStorage – persist stanu
- Vitest + React Testing Library – testy (planowane)

---

## ✨ Funkcjonalności

- ✅ Lista produktów (mock danych, obrazki, cena, ocena, tagi)
- ✅ Dodawanie do koszyka
- ✅ Panel koszyka (zmiana ilości, usuwanie, czyszczenie, suma)
- ✅ Licznik pozycji w nagłówku
- ✅ Persist koszyka w `localStorage`
- ✅ Filtrowanie, sortowanie i wyszukiwarka
- ✅ Responsywny layout (grid)
- ✅ Dostępność (a11y): aria-label, aria-live
- ✅ Mikro-optymalizacje: `useCallback`, `React.memo`
- ✅ Toasty / komunikaty UX
- ✅ Testy jednostkowe i komponentowe

---


## 🛠 Jak uruchomić lokalnie

1. Sklonuj repo:
   ```bash
   git clone https://github.com/BartoszBee/shop-smart.git
   cd shop-smart
   npm install

🌐 Live demo

👉 https://shop-smart-chi.vercel.app/