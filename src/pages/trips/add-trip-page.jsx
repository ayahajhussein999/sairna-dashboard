import { Link, useNavigate } from "react-router-dom";

import PageHeader from "../../components/page-header/page-header";
import TripForm from "./components/trip-form/trip-form";

import { useCreateTrip, useCities } from "../../hooks/use-trips";
import { useCompanies } from "../../hooks/use-companies";

function AddTripPage() {
  const navigate = useNavigate();

  const {
    data: companies = [],
    isPending: isCompaniesLoading,
  } = useCompanies();

  const {
    data: cities = [],
    isPending: isCitiesLoading,
  } = useCities();

  const { mutate: createTrip, isPending: isCreating } =
    useCreateTrip();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    data.companyId = Number(data.companyId);
    data.originId = Number(data.originId);
    data.destinationId = Number(data.destinationId);
    data.price = Number(data.price);
    data.totalSeats = Number(data.totalSeats);

    data.departureAt = new Date(data.departureAt).toISOString();
    data.arrivalAt = new Date(data.arrivalAt).toISOString();

    if (data.originId === data.destinationId) {
      alert("Origin and destination must be different.");
      return;
    }

    if (new Date(data.arrivalAt) <= new Date(data.departureAt)) {
      alert("Arrival time must be after departure time.");
      return;
    }

    createTrip(data, {
      onSuccess: () => {
        alert("Trip added successfully!");
        navigate("/trips");
      },
      onError: (error) => {
        console.error("Create trip error:", error);
        alert(
          error.response?.data?.message ||
          "Failed to add trip."
        );
      },
    });
  };

  if (isCompaniesLoading || isCitiesLoading) {
    return <p className="p-6 text-center">Loading form data...</p>;
  }

  return (
    <section>
      <PageHeader
        eyebrow="Trips"
        title="Add Trip"
        description="Create a new transport trip in Sairna."
        action={
          <Link
            className="rounded-xl border border-border bg-surface px-4 py-3 text-sm font-bold text-text transition hover:bg-surface-alt"
            to="/trips"
          >
            Back
          </Link>
        }
      />

      <TripForm
        title="Create Trip"
        submitText={isCreating ? "Creating..." : "Add Trip"}
        onSubmit={handleSubmit}
        companies={companies}
        cities={cities}
      />
    </section>
  );
}

export default AddTripPage;