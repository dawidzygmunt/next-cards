import { IPhoneFrame } from '@/components/iphone-frame'

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-full min-h-screen flex sm:items-center justify-center">
      <IPhoneFrame>{children}</IPhoneFrame>
      <div className="w-[368px] h-[700px] relative sm:hidden ">{children}</div>
    </div>
  )
}
