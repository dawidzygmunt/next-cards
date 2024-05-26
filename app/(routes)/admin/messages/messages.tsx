import ContainerApp from '@/components/ui/containerApp'

const Messages = () => {
  return (
    <ContainerApp title='Poczta' display={true}>
      <div className="flex flex-col items-center justify-center mt-24">
        <div className="bg-white p-12 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold">Poczta w trakcie budowy</h1>
        </div>
      </div>
    </ContainerApp>
  )
}

export default Messages