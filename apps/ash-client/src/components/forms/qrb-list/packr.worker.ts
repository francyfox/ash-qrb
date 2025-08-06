import { Packr } from 'msgpackr'

declare let self: Worker

self.onmessage = (event) => {
  const packr = new Packr()
  const file = event.data as File
  const reader = new FileReader()

  reader.readAsArrayBuffer(file)

  reader.onload = (e) => {
    const fileContent = e.target?.result

    const packed = packr.pack(fileContent) as ArrayBuffer

    self.postMessage(
      new File(packed, `mpk_${new Date().getTime()}.mpk`, {
        type: 'application/octet-stream',
      }),
    )
  }

  reader.onerror = (e) => {
    console.error('Error reading file:', e.target?.error)
  }
}
