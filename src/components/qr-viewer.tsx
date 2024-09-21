'use client'

import { ArrowLeft, Download, Printer, ScanQrCode } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
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

  return (
    <Card className="min-w-[300px]">
      <CardHeader className="space-y-3">
        <CardTitle className="text-center">QR code generated!</CardTitle>
        <CardDescription className="flex items-center gap-1 justify-center text-sm font-medium">
          <ScanQrCode className="size-5" /> Scan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <QRCode id="qr-code" value={url} size={256} />
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <div className="grid gap-3 grid-cols-2">
          <Button className="gap-2" variant="outline">
            <Download className="size-5" /> Download
          </Button>
          <Button className="gap-2">
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
