'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { AutoAnimated } from '@/components/ui/auto-animated'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const formSchema = z.object({
  url: z.string().url('Please enter a valid URL'),
})

type FormProps = z.infer<typeof formSchema>

export function QrForm() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormProps>({
    resolver: zodResolver(formSchema),
  })

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const onSubmit = async ({ url }: FormProps) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    router.push(pathname + '?' + createQueryString('url', url))
  }

  return (
    <Card className="min-w-[300px]">
      <CardHeader className="text-center">
        <CardTitle>QR Code Generator</CardTitle>
        <CardDescription>Insert a link to create</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <AutoAnimated className="space-y-1">
            <Label htmlFor="url">URL</Label>
            <Input id="url" {...register('url')} />
            {errors.url && (
              <p className="text-xs font-medium text-destructive">
                {errors.url.message}
              </p>
            )}
          </AutoAnimated>
          <Button className="w-full transition-all" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              'Generate'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
