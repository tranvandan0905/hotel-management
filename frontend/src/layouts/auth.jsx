import { Routes, Route } from "react-router-dom";
import routes from "@/routes";

export function Auth() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gray-100">
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }) => (
              <Route key={path} exact path={path} element={element} />
            ))
        )}
      </Routes>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
