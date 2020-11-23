import React, { useEffect, useState } from "react"
import Table from "./Table"
import { useForm } from "react-hook-form"

const columns = [
  { name: "Titulo", key: "name", editable: true },
  { name: "Editorial", key: "editorial", editable: true },
  { name: "1ero", key: "count1", type: "number", editable: true },
  { name: "2do", key: "count2", type: "number", editable: true },
  { name: "3ero", key: "count3", type: "number", editable: true },
  { name: "4to", key: "count4", type: "number", editable: true },
  { name: "5to", key: "count5", type: "number", editable: true },
  { name: "6to", key: "count6", type: "number", editable: true },
]

const initialRows = [
  {
    name: "Mentematica primero",
    editorial: "Lexicom",
    count1: 0,
    count2: 0,
    count3: 0,
    count4: 0,
    count5: 23,
    count6: 99,
  },
  {
    name: "Mentematica",
    editorial: "Lexicom",
    count1: 0,
    count2: 0,
    count3: 0,
    count4: 0,
    count5: 23,
    count6: 99,
  },
  {
    name: "Mentematica",
    editorial: "Lexicom",
    count1: 0,
    count2: 0,
    count3: 0,
    count4: 0,
    count5: 23,
    count6: 99,
  },
  {
    name: "Mentematica",
    editorial: "Lexicom",
    count1: 0,
    count2: 0,
    count3: 0,
    count4: 0,
    count5: 23,
    count6: 99,
  },
]

function TableTest() {
  const [counter, setCounter] = useState(0)
  const { register, setValue, watch } = useForm({
    mode: "onChange",
    defaultValues: { initialOrders: initialRows },
  })

  const initialOrders = watch("initialOrders")

  useEffect(() => {
    register("initialOrders")
  }, [register])

  const handleChange = (rows) => {
    setValue("initialOrders", rows, { shouldDirty: true })
  }

  const incrementCounter = () => {
    setCounter(counter + 1)
  }

  return (
    <>
      <Table columns={columns} initialRows={initialOrders} onChange={handleChange} />
      <button onClick={incrementCounter}>+1</button>
      <div>{counter}</div>
    </>
  )
}

export default TableTest
