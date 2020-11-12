import React, { useEffect, useState } from "react"
import { TemplateHandler } from "easy-template-x"
import { Link, useLocation } from "wouter"
import MaterialTable from "material-table"
import { useForm } from "react-hook-form"

import DateFnsUtils from "@date-io/date-fns"
import esLocale from "date-fns/locale/es"
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers"

import { Grid, IconButton, Typography, Container, Button, TextField } from "@material-ui/core"

import { ChevronLeft as ArrowLeftIcon, Printer as PrintIcon } from "react-feather"

import { useGetDocument } from "../hooks/useDocuments"
import { useError } from "../hooks/useError"
import tableIcons from "../utils/tableIcons"
import tableLocalization from "../utils/tableLocalization"
import Navbar from "../components/Navbar"
import { deleteDocument } from "../utils/documents.firebase"

const hideIfEmpty = (cellData) => {
  if (!cellData) {
    return {
      color: "transparent",
    }
  }
}

function DocumentDetails({ data, onSubmit }) {
  const { register, errors, handleSubmit } = useForm()

  const [orderDate, handleOrderDateChange] = useState(data.orderDate)

  const [inicialOrders, setInicialOrders] = useState(data.inicialOrders)
  const [primariaOrders, setPrimariaOrders] = useState(data.primariaOrders)
  const [secundariaOrders, setSecundariaOrders] = useState(data.secundariaOrders)
  const [otrosOrders, setOtrosOrders] = useState(data.otrosOrders)

  const onSubmitInternal = (data) => {
    const convertCountsToNumbers = (documents) =>
      documents.map((document) =>
        Object.fromEntries(
          Object.entries(document).map(([key, val]) =>
            key.startsWith("count") ? [key, Number(val)] : [key, val]
          )
        )
      )

    onSubmit({
      orderNumber: data.orderNumber,
      orderDate,
      schoolName: data.schoolName,
      schoolAddress: data.schoolAddress,
      schoolDepartment: data.schoolDepartment,
      schoolProvince: data.schoolProvince,
      schoolDistrict: data.schoolDistrict,
      schoolRUC: data.schoolRUC,
      schoolTelephone: data.schoolTelephone,
      schoolCellphone: data.schoolCellphone,
      responsableName: data.responsableName,
      responsablePosition: data.responsablePosition,
      responsableEmail: data.responsableEmail,
      inicialOrders: convertCountsToNumbers(inicialOrders),
      primariaOrders: convertCountsToNumbers(primariaOrders),
      secundariaOrders: convertCountsToNumbers(secundariaOrders),
      otrosOrders: convertCountsToNumbers(otrosOrders),
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmitInternal)}>
      <Grid container direction="column" spacing={6}>
        {/*-- Basic Information --*/}
        <Grid item container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h4">Información Básica</Typography>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Grid item>
              <TextField
                variant="outlined"
                label="Número"
                name="orderNumber"
                inputRef={register}
                defaultValue={data.orderNumber}
                fullWidth
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
        </Grid>

        {/*-- School --*/}
        <Grid item container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h4">Colegio</Typography>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Grid item>
              <TextField
                variant="outlined"
                label="Nombre"
                name="schoolName"
                inputRef={register}
                defaultValue={data.schoolName}
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                variant="outlined"
                label="Dirección"
                name="schoolAddress"
                inputRef={register}
                defaultValue={data.schoolAddress}
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                variant="outlined"
                label="Departamento"
                name="schoolDepartment"
                inputRef={register}
                defaultValue={data.schoolDepartment}
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                variant="outlined"
                label="Provincia"
                name="schoolProvince"
                inputRef={register}
                defaultValue={data.schoolProvince}
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                variant="outlined"
                label="Distrito"
                name="schoolDistrict"
                inputRef={register}
                defaultValue={data.schoolDistrict}
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                variant="outlined"
                label="RUC"
                name="schoolRUC"
                inputRef={register({ required: true, maxLength: 11 })}
                error={Boolean(errors.schoolRUC)}
                helperText={
                  Boolean(errors.schoolRUC) ? "El RUC debe contener hasta 11 dígitos" : null
                }
                defaultValue={data.schoolRUC}
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                variant="outlined"
                label="Teléfono fijo"
                name="schoolTelephone"
                inputRef={register({ required: true, maxLength: 6 })}
                error={Boolean(errors.schoolTelephone)}
                helperText={
                  Boolean(errors.schoolTelephone)
                    ? "El teléfono debe contener hasta 6 dígitos"
                    : null
                }
                defaultValue={data.schoolTelephone}
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                variant="outlined"
                label="Celular"
                name="schoolCellphone"
                inputRef={register({ required: true, maxLength: 9 })}
                error={Boolean(errors.schoolCellphone)}
                helperText={
                  Boolean(errors.schoolCellphone)
                    ? "El celular debe contener hasta 9 dígitos"
                    : null
                }
                defaultValue={data.schoolCellphone}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>

        {/*-- Responsable --*/}
        <Grid item container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h4">Responsable</Typography>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Grid item>
              <TextField
                variant="outlined"
                label="Nombre"
                name="responsableName"
                inputRef={register}
                defaultValue={data.responsableName}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                label="Cargo"
                name="responsablePosition"
                inputRef={register}
                defaultValue={data.responsablePosition}
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                variant="outlined"
                label="Correo Electrónico"
                name="responsableEmail"
                inputRef={register}
                defaultValue={data.responsableEmail}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>

        {/*-- Inicial --*/}
        <Grid item container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h4">Inicial</Typography>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Grid item>
              <MaterialTable
                columns={[
                  { title: "Titulo", field: "name" },
                  { title: "Editorial", field: "editorial" },
                  { title: "2 años", field: "count2", align: "right", cellStyle: hideIfEmpty },
                  { title: "3 años", field: "count3", align: "right", cellStyle: hideIfEmpty },
                  { title: "4 años", field: "count4", align: "right", cellStyle: hideIfEmpty },
                  { title: "5 años", field: "count5", align: "right", cellStyle: hideIfEmpty },
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
            </Grid>
          </Grid>
        </Grid>

        {/*-- Primaria --*/}
        <Grid item container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h4">Primaria</Typography>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Grid item>
              <MaterialTable
                style={{
                  width: "100%",
                }}
                columns={[
                  { title: "Titulo", field: "name" },
                  { title: "Editorial", field: "editorial" },
                  { title: "1ero", field: "count1", align: "right", cellStyle: hideIfEmpty },
                  { title: "2do", field: "count2", align: "right", cellStyle: hideIfEmpty },
                  { title: "3ero", field: "count3", align: "right", cellStyle: hideIfEmpty },
                  { title: "4to", field: "count4", align: "right", cellStyle: hideIfEmpty },
                  { title: "5to", field: "count5", align: "right", cellStyle: hideIfEmpty },
                  { title: "6to", field: "count6", align: "right", cellStyle: hideIfEmpty },
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
            </Grid>
          </Grid>
        </Grid>

        {/*-- Secundaria --*/}
        <Grid item container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h4">Secundaria</Typography>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Grid item>
              <MaterialTable
                style={{
                  width: "100%",
                }}
                columns={[
                  { title: "Titulo", field: "name" },
                  { title: "Editorial", field: "editorial" },
                  { title: "1ero", field: "count1", align: "right", cellStyle: hideIfEmpty },
                  { title: "2do", field: "count2", align: "right", cellStyle: hideIfEmpty },
                  { title: "3ero", field: "count3", align: "right", cellStyle: hideIfEmpty },
                  { title: "4to", field: "count4", align: "right", cellStyle: hideIfEmpty },
                  { title: "5to", field: "count5", align: "right", cellStyle: hideIfEmpty },
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
            </Grid>
          </Grid>
        </Grid>

        {/*-- Otros --*/}
        <Grid item container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h4">Otros</Typography>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Grid item>
              <MaterialTable
                style={{
                  width: "100%",
                }}
                columns={[
                  { title: "Titulo", field: "name" },
                  { title: "Cantidad", field: "count", align: "right", cellStyle: hideIfEmpty },
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
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
  return {
    number: data.orderNumber,
    dateDay: data.orderDate.getDay(),
    dateMonth: data.orderDate.getMonth(),
    dateYear: data.orderDate.getFullYear(),

    school: data.schoolName,
    address: data.schoolAddress,
    department: data.department,
    province: data.province,
    district: data.district,

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

    InicialOrders: data.inicialOrders.map((order) => ({
      ...order,
      count2: order.count2 || "",
      count3: order.count3 || "",
      count4: order.count4 || "",
      count5: order.count5 || "",
    })),
    PrimariaOrders: data.primariaOrders.map((order) => ({
      ...order,
      count1: order.count1 || "",
      count2: order.count2 || "",
      count3: order.count3 || "",
      count4: order.count4 || "",
      count5: order.count5 || "",
      count6: order.count6 || "",
    })),
    SecundariaOrders: data.secundariaOrders.map((order) => ({
      ...order,
      count1: order.count1 || "",
      count2: order.count2 || "",
      count3: order.count3 || "",
      count4: order.count4 || "",
      count5: order.count5 || "",
    })),
    OtrosOrders1: data.otrosOrders.slice(0, 9).map((order) => ({
      ...order,
      count: order.count || "",
    })),
    OtrosOrders2: data.otrosOrders.slice(9, 18).map((order) => ({
      ...order,
      count: order.count || "",
    })),
  }
}

function DocumentNavbar({ onClickPrint }) {
  return (
    <Navbar>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Link href="/">
            <IconButton>
              <ArrowLeftIcon color="white" size={24} />
            </IconButton>
          </Link>
        </Grid>
        <Grid item>
          <Typography variant="h5">Documento</Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={onClickPrint}>
            <PrintIcon color="white" size={24} />
          </IconButton>
        </Grid>
      </Grid>
    </Navbar>
  )
}

function Document({ params }) {
  const { id } = params

  const [, setLocation] = useLocation()
  const { throwError } = useError()

  const [data, loading, error] = useGetDocument(id)

  useEffect(() => {
    if (!data && !loading) {
      throwError("Documento no existe")
      setLocation("/")
    }
  }, [throwError, setLocation])

  useEffect(() => {
    if (error) {
      throwError("Error cargando documento")
      setLocation("/")
    }
  }, [error, throwError, setLocation])

  const handleClickPrint = () => {
    downloadFile(toDocumentData(data))
  }

  const handleDelete = () => {
    deleteDocument(id)
    setLocation("/")
  }

  return (
    <Container maxWidth="sm">
      <DocumentNavbar onClickPrint={handleClickPrint} />

      {data ? <DocumentDetails data={data} loading={loading} /> : "cargando..."}

      <Button variant="contained" color="secondary" fullWidth onClick={handleDelete}>
        Eliminar
      </Button>
    </Container>
  )
}

export default Document
