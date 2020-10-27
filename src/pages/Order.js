import React from 'react'
import styled from 'styled-components'
import { TemplateHandler } from 'easy-template-x'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPrint } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 20em;
  margin: 0 auto;
`

const Header = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 20em;
`

const IconButton = styled.div`
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  
  :hover {
    opacity: 0.5;
  }
`

const Label = styled.div`
  opacity: 0.4;
`

function saveFile(filename, blob) {
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

function Order() {
  const data = {
    orderNumber: '000104',
    orderDate: new Date(),
    schoolName: 'Colegio de las rosas',
    schoolAddress: '2972 Westheimer Rd. Santa Ana, Illinois 85486 ',
    schoolRUC: '20601888221',
    schoolTelephone: '211425',
    schoolCellphone: '921492405',
    responsableName: 'Bessie Cooper',
    responsablePosition: 'Teacher',
    responsableEmail: 'tim.jennings@example.com',
  }

  const handleClickDownload = () => {
    downloadFile(toDocumentData(data))
  }

  return (
    <Container>
      <Header>
        <IconButton>
          <FontAwesomeIcon icon={ faArrowLeft } />
        </IconButton>
        <div>
          <div>Nº {data.orderNumber}</div>
          <div>{data.orderDate.getDay()}/{data.orderDate.getMonth()}/{data.orderDate.getFullYear()}</div>
        </div>
        <IconButton onClick={handleClickDownload}>
          <FontAwesomeIcon icon={ faPrint } />
        </IconButton>
      </Header>

      <div style={ { marginTop: '3rem' } } />
      <h2>School</h2>
      <Label>Name</Label>
      <div>{ data.schoolName }</div>
      <Label>Address</Label>
      <div>{ data.schoolAddress }</div>
      <Label>RUC</Label>
      <div>{ data.schoolRUC }</div>
      <Label>Telephone Number</Label>
      <div>{ data.schoolTelephone }</div>

      <h2>Responsable</h2>
      <Label>Name</Label>
      <div>{ data.responsableName }</div>
      <Label>Position</Label>
      <div>{ data.responsablePosition }</div>
      <Label>Email</Label>
      <div>{ data.responsableEmail }</div>
    </Container>
  )
}

export default Order
