import React from "react";
import { Navigation } from "./Navigation/Navigation";
import styles from "./Page.module.scss";

interface PageProps {
  pageId: string;
  children: React.ReactNode;
}

export const StandardPage: React.FC<PageProps> = ({ pageId, children }) => (
  <div>
    <Navigation selectedId={pageId} />
    <div className={styles["page-content"]}>{children}</div>
  </div>
);
