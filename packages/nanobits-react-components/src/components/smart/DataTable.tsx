import classNames from 'classnames'
import { Table, TableHead, TableRow, TableHeaderCell, TableBody, TableDataCell, FormCheck } from 'nanobits-react-ui'
import React, { forwardRef } from 'react'
import { DataPaginate } from './DataPagination'
import PropTypes from 'prop-types'

export interface DataTableProps {
    className?: string,
    columns: object,
    indexing?: boolean,
    checking?: boolean,
    data: any,
    meta?: any
    psize?: 'lg'|'sm',
    palign?: 'start'|'center'|'end',
    onPageUpdate?: (page: number) => void
}

export const DataTable = forwardRef<HTMLTableElement, DataTableProps>((
  {
    className,
    columns,
    indexing,
    checking,
    data,
    meta,
    psize,
    palign,
    onPageUpdate
  },
  ref
) => {

  const _className = classNames(
    'n-custom-data-table-class',
    className,
  )

  const handlePagination = (page: number) => {
    if(onPageUpdate) return onPageUpdate(page)
  }

  return (
    <React.Fragment>
      <Table ref={ref} striped className={_className}>
        <TableHead color={'primary'}>
          <TableRow>
            {checking && <TableHeaderCell scope={'col'}><FormCheck label={'All'}/></TableHeaderCell>}
            {indexing && <TableHeaderCell scope={'col'}>{'Sr#'}</TableHeaderCell>}
            {columns && Object.entries(columns).map(([column, value]) => {
              return <TableHeaderCell key={column} scope={'col'}>{value}</TableHeaderCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((item: any, index: number) => {
            return (
              <TableRow key={`data-${index}`}>
                {checking && <TableDataCell><FormCheck/></TableDataCell>}
                {indexing && <TableDataCell scope={'col'}>{index+1}</TableDataCell>}
                {columns && Object.entries(columns).map(([column]) => {
                  return <TableDataCell key={`data-${index}-${column}`}>{item[column]}</TableDataCell>
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {(meta.pages>1) && <DataPaginate
        onPageChange={handlePagination}
        meta={meta}
        className={'mb-0 mt-3'}
        align={palign}
        size={psize}
      />}
    </React.Fragment>
  )
})

DataTable.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.any,
  indexing: PropTypes.bool,
  checking: PropTypes.bool,
  data: PropTypes.any,
  meta: PropTypes.any,
  psize: PropTypes.oneOf(['sm', 'lg']),
  palign: PropTypes.oneOf(['start', 'center', 'end']),
  onPageUpdate: PropTypes.func.isRequired
}

DataTable.displayName = 'DataTable'