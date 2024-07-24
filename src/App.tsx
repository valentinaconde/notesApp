import { useState } from 'react'
import './App.css'
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  const [lista, setLista] = useState<string[]>([])
  const [valor, setValor] = useState<string>('')
  
  const handleSubmit = (event: any) => {
    event?.preventDefault()
    setLista([...lista, valor])
    setValor('')
  }

  const handleChange = (event: any) => {
    setValor(event.target.value)
  }

  const handleDelete = (index: any) => {
      const nuevaLista = lista.filter((item, i) => i !== index)
      setLista(nuevaLista)
  }

  const handleTachar = (index: any) => {
      document.getElementById(index)?.classList.add('tachado')
  }

  return (
    <>
      <form className='d-flex mb-3' onSubmit={handleSubmit}>
        <input className='form-control' type="text" value={valor} onChange={handleChange}></input>
        <button  className='btn btn-success ms-2'>SUBMIT</button>
      </form>

      {
        lista.map((item, index) => (
          <div className='text-dark bg-light' key={index} id={`${index}`} >{item}<DeleteIcon className="icon ms-3 me-2" onClick={() => handleDelete(index)}/> <CloseIcon className='icon' onClick={() => handleTachar(index)}/> </div>
        ))
      }
    </>
  )
}

export default App
