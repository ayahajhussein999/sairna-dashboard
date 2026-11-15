import { useOverview } from "../../hooks/use-overview";

function OverviewPage() {
  const {
    data,
    isPending,
    isError,
    error,
  } = useOverview();

  const stats = [
    {
      label: "Total Customers",
      value: data?.customers,
      icon: "👥",
    },
    {
      label: "Transport Companies",
      value: data?.companies,
      icon: "🏢",
    },
    {
      label: "Upcoming Trips",
      value: data?.upcomingTrips,
      icon: "🚌",
    },
    {
      label: "Total Bookings",
      value: data?.totalBookings,
      icon: "🎫",
    },
    {
      label: "Confirmed Bookings",
      value: data?.confirmedBookings,
      icon: "✓",
    },
  ];

  if (isPending) {
    return <p className="text-muted">Loading overview...</p>;
  }

  if (isError) {
    return (
      <p className="rounded-xl bg-red-50 p-4 text-red-600">
        Failed to load overview:{" "}
        {error?.response?.data?.message || error.message}
      </p>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text">
          Overview
        </h1>
        <p className="mt-2 text-sm text-muted">
          Welcome to Sairna Dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-muted">
                {stat.label}
              </p>

              <span className="grid size-11 place-items-center rounded-xl bg-soft-teal text-xl text-primary">
                {stat.icon}
              </span>
            </div>

            <p className="mt-5 text-3xl font-black text-text">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OverviewPage;