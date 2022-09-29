import React, { forwardRef, InputHTMLAttributes, useEffect, useState } from 'react';
import { FormInputProps } from 'nanobits-react-ui/components/form/FormInput';
import classNames from 'classnames';
import { Label, Prefix, Suffix } from '../label';
import { FormFeedback, FormSelect, InputGroup } from 'nanobits-react-ui';

export interface DropdownInputProps extends InputHTMLAttributes<HTMLSelectElement> {
    className?: string,
    label?: string,
    required?: boolean,
    iconLeft?: string,
    textLeft?: string,
    iconRight?: string,
    textRight?: string,
    placeholder?: string,
    value?: any,
    name: string,
    error?: string,
    requiredText?: string,
    disabled?: boolean,
    onBlur?: (value: any) => void,
    onUpdate?: (value: any) => any,
    options: DropdownOption[]
}

interface DropdownOption {
    label?: string,
    value?: string
}

export const DropdownInput = forwardRef<HTMLSelectElement, DropdownInputProps & FormInputProps>((
    {
        className,
        label,
        options,
        required,
        iconLeft,
        textLeft,
        iconRight,
        textRight,
        placeholder = 'Select option...',
        value,
        name,
        error,
        requiredText,
        disabled,
        onBlur,
        onUpdate,
        ...rest
    },
    ref
) => {
    const _className = classNames(
        'n-custom-select-input-class',
        className
    )

    const [errorMessage, setErrorMessage] = useState<string | undefined>(error)

    useEffect(() => {
        error ? setErrorMessage(error) : setErrorMessage(undefined)
    }, [error])

    const handleBlur = (event: React.FocusEvent<HTMLSelectElement>) => {
        setErrorMessage(undefined)
        if (onBlur) return onBlur(event.target.value)
    }

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (onUpdate) return onUpdate(event.target.value)

        throw new Error('Provide onUpdate to input component')
    }

    return (
        <React.Fragment>
            {label && <Label labelfor={name} required={required} label={label} />}
            <InputGroup>
                {(iconLeft || textLeft) && <Prefix icon={iconLeft} text={textLeft} required={required} />}
                <FormSelect
                    className={_className}
                    ref={ref}
                    id={`for-${name}`}
                    value={value}
                    name={name}
                    placeholder={placeholder}
                    aria-describedby={name}
                    required={required}
                    disabled={disabled}
                    feedbackInvalid={requiredText}
                    invalid={errorMessage ? true : false}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    options={options}
                    {...rest}
                />
                {errorMessage && <FormFeedback>{errorMessage}</FormFeedback>}
                {(iconRight || textRight) && <Suffix icon={iconRight} text={textRight} required={required} />}
            </InputGroup>
        </React.Fragment>
    )
})