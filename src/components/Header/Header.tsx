import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <h1 className={styles.title}>ShopSmart</h1>
        <p className={styles.subtitle}>Mini e‑commerce • React + TS + CSS Modules</p>
      </div>
    </header>
  );
}
