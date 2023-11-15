import { Route, Routes } from "react-router-dom";

import { RootLayout } from "~/components";
import { Home } from "~/screens";
import { ProtectedRoute } from "./ProtectedRoute";
import { ROUTES } from "./routes";

export const Router = () => {
  return (
    <Routes>
      {/* PRIVATE AND PUBLIC ROUTES */}
      <Route element={<ProtectedRoute expected={["loggedIn", "loggedOut"]} />}>
        <Route element={<RootLayout />}>
          <Route element={<Home />} path={ROUTES.home} />
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
      {/* PUBLIC ONLY ROUTES */}
      <Route element={<ProtectedRoute expected="loggedOut" />}>
        {/* <Route element={<Login />} path={ROUTES.login} /> */}
      </Route>
      {/* PRIVATE ONLY ROUTES */}
      <Route element={<ProtectedRoute expected="loggedIn" />} />
    </Routes>
  );
};
