"use client";

interface InputFieldProps {
    name: string;
    placeholder: string;
    required?: boolean;
    children: React.ReactNode;
}

export default function InputField({
    name,
    placeholder,
    required = false,
    children,
}: InputFieldProps): React.ReactElement {
    return (
        <div className={`form-input`}>
            <input
                name={name}
                className="peer"
                type="text"
                id={name}
                placeholder={placeholder}
                required={required}
            />
            <label htmlFor={name}>{children}</label>
        </div>
    );
}
