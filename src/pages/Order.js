import React from 'react'
import { TemplateHandler } from 'easy-template-x'
import { Link } from 'wouter'

import {
  Grid,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
} from '@material-ui/core'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import PrintIcon from '@material-ui/icons/Print'
import ShareIcon from '@material-ui/icons/Share'

import makeStyles from '@material-ui/core/styles/makeStyles'
import { useOrders } from '../hooks/useOrders'
import { toDDMMYYYY } from '../utils'

const saveFile = (filename, blob) => {
  // see: https://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link

  // get downloadable url from the blob
  const blobUrl = URL.createObjectURL(blob)

  // create temp link element
  let link = document.createElement('a')
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

const downloadFile = async data => {
  // Read template file
  const resp = await fetch('/template.docx')
  const templateFile = await resp.blob()

  // Process the template
  const handler = new TemplateHandler()
  const doc = await handler.process(templateFile, data)

  // Save output
  saveFile('output.docx', doc)
}

const toDocumentData = data => {
  if (data.schoolTelephone.length > 9
    || data.schoolRUC.length > 11
    || data.schoolTelephone.length > 9) {
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
  }
}

const useStyles = makeStyles(() => ({
  label: {
    opacity: '0.4',
  },
}))

function Order({ params }) {
  const { id } = params
  const [orders] = useOrders()
  const classes = useStyles()
  const data = orders[id]

  const handleClickDownload = () => {
    downloadFile(toDocumentData(data))
  }

  return (
    <Container maxWidth='xs'>
      <AppBar position='sticky' variant='outlined' style={{ backgroundColor: 'white', borderBottom: '2px solid rgba(0, 0, 0, 0.12)', borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}>
        <Toolbar style={ { color: 'black' } } disableGutters>
          <Grid container direction='row' justify='space-between' alignItems='center'>
            <Grid item>
              <Link href='/'>
                <IconButton>
                  <ArrowBackIcon />
                </IconButton>
              </Link>
            </Grid>
            <Grid item>
              <Typography variant='h5' align='center'>
                Nº { data.orderNumber }
              </Typography>
              <Typography variant='h6' align='center'>
                { toDDMMYYYY(data.orderDate) }
              </Typography>
            </Grid>
            <Grid item>
              <IconButton style={ { position: 'absolute', marginLeft: '-2.5rem' } }>
                <ShareIcon />
              </IconButton>
              <IconButton onClick={ handleClickDownload }>
                <PrintIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Grid container direction='column' style={ { marginTop: '1rem', marginBottom: '1rem' } }>
        <Typography variant='h2'>
          School
        </Typography>
        <div className={ classes.label }>
          Name
        </div>
        <Typography variant='body1'>{ data.schoolName }</Typography>
        <div className={ classes.label }>
          Address
        </div>
        <Typography variant='body1'>{ data.schoolAddress }</Typography>
        <div className={ classes.label }>
          RUC
        </div>
        <Typography variant='body1'>{ data.schoolRUC }</Typography>
        <div className={ classes.label }>
          Telephone Number
        </div>
        <Typography variant='body1'>{ data.schoolTelephone }</Typography>

        <Typography variant='h2'>
          Responsable
        </Typography>
        <div className={ classes.label }>
          Name
        </div>
        <Typography variant='body1'>{ data.responsableName }</Typography>
        <div className={ classes.label }>
          Position
        </div>
        <Typography variant='body1'>{ data.responsablePosition }</Typography>
        <div className={ classes.label }>
          Email
        </div>
        <Typography variant='body1'>{ data.responsableEmail }</Typography>
      </Grid>

      <Grid container direction='column'>
        <Grid item>
          <Button variant='contained' color='primary' fullWidth>
            Modify
          </Button>
        </Grid>
        <Grid item style={ { marginTop: '0.5rem' } }>
          <Button variant='contained' color='secondary' fullWidth>
            Delete
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Order
