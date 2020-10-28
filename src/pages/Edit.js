import React, { useState } from 'react'
import { Link, useLocation } from 'wouter'

import {
  Grid,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  TextField
} from '@material-ui/core'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useOrders } from '../hooks/useOrders'
import { toDDMMYYYY } from '../utils'


function Edit({ params }) {
  const { id } = params

  const [, setLocation] = useLocation()
  const { getOrder, editOrder } = useOrders()

  const [orderNumber, setOrderNumber] = useState(() => getOrder(id).orderNumber)
  const [orderDate, setOrderDate] = useState(() => toDDMMYYYY(getOrder(id).orderDate))

  const [schoolName, setSchoolName] = useState(() => getOrder(id).schoolName)
  const [schoolAddress, setSchoolAddress] = useState(() => getOrder(id).schoolAddress)
  const [schoolRUC, setSchoolRUC] = useState(() => getOrder(id).schoolRUC)
  const [schoolTelephone, setSchoolTelephone] = useState(() => getOrder(id).schoolTelephone)
  const [schoolCellphone, setSchoolCellphone] = useState(() => getOrder(id).schoolCellphone)

  const [responsableName, setResponsableName] = useState(() => getOrder(id).responsableName)
  const [responsablePosition, setResponsablePosition] = useState(() => getOrder(id).responsablePosition)
  const [responsableEmail, setResponsableEmail] = useState(() => getOrder(id).responsableEmail)

  const handleSave = () => {
    editOrder(id, {
      orderNumber,
      orderDate: new Date(orderDate),

      schoolName,
      schoolAddress,
      schoolRUC,
      schoolTelephone,
      schoolCellphone,

      responsableName,
      responsablePosition,
      responsableEmail,
    })
    setLocation(`/order/${ id }`)
  }

  return (
    <Container maxWidth='xs'>
      <AppBar position='sticky' variant='outlined' style={ {
        backgroundColor: 'white',
        borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none',
      } }>
        <Toolbar disableGutters style={ { color: 'black' } }>
          <Link href="/">
            <IconButton style={ { position: 'absolute' } }>
              <ArrowBackIcon />
            </IconButton>
          </Link>
          <Grid container direction='row' justify='center'>
            <Grid item>
              <Typography variant='h5' align='center'>
                Create Order
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Grid
        container
        direction='column'
        style={ { marginTop: '1rem', marginBottom: '1rem' } }
      >
        {/*-- Order --*/}
        <Grid
          item
          container
          direction='column'
          style={ { marginTop: '1rem', marginBottom: '1rem' } }
          spacing={1}
        >
          <Grid item>
            <Typography variant='h2'>
              Order
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='Order Number'
              placeholder='000104'
              fullWidth
              value={orderNumber}
              onChange={e => setOrderNumber(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='Date'
              placeholder='01/01/2020'
              fullWidth
              value={orderDate}
              onChange={e => setOrderDate(e.target.value)}
            />
          </Grid>
        </Grid>

        {/*-- School --*/}
        <Grid
          container
          direction='column'
          style={ { marginTop: '1rem', marginBottom: '1rem' } }
          spacing={1}
        >
          <Grid item>
            <Typography variant='h2'>
              School
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='Name'
              placeholder='Colegio de las rosas'
              fullWidth
              value={schoolName}
              onChange={e => setSchoolName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='Address'
              placeholder='2972 Westheimer Rd. Santa Ana, Illinois 85486'
              fullWidth
              value={schoolAddress}
              onChange={e => setSchoolAddress(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='RUC'
              placeholder='20601888221'
              fullWidth
              value={schoolRUC}
              onChange={e => setSchoolRUC(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='Telephone Number'
              placeholder='(704) 555-0127'
              fullWidth
              value={schoolTelephone}
              onChange={e => setSchoolTelephone(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='Cellphone Number'
              placeholder='(704) 555-0120'
              fullWidth
              value={schoolCellphone}
              onChange={e => setSchoolCellphone(e.target.value)}
            />
          </Grid>
        </Grid>

      {/*-- Responsable --*/}
        <Grid
          container
          direction='column'
          style={ { marginTop: '1rem', marginBottom: '1rem' } }
          spacing={1}
        >
          <Grid item>
            <Typography variant='h2'>
              Responsable
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='Name'
              placeholder='Bessie Cooper'
              fullWidth
              value={responsableName}
              onChange={e => setResponsableName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='Position'
              placeholder='Teacher'
              fullWidth
              value={responsablePosition}
              onChange={e => setResponsablePosition(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='Email'
              placeholder='betsie@example.com'
              fullWidth
              value={responsableEmail}
              onChange={e => setResponsableEmail(e.target.value)}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid container direction='column'>
        <Grid item>
          <Button variant='contained' color='primary' fullWidth onClick={handleSave}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Edit
