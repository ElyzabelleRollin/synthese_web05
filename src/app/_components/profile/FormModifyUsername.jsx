"use client"
import React from 'react'
import { updateUsername } from '@/app/_actions/update'
import { useRef } from 'react'

const FormModifyUsername = () => {
    const input = useRef( )

    function resetForm(formData){
        updateUsername(formData)
        input.current.value = ""
    }

  return (
    <form action={resetForm}>
        <input type="varchar" name='newUsername'ref={input}/>
        <button>Modify username</button>
  </form>
  )
}

export default FormModifyUsername