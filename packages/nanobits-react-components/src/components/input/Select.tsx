import React, { forwardRef, InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { FormSelectProps } from "nanobits-react-ui/components/form/FormSelect";
import { Label, Prefix, Suffix } from "../label";
import { InputGroup, FormFeedback, FormInput, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "nanobits-react-ui";
import classNames from "classnames";
import { TextInput } from "./Text";

export interface SelectOptionProps {
    value: string
    label: string
    disabled?: boolean
}

export interface SearchOptionProps {
    icon?: string,
    text?: string
}

export interface SelectInputProps extends InputHTMLAttributes<HTMLInputElement>{
    className?: string
    label?: string
    required?: boolean
    iconLeft?: string
    textLeft?: string
    iconRight?: string
    textRight?: string
    placeholder?: string
    value?: string
    name: string
    error?: string
    requiredText?: string
    disabled?: boolean
    onUpdate?: (value: SelectOptionProps) => void
    options: SelectOptionProps[],
    search?: SearchOptionProps
}

export const SelectInput = forwardRef<HTMLInputElement, SelectInputProps & FormSelectProps>((
    {
        className,
        label,
        options,
        required,
        iconLeft,
        textLeft,
        iconRight,
        textRight,
        placeholder = 'Select one here...',
        value,
        name,
        error,
        requiredText,
        disabled,
        onUpdate,
        search,
        ...rest
    },
    ref
)=>{
    
    const _className = classNames(
        'n-custom-select-input-class',
        className
    )

    const [errorMessage, setErrorMessage] = useState<string|undefined>(error)
    const [seletedValue, setSelectedValue] = useState<string|undefined>(value)

    const handleChange = (item: SelectOptionProps) => {
        if (onUpdate) {
            setSelectedValue(item.label)
            return onUpdate(item)
        }
        throw new Error('Provide `onUpdate` to input component')
    }

    const errorExecuted = useRef(true)
    useEffect(() => {
        if(errorExecuted.current){
            errorExecuted.current = false
            error ? setErrorMessage(error) : setErrorMessage(undefined)
        }
    },[error])

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
                            value={seletedValue}
                            name={name}
                            placeholder={placeholder}
                            aria-describedby={name}
                            invalid={errorMessage ? true : false}
                            required={required}
                            feedbackInvalid={requiredText}
                            readOnly={true}
                            {...rest}
                        />
                        {errorMessage && <FormFeedback>{errorMessage}</FormFeedback>}
                        {(iconRight || textRight) && <Suffix icon={iconRight} text={textRight} required={required} />}
                    </InputGroup>
                </DropdownToggle>
                {(options && options.length) && <DropdownMenu className={'pt-0'}>
                    {search && <DropdownItem className={'p-0'}><TextInput iconLeft={search.icon||'fa-magnifying-glass'} name={'search'} placeholder={search.text||'search...'}/></DropdownItem>}
                    {options.map((option: SelectOptionProps, index: number)=> {
                        return <DropdownItem onClick={()=>handleChange(option)} key={`select-option-${index}`} disabled={option.disabled}>{option.label}</DropdownItem>
                    })}
                </DropdownMenu>}
            </Dropdown>
        </React.Fragment>
    )
})