"use client"

import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface FormInputFieldProps {
    label?: string;
    placeholder?: string;
    inputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
    multiline?: boolean;
    rows?: number;
    name?: string;
    type?: string;
}

const FormInputField: React.FC<FormInputFieldProps> = ({
    label = "",
    placeholder = "",
    inputRef = null,
    multiline = false,
    rows = 1,
    name = "",
    type = "text"
}) => {
    return (
        <div className="w-full space-y-2">
            <Label htmlFor={name} className="text-sm font-medium text-primary">
                {label} *
            </Label>
            {multiline ? (
                <Textarea
                    id={name}
                    placeholder={placeholder}
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    rows={rows}
                    required
                    name={name}
                    className="text-sm"
                />
            ) : (
                <Input
                    id={name}
                    placeholder={placeholder}
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    required
                    name={name}
                    type={type}
                    className="text-sm"
                />
            )}
        </div>
    )
}

export default FormInputField
