import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';


function ListComponent() {
  const [list, setList] = useState<string[]>([])
  const [value, setValue] = useState<string>('')
  
  useEffect(() => {
    const list = localStorage.getItem('list')
    if(list) {
      setList(JSON.parse(list))
    }
  }, [])
  
  const handleSubmit = (event: any) => {
    event?.preventDefault()
    if(!value) return
    setList([...list, value])
    localStorage.setItem('list', JSON.stringify([...list, value]))
    setValue('')
  }

  const handleChange = (event: any) => {
    setValue(event.target.value)
  }

  const handleDelete = (index: any) => {
      const newList = list.filter((item, i) => i !== index)
      setList(newList)
      localStorage.setItem('list', JSON.stringify(newList))
  }

  const handleTacharEnIngles = (index: any) => {
      document.getElementById(index)?.classList.add('tachado')
  }

  return (
    <>
      <form className='d-flex mb-3' onSubmit={handleSubmit}>
        <input className='form-control' type="text" value={value} onChange={handleChange}></input>
        <button  className='btn btn-success ms-2'>SUBMIT</button>
      </form>

      {
        list.map((item, index) => (
          <div className='text-dark bg-light' key={index} id={`${index}`} >{item}<DeleteIcon className="icon ms-3 me-2" onClick={() => handleDelete(index)}/> <CloseIcon className='icon' onClick={() => handleTacharEnIngles(index)}/> </div>
        ))
      }
    </>
  )
}

export default ListComponent