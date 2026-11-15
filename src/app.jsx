import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import DashboardLayout from "./layouts/dashboard-layout";
import CompaniesPage from "./pages/companies/companies-page";
import AddCompanyPage from "./pages/companies/add-company-page";
import EditCompanyPage from "./pages/companies/edit-company-page";
import LoginPage from "./pages/auth/;ogin-page";
import OverviewPage from "./pages/overview/overview-page";
import TripsPage from "./pages/trips/trips-page";
import AddTripPage from "./pages/trips/add-trip-page";
import EditTripPage from "./pages/trips/edit-trip-page";
import CitiesPage from "./pages/cities/cities-page";
import BookingsPage from "./pages/bookings/bookings-page";
import UsersPage from "./pages/users/users-page";

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route element={<DashboardLayout />}>
        <Route
          path="/"
          element={<Navigate to="/overview" replace />}
        />

        <Route
          path="/overview"
          element={<OverviewPage />}
        />
        <Route path="/companies" element={<CompaniesPage />} />
<Route path="/companies/add" element={<AddCompanyPage />} />
<Route path="/companies/:id/edit" element={<EditCompanyPage />} />
<Route path="/trips" element={<TripsPage />} />
<Route path="/trips/add" element={<AddTripPage />} />
<Route path="/trips/:id/edit" element={<EditTripPage />} />
<Route path="/cities" element={<CitiesPage />} />
<Route path="bookings" element={<BookingsPage />} />
<Route path="users" element={<UsersPage />} />
      </Route>
    </Routes>
  );
}

export default App;