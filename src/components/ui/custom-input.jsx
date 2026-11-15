function CustomInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  className = "",
}) {
  return (
    <label className="flex w-full flex-col gap-2.5 text-sm font-semibold text-text">
      <span>{label}</span>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className={
          `h-12 w-full rounded-xl border border-border
          bg-surface px-4 text-sm text-text
          outline-none transition
          placeholder:text-muted
          focus:border-primary focus:ring-2 focus:ring-primary/10
          disabled:cursor-not-allowed disabled:opacity-60
          ${className}`
        }
      />
    </label>
  );
}

export default CustomInput;