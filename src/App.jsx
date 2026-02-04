import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { supabase } from './supabaseClient'
import './App.css'

function App() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    fecha: "",
    hora: "",
    servicio: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();   // Evita que la página se recargue al enviar el formulario

    const { data, error } = await supabase

      .from('citas')
      .insert([{
        nombre: form.nombre,
        telefono: form.telefono,
        fecha: form.fecha,
        hora: form.hora,
        servicio: form.servicio,
      }])

    if (error) {
      console.log("Error al agendar la cita:" + error);  // Manejo del error de inserción
      alert("Error al agendar la cita:" + error);
    } else {
      console.log(form); 
      alert("Cita agendada con éxito:" + data);   // Confirmación de inserción exitosa
    }
  }

  const horas = ["9:00", "9:30", "10:00", "10:30", "14:00", "14:30", "17:00", "18:00"]
  const servicios = ["Maquillaje", "Estilista", "Cuidado De La Piel"]

  return (
    <>

      <div className="cita flex flex-col p-5 m-3 border-4 w-90 rounded-2xl">

        <h1 className='text-4xl'>Escoja Su Cita:</h1>

        <form className='flex flex-col items-start p-4' onSubmit={handleSubmit}>

          <label htmlFor="nombre">Nombre:</label>
          <input type="text" name='nombre'  onChange={handleChange}/>

          <label htmlFor="telefono">Telefono:</label>
          <input type="text" name='telefono'  onChange={handleChange}/>

          <label htmlFor="fecha">Fecha:</label>
          <input type="date" name='fecha'  onChange={handleChange}/>

          <label htmlFor="hora">Hora:</label>
          <select name="hora" id="" onChange={handleChange}>
            <option value="">Escoja Una Hora</option>
            {horas.map(hora => (
              <option value={hora}>{hora}</option>
            ))}
          </select>

          <label htmlFor="servicio">Servicio:</label>
          <select name="servicio" id="" onChange={handleChange}>
            <option value="">Escoja Un Servicio</option>
            {servicios.map(servicio => (
              <option value={servicio}>{servicio}</option>
            ))}
          </select>

          <button className='bg-amber-300 border-3 m-3 rounded-3xl p-4 w-60 text-2xl'>Enviar Cita</button>

        </form>

      </div>
    </>
  )
}

export default App
