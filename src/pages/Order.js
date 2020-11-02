import React, { useEffect } from "react"
import { TemplateHandler } from "easy-template-x"
import { Link, useLocation } from "wouter"
import MaterialTable from "material-table"

import {
  Grid,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  CircularProgress,
} from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"

import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import PrintIcon from "@material-ui/icons/Print"
import ShareIcon from "@material-ui/icons/Share"

import { useOrders } from "../hooks/useOrders"
import { useError } from "../hooks/useError"
import tableIcons from "../utils/tableIcons"
import tableLocalization from "../utils/tableLocalization"

function OrderToolBar({ data, loading, onClickDownload }) {
  return (
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
      <Toolbar style={{ color: "black" }} disableGutters>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Link href="/">
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
            </Link>
          </Grid>
          {loading ? (
            <Grid item>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Skeleton
                  variant="rect"
                  width={120}
                  height={20}
                  style={{ marginBottom: "1rem" }}
                />
                <Skeleton variant="rect" width={100} height={15} />
              </Grid>
            </Grid>
          ) : (
            <Grid item>
              <Typography variant="h5" align="center">
                Nº {data?.orderNumber}
              </Typography>
              <Typography variant="h6" align="center">
                {data?.orderDisplayDate}
              </Typography>
            </Grid>
          )}
          <Grid item>
            <IconButton style={{ position: "absolute", marginLeft: "-2.5rem" }}>
              <ShareIcon />
            </IconButton>
            <IconButton onClick={onClickDownload}>
              <PrintIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

function OrderDetails({ data, loading }) {
  const label = {
    opacity: "0.4",
  }

  if (!data) {
    return null
  }

  if (loading) {
    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <CircularProgress style={{ alignText: "center" }} />
      </div>
    )
  }

  return (
    <Grid container direction="column">
      <Typography variant="h2">Colegio</Typography>
      <div style={label}>Nombre</div>
      <Typography variant="body1">{data.schoolName}</Typography>
      <div style={label}>Dirección</div>
      <Typography variant="body1">{data.schoolAddress}</Typography>
      <div style={label}>RUC</div>
      <Typography variant="body1">{data.schoolRUC}</Typography>
      <div style={label}>Teléfono</div>
      <Typography variant="body1">{data.schoolTelephone}</Typography>

      <Typography variant="h2">Responsable</Typography>
      <div style={label}>Nombre</div>
      <Typography variant="body1">{data.responsableName}</Typography>
      <div style={label}>Cargo</div>
      <Typography variant="body1">{data.responsablePosition}</Typography>
      <div style={label}>Correo Electrónico</div>
      <Typography variant="body1">{data.responsableEmail}</Typography>

      <Typography variant="h2">Inicial</Typography>
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
        data={data.inicialOrders}
        options={{
          toolbar: false,
          paging: false,
        }}
        icons={tableIcons}
        localization={tableLocalization}
      />

      <Typography variant="h2">Primaria</Typography>
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
        data={data.primariaOrders}
        options={{
          toolbar: false,
          paging: false,
        }}
        icons={tableIcons}
        localization={tableLocalization}
      />

      <Typography variant="h2">Secundaria</Typography>
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
        data={data.secundariaOrders}
        options={{
          toolbar: false,
          paging: false,
        }}
        icons={tableIcons}
        localization={tableLocalization}
      />

      <Typography variant="h2">Otros</Typography>
      <MaterialTable
        style={{
          width: "100%",
        }}
        columns={[
          { title: "Titulo", field: "name" },
          { title: "Cantidad", field: "count", type: "numeric" },
        ]}
        data={data.otrosOrders}
        options={{
          toolbar: false,
          paging: false,
        }}
        icons={tableIcons}
        localization={tableLocalization}
      />
    </Grid>
  )
}

const saveFile = (filename, blob) => {
  // see: https://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link

  // get downloadable url from the blob
  const blobUrl = URL.createObjectURL(blob)

  // create temp link element
  let link = document.createElement("a")
  link.download = filename
  link.href = blobUrl

  // use the link to invoke a download
  document.body.appendChild(link)
  link.click()

  // remove the link
  setTimeout(() => {
    link.remove()
    window.URL.revokeObjectURL(blobUrl)
    link = null
  }, 0)
}

const downloadFile = async (data) => {
  // Read template file
  const resp = await fetch("/template.docx")
  const templateFile = await resp.blob()

  // Process the template
  const handler = new TemplateHandler()
  const doc = await handler.process(templateFile, data)

  // Save output
  saveFile("output.docx", doc)
}

const toDocumentData = (data) => {
  if (
    data.schoolTelephone.length > 9 ||
    data.schoolRUC.length > 11 ||
    data.schoolTelephone.length > 9
  ) {
    return null
  }

  return {
    number: data.orderNumber,
    dateDay: data.orderDate.getDay(),
    dateMonth: data.orderDate.getMonth(),
    dateYear: data.orderDate.getFullYear(),

    school: data.schoolName,
    address: data.schoolAddress,

    telephone1: data.schoolTelephone[0],
    telephone2: data.schoolTelephone[1],
    telephone3: data.schoolTelephone[2],
    telephone4: data.schoolTelephone[3],
    telephone5: data.schoolTelephone[4],
    telephone6: data.schoolTelephone[5],
    telephone7: data.schoolTelephone[6],
    telephone8: data.schoolTelephone[7],
    telephone9: data.schoolTelephone[8],

    ruc1: data.schoolRUC[0],
    ruc2: data.schoolRUC[1],
    ruc3: data.schoolRUC[2],
    ruc4: data.schoolRUC[3],
    ruc5: data.schoolRUC[4],
    ruc6: data.schoolRUC[5],
    ruc7: data.schoolRUC[6],
    ruc8: data.schoolRUC[7],
    ruc9: data.schoolRUC[8],
    ruc10: data.schoolRUC[9],
    ruc11: data.schoolRUC[10],

    cellphone1: data.schoolCellphone[0],
    cellphone2: data.schoolCellphone[1],
    cellphone3: data.schoolCellphone[2],
    cellphone4: data.schoolCellphone[3],
    cellphone5: data.schoolCellphone[4],
    cellphone6: data.schoolCellphone[5],
    cellphone7: data.schoolCellphone[6],
    cellphone8: data.schoolCellphone[7],
    cellphone9: data.schoolCellphone[8],

    responsableName: data.responsableName,
    responsablePosition: data.responsablePosition,
    responsableEmail: data.responsableEmail,

    InicialOrders: data.inicialOrders,
    PrimariaOrders: data.primariaOrders,
    SecundariaOrders: data.secundariaOrders,
    OtrosOrders1: data.otrosOrders.slice(0, 9),
    OtrosOrders2: data.otrosOrders.slice(9, 18),
  }
}

function Order({ params }) {
  const { id } = params

  const [, setLocation] = useLocation()
  const { throwError } = useError()

  const {
    getOrder: [getOrder, data, loading, error],
    deleteOrder,
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

  const handleClickDownload = () => {
    downloadFile(toDocumentData(data))
  }

  const handleDelete = () => {
    deleteOrder(id)
    setLocation("/")
  }

  return (
    <Container maxWidth="sm">
      <OrderToolBar
        data={data}
        loading={loading}
        onClickDownload={handleClickDownload}
      />

      <OrderDetails data={data} loading={loading} />

      <Grid container direction="column" style={{ marginTop: "2rem" }}>
        <Grid item>
          <Link href={`/edit/${id}`}>
            <Button variant="contained" color="primary" fullWidth>
              Modificar
            </Button>
          </Link>
        </Grid>
        <Grid item style={{ marginTop: "0.5rem" }}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleDelete}
          >
            Eliminar
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Order
