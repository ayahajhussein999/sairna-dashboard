import PageHeader from "../../components/page-header/page-header";
import DataTable from "../../components/data-table/data-table";
import { useCities } from "../../hooks/use-trips";

function CitiesPage() {
  const {
    data: cities = [],
    isPending,
    isError,
    error,
  } = useCities();

  const columns = [
    {
      key: "id",
      header: "ID",
      className: "whitespace-nowrap px-4 py-4 text-sm font-medium text-muted",
    },
    {
      key: "name",
      header: "City Name",
      className:
        "whitespace-nowrap px-4 py-4 text-sm font-semibold text-text",
    },
    {
      key: "latitude",
      header: "Latitude",
      className: "whitespace-nowrap px-4 py-4 text-sm font-medium text-text",
    },
    {
      key: "longitude",
      header: "Longitude",
      className: "whitespace-nowrap px-4 py-4 text-sm font-medium text-text",
    },
  ];

  if (isPending) {
    return <p className="p-6 text-center text-muted">Loading cities...</p>;
  }

  if (isError) {
    return (
      <p className="p-6 text-center text-red-500">
        {error?.response?.data?.message || error.message}
      </p>
    );
  }

  return (
    <section>
      <PageHeader
        eyebrow="Locations"
        title="Cities"
        description="View all available cities in Sairna."
      />

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-primary/30">
          <p className="text-sm font-medium text-muted">Total Cities</p>
          <p className="mt-2 text-2xl font-bold text-text">
            {cities.length}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <DataTable
          columns={columns}
          data={cities}
          emptyState="No cities found."
        />
      </div>
    </section>
  );
}

export default CitiesPage;