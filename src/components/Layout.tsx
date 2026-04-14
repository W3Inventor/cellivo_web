import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PagePreloader from "./PagePreloader";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background">
    <PagePreloader />
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
