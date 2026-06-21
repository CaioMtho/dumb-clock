interface AuthFieldProps {
    label: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    error?: boolean;
}

export function AuthField({label, type = 'text', placeholder, value, onChange, error} : AuthFieldProps) {
    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend">
                {label}
            </legend>
            <input type={type}
                className={`input w-full ${error ? `input-error`: ``}`}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
            ></input>

        </fieldset>
    )
}