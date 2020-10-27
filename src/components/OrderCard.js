import React from 'react'
import { Link } from 'wouter'

import { Card, CardContent, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  cardContainer: {
    width: '100%',
    cursor: 'pointer',
    transition: 'transform 200ms',
    '&:hover': {
      transform: 'scale(1.05)',
      background: 'rgb(0, 0, 0, 0.02)',
    },
  },
}))


function OrderCard({ orderNumber, orderDate, responsableName }) {
  const classes = useStyles()
  return (
    <Link href='/order'>
      <Card className={ classes.cardContainer }>
        <CardContent style={ { padding: 12 } }>
          <Grid container direction='column'>
            <Grid item container direction='row' justify='space-between' alignItems='center'>
              <Grid item>
                <div style={ { fontSize: '1.4rem', fontWeight: 'bold' } }>
                  Nº { orderNumber }
                </div>
              </Grid>
              <Grid item>
                <div style={ { fontSize: '0.9rem', fontWeight: 'normal' } }>
                  { orderDate }
                </div>
              </Grid>
            </Grid>
            <Grid item>
              <div style={ { fontSize: '1.2rem' } }>
                { responsableName }
              </div>
            </Grid>
            <Grid item>
              <div style={ { fontSize: '1.2rem', fontWeight: 'bold' } }>
                Total Items
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  )
}

export default OrderCard
