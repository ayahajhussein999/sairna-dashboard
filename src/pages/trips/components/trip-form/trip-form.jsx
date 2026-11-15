import Button from "../../../../components/ui/button";
import Input from "../../../../components/ui/input";
import Select from "../../../../components/ui/select";

function TripForm({
  title,
  submitText,
  onSubmit,
  trip,
  companies = [],
  cities = [],
}) {
  const labelClass = "grid gap-2 text-sm font-bold text-text";

  return (
    <section className="max-w-4xl rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-muted">
          Trip Form
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
          Transport Company

          <Select
            name="companyId"
            defaultValue={trip?.companyId ?? ""}
            required
          >
            <option value="" disabled>
              Select company
            </option>

            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </Select>
        </label>

        <label className={labelClass}>
          Origin City

          <Select
            name="originId"
            defaultValue={trip?.originId ?? ""}
            required
          >
            <option value="" disabled>
              Select origin
            </option>

            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </Select>
        </label>

        <label className={labelClass}>
          Destination City

          <Select
            name="destinationId"
            defaultValue={trip?.destinationId ?? ""}
            required
          >
            <option value="" disabled>
              Select destination
            </option>

            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </Select>
        </label>

        <label className={labelClass}>
          Departure Date & Time

          <Input
            name="departureAt"
            type="datetime-local"
            defaultValue={
              trip?.departureAt
                ? trip.departureAt.slice(0, 16)
                : ""
            }
            required
          />
        </label>

        <label className={labelClass}>
          Arrival Date & Time

          <Input
            name="arrivalAt"
            type="datetime-local"
            defaultValue={
              trip?.arrivalAt
                ? trip.arrivalAt.slice(0, 16)
                : ""
            }
            required
          />
        </label>

        <label className={labelClass}>
          Ticket Price

          <Input
            name="price"
            type="number"
            min="0"
            placeholder="Enter ticket price"
            defaultValue={trip?.price ?? ""}
            required
          />
        </label>

        <label className={labelClass}>
          Total Seats

          <Input
            name="totalSeats"
            type="number"
            min="1"
            placeholder="Enter total seats"
            defaultValue={trip?.totalSeats ?? ""}
            required
          />
        </label>

        {trip && (
          <label className={labelClass}>
            Trip Status

            <Select
              name="status"
              defaultValue={trip.status}
            >
              <option value="AVAILABLE">Available</option>
              <option value="CANCELLED">Cancelled</option>
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

export default TripForm;