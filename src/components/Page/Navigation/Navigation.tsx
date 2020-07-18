import React from "react";
import styles from "./Navigation.module.scss";
import { Account } from "./Account/Account";

interface NavProps {
  selectedId: string;
}

export const Navigation: React.FC<NavProps> = (props) => {
  const { selectedId } = props;
  return (
    <nav className={styles["nav-root"]}>
      <div className={styles["title"]}>Marketplace</div>
      <Account />
    </nav>
  );
};
