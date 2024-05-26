import ContainerApp from '@/components/ui/containerApp'

const Tickets = () => {
  return (
    <ContainerApp title='Zgłoszenia' display={true}>
      <div className="flex flex-col items-center justify-center mt-24">
        <div className="bg-white p-12 rounded-lg shadow-lg max-w-[400px]">
          <h1 className="text-4xl font-bold">System zgłoszeń w trakcie budowy</h1>
        </div>
      </div>
    </ContainerApp>
  )
}

export default Tickets