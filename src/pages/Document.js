import React, { useEffect, useState, useCallback } from "react"
import MaterialTable from "material-table"
import { TemplateHandler } from "easy-template-x"
import { Link, useLocation } from "wouter"
import { useForm, Controller } from "react-hook-form"

import DateFnsUtils from "@date-io/date-fns"
import esLocale from "date-fns/locale/es"
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"

import {
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  MenuItem,
} from "@material-ui/core"

import {
  ChevronLeft as ArrowLeftIcon,
  Download as DownloadIcon,
  Save as SaveIcon,
} from "react-feather"

import Navbar from "../components/Navbar"
import ReactHookFormSelect from "../components/ReackHookFormSelect"
import { useGetDocument } from "../hooks/useDocuments"
import { useError } from "../hooks/useError"

import tableIcons from "../utils/tableIcons"
import tableLocalization from "../utils/tableLocalization"
import { defaultDocumentValues, deleteDocument, updateDocument } from "../utils/documents.firebase"
import { toDisplayDate } from "../utils/date"

const hideIfEmpty = (cellData) => {
  if (!cellData) {
    return {
      color: "transparent",
    }
  }
}

const convertCountsToNumbers = (documents) =>
  documents.map((document) =>
    Object.fromEntries(
      Object.entries(document).map(([key, val]) =>
        key.startsWith("count") ? [key, Number(val)] : [key, val]
      )
    )
  )

const toFirebaseData = (formData) => {
  return {
    ...formData,
    inicialOrders: convertCountsToNumbers(formData.inicialOrders),
    primariaOrders: convertCountsToNumbers(formData.primariaOrders),
    secundariaOrders: convertCountsToNumbers(formData.secundariaOrders),
    otrosOrders: convertCountsToNumbers(formData.otrosOrders),
  }
}

const getDefaultValues = (initialData) => {
  // check if every field(key) of defaultDocumentValues exists in initialData(from firestore)
  // If it exists, then user initialData, otherwise use defaultValue
  return Object.fromEntries(
    Object.entries(defaultDocumentValues).map(([key, defaultValue]) => [
      key,
      key in initialData ? initialData[key] : defaultValue,
    ])
  )
}

const errorHelperText = {
  schoolRUC: "El RUC debe contener hasta 11 dígitos",
  schoolTelephone: "El teléfono debe contener hasta 6 dígitos",
}

function Separator() {
  return (
    <div
      style={{
        width: "100%",
        height: 2,
        backgroundColor: "#CBCBD4",
      }}
    />
  )
}

