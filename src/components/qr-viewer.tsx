'use client'

import { ArrowLeft, Download, Printer, ScanQrCode } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import QRCode from 'react-qr-code'
import { toast } from 'sonner'

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
    const element = document.getElementById('qr-code')

    if (!element) {
      console.error('Qr code not found')
      toast.error('An unexpected error occurred. Please try again.')
      return
    }

    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      console.error('The window cannot be generate')
      toast.error('An unexpected error occurred. Please try again.')
      return
    }
    printWindow.document.write(
      '<html><head><title>Print QR Code</title></head><body style="display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">',
    )
    printWindow.document.write(element.innerHTML)
    printWindow.document.write('</body></html>')
    printWindow.document.close()
    printWindow.print()

    toast.success('Document has been generated')
  }

  const handleDownload = () => {
    const element = document.getElementById('qr-code')
    const svg = element?.querySelector('svg')

    if (!element || !svg) {
      console.error('Qr code not found')
      toast.error('An unexpected error occurred. Please try again.')
      return
    }

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      console.error('The canvas context cannot be generated')
      toast.error('An unexpected error occurred. Please try again.')
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

    toast.success('Download completed')
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
        <Button className="gap-2 w-full" onClick={handlePrint}>
          <Printer className="size-5" /> Print
        </Button>
        <Button
          className="gap-2 w-full"
          variant="outline"
          onClick={handleDownload}
        >
          <Download className="size-5" /> Download
        </Button>
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
