import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import './list.css'
import EmptyData from '../EmptyData';
import { ConfirmAlert, EditAlert, WarningAlert } from '../../services/SwalService';
import { Note } from '../../types/Note';
import { v4 as uuidv4 } from 'uuid';
import CardContent from '@mui/material/CardContent';
import { CardActions, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function List() {
  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  useEffect(() => {
    const list = localStorage.getItem('notes')
    if (list) {
      setNotes(JSON.parse(list))
    }
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    if (!title) return

    const note = {
      id: uuidv4(),
      title,
      description
    }

    setNotes([...notes, note])
    localStorage.setItem('notes', JSON.stringify([...notes, note]))
    setTitle('')
    setDescription('')
  }

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  }

  const handleDelete = (index: number) => {
    const newList = notes.filter((item, i) => i !== index)
    setNotes(newList)
    localStorage.setItem('notes', JSON.stringify(newList))
  }

  const handleDeleteAll = () => {
    const warningTitle = "Are you sure?"
    const warningText = "You won't be able to revert this!"
    const confirmTitle = "Deleted!"
    const confirmText = "Your list has been deleted."

    WarningAlert(warningTitle, warningText).then((result) => {
      if (result.isConfirmed) {
        setNotes([])
        localStorage.removeItem('notes')
        ConfirmAlert(confirmTitle, confirmText)
      }
    })
  }

  const handleEdit = (id: string) => {
    const note = notes.find((item) => item.id === id)

    if (!note) return

    const editTitle = "Edit the title"
    const editDescription = "Edit the description"
    let newItem: Note
    EditAlert(editTitle).then((result) => {
      if (result.isConfirmed) {
        const newTitle = result.value.newText

        newItem = {
          ...note,
          title: newTitle
        }
      }
    }).finally(() => {
      EditAlert(editDescription).then((result) => {
        if (result.isConfirmed) {
          const newDescription = result.value.newText
          newItem = {
            ...newItem || note,
            description: newDescription
          }
        }
        const newList = notes.map((item) => item.id === id ? newItem : item)
        setNotes(newList)
        localStorage.setItem('notes', JSON.stringify(newList))
      })
    })


  }

  const handleComplete = (index: number) => {
    const newList = notes.map((item, i) => {
      if (i === index) {
        if(item.title.includes('(Completed)')) return item
        return {
          ...item,
          title: item.title + ' (Completed)'
        }
      }
      return item
    })
    setNotes(newList)
    localStorage.setItem('notes', JSON.stringify(newList))
  }


  return (
    <div className='d-flex flex-column align-items-center'>
      <form className='d-flex mb-3 list mt-5 ms-3' onSubmit={handleSubmit}>
        <div>
          <input className='form-control' type="text" placeholder="Agregue un titulo" value={title} onChange={handleChangeTitle}></input>
          <input className='form-control mt-2' type="text" placeholder="Agregue una descripcion" value={description} onChange={handleChangeDescription}></input>
        </div>
        <button className='btn btn-success ms-2 d-none d-md-block'>SUBMIT</button>
        <button className='btn btn-success ms-2 d-md-none d-block'><CheckIcon /></button>
        <button className='btn btn-danger mx-2 d-none d-md-block' onClick={handleDeleteAll}>CLEAR</button>
        <button className='btn btn-danger mx-2 d-md-none d-block' onClick={handleDeleteAll}><CloseIcon /></button>
      </form>
      {
        notes.length === 0 && <EmptyData message='No hay elementos en la lista' />
      }
      {
        notes.map((item, index) => (

          <div className='d-flex flex-column justify-content-center align-items-center mt-3'>
            <CardContent className='bg-light card-styles text-center'  >

              <Typography variant="h6" component="div" className='fw-bold text-uppercase '>
                {item.title}
              </Typography>

              <Typography variant="body2" className='mt-2'>
                {item.description}
              </Typography>
            </CardContent>
            <CardActions className='bg-light card-styles d-flex justify-content-center'>
              <DeleteIcon className="icon ms-3 me-2" onClick={() => handleDelete(index)} />
              <EditIcon className='icon' onClick={() => handleEdit(item.id)} />
              <CloseIcon className='icon' onClick={() => handleComplete(index)} />
            </CardActions>

          </div>
        ))
      }
    </div>
  )
}

export default List
