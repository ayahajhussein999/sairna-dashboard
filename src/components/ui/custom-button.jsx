function CustomButton({
  children,
  type = "button",
  loading = false,
  className = "",
}) {
  return (
    <button
      type={type}
      disabled={loading}
      className={`
        flex h-12 w-full items-center justify-center
        rounded-xl bg-primary px-5
        text-sm font-bold text-white
        transition hover:bg-primary-deep
        disabled:cursor-not-allowed disabled:opacity-60
        ${className}`
      }
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

export default CustomButton;