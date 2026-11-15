import Button from "../../../../components/ui/button";
import Input from "../../../../components/ui/input";
import Select from "../../../../components/ui/select";

function CompanyForm({
  title,
  submitText,
  onSubmit,
  company,
}) {
  const labelClass =
    "grid gap-2 text-sm font-bold text-text";

  return (
    <section className="max-w-3xl rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-muted">
          Company Form
        </p>

        <h3 className="mt-2 text-xl font-bold text-brand-900">
          {title}
        </h3>
      </div>

      <form
        className="grid grid-cols-2 gap-5"
        onSubmit={onSubmit}
      >
        <label className={labelClass}>
          Company Name

          <Input
            name="name"
            placeholder="Enter company name"
            defaultValue={company?.name ?? ""}
            required
          />
        </label>

        <label className={labelClass}>
          Logo URL

          <Input
            name="logoUrl"
            type="url"
            placeholder="https://..."
            defaultValue={company?.logoUrl ?? ""}
          />
        </label>

        {company && (
          <label className={`${labelClass} col-span-2`}>
            Company Status

            <Select
              name="isActive"
              defaultValue={company.isActive ? "true" : "false"}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </Select>
          </label>
        )}

        <div className="col-span-2">
          <Button type="submit">
            {submitText}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default CompanyForm;