function DocumentDetails({
  initialData,
  onIsValidForm,
  onIsDirtyForm,
  isClickedPrint,
  isClickedEdit,
  onPrint,
  onEdit,
}) {
  const { register, errors, formState, getValues, reset, control, setValue, watch } = useForm({
    mode: "onChange",
    defaultValues: getDefaultValues(initialData),
  })

  const { isValid, isDirty } = formState

  const { throwError } = useError()

  const inicialOrders = watch("inicialOrders")
  const primariaOrders = watch("primariaOrders")
  const secundariaOrders = watch("secundariaOrders")
  const otrosOrders = watch("otrosOrders")

  const getFirebaseData = useCallback(() => {
    return toFirebaseData(getValues())
  }, [getValues])

  // Register tables to react-hook-form
  useEffect(() => {
    register("inicialOrders")
    register("primariaOrders")
    register("secundariaOrders")
    register("otrosOrders")
  }, [register])

  // Print the saved data
  useEffect(() => {
    if (isClickedPrint) {
      onPrint(getFirebaseData())
    }
  }, [isClickedPrint, getFirebaseData, onPrint])

  // Edit the saved data
  useEffect(() => {
    if (isClickedEdit) {
      // Editing the saved data
      onEdit(getFirebaseData())
      // Reset isDirtyForm with current data to disable save button
      reset(getValues())
    }
  }, [isClickedEdit, getFirebaseData, onEdit, getValues, reset])

  useEffect(() => {
    if (!isValid) {
      let message = null
      message = errors.schoolRUC ? errorHelperText.schoolRUC : message
      message = !message && errors.schoolTelephone ? errorHelperText.schoolTelephone : message

      if (!message) return
      throwError(message)
    }
  }, [onIsValidForm, isValid, errors, throwError])

  // Events listeners for parent component
  useEffect(() => {
    onIsValidForm(isValid)
  }, [onIsValidForm, isValid])

  useEffect(() => {
    onIsDirtyForm(isDirty)
  }, [onIsDirtyForm, isDirty])

  // When unmounting then save data to firestore
  // useUnmount(
  //   ([getFirebaseData]) => {
  //     if (isValid) {
  //       onEdit(getFirebaseData())
  //     }
  //   },
  //   [getFirebaseData]
  // )

  return (
    <form>
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
                fullWidth
              />
            </Grid>

            <Grid item>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                <Controller
                  as={DatePicker}
                  name="orderDate"
                  label="Fecha"
                  inputVariant="outlined"
                  control={control}
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
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                variant="outlined"
                label="RUC"
                name="schoolRUC"
                inputRef={register({ maxLength: 11 })}
                error={Boolean(errors.schoolRUC)}
                helperText={Boolean(errors.schoolRUC) ? errorHelperText.schoolRUC : null}
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                variant="outlined"
                label="Director"
                name="schoolDirector"
                inputRef={register}
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                variant="outlined"
                label="Teléfono fijo"
                name="schoolTelephone"
                inputRef={register({ maxLength: 6 })}
                error={Boolean(errors.schoolTelephone)}
                helperText={
                  Boolean(errors.schoolTelephone) ? errorHelperText.schoolTelephone : null
                }
                fullWidth
              />
            </Grid>

            <Grid item>
              <Separator />
            </Grid>

            <Grid item>
              <TextField
                variant="outlined"
                label="Dirección"
                name="schoolAddress"
                inputRef={register}
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                variant="outlined"
                label="Departamento"
                name="schoolDepartment"
                inputRef={register}
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                variant="outlined"
                label="Provincia"
                name="schoolProvince"
                inputRef={register}
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                variant="outlined"
                label="Distrito"
                name="schoolDistrict"
                inputRef={register}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>

        {/*-- Responsable --*/}
        <Grid item container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h4">Recepción</Typography>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Grid item>
              <TextField
                variant="outlined"
                label="Responsable"
                name="responsableName"
                inputRef={register}
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                variant="outlined"
                label="Correo Electrónico"
                name="responsableEmail"
                inputRef={register}
                fullWidth
              />
            </Grid>

            <Grid item>
              <ReactHookFormSelect
                id="salesMethod"
                name="salesMethod"
                label="Método de Venta"
                control={control}
                variant="outlined"
                fullWidth
              >
                <MenuItem value="venta_directa">Venta Directa</MenuItem>
                <MenuItem value="punto_de_venta">Punto de Venta</MenuItem>
                <MenuItem value="libreria">Librería</MenuItem>
                <MenuItem value="distribuidor">Distribuidor</MenuItem>
                <MenuItem value="feria">Feria</MenuItem>
              </ReactHookFormSelect>
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
                    setValue("inicialOrders", [...dataUpdate], { shouldDirty: true })
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
                    setValue("primariaOrders", [...dataUpdate], { shouldDirty: true })
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
                    setValue("secundariaOrders", [...dataUpdate], { shouldDirty: true })
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
                    setValue("otrosOrders", [...dataUpdate], { shouldDirty: true })
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

const downloadFile = async (data, filename) => {
  // Read template file
  const resp = await fetch("/template.docx")
  const templateFile = await resp.blob()

  // Process the template
  const handler = new TemplateHandler()
  const doc = await handler.process(templateFile, data)

  // Save output
  saveFile(filename, doc)
}

const toDocumentData = (data) => {
  return {
    ...data,
    date: toDisplayDate(data.orderDate),

    venta_directa: data.salesMethod === "venta_directa" ? "x" : "",
    punto_de_venta: data.salesMethod === "punto_de_venta" ? "x" : "",
    libreria: data.salesMethod === "libreria" ? "x" : "",
    distribuidor: data.salesMethod === "distribuidor" ? "x" : "",
    feria: data.salesMethod === "feria" ? "x" : "",

    InicialOrders: data.inicialOrders.slice(0, 3).map((order) => ({
      ...order,
      count2: order.count2 || "",
      count3: order.count3 || "",
      count4: order.count4 || "",
      count5: order.count5 || "",
    })),
    PrimariaOrders: data.primariaOrders.slice(0, 8).map((order) => ({
      ...order,
      count1: order.count1 || "",
      count2: order.count2 || "",
      count3: order.count3 || "",
      count4: order.count4 || "",
      count5: order.count5 || "",
      count6: order.count6 || "",
    })),
    SecundariaOrders: data.secundariaOrders.slice(0, 6).map((order) => ({
      ...order,
      count1: order.count1 || "",
      count2: order.count2 || "",
      count3: order.count3 || "",
      count4: order.count4 || "",
      count5: order.count5 || "",
    })),
    OtrosOrders1: data.otrosOrders.slice(0, 7).map((order) => ({
      ...order,
      count: order.count || "",
    })),
    OtrosOrders2: data.otrosOrders.slice(7, 14).map((order) => ({
      ...order,
      count: order.count || "",
    })),
  }
}

function DocumentNavbar({ onClickPrint, onClickEdit, disableEdit, disablePrint }) {
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
          <Grid container direction="row">
            <Grid item>
              <IconButton onClick={onClickEdit} disabled={disableEdit}>
                <SaveIcon color={disableEdit ? "#A6A6AA" : "white"} size={24} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={onClickPrint} disabled={disablePrint}>
                <DownloadIcon color={disablePrint ? "#A6A6AA" : "white"} size={24} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Navbar>
  )
}

function Document({ params }) {
  const { id } = params

  const [, setLocation] = useLocation()
  const { throwError } = useError()

  const [initialData, loading, error] = useGetDocument(id)

  const [isValidForm, setIsValidForm] = useState(false)
  const [isDirtyForm, setIsDirtyForm] = useState(false)
  const [isClickedPrint, setIsClickedPrint] = useState(false)
  const [isClickedEdit, setIsClickedEdit] = useState(false)

  useEffect(() => {
    if (!initialData && !loading) {
      throwError("Documento no existe")
      setLocation("/")
    }
  }, [initialData, loading, throwError, setLocation])

  useEffect(() => {
    if (error) {
      throwError("Error cargando documento")
      setLocation("/")
    }
  }, [error, throwError, setLocation])

  const handlePrint = (data) => {
    downloadFile(toDocumentData(data), `orden-${data.orderNumber}.docx`)
    setIsClickedPrint(false)
  }

  const handleEdit = async (data) => {
    await updateDocument(id, data)
    setIsClickedEdit(false)
  }

  const handleDelete = async () => {
    await deleteDocument(id)
    setLocation("/")
  }

  return (
    <Container maxWidth="sm">
      <DocumentNavbar
        onClickPrint={() => setIsClickedPrint(true)}
        disablePrint={!isValidForm}
        disableEdit={!isValidForm || !isDirtyForm}
        onClickEdit={() => setIsClickedEdit(true)}
      />

      {initialData ? (
        <DocumentDetails
          initialData={initialData}
          loading={loading}
          onIsValidForm={(valid) => setIsValidForm(valid)}
          onIsDirtyForm={(dirty) => setIsDirtyForm(dirty)}
          isClickedPrint={isClickedPrint}
          isClickedEdit={isClickedEdit}
          onPrint={handlePrint}
          onEdit={handleEdit}
        />
      ) : (
        "cargando..."
      )}

      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handleDelete}
        style={{ marginTop: 16, marginBottom: 64 }}
      >
        Eliminar
      </Button>
    </Container>
  )
}

export default Document
