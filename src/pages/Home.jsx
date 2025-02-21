
const Home = () => {
  return (
    <>
    <header>
        <h1 className="text-center">Explorardor de películas</h1>
        <form className='items-center flex justify-center'>
          <input type="text" placeholder="¿Qué quieres ver hoy?" />
          <button type="submit">Buscar</button>
        </form>
      </header>
      <main className="flex justify-center"></main>
      </>
  )
};

export default Home;