import React, { forwardRef, InputHTMLAttributes, useEffect, useState } from 'react';
import { FormFeedback, FormInput, FormLabel, InputGroup, InputGroupText } from 'nanobits-react-ui';
import classNames from 'classnames';
import Icon from 'nanobits-react-icons';
import { FormInputProps } from 'nanobits-react-ui/components/form/FormInput';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement>{
    className?: string,
    label?: string
    type?: 'text' | 'email' | 'password' | 'color'
    required?: boolean
    iconLeft?: string
    textLeft?: string
    iconRight?: string
    textRight?: string
    placeholder?: string
    value?: any
    name: string
    error?: string
    onUpdate?: (value:any) => any
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (value: any) => void
    onValidation?: (value: any) => any
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps & FormInputProps>((
    {
        className,
        label,
        type = 'text',
        required,
        iconLeft,
        textLeft,
        iconRight,
        textRight,
        placeholder = 'Enter value here...',
        value,
        name,
        error,
        onUpdate,
        onChange,
        onBlur,
        onValidation,
        ...rest
    },
    ref
)=> {

    const _lableclass = classNames(
        'font-weight-bolder',
        required  ? 'label-required' : '',
        'n-custom-text-input-label-class'
    )

    const _className = classNames(
        'n-custom-text-input-class',
        className
    )

    const [errorMessage, setErrorMessage] = useState<string|undefined>(error)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onUpdate) return onUpdate(event.target.value)
        if (onChange) return onChange(event)

        throw new Error('Provide onUpdate or onChange to input component.')
    }

    const handleBlur = (event:  React.FocusEvent<HTMLInputElement>) => {
        setErrorMessage('')
        if(onValidation){
            const validatorResponse = onValidation(event.target.value)
            if(validatorResponse && validatorResponse.error) setErrorMessage(validatorResponse.message)
        }
        if(onBlur) return onBlur(event.target.value)
    }

    useEffect(() => {
        error ? setErrorMessage(error) : setErrorMessage('')
    },[error])

    return (
        <React.Fragment>
            {label && <FormLabel htmlFor={`for-${name}`} className={_lableclass}>{label}</FormLabel>}
            <InputGroup>
                {(iconLeft || textLeft ) && <InputGroupText className={_lableclass}>
                    {iconLeft && <Icon type={'solid'} icon={iconLeft}/>}
                    {textLeft || ''}
                </InputGroupText>}
                <FormInput
                    className={_className}
                    ref={ref}
                    id={`for-${name}`}
                    type={type}
                    value={value}
                    name={name}
                    placeholder={placeholder}
                    aria-describedby={name}
                    invalid={errorMessage ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    {...rest}
                />
                {errorMessage && <FormFeedback>{errorMessage}</FormFeedback>}
                {(iconRight || textRight ) && <InputGroupText className={_lableclass}>
                    {iconRight && <Icon type={'solid'} icon={iconRight}/>}
                    {textRight || ''}
                </InputGroupText>}
            </InputGroup>
        </React.Fragment>
    )
})

