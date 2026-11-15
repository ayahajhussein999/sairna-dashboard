import { useState } from "react";
import { useUsers, useUserById } from "../../hooks/use-users";
import DataTable from "../../components/data-table/data-table";

function UsersPage() {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const {
    data: users = [],
    isLoading,
    isError,
  } = useUsers();

  const {
    data: selectedUser,
    isLoading: isUserLoading,
  } = useUserById(selectedUserId);

  const columns = [
    {
      key: "id",
      header: "ID",
      className:
        "whitespace-nowrap px-4 py-4 text-sm font-semibold text-text",
    },
    {
      key: "name",
      header: "اسم المستخدم",
      className:
        "whitespace-nowrap px-4 py-4 text-sm font-semibold text-text",
    },
    {
      key: "email",
      header: "البريد الإلكتروني",
      className:
        "whitespace-nowrap px-4 py-4 text-sm font-medium text-text",
    },
    {
      key: "role",
      header: "الدور",
      render: (row) => (
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {row.role === "USER" ? "مستخدم" : row.role}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "تاريخ التسجيل",
      render: (row) =>
        row.createdAt
          ? new Date(row.createdAt).toLocaleDateString("ar-SY")
          : "-",
    },
    {
      key: "actions",
      header: "الإجراءات",
      render: (row) => (
        <button
          onClick={() => setSelectedUserId(row.id)}
          className="rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary/20"
        >
          التفاصيل
        </button>
      ),
    },
  ];

  if (isLoading) {
    return <p className="p-6 text-muted">جاري تحميل المستخدمين...</p>;
  }

  if (isError) {
    return (
      <p className="p-6 font-medium text-red-600">
        حدث خطأ أثناء تحميل المستخدمين.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">المستخدمون</h1>
        <p className="mt-1 text-sm font-medium text-muted">
          عرض وإدارة معلومات المستخدمين المسجلين
        </p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-5">
        <p className="text-sm font-medium text-muted">
          إجمالي المستخدمين
        </p>
        <p className="mt-2 text-2xl font-bold text-text">
          {users.length}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4">
        <DataTable
          columns={columns}
          data={users}
          emptyState="لا يوجد مستخدمون حالياً"
        />
      </div>

      {selectedUserId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-surface p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-text">
                تفاصيل المستخدم
              </h2>

              <button
                onClick={() => setSelectedUserId(null)}
                className="text-xl font-bold text-muted hover:text-text"
              >
                ×
              </button>
            </div>

            {isUserLoading ? (
              <p className="py-6 text-center font-medium text-muted">
                جاري تحميل التفاصيل...
              </p>
            ) : selectedUser ? (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-muted">رقم المستخدم</p>
                  <p className="mt-1 font-semibold text-text">
                    {selectedUser.id}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted">الاسم</p>
                  <p className="mt-1 font-semibold text-text">
                    {selectedUser.name}
                  </p>
                </div><div>
                  <p className="text-xs font-semibold text-muted">البريد الإلكتروني</p>
                  <p className="mt-1 font-medium text-text">
                    {selectedUser.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted">الدور</p>
                  <p className="mt-1 font-semibold text-text">
                    {selectedUser.role}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted">تاريخ التسجيل</p>
                  <p className="mt-1 font-medium text-text">
                    {selectedUser.createdAt
                      ? new Date(selectedUser.createdAt).toLocaleString("ar-SY")
                      : "-"}
                  </p>
                </div>
              </div>
            ) : (
              <p className="py-6 text-center font-medium text-red-600">
                تعذر تحميل بيانات المستخدم.
              </p>
            )}

            <button
              onClick={() => setSelectedUserId(null)}
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

export default UsersPage;