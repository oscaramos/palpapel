import React, { useEffect, useState } from "react"
import { Link, useLocation } from "wouter"
import { useForm } from "react-hook-form"
import MaterialTable from "material-table"
import esLocale from "date-fns/locale/es"

import {
  Grid,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core"
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"

import DateFnsUtils from "@date-io/date-fns"

import { editOrder, useGetOrder } from "../hooks/useOrders"
import { useError } from "../hooks/useError"
import tableIcons from "../utils/tableIcons"
import tableLocalization from "../utils/tableLocalization"

const hideIfEmpty = (cellData) => {
  if (!cellData) {
    return {
      color: "transparent",
    }
  }
}

function EditForm({ data, onSubmit }) {
  const { register, errors, handleSubmit } = useForm()

  const [orderDate, handleOrderDateChange] = useState(data.orderDate)

  const [inicialOrders, setInicialOrders] = useState(data.inicialOrders)
  const [primariaOrders, setPrimariaOrders] = useState(data.primariaOrders)
  const [secundariaOrders, setSecundariaOrders] = useState(data.secundariaOrders)
  const [otrosOrders, setOtrosOrders] = useState(data.otrosOrders)

  const onSubmitInternal = (data) => {
    onSubmit({
      orderNumber: data.orderNumber,
      orderDate,
      schoolName: data.schoolName,
      schoolAddress: data.schoolAddress,
      schoolRUC: data.schoolRUC,
      schoolTelephone: data.schoolTelephone,
      schoolCellphone: data.schoolCellphone,
      responsableName: data.responsableName,
      responsablePosition: data.responsablePosition,
      responsableEmail: data.responsableEmail,
      inicialOrders,
      primariaOrders,
      secundariaOrders,
      otrosOrders,
    })
  }

  return (
    <form
      style={{ display: "flex", flexDirection: "column", gap: 8 }}
      onSubmit={handleSubmit(onSubmitInternal)}
    >
      {/*-- Order --*/}
      <Typography variant="h2">Orden</Typography>
      <TextField
        variant="outlined"
        label="Número"
        placeholder="000001"
        fullWidth
        name="orderNumber"
        inputRef={register}
        defaultValue={data.orderNumber}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
        <DatePicker
          label="Fecha"
          value={orderDate}
          onChange={handleOrderDateChange}
          inputVariant="outlined"
          fullWidth
        />
      </MuiPickersUtilsProvider>

      {/*-- School --*/}
      <Typography variant="h2">Colegio</Typography>
      <TextField
        variant="outlined"
        label="Nombre"
        name="schoolName"
        inputRef={register}
        defaultValue={data.schoolName}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Dirección"
        name="schoolAddress"
        inputRef={register}
        defaultValue={data.schoolAddress}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="RUC"
        name="schoolRUC"
        inputRef={register({ required: true, maxLength: 11 })}
        error={Boolean(errors.schoolRUC)}
        helperText={Boolean(errors.schoolRUC) ? "El RUC debe contener hasta 11 dígitos" : null}
        defaultValue={data.schoolRUC}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Teléfono fijo"
        name="schoolTelephone"
        inputRef={register({ required: true, maxLength: 6 })}
        error={Boolean(errors.schoolTelephone)}
        helperText={
          Boolean(errors.schoolTelephone) ? "El teléfono debe contener hasta 6 dígitos" : null
        }
        defaultValue={data.schoolTelephone}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Celular"
        name="schoolCellphone"
        inputRef={register({ required: true, maxLength: 9 })}
        error={Boolean(errors.schoolCellphone)}
        helperText={
          Boolean(errors.schoolCellphone) ? "El celular debe contener hasta 9 dígitos" : null
        }
        defaultValue={data.schoolCellphone}
        fullWidth
      />

      {/*-- Responsable --*/}
      <Typography variant="h2">Responsable</Typography>
      <TextField
        variant="outlined"
        label="Nombre"
        name="responsableName"
        inputRef={register}
        defaultValue={data.responsableName}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Cargo"
        name="responsablePosition"
        inputRef={register}
        defaultValue={data.responsablePosition}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Correo Electrónico"
        name="responsableEmail"
        inputRef={register}
        defaultValue={data.responsableEmail}
        fullWidth
      />

      {/*-- Inicial --*/}
      <Typography variant="h2" style={{ marginTop: "1rem" }}>
        Inicial
      </Typography>
      <MaterialTable
        style={{
          width: "100%",
        }}
        columns={[
          { title: "Titulo", field: "name" },
          { title: "Editorial", field: "editorial" },
          { title: "2 años", field: "count2", type: "numeric", cellStyle: hideIfEmpty },
          { title: "3 años", field: "count3", type: "numeric", cellStyle: hideIfEmpty },
          { title: "4 años", field: "count4", type: "numeric", cellStyle: hideIfEmpty },
          { title: "5 años", field: "count5", type: "numeric", cellStyle: hideIfEmpty },
        ]}
        data={inicialOrders}
        editable={{
          onRowUpdate: async (newData, oldData) => {
            const dataUpdate = [...inicialOrders]
            const index = oldData.tableData.id
            dataUpdate[index] = newData
            setInicialOrders([...dataUpdate])
          },
        }}
        options={{
          toolbar: false,
          paging: false,
          sorting: false,
        }}
        icons={tableIcons}
        localization={tableLocalization}
      />

      {/*-- Primaria --*/}
      <Typography variant="h2">Primaria</Typography>
      <MaterialTable
        style={{
          width: "100%",
        }}
        columns={[
          { title: "Titulo", field: "name" },
          { title: "Editorial", field: "editorial" },
          { title: "1ero", field: "count1", type: "numeric", cellStyle: hideIfEmpty },
          { title: "2do", field: "count2", type: "numeric", cellStyle: hideIfEmpty },
          { title: "3ero", field: "count3", type: "numeric", cellStyle: hideIfEmpty },
          { title: "4to", field: "count4", type: "numeric", cellStyle: hideIfEmpty },
          { title: "5to", field: "count5", type: "numeric", cellStyle: hideIfEmpty },
          { title: "6to", field: "count6", type: "numeric", cellStyle: hideIfEmpty },
        ]}
        data={primariaOrders}
        editable={{
          onRowUpdate: async (newData, oldData) => {
            const dataUpdate = [...primariaOrders]
            const index = oldData.tableData.id
            dataUpdate[index] = newData
            setPrimariaOrders([...dataUpdate])
          },
        }}
        options={{
          toolbar: false,
          paging: false,
          sorting: false,
        }}
        icons={tableIcons}
        localization={tableLocalization}
      />

      {/*-- Secundaria --*/}
      <Typography variant="h2">Secundaria</Typography>
      <MaterialTable
        style={{
          width: "100%",
        }}
        columns={[
          { title: "Titulo", field: "name" },
          { title: "Editorial", field: "editorial" },
          { title: "1ero", field: "count1", type: "numeric", cellStyle: hideIfEmpty },
          { title: "2do", field: "count2", type: "numeric", cellStyle: hideIfEmpty },
          { title: "3ero", field: "count3", type: "numeric", cellStyle: hideIfEmpty },
          { title: "4to", field: "count4", type: "numeric", cellStyle: hideIfEmpty },
          { title: "5to", field: "count5", type: "numeric", cellStyle: hideIfEmpty },
        ]}
        data={secundariaOrders}
        editable={{
          onRowUpdate: async (newData, oldData) => {
            const dataUpdate = [...secundariaOrders]
            const index = oldData.tableData.id
            dataUpdate[index] = newData
            setSecundariaOrders([...dataUpdate])
          },
        }}
        options={{
          toolbar: false,
          paging: false,
          sorting: false,
        }}
        icons={tableIcons}
        localization={tableLocalization}
      />

      {/*-- Otros --*/}
      <Typography variant="h2">Otros</Typography>
      <MaterialTable
        style={{
          width: "100%",
        }}
        columns={[
          { title: "Titulo", field: "name" },
          { title: "Cantidad", field: "count", type: "numeric", cellStyle: hideIfEmpty },
        ]}
        data={otrosOrders}
        editable={{
          onRowUpdate: async (newData, oldData) => {
            const dataUpdate = [...otrosOrders]
            const index = oldData.tableData.id
            dataUpdate[index] = newData
            setOtrosOrders([...dataUpdate])
          },
        }}
        options={{
          toolbar: false,
          paging: false,
          sorting: false,
        }}
        icons={tableIcons}
        localization={tableLocalization}
      />

      {/*-- Operations --*/}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        style={{ marginTop: "2rem" }}
      >
        Guardar
      </Button>
    </form>
  )
}

function Edit({ params }) {
  const { id } = params

  const [, setLocation] = useLocation()
  const { throwError } = useError()

  const [getOrder, data, loading, error] = useGetOrder()

  useEffect(() => {
    if (id) {
      getOrder(id)
    }
  }, [getOrder, id])

  useEffect(() => {
    if (!data && !loading) {
      throwError("Order does not exists")
      setLocation("/")
    }
  }, [throwError, setLocation])

  useEffect(() => {
    if (error) {
      throwError("Error loading order")
      setLocation("/")
    }
  }, [error, throwError, setLocation])

  const handleSave = (data) => {
    editOrder(id, {
      orderNumber: data.orderNumber,
      orderDate: new Date(data.orderDate),
      schoolName: data.schoolName,
      schoolAddress: data.schoolAddress,
      schoolRUC: data.schoolRUC,
      schoolTelephone: data.schoolTelephone,
      schoolCellphone: data.schoolCellphone,
      responsableName: data.responsableName,
      responsablePosition: data.responsablePosition,
      responsableEmail: data.responsableEmail,
      inicialOrders: data.inicialOrders,
      primariaOrders: data.primariaOrders,
      secundariaOrders: data.secundariaOrders,
      otrosOrders: data.otrosOrders,
    })
    setLocation(`/order/${id}`)
  }

  return (
    <Container maxWidth="sm">
      <AppBar
        position="sticky"
        variant="outlined"
        style={{
          backgroundColor: "white",
          borderBottom: "2px solid rgba(0, 0, 0, 0.12)",
          borderLeft: "none",
          borderRight: "none",
          borderTop: "none",
        }}
      >
        <Toolbar disableGutters style={{ color: "black" }}>
          <Link href="/">
            <IconButton style={{ position: "absolute" }}>
              <ArrowBackIcon />
            </IconButton>
          </Link>
          <Grid container direction="row" justify="center">
            <Grid item>
              <Typography variant="h5" align="center">
                Crear Orden
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {loading ? (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <CircularProgress style={{ alignText: "center" }} />
        </div>
      ) : data ? (
        <EditForm data={data} onSubmit={handleSave} />
      ) : null}
    </Container>
  )
}

export default Edit
