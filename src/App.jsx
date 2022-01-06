import { useQuery } from "react-query";
import "./App.css";

async function getPersonajes() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  return res.json();
}

function App() {
  const resultado = useQuery("personajes", getPersonajes);
  return (
    <div className="App">
      <h1>React Query</h1>
    </div>
  );
}

export default App;
