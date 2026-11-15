import { Link, useNavigate } from "react-router-dom";

import PageHeader from "../../components/page-header/page-header";
import CompanyForm from "./components/company-form/company-form";
import { useCreateCompany } from "../../hooks/use-companies";

function AddCompanyPage() {
  const navigate = useNavigate();

  const { mutate: createCompany, isPending } =
    useCreateCompany();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    createCompany(data, {
      onSuccess: () => {
        alert("Company added successfully!");
        navigate("/companies");
      },
      onError: (error) => {
        console.error("Create company error:", error);
        alert(
          error.response?.data?.message ||
          "Failed to add company."
        );
      },
    });
  };

  return (
    <section>
      <PageHeader
        eyebrow="Companies"
        title="Add Company"
        description="Add a new transport company to Sairna."
        action={
          <Link
            className="rounded-xl border border-border bg-surface px-4 py-3 text-sm font-bold text-text transition hover:bg-surface-alt"
            to="/companies"
          >
            Back
          </Link>
        }
      />

      <CompanyForm
        title="Create Company"
        submitText={isPending ? "Creating..." : "Add Company"}
        onSubmit={handleSubmit}
      />
    </section>
  );
}

export default AddCompanyPage;