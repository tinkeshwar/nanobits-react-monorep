import React, { forwardRef, InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { Label, Prefix, Suffix } from 'nanobits-react-components'
import { Dropdown, DropdownToggle, FormFeedback, FormInput, InputGroup, DropdownMenu, DropdownItem, FormCheck } from 'nanobits-react-ui'
import { FormSelectProps } from 'nanobits-react-ui/dist/components/form/FormSelect'

export interface OptionProps {
    label: string,
    value: string | number
}

export interface MultiSelectProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string,
    label?: string,
    placeholder?: string,
    required?: boolean,
    iconRight?: string,
    iconLeft?: string,
    textRight?: string,
    textLeft?: string,
    name: string,
    requiredText?: string,
    error?: string,
    options: OptionProps[],
    disabled?: boolean,
    value: string[],
    limit?: number
    onUpdate?: (value: string[]) => any
}

export const MutiSelectInput = forwardRef<HTMLInputElement, MultiSelectProps & FormSelectProps>((
  {
    className,
    label,
    placeholder,
    required,
    iconRight,
    iconLeft,
    textLeft,
    textRight,
    name,
    requiredText,
    error,
    options,
    disabled,
    value,
    onUpdate,
    limit,
    ...rest
  },
  ref
) => {

  const [search, setSearch] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string | undefined>(error)

  const _className = classNames(
    'n-custom-multi-select-input-class',
    className
  )

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.checked) {
      value.push(event.currentTarget.value)
      const newArray = [...value]
      if (onUpdate) return onUpdate(newArray)
    } else {
      const checked = [...value]
      const newArray = checked.filter(item => (item !== event.currentTarget.value))
      if (onUpdate) return onUpdate(newArray)
    }
  }

  const handleBlur = () => {
    setSearch(false)
  }

  const handleFocus = () => {
    setSearchValue('')
    setErrorMessage(undefined)
    setSearch(true)
  }

  const optionSearchFilter = (option: OptionProps) => option?.label?.toLowerCase().includes(searchValue?.toLowerCase())

  const selectedOptions = options?.filter((o) => value?.includes(o.value.toString())).map((o) => o.label)

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
      <Dropdown variant={'dropdown'} className={'w-100'} autoClose={'outside'}>
        <DropdownToggle color={'none'} className={'d-block w-100 p-0 border-0 text-left bg-white h6 mb-0 dropdown-toggler-select'}>
          <InputGroup>
            {(iconLeft || textLeft) && <Prefix icon={iconLeft} text={textLeft} required={required} />}
            <FormInput
              className={_className}
              ref={ref}
              id={`for-${name}`}
              placeholder={placeholder}
              aria-describedby={name}
              invalid={errorMessage ? true : false}
              required={required}
              feedbackInvalid={requiredText}
              disabled={disabled}
              value={search ? searchValue : value?.length < 3 ? selectedOptions : `${selectedOptions?.length} item(s) selected`}
              onChange={handleSearchChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              {...rest}
            />
            {errorMessage && <FormFeedback>{errorMessage}</FormFeedback>}
            {(iconRight || textRight) && <Suffix icon={iconRight} text={textRight} required={required} />}
          </InputGroup>
        </DropdownToggle>
        {(options && options?.length) && <DropdownMenu className={'pt-0'}>
          {options?.filter(optionSearchFilter)?.map((option: OptionProps, index: number) => {
            return (
              <DropdownItem key={`select-option-${index}`} >
                <FormCheck
                  form={name}
                  id={`for-${name}-${index}`}
                  value={option.value}
                  label={option.label}
                  onChange={handleChange}
                  name={`option-${name}-${index}`}
                  checked={value.includes(option.value?.toString())}
                  disabled={disabled || (limit !== undefined && limit === value?.length && !value.includes(option.value?.toString()))}
                />
              </DropdownItem>
            )
          })}
        </DropdownMenu>}
      </Dropdown>
    </React.Fragment>
  )
})