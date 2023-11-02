import personasStore from "../stores/personasStores";
import Persona from "./Persona";

export default function Personas() {
    const store = personasStore();
    return (
        <div>
            <h2>Personas</h2>
            {store.personas && store.personas.map(persona => {
                return (
                    <Persona persona={persona} key={persona._id}></Persona>
                )
            })}
        </div>
    )
}