import { QrForm } from '@/components/qr-form'
import { QrViewer } from '@/components/qr-viewer'
import { AutoAnimated } from '@/components/ui/auto-animated'

interface PageProps {
  searchParams: {
    url?: string
  }
}

export default function Page({ searchParams: { url } }: PageProps) {
  return (
    <AutoAnimated className="flex flex-col gap-4 min-h-dvh w-full items-center justify-center">
      {url ? <QrViewer url={url} /> : <QrForm />}
    </AutoAnimated>
  )
}
