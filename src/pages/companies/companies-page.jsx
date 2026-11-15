import { Link } from "react-router-dom";

import DataTable from "../../components/data-table/data-table";
import EmptyState from "../../components/empty-state/empty-state";
import PageHeader from "../../components/page-header/page-header";
import Button from "../../components/ui/button";

import {
  useCompanies,
  useDeleteCompany,
} from "../../hooks/use-companies";

function CompaniesPage() {
  const {
    data: companies = [],
    isPending,
    isError,
    error,
  } = useCompanies();

  const {
    mutate: deleteCompany,
    isPending: isDeleting,
  } = useDeleteCompany();

  const handleArchive = (company) => {
    const confirmed = window.confirm(
      `Are you sure you want to archive ${company.name}?`
    );

    if (!confirmed) return;

    deleteCompany(company.id, {
      onSuccess: () => {
        alert("Company archived successfully!");
      },
      onError: (error) => {
        alert(
          error.response?.data?.message ||
          "Failed to archive company."
        );
      },
    });
  };

  const columns = [
    {
      key: "id",
      header: "ID",
      className: "px-4 py-4 text-sm text-muted",
    },
    {
      key: "company",
      header: "Company",
      render: (company) => (
        <div className="flex min-w-[200px] items-center gap-3">
          {company.logoUrl ? (
            <img
              src={company.logoUrl}
              alt={company.name}
              className="size-11 rounded-xl border border-border bg-white object-contain p-1"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="grid size-11 place-items-center rounded-xl bg-soft-teal font-bold text-primary">
              {company.name?.charAt(0)}
            </div>
          )}

          <div>
            <strong className="block text-sm text-text">
              {company.name}
            </strong>
          </div>
        </div>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      render: (company) => (
        <span
          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${
            company.isActive
              ? "bg-soft-teal text-primary-deep"
              : "bg-surface-alt text-muted"
          }`}
        >
          {company.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (company) => (
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/companies/${company.id}/edit`}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-xs font-bold text-text transition hover:bg-surface-alt"
          >
            Edit
          </Link>

          <Button
            variant="danger"
            disabled={isDeleting}
            onClick={() => handleArchive(company)}
          >
            Archive
          </Button>
        </div>
      ),
    },
  ];

  if (isPending) {
    return <p className="p-6 text-center">Loading companies...</p>;
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
        eyebrow="Management"
        title="Companies"
        description="Manage transport companies registered in Sairna."
        action={
          <Link
            to="/companies/add"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-primary-deep"
          >
            Add Company
          </Link>
        }
      />

      <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted">
              Companies
            </p><h3 className="mt-2 text-xl font-bold text-brand-900">
              Companies List
            </h3>
          </div>

          <span className="inline-flex min-w-9 items-center justify-center rounded-full bg-soft-teal px-3 py-1.5 text-xs font-bold text-primary-deep">
            {companies.length}
          </span>
        </div>

        <DataTable
          columns={columns}
          data={companies}
          emptyState={
            <EmptyState
              title="No companies yet"
              description="Add your first transport company."
            />
          }
        />
      </section>
    </section>
  );
}

export default CompaniesPage;