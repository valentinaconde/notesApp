import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import './list.css'
import EmptyData from '../EmptyData';
import{ ConfirmAlert,  WarningAlert } from '../../services/SwalService';

function List() {
  const [list, setList] = useState<string[]>([])
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    const list = localStorage.getItem('list')
    if (list) {
      setList(JSON.parse(list))
    }
  }, [])

  const handleSubmit = (event: any) => {
    event?.preventDefault()
    if (!value) return
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

  const handleDeleteAll = () => {
    const warningTitle = "Are you sure?"
    const warningText = "You won't be able to revert this!"
    const confirmTitle = "Deleted!"
    const confirmText = "Your list has been deleted."

    WarningAlert(warningTitle,warningText).then((result) => {
     if (result.isConfirmed) {
       setList([])
       localStorage.removeItem('list')
       ConfirmAlert(confirmTitle, confirmText)
     }
    })
  }

  return (
    <>
      <form className='d-flex mb-3 list mt-5 ms-3' onSubmit={handleSubmit}>
        <input className='form-control' type="text" value={value} onChange={handleChange}></input>
        <button className='btn btn-success ms-2 d-none d-md-block'>SUBMIT</button>
        <button className='btn btn-success ms-2 d-md-none d-block'><CheckIcon/></button>
        <button className='btn btn-danger mx-2 d-none d-md-block' onClick={handleDeleteAll}>CLEAR</button>
        <button className='btn btn-danger mx-2 d-md-none d-block' onClick={handleDeleteAll}><CloseIcon/></button>
      </form>
      {
        list.length === 0 && <EmptyData message='No hay elementos en la lista' />
      }
      {
        list.map((item, index) => (
          <div className='text-dark bg-light list mx-3 mt-2 px-2 d-flex justify-content-between' key={index} id={`${index}`} >
            {item}
            <div>
              <DeleteIcon className="icon ms-3 me-2" onClick={() => handleDelete(index)} />
              <CloseIcon className='icon' onClick={() => handleTacharEnIngles(index)} />
            </div>
          </div>
        ))
      }
    </>
  )
}

export default List
