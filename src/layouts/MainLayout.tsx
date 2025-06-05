// layouts/MainLayout.tsx
import type { ReactNode } from "react";
import { Navbar } from "./navbar/navbar";

interface Props {
  children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
