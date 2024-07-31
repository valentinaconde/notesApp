import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import './list.css'
import EmptyData from '../EmptyData';
import{ ConfirmAlert,  WarningAlert } from '../../services/SwalService';
import { Note } from '../../types/Note';
import { v4 as uuidv4 } from 'uuid';

function List() {
  const [notes, setNotes] = useState<Note[]>([])
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    const list = localStorage.getItem('list')
    if (list) {
      setNotes(JSON.parse(list))
    }
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    if (!value) return

    const note = {
      id: uuidv4(),
      title: value
    }

    setNotes([...notes, note])
    localStorage.setItem('notes', JSON.stringify([...notes, note]))
    setValue('')
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleDelete = (index: number) => {
    const newList = notes.filter((item, i) => i !== index)
    setNotes(newList)
    localStorage.setItem('list', JSON.stringify(newList))
  }

  const handleTacharEnIngles = (id: string) => {
    document.getElementById(id)?.classList.add('tachado')
  }

  const handleDeleteAll = () => {
    const warningTitle = "Are you sure?"
    const warningText = "You won't be able to revert this!"
    const confirmTitle = "Deleted!"
    const confirmText = "Your list has been deleted."

    WarningAlert(warningTitle,warningText).then((result) => {
     if (result.isConfirmed) {
      setNotes([])
       localStorage.removeItem('list')
       ConfirmAlert(confirmTitle, confirmText)
     }
    })
  }

  return (
    <>
      <form className='d-flex mb-3 list mt-5 ms-3' onSubmit={handleSubmit}>
        <input className='form-control' type="text" value={value} onChange={handleChange}></input>
        <button className='btn btn-success ms-2'>SUBMIT</button>
        <button className='btn btn-danger ms-2' onClick={handleDeleteAll}>CLEAR</button>
      </form>
      {
        notes.length === 0 && <EmptyData message='No hay elementos en la lista' />
      }
      {
        notes.map((item, index) => (
          <div className='text-dark bg-light list ms-3 mt-2 ps-2 d-flex justify-content-between' key={item.id} id={item.id} >
            {item.title}
            <div>
              <DeleteIcon className="icon ms-3 me-2" onClick={() => handleDelete(index)} />
              <CloseIcon className='icon' onClick={() => handleTacharEnIngles(item.id)} />
            </div>
          </div>
        ))
      }
    </>
  )
}

export default List
