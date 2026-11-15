import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/token-storage";
import Sidebar from "../components/sidebar/sidebar";
import Topbar from "../components/topbar/topbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMe } from "../hooks/use-auth";
import { removeToken } from "../utils/token-storage";

function DashboardLayout() {
  const navigate = useNavigate();
  

const {
  data: user,
  isPending,
  isError,
  error,
} = useMe();
useEffect(() => {
  if (
    isError &&
    error.response
      ?.status === 401
  ) {
    removeToken();

    navigate(
      "/login"
    );
  }
}, [
  isError,
  error,
  navigate,
]);

if (!getToken()) {
  return (
    <Navigate
      to="/login"
      replace
    />
  );
}
if (isPending){
  return <p>loading...</p>
  }
  return (
    <div className="flex h-screen w-full overflow-hidden bg-page">
      <Sidebar />

      <section className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar />

        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </section>
    </div>
  );
}

export default DashboardLayout;
