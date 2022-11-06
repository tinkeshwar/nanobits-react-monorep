import React, { forwardRef, InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { FormSelectProps } from "nanobits-react-ui/components/form/FormSelect";
import { Label, Prefix, Suffix } from "../label";
import { InputGroup, FormFeedback, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormInput } from "nanobits-react-ui";
import classNames from "classnames";

export interface SelectOptionProps {
    value: string
    label: string
    disabled?: boolean
}

export interface SearchOptionProps {
    icon?: string,
    text?: string
}

export interface SelectInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string,
    label?: string,
    placeholder?: string,
    textRight?: string,
    textLeft?: string,
    iconRight?: string,
    iconLeft?: string,
    name: string,
    required?: boolean,
    requiredText?: string,
    error?: string,
    value?: string | number,
    onUpdate?: (value: string | number) => void
    options?: SelectOptionProps[],
    disabled?: boolean
}

export const SelectInput = forwardRef<HTMLInputElement, SelectInputProps & FormSelectProps>((
    {
        className,
        label,
        placeholder = 'Select option here',
        textRight,
        textLeft,
        iconLeft,
        iconRight,
        required,
        requiredText,
        name,
        error,
        value,
        onUpdate,
        options,
        disabled,
        ...rest
    },
    ref
) => {

    const _className = classNames(
        'n-custom-select-input-class',
        className
    )

    const [errorMessage, setErrorMessage] = useState<string | undefined>(error)
    const [searchValue, setSearchValue] = useState('')
    const [search, setSearch] = useState<boolean>(false)

    const optionsSearchFilter = (option: SelectOptionProps) => option?.label?.toLowerCase().includes(searchValue.toLowerCase())

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    const handleBlur = () => {
        setErrorMessage(undefined)
        setSearch(false)
    }

    const handleFocus = () => {
        setSearchValue('')
        setSearch(true)
    }

    const handleChange = (option: SelectOptionProps) => {
        if (onUpdate) return onUpdate(option.value)
        throw new Error('Provide `onUpdate` to input component')
    }

    const errorExecuted = useRef(true)
    useEffect(() => {
        if (errorExecuted.current) {
            errorExecuted.current = false
            error ? setErrorMessage(error) : setErrorMessage(undefined)
        }
    }, [error])

    return (
        <React.Fragment>
            {label && <Label labelfor={name} required={required} label={label} />}
            <Dropdown variant={'dropdown'} className={'w-100'}>
                <DropdownToggle color={'none'} className={'d-block w-100 p-0 border-0 text-left bg-white h6 mb-0 dropdown-toggler-select'}>
                    <InputGroup>
                        {(iconLeft || textLeft) && <Prefix icon={iconLeft} text={textLeft} required={required} />}
                        <FormInput
                            className={_className}
                            ref={ref}
                            id={`for-${name}`}
                            type={'text'}
                            name={name}
                            placeholder={placeholder}
                            aria-describedby={name}
                            invalid={errorMessage ? true : false}
                            required={required}
                            feedbackInvalid={requiredText}
                            value={search ? searchValue : options?.find((option) => option.value === value)?.label || ''}
                            onChange={handleSearchChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            disabled={disabled}
                            {...rest}
                        />
                        {errorMessage && <FormFeedback>{errorMessage}</FormFeedback>}
                        {(iconRight || textRight) && <Suffix icon={iconRight} text={textRight} required={required} />}
                    </InputGroup>
                </DropdownToggle>
                {(options && options?.length && !disabled) && <DropdownMenu className={'pt-0'}>
                    {options?.filter(optionsSearchFilter).map((option: SelectOptionProps, index: number) => {
                        return (
                            <DropdownItem key={`select-option-${index}`} onClick={() => handleChange(option)} >{option.label}</DropdownItem>
                        )
                    })}
                </DropdownMenu>}
            </Dropdown>
        </React.Fragment>
    )
})