import React from 'react'

export function useForm(initialValue) {
  // below the variables are destructered from the array
  const [formData, setFormData] = React.useState(initialValue)
  const [formErrors, setFormErrors] = React.useState(initialValue)


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }
  return { 
    formData, 
    handleChange,
    setFormErrors,
    setFormData,
    formErrors,
  } 
}
