import { useEffect } from "react";
import personasStore from "../stores/personasStores";
import Personas from "./Personas";
import UpdateForm from "./UpdateForm";
import CreateForm from "./CreateForm";

function App() {

  // Brindar acceso al archivo personasStore
  const store = personasStore(); //"s => s.buscarPersonas()" dentro de los parentecis para buscar una funcion en especifico

  // Use effect
  useEffect(() => {
    store.buscarPersonas()
  }, []);

  return (
    <div className="App">
      <button onClick={() => store.limpiarForm()}>Crear</button>
      <Personas></Personas>
      <CreateForm></CreateForm>
      <UpdateForm></UpdateForm>

    </div>
  );
}

export default App;
