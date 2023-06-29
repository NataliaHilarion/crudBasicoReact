import React, { useState } from "react";
import uniqid from 'uniqid'

const Listado = () => {
  const [nombre, setNombre] = useState("");
  const [listaNombre, setListaNombre] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState('')
  const [error, setError] = useState(null)



  const añadirNombre = (e)=>{
    e.preventDefault()
    if(!nombre.trim()){
      setError('El campo nombre esta vacio')
      return
    }

    const nuevoNombre = {
      id: uniqid(),
      tituloNombre: nombre
    }
    setListaNombre([...listaNombre, nuevoNombre])
    setNombre('')
    setError(null)
  }

  const deleteNombre = (id)=>{
    const nuevoArray = listaNombre.filter( item => item.id !== id)
    setListaNombre(nuevoArray)
  }

  const editar = (item)=>{
    setModoEdicion(true)
    setNombre(item.tituloNombre)
    setId(item.id)
  }

  const editarNombre = (e)=>{
    e.preventDefault()
    const nuevoArray = listaNombre.map(item => item.id===id ? {id:id, tituloNombre: nombre} : item)
    setListaNombre(nuevoArray)
    setModoEdicion(false)
    setNombre('')
  }


  return (
    <main className="row">
      <h1 className="text-center m-4">APLICACION CRUD BASICA</h1>

      <section className="col">
        <h2 className="text-center">Listado de Nombre</h2>
        <ul className="list-group">
          {listaNombre.map((item) => (
            <li key={item.id} className="list-group-item">
              {item.tituloNombre}
              <button
                onClick={() => {
                  deleteNombre(item.id);
                }}
                className="btn btn-danger float-end"
              >
                Eliminar
              </button>
              <button
                onClick={() => {
                  editar(item);
                }}
                className="btn btn-info float-end"
              >
                Editar
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="col">
        <h2 className="text-center">Formulario para añadir Nombres</h2>
        <form
          onSubmit={modoEdicion ? editarNombre : añadirNombre}
          className="form-group"
        >
          <input
            onChange={(e) => {
              setNombre(e.target.value);
            }}
            className="form-control mb-3"
            type="text"
            placeholder="Introduce tu Nombre"
            value={nombre}
          />
          <input
            className="btn btn-info btn-block mb-3"
            type="submit"
            value={modoEdicion ? "Editar Contacto" : "Añadir Nuevo Nombre"}
          />
        </form>
        {
          error != null ? (
            <div className="alert alert-danger">{error}</div>
          ):(
            <div></div>
          )
        }
      </section>
    </main>
  );
};

export default Listado;
