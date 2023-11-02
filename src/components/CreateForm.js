import personasStore from "../stores/personasStores";

export default function UpdateForm() {

    const store = personasStore();
    return (
        <div>
            {!store.updateForm._id && (<div>
                <h2>Crear persona</h2>
                <form onSubmit={store.crearPersona}>
                    <input
                        onChange={store.createFormField}
                        value={store.createForm.nombre}
                        name="nombre"></input>
                    <input
                        onChange={store.createFormField}
                        value={store.createForm.apellido}
                        name="apellido"></input>
                    <button type="submit">Crear persona</button>
                </form>
            </div>)}
        </div>
    )
}
