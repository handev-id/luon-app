interface InputProps {
  label: string;
  placeholder: string;
  onChange: (value: string) => void;
  value?: string;
  required?: boolean;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
}

export default function Input({
  label,
  placeholder,
  onChange,
  value = "",
  type,
}: InputProps) {
  return (
    <div className="relative w-full">
      <label className="ubuntu-semibold text-neutral-600" htmlFor={label}>
        {label}
      </label>
      <input
        name={label}
        type={type ? type : "text"}
        className="w-full outline-none border mt-1 focus:bg-green-50 focus:border-green-500 border-neutral-300 rounded-lg p-3"
        placeholder={placeholder || label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
