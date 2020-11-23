import React, { useCallback, useEffect, useState } from "react"
import ReactDataGrid from "react-data-grid"
import usePrevious from "../../hooks/usePrevious"

const isObject = (object) => object != null && typeof object === "object"

const areObjectsDeepEqual = (object1, object2) => {
  if (!isObject(object1) || !isObject(object2)) {
    return false
  }

  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    const val1 = object1[key]
    const val2 = object2[key]
    const areObjects = isObject(val1) && isObject(val2)
    if ((areObjects && !areObjectsDeepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
      return false
    }
  }

  return true
}

const forEachCell = (rows, columns, listenerTypes) => {
  const { number, string } = listenerTypes

  return rows.map((row) => {
    const newRow = { ...row }
    for (const column of columns) {
      newRow[column.key] =
        column.type === "number" ? number(row[column.key]) : string(row[column.key])
    }
    return newRow
  })
}

const processEachCell = (rows, columns) => {
  return forEachCell(rows, columns, {
    number: (value) => Number(value),
    string: (value) => String(value).trim(),
  })
}

function InnerTable({ columns, editedRows, onGridRowsUpdated }) {
  return (
    <div style={{ maxWidth: "100%" }}>
      <ReactDataGrid
        columns={columns}
        rowGetter={(i) => editedRows[i]}
        rowsCount={editedRows.length}
        onGridRowsUpdated={onGridRowsUpdated}
        enableCellSelect={true}
      />
    </div>
  )
}

// eslint-disable-next-line
InnerTable = React.memo(InnerTable)

function Table({ columns, initialRows, onChange }) {
  const [editedRows, setEditedRows] = useState(() => processEachCell(initialRows, columns))
  const prevEditedRows = usePrevious(editedRows)

  const onGridRowsUpdated = useCallback(
    ({ fromRow, toRow, updated }) => {
      setEditedRows((rows) => {
        const withEdited = [...rows]
        for (let i = fromRow; i <= toRow; i++) {
          withEdited[i] = { ...withEdited[i], ...updated }
        }

        return processEachCell(withEdited, columns)
      })
    },
    [columns]
  )

  useEffect(() => {
    if (!areObjectsDeepEqual(prevEditedRows, editedRows)) {
      onChange(editedRows)
    }
  }, [editedRows, onChange, prevEditedRows])

  return (
    <InnerTable columns={columns} editedRows={editedRows} onGridRowsUpdated={onGridRowsUpdated} />
  )
}

export default Table
