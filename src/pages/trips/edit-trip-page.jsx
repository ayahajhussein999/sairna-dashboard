import { Link, useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../components/page-header/page-header";
import TripForm from "./components/trip-form/trip-form";

import {
  useTrips,
  useCities,
  useUpdateTrip,
} from "../../hooks/use-trips";

import { useCompanies } from "../../hooks/use-companies";

function EditTripPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: trips = [],
    isPending: isTripsLoading,
    isError,
    error,
  } = useTrips();

  const {
    data: companies = [],
    isPending: isCompaniesLoading,
  } = useCompanies();

  const {
    data: cities = [],
    isPending: isCitiesLoading,
  } = useCities();

  const { mutate: updateTrip, isPending: isUpdating } =
    useUpdateTrip();

  const trip = trips.find(
    (item) => item.id === Number(id)
  );

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

    updateTrip(
      {
        id: Number(id),
        ...data,
      },
      {
        onSuccess: () => {
          alert("Trip updated successfully!");
          navigate("/trips");
        },
        onError: (error) => {
          alert(
            error.response?.data?.message ||
            "Failed to update trip."
          );
        },
      }
    );
  };

  if (isTripsLoading || isCompaniesLoading || isCitiesLoading) {
    return <p className="p-6 text-center">Loading trip...</p>;
  }

  if (isError) {
    return (
      <p className="p-6 text-center text-red-500">
        {error?.response?.data?.message || error.message}
      </p>
    );
  }

  if (!trip) {
    return (
      <p className="p-6 text-center text-muted">
        Trip not found.
      </p>
    );
  }

  return (
    <section>
      <PageHeader
        eyebrow="Trips"
        title="Edit Trip"
        description={`Update trip ${trip.code}.`}
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
        title="Update Trip"
        submitText={isUpdating ? "Updating..." : "Update Trip"}
        onSubmit={handleSubmit}
        trip={trip}
        companies={companies}
        cities={cities}
      />
    </section>
  );
}

export default EditTripPage;