import { SiteHeader } from "../elements/site-header";
import Footer from "../elements/footer.element";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <SiteHeader />

      {/* Main Content */}
      <Outlet />

      {/* Footer */}
      <Footer />
    </div>
  );
}
