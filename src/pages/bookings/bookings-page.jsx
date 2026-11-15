import { useState } from "react";
import { useBookings, useCancelBooking } from "../../hooks/use-bookings";
import DataTable from "../../components/data-table/data-table";

function BookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { data: bookings = [], isLoading, isError } = useBookings();
  const cancelMutation = useCancelBooking();

  const columns = [
    {
      key: "code",
      header: "رقم الحجز",
      className: "whitespace-nowrap px-4 py-4 text-sm font-semibold text-text",
    },
    {
      key: "user",
      header: "المستخدم",
      render: (row) => (
        <span className="font-medium text-text">
          {row.user?.name ?? "-"}
        </span>
      ),
    },
    {
      key: "route",
      header: "المسار",
      render: (row) => (
        <span className="font-medium text-text">
          {row.trip?.origin?.name ?? "-"} ← {row.trip?.destination?.name ?? "-"}
        </span>
      ),
    },
    {
      key: "departureAt",
      header: "موعد الرحلة",
      render: (row) =>
        row.trip?.departureAt
          ? new Date(row.trip.departureAt).toLocaleString("ar-SY")
          : "-",
    },
    {
      key: "seats",
      header: "المقاعد",
      render: (row) => (
        <span className="font-medium">
          {row.seats?.length ?? 0}
        </span>
      ),
    },
    {
      key: "totalPrice",
      header: "السعر الإجمالي",
      render: (row) =>
        `${row.totalPrice?.toLocaleString("en-US") ?? 0} ل.س`,
    },
    {
      key: "status",
      header: "الحالة",
      render: (row) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            row.status === "CONFIRMED"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status === "CONFIRMED" ? "مؤكد" : "ملغي"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "الإجراءات",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedBooking(row)}
            className="rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/20"
          >
            التفاصيل
          </button>

          {row.status === "CONFIRMED" && (
            <button
              onClick={() => {
                if (window.confirm("هل أنت متأكد من إلغاء هذا الحجز؟")) {
                  cancelMutation.mutate(row.id);
                }
              }}
              disabled={cancelMutation.isPending}
              className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50"
            >
              إلغاء
            </button>
          )}
        </div>
      ),
    },
  ];

  if (isLoading) return <p className="p-6 text-muted">جاري تحميل الحجوزات...</p>;
  if (isError) return <p className="p-6 text-red-600">حدث خطأ أثناء تحميل الحجوزات.</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">الحجوزات</h1>
        <p className="mt-1 text-sm font-medium text-muted">
          عرض وإدارة حجوزات الرحلات
        </p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-5">
        <p className="text-sm font-medium text-muted">إجمالي الحجوزات</p>
        <p className="mt-2 text-2xl font-bold text-text">
          {bookings.length}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4">
        <DataTable
          columns={columns}
          data={bookings}
          emptyState="لا توجد حجوزات حالياً"
        />
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"><div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-surface p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-text">
                تفاصيل الحجز
              </h2>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-xl font-bold text-muted hover:text-text"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <p className="text-sm font-medium text-text">
                رقم الحجز: {selectedBooking.code}
              </p>
              <p className="text-sm font-medium text-text">
                المستخدم: {selectedBooking.user?.name ?? "-"}
              </p>
              <p className="text-sm font-medium text-text">
                البريد: {selectedBooking.user?.email ?? "-"}
              </p>
              <p className="text-sm font-medium text-text">
                الشركة: {selectedBooking.trip?.company?.name ?? "-"}
              </p>
              <p className="text-sm font-medium text-text">
                من: {selectedBooking.trip?.origin?.name ?? "-"}
              </p>
              <p className="text-sm font-medium text-text">
                إلى: {selectedBooking.trip?.destination?.name ?? "-"}
              </p>
            </div>

            <h3 className="mb-3 mt-6 font-bold text-text">
              بيانات الركاب والمقاعد
            </h3>

            <div className="space-y-3">
              {(selectedBooking.seats ?? []).map((seat) => (
                <div
                  key={seat.id}
                  className="rounded-lg border border-border p-3"
                >
                  <p className="font-semibold text-text">
                    المقعد رقم {seat.seatNumber}
                  </p>
                  <p className="mt-1 text-sm font-medium text-muted">
                    الراكب: {seat.passengerName}
                  </p>
                  <p className="text-sm font-medium text-muted">
                    الهاتف: {seat.passengerPhone}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedBooking(null)}
              className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-deep"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingsPage;