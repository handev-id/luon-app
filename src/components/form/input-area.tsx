interface InputProps {
  label: string;
  placeholder: string;
  onChange: (value: string) => void;
  value?: string;
  required?: boolean;
}

export default function InputArea({
  label,
  placeholder,
  onChange,
  value = "",
  required = false,
}: InputProps) {
  return (
    <div className="relative w-full">
      <label className="font-semibold text-neutral-600" htmlFor={label}>
        {label}
      </label>
      <textarea
        name={label}
        className="w-full outline-none border mt-1 focus:bg-green-50 focus:border-green-500 border-neutral-300 rounded-lg p-3"
        placeholder={placeholder || label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={4}
      />
    </div>
  );
}
