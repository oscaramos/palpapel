import React, { useEffect, useState } from "react"
import { Link, useLocation } from "wouter"
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

import { useOrders } from "../hooks/useOrders"
import { useError } from "../hooks/useError"
import tableIcons from "../utils/tableIcons"
import tableLocalization from "../utils/tableLocalization"

function EditForm({ data, onSubmit }) {
  const [orderNumber, setOrderNumber] = useState(data.orderNumber)
  const [orderDate, handleOrderDateChange] = useState(data.orderDate)

  const [schoolName, setSchoolName] = useState(data.schoolName)
  const [schoolAddress, setSchoolAddress] = useState(data.schoolAddress)
  const [schoolRUC, setSchoolRUC] = useState(data.schoolRUC)
  const [schoolTelephone, setSchoolTelephone] = useState(data.schoolTelephone)
  const [schoolCellphone, setSchoolCellphone] = useState(data.schoolCellphone)

  const [responsableName, setResponsableName] = useState(data.responsableName)
  const [responsablePosition, setResponsablePosition] = useState(
    data.responsablePosition
  )
  const [responsableEmail, setResponsableEmail] = useState(
    data.responsableEmail
  )

  const [inicialOrders, setInicialOrders] = useState(data.inicialOrders)
  const [primariaOrders, setPrimariaOrders] = useState(data.primariaOrders)
  const [secundariaOrders, setSecundariaOrders] = useState(
    data.secundariaOrders
  )
  const [otrosOrders, setOtrosOrders] = useState(data.otrosOrders)

  const handleClick = () => {
    onSubmit({
      orderNumber,
      orderDate,
      schoolName,
      schoolAddress,
      schoolRUC,
      schoolTelephone,
      schoolCellphone,
      responsableName,
      responsablePosition,
      responsableEmail,
      inicialOrders,
      primariaOrders,
      secundariaOrders,
      otrosOrders,
    })
  }

  return (
    <Grid container direction="column">
      {/*-- Order --*/}
      <Grid item container direction="column" spacing={1}>
        <Grid item>
          <Typography variant="h2">Orden</Typography>
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="Número"
            placeholder="000001"
            fullWidth
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />
        </Grid>
        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <DatePicker
              label="Fecha"
              value={orderDate}
              onChange={handleOrderDateChange}
              inputVariant="outlined"
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>

      {/*-- School --*/}
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Typography variant="h2">Colegio</Typography>
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="Nombre"
            placeholder=""
            fullWidth
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="Dirección"
            placeholder=""
            fullWidth
            value={schoolAddress}
            onChange={(e) => setSchoolAddress(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="RUC"
            placeholder=""
            fullWidth
            value={schoolRUC}
            onChange={(e) => setSchoolRUC(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="Teléfono"
            placeholder=""
            fullWidth
            value={schoolTelephone}
            onChange={(e) => setSchoolTelephone(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="Celular"
            placeholder="(704) 555-0120"
            fullWidth
            value={schoolCellphone}
            onChange={(e) => setSchoolCellphone(e.target.value)}
          />
        </Grid>
      </Grid>

      {/*-- Responsable --*/}
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Typography variant="h2">Responsable</Typography>
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="Nombre"
            placeholder=""
            fullWidth
            value={responsableName}
            onChange={(e) => setResponsableName(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="Cargo"
            placeholder=""
            fullWidth
            value={responsablePosition}
            onChange={(e) => setResponsablePosition(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="Correo Electrónico"
            placeholder=""
            fullWidth
            value={responsableEmail}
            onChange={(e) => setResponsableEmail(e.target.value)}
          />
        </Grid>
      </Grid>

      {/*-- Inicial --*/}
      <Grid
        container
        direction="column"
        spacing={1}
        style={{ marginTop: "1rem" }}
      >
        <Grid item>
          <Typography variant="h2">Inicial</Typography>
        </Grid>
        <Grid container item>
          <MaterialTable
            style={{
              width: "100%",
            }}
            columns={[
              { title: "Titulo", field: "name" },
              { title: "Editorial", field: "editorial" },
              { title: "2 años", field: "count2", type: "numeric" },
              { title: "3 años", field: "count3", type: "numeric" },
              { title: "4 años", field: "count4", type: "numeric" },
              { title: "5 años", field: "count5", type: "numeric" },
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
            }}
            icons={tableIcons}
            localization={tableLocalization}
          />
        </Grid>
      </Grid>

      {/*-- Primaria --*/}
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Typography variant="h2">Primaria</Typography>
        </Grid>
        <Grid container item>
          <MaterialTable
            style={{
              width: "100%",
            }}
            columns={[
              { title: "Titulo", field: "name" },
              { title: "Editorial", field: "editorial" },
              { title: "1ero", field: "count1", type: "numeric" },
              { title: "2do", field: "count2", type: "numeric" },
              { title: "3ero", field: "count3", type: "numeric" },
              { title: "4to", field: "count4", type: "numeric" },
              { title: "5to", field: "count5", type: "numeric" },
              { title: "6to", field: "count6", type: "numeric" },
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
            }}
            icons={tableIcons}
            localization={tableLocalization}
          />
        </Grid>
      </Grid>

      {/*-- Secundaria --*/}
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Typography variant="h2">Secundaria</Typography>
        </Grid>
        <Grid container item>
          <MaterialTable
            style={{
              width: "100%",
            }}
            columns={[
              { title: "Titulo", field: "name" },
              { title: "Editorial", field: "editorial" },
              { title: "1ero", field: "count1", type: "numeric" },
              { title: "2do", field: "count2", type: "numeric" },
              { title: "3ero", field: "count3", type: "numeric" },
              { title: "4to", field: "count4", type: "numeric" },
              { title: "5to", field: "count5", type: "numeric" },
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
            }}
            icons={tableIcons}
            localization={tableLocalization}
          />
        </Grid>
      </Grid>

      {/*-- Otros --*/}
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Typography variant="h2">Otros</Typography>
        </Grid>
        <Grid container item>
          <MaterialTable
            style={{
              width: "100%",
            }}
            columns={[
              { title: "Titulo", field: "name" },
              { title: "Cantidad", field: "count", type: "numeric" },
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
            }}
            icons={tableIcons}
            localization={tableLocalization}
          />
        </Grid>
      </Grid>

      {/*-- Operations --*/}
      <Grid container direction="column" style={{ marginTop: "2rem" }}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClick}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

function Edit({ params }) {
  const { id } = params

  const [, setLocation] = useLocation()
  const { throwError } = useError()

  const {
    getOrder: [getOrder, data, loading, error],
    editOrder,
  } = useOrders()

  useEffect(() => {
    const requestOrder = async () => {
      const data = await getOrder(id)
      if (!data) {
        throwError("Order does not exists")
        setLocation("/")
      }
    }
    requestOrder()
  }, [getOrder, id, setLocation, throwError])

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
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <CircularProgress style={{ alignText: "center" }} />
        </div>
      ) : data ? (
        <EditForm data={data} onSubmit={handleSave} />
      ) : null}
    </Container>
  )
}

export default Edit
