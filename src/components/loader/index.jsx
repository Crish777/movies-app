import CircleLoader from 'react-spinners/CircleLoader'


const Loader = () => {
  return (
    <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-screen bg-black/70 backdrop-blur-md">
      <CircleLoader size={150} color='#ffffff' />
    </div>
  )
}

export default Loader