import { create } from 'zustand';
import axios from "axios";

const personasStore = create((set) => ({
    personas: null,

    createForm: {
        nombre: '',
        apellido: ''
    },
    updateForm: {
        _id: null,
        nombre: '',
        apellido: ''
    },

    buscarPersonas: async () => {
        // Buscar personas
        const res = await axios.get('http://localhost:3030/personas');
        // Las colocamos
        set({
            personas: res.data.personas
        })
        //setPersonas(res.data.personas);
    },

    createFormField: (e) => {
        const { name, value } = e.target;

        set((state) => {
            return {
                createForm: {
                    ...state.createForm,
                    [name]: value,
                }
            }
        })
    },

    updateFormField: (e) => {
        const { name, value } = e.target;

        set((state) => {
            return {
                updateForm: {
                    ...state.updateForm,
                    [name]: value,
                }
            }
        })
    },

    crearPersona: async (e) => {
        e.preventDefault();

        const { createForm, personas } = personasStore.getState();
        // Crear la nota
        const res = await axios.post('http://localhost:3030/personas', createForm)

        // Actualizar el estado
        set({
            personas: [...personas, res.data.persona],
            createForm: {
                nombre: '',
                apellido: ''
            }
        })
    },

    eliminarPersona: async (_id) => {

        //Eliminar persona
        await axios.delete(`http://localhost:3030/personas/${_id}`)
        const { personas } = personasStore.getState();

        // Actualizar el estado
        const nuevasPersonas = personas.filter(persona => {
            return persona._id !== _id;
        })

        set({
            personas: nuevasPersonas,
            createForm: {
                _id: null,
                nombre: '',
                apellido: ''
            },
            updateForm: {
                _id: null,
                nombre: '',
                apellido: ''
            }
        })
    },

    toggleUpdate: (persona) => {
        // Colocar el estado actualizado
        set({
            updateForm: {
                nombre: persona.nombre,
                apellido: persona.apellido,
                _id: persona._id
            }
        })
    },

    updatePersona: async (e) => {
        e.preventDefault();
        const { updateForm: { nombre, apellido, _id }, personas } = personasStore.getState();
        // Enviar el pedido actualizado
        const res = await axios.put(`http://localhost:3030/personas/${_id}`, { nombre, apellido });

        // Actualizar el estado
        const nuevasPersonas = [...personas];
        const personaIndex = personas.findIndex((persona) => {
            return persona._id === _id;
        });
        nuevasPersonas[personaIndex] = res.data.persona;
        set({
            personas: nuevasPersonas,
            updateForm: {
                _id: null,
                nombre: '',
                apellido: ''
            }
        });
    },

    limpiarForm: () => {
        set({
            updateForm: {
                _id: null,
                nombre: '',
                apellido: ''
            }
        })
    }
}))

export default personasStore;