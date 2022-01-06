import { useQuery } from "react-query";
import "./App.css";
import { DataRickAndMorty, Info } from "./interfaces/RickAndMorty";

async function getPersonajes(): Promise<DataRickAndMorty> {
  const res = await fetch("https://rickandmortyapi.com/api/character?page=1");
  return res.json();
}

function App() {
  const { data, isLoading, isSuccess } = useQuery("personajes", getPersonajes);
  return (
    <div className="App">
      <h1>Personajes</h1>

      {isLoading && <>Cargando personajes...</>}
      {!isLoading && isSuccess && (
        <div>
          <h2>Existen {data.info.count} personajes</h2>
          <h3>Pagina actual {getPaginaActual(data.info)}</h3>
          <div>
            {data.results.map((character) => (
              <div key={character.id}>
                <img
                  src={character.image}
                  alt={`Imagen de ${character.name}`}
                />
                <p>
                  {character.name} - {character.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

const getPaginaActual = (info: Info): number => {
  if (!info.prev) return 1;
  if (!info.next) {
    const [_, pagina] = info.prev.split("page=");

    return Number(pagina);
  }
  const [_, pagina] = info.next.split("page=");
  return Number(pagina) - 1;
};
