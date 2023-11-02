import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  // State
  const [personas, setPersonas] = useState(null);
  const [createForm, setCreateForm] = useState({
    nombre: "",
    apellido: ""
  })
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    nombre: '',
    apellido: ''
  })

  // Use effect
  useEffect(() => {
    buscarPersonas()
  }, []);

  // Funciones
  const buscarPersonas = async () => {
    // Buscar personas
    const res = await axios.get('http://localhost:3030/personas');
    // Las colocamos
    setPersonas(res.data.personas);
  }

  const createFormField = (e) => {
    const { name, value } = e.target;

    setCreateForm({
      ...createForm,
      [name]: value,
    })
  }

  const updateFormField = (e) => {
    const { name, value } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    })
  }

  const crearPersona = async (e) => {
    e.preventDefault();

    // Crear la nota
    const res = await axios.post('http://localhost:3030/personas', createForm)

    // Actualizar el estado
    setPersonas([...personas, res.data.persona]);
    console.log(res);

    //Limpiar el formulario
    setCreateForm({ nombre: '', apellido: '' });
  }

  const eliminarPersona = async (_id) => {

    //Eliminar persona
    await axios.delete(`http://localhost:3030/personas/${_id}`)

    // Actualizar el estado
    const nuevasPersonas = [...personas].filter(persona => {
      return persona._id !== _id;
    })

    setPersonas(nuevasPersonas)
  }

  const toggleUpdate = (persona) => {
    // Colocar el estado actualizado
    setUpdateForm({ nombre: persona.nombre, apellido: persona.apellido, _id: persona._id })
  }

  const limpiarForm = () =>{
    setUpdateForm({
      _id: null,
      nombre: '',
      apellido: ''
    })
  }

  const updatePersona = async (e) => {
    e.preventDefault();

    const { nombre, apellido } = updateForm;
    // Enviar el pedido actualizado
    const res = await axios.put(`http://localhost:3030/personas/${updateForm._id}`, { nombre, apellido });

    // Actualizar el estado
    const nuevasPersonas = [...personas];
    const personaIndex = personas.findIndex((persona) => {
      return persona._id === updateForm._id;
    });
    nuevasPersonas[personaIndex] = res.data.persona;
    setPersonas(nuevasPersonas);

    // Limpiar el formulario
    setUpdateForm({
      _id: null,
      nombre: '',
      apellido: ''
    })

  }
  
  return (
    <div className="App">
      <div>
        <h2>Personas</h2>
        {personas && personas.map(persona => {
          return (
            <div key={persona._id}>
              <h3>{persona.nombre}</h3>
              <button onClick={() => limpiarForm()}>Crear</button>
              <button onClick={() => eliminarPersona(persona._id)}>Eliminar</button>
              <button onClick={() => toggleUpdate(persona)}>Modificar</button>
            </div>
          )
        })}
      </div>
      {!updateForm._id && (<div>
        <h2>Crear persona</h2>
        <form onSubmit={crearPersona}>
          <input
            onChange={createFormField}
            value={createForm.nombre}
            name="nombre"></input>
          <input
            onChange={createFormField}
            value={createForm.apellido}
            name="apellido"></input>
          <button type="submit">Crear persona</button>
        </form>
      </div>)}

      {updateForm._id && (<div>
        <h2>Modificar persona</h2>
        <form onSubmit={updatePersona}>
          <input
            onChange={updateFormField}
            value={updateForm.nombre}
            name="nombre"></input>
          <input
            onChange={updateFormField}
            value={updateForm.apellido}
            name="apellido"></input>
          <button type="submit">Modificar persona</button>
        </form>
      </div>)}
    </div>
  );
}

export default App;
