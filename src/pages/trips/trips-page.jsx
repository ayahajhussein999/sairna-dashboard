import { Link } from "react-router-dom";

import DataTable from "../../components/data-table/data-table";
import EmptyState from "../../components/empty-state/empty-state";
import PageHeader from "../../components/page-header/page-header";
import Button from "../../components/ui/button";

import {
  useTrips,
  useDeleteTrip,
} from "../../hooks/use-trips";

function TripsPage() {
  const {
    data: trips = [],
    isPending,
    isError,
    error,
  } = useTrips();

  const {
    mutate: deleteTrip,
    isPending: isCancelling,
  } = useDeleteTrip();

  const handleCancel = (trip) => {
    const confirmed = window.confirm(
      `Are you sure you want to cancel trip ${trip.code}?`
    );

    if (!confirmed) return;

    deleteTrip(trip.id, {
      onSuccess: () => {
        alert("Trip cancelled successfully!");
      },
      onError: (error) => {
        alert(
          error.response?.data?.message ||
          "Failed to cancel trip."
        );
      },
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const columns = [
    {
      key: "code",
      header: "Trip Code",
      className: "whitespace-nowrap px-4 py-4 text-sm font-bold text-text",
    },
    {
      key: "route",
      header: "Route",
      render: (trip) => (
        <div className="min-w-[150px]">
          <p className="text-sm font-bold text-text">
            {trip.origin?.name || "-"}
          </p>

          <p className="my-1 text-xs text-muted">↓</p>

          <p className="text-sm font-bold text-text">
            {trip.destination?.name || "-"}
          </p>
        </div>
      ),
    },
    {
      key: "company",
      header: "Company",
      render: (trip) => (
        <span className="whitespace-nowrap text-sm text-text">
          {trip.company?.name || "-"}
        </span>
      ),
    },
    {
      key: "departureAt",
      header: "Departure",
      render: (trip) => (
        <span className="whitespace-nowrap text-sm text-muted">
          {formatDate(trip.departureAt)}
        </span>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (trip) => (
        <span className="whitespace-nowrap text-sm font-bold text-text">
          {Number(trip.price).toLocaleString("en-US")}
        </span>
      ),
    },
    {
      key: "totalSeats",
      header: "Seats",
      render: (trip) => (
        <span className="text-sm text-text">
          {trip.totalSeats}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (trip) => (
        <span
          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${
            trip.status === "AVAILABLE"
              ? "bg-soft-teal text-primary-deep"
              : "bg-surface-alt text-muted"
          }`}
        >
          {trip.status === "AVAILABLE" ? "Available" : "Cancelled"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (trip) => (
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/trips/${trip.id}/edit`}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-xs font-bold text-text transition hover:bg-surface-alt"
          >
            Edit
          </Link>

          {trip.status !== "CANCELLED" && (
            <Button
              variant="danger"
              disabled={isCancelling}
              onClick={() => handleCancel(trip)}
            >
              Cancel
            </Button>
          )}
        </div>
      ),
    },
  ];

  if (isPending) {
    return <p className="p-6 text-center">Loading trips...</p>;
  }

  if (isError) {
    return (
      <p className="p-6 text-center text-red-500">
        {error?.response?.data?.message || error.message}
      </p>
    );
  }return (
    <section>
      <PageHeader
        eyebrow="Management"
        title="Trips"
        description="Manage transport trips registered in Sairna."
        action={
          <Link
            to="/trips/add"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-primary-deep"
          >
            Add Trip
          </Link>
        }
      />

      <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted">
              Trips
            </p>

            <h3 className="mt-2 text-xl font-bold text-brand-900">
              Trips List
            </h3>
          </div>

          <span className="inline-flex min-w-9 items-center justify-center rounded-full bg-soft-teal px-3 py-1.5 text-xs font-bold text-primary-deep">
            {trips.length}
          </span>
        </div>

        <DataTable
          columns={columns}
          data={trips}
          emptyState={
            <EmptyState
              title="No trips yet"
              description="Add your first transport trip."
            />
          }
        />
      </section>
    </section>
  );
}

export default TripsPage;