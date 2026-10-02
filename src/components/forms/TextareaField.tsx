"use client";

interface TextareaFieldProps {
    name: string;
    required?: boolean;
    children: React.ReactNode;
    placeholder?: string;
}

import React from "react";

export default function TextareaField({
    name,
    required = false,
    children,
    placeholder = "",
}: TextareaFieldProps): React.ReactElement {
    return (
        <div className={`form-input`}>
            <textarea
                name={name}
                rows={4}
                className="peer"
                id={name}
                placeholder={placeholder}
                required={required}
            />
            <label htmlFor={name}>{children}</label>
        </div>
    );
}
