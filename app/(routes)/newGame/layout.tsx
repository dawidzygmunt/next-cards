import { IPhoneFrame } from '@/components/iphone-frame'

export default function NewGameLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-full min-h-screen flex sm:items-center justify-center">
      <IPhoneFrame>{children}</IPhoneFrame>
      <div className="block sm:hidden w-full h-full relative">{children}</div>
    </div>
  )
}
