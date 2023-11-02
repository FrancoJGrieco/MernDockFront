import personasStore from "../stores/personasStores";

export default function UpdateForm() {
    const store = personasStore();
    return (
        <div>
            {store.updateForm._id && (<div>
                <h2>Modificar persona</h2>
                <form onSubmit={store.updatePersona}>
                    <input
                        onChange={store.updateFormField}
                        value={store.updateForm.nombre}
                        name="nombre"></input>
                    <input
                        onChange={store.updateFormField}
                        value={store.updateForm.apellido}
                        name="apellido"></input>
                    <button type="submit">Modificar persona</button>
                </form>
            </div>)}
        </div>
    )
}