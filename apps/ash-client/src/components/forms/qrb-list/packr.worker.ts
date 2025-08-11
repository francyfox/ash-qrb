import { encode } from 'msgpack-lite'

declare let self: Worker

self.onmessage = (event) => {
  const file = event.data as File
  const reader = new FileReader()

  reader.readAsArrayBuffer(file)

  reader.onload = (e) => {
    const fileContent = e.target?.result

    const encoded = encode(fileContent)
    const timestamp = new Date().getDate().toString()
    const file = new File([encoded], `qrb_${timestamp}.json`, {
      type: 'application/json',
    })

    self.postMessage(file)
  }

  reader.onerror = (e) => {
    console.error('Error reading file:', e.target?.error)
  }
}
