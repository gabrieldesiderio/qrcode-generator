'use client'

import { ArrowLeft, Download, Printer, ScanQrCode } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useRef } from 'react'
import QRCode from 'react-qr-code'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface QrViewerProps {
  url: string
}

export function QrViewer({ url }: QrViewerProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    const element = document.getElementById('qr-code')

    if (printWindow && element) {
      printWindow.document.write(
        '<html><head><title>Print QR Code</title></head><body style="display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">',
      )
      printWindow.document.write(element.innerHTML)
      printWindow.document.write('</body></html>')
      printWindow.document.close()
      printWindow.print()
    }
  }

  const handleDownload = () => {
    const element = document.getElementById('qr-code')
    const svg = element?.querySelector('svg')

    if (!element || !svg) {
      console.error('qr-code not found')
      return
    }

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      console.error('canvas context not found')
      return
    }

    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const jpgFile = canvas.toDataURL('image/jpeg')
      const downloadLink = document.createElement('a')
      downloadLink.download = 'qrcode.jpg'
      downloadLink.href = jpgFile
      downloadLink.click()
    }
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  return (
    <Card className="min-w-[300px]">
      <CardHeader className="space-y-3">
        <CardTitle className="text-center">QR code generated!</CardTitle>
        <CardDescription className="flex items-center gap-1 justify-center text-sm font-medium">
          <ScanQrCode className="size-5" /> Scan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div id="qr-code">
          <QRCode value={url} size={256} />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <div className="grid gap-3 grid-cols-2">
          <Button className="gap-2" variant="outline" onClick={handleDownload}>
            <Download className="size-5" /> Download
          </Button>
          <Button className="gap-2" onClick={handlePrint}>
            <Printer className="size-5" /> Print
          </Button>
        </div>
        <Button
          className="gap-1 w-full"
          variant="ghost"
          onClick={() => {
            router.push(pathname)
          }}
        >
          <ArrowLeft className="size-5" /> Back
        </Button>
      </CardFooter>
    </Card>
  )
}
