import React from 'react'
import styled from 'styled-components'
import { TemplateHandler } from 'easy-template-x'

const Container = styled.div`
  
`

function saveFile(filename, blob) {
  // see: https://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link

  // get downloadable url from the blob
  const blobUrl = URL.createObjectURL(blob);

  // create temp link element
  let link = document.createElement("a");
  link.download = filename;
  link.href = blobUrl;

  // use the link to invoke a download
  document.body.appendChild(link);
  link.click();

  // remove the link
  setTimeout(() => {
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
    link = null;
  }, 0);
}


function Order() {
  const data = {
    orderNumber: '000104',
    school: 'De las rosas',
    address: '2972 Westheimer Rd. Santa Ana, Illinois 85486',

    dateDay: '01',
    dateMonth: '01',
    dateYear: '2020',

    telephone1: '2',
    telephone2: '1',
    telephone3: '1',
    telephone4: '4',
    telephone5: '2',
    telephone6: '5',
    telephone7: ' ',
    telephone8: ' ',
    telephone9: ' ',

    ruc1: '2',
    ruc2: '0',
    ruc3: '6',
    ruc4: '0',
    ruc5: '1',
    ruc6: '8',
    ruc7: '8',
    ruc8: '8',
    ruc9: '2',
    ruc10: '2',
    ruc11: '1',

    cellphone1: '9',
    cellphone2: '2',
    cellphone3: '1',
    cellphone4: '4',
    cellphone5: '9',
    cellphone6: '2',
    cellphone7: '4',
    cellphone8: '0',
    cellphone9: '5',

    responsableName: 'Bessie Cooper',
    responsablePosition: 'Teacher',
    responsableEmail: 'bessie@example.com',
  }

  const downloadFile = async () => {
    // Read template file
    const resp = await fetch("/template.docx")
    const templateFile = await resp.blob();

    // Process the template
    const handler = new TemplateHandler();
    const doc = await handler.process(templateFile, data);

    // Save output
    saveFile('output.docx', doc);
  }

  return (
    <Container>
      <button onClick={downloadFile}><span role='img' aria-label='ok'>👍</span></button>
    </Container>
  )
}

export default Order
