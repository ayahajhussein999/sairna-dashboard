import { Link, useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../components/page-header/page-header";
import CompanyForm from "./components/company-form/company-form";

import {
  useCompanies,
  useUpdateCompany,
} from "../../hooks/use-companies";

function EditCompanyPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: companies = [],
    isPending,
    isError,
    error,
  } = useCompanies();

  const { mutate: updateCompany, isPending: isUpdating } =
    useUpdateCompany();

  const company = companies.find(
    (item) => item.id === Number(id)
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    data.isActive = data.isActive === "true";

    updateCompany(
      {
        id: Number(id),
        ...data,
      },
      {
        onSuccess: () => {
          alert("Company updated successfully!");
          navigate("/companies");
        },
        onError: (error) => {
          alert(
            error.response?.data?.message ||
            "Failed to update company."
          );
        },
      }
    );
  };

  if (isPending) {
    return <p className="p-6 text-center">Loading company...</p>;
  }

  if (isError) {
    return (
      <p className="p-6 text-center text-red-500">
        {error?.response?.data?.message || error.message}
      </p>
    );
  }

  if (!company) {
    return (
      <p className="p-6 text-center text-muted">
        Company not found.
      </p>
    );
  }

  return (
    <section>
      <PageHeader
        eyebrow="Companies"
        title="Edit Company"
        description={`Update company #${id}.`}
        action={
          <Link
            className="rounded-xl border border-border bg-surface px-4 py-3 text-sm font-bold text-text hover:bg-surface-alt"
            to="/companies"
          >
            Back
          </Link>
        }
      />

      <CompanyForm
        title="Update Company"
        submitText={isUpdating ? "Updating..." : "Update Company"}
        onSubmit={handleSubmit}
        company={company}
      />
    </section>
  );
}

export default EditCompanyPage;