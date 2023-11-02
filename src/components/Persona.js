import personasStore from "../stores/personasStores"

export default function Persona({ persona }) {
    const store = personasStore();
    return (
        <div key={persona._id}>
            <h3>{persona.nombre}</h3>
            <button onClick={() => store.eliminarPersona(persona._id)}>Eliminar</button>
            <button onClick={() => store.toggleUpdate(persona)}>Modificar</button>
        </div>
    )
}