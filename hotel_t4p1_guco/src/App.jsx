import { useState } from 'react'
import './App.css'

const initialForm = {
  identification: '',
  firstName: '',
  lastName: '',
  phone: '',
  room: '',
  bloodType: '',
  checkIn: '',
  checkOut: '',
}

const fieldLabels = {
  identification: 'Identificación',
  firstName: 'Nombres',
  lastName: 'Apellidos',
  phone: 'Teléfono',
  room: 'Habitación',
  bloodType: 'RH',
  checkIn: 'Fecha de ingreso',
  checkOut: 'Fecha de salida',
}

function App() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
    setNotice('')
  }

  const validateForm = () => {
    const nextErrors = Object.keys(form).reduce((currentErrors, field) => {
      if (!form[field]) {
        currentErrors[field] = `${fieldLabels[field]} es obligatorio.`
      }
      return currentErrors
    }, {})

    if (form.checkIn && form.checkOut && form.checkOut < form.checkIn) {
      nextErrors.checkOut = 'La fecha de salida debe ser posterior al ingreso.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validateForm()) {
      setNotice('Registro guardado correctamente.')
    }
  }

  const handleCancel = () => {
    setForm(initialForm)
    setErrors({})
    setNotice('')
  }

  return (
    <main className="page-shell">
      <section className="registration-card" aria-labelledby="page-title">
        <header className="form-header">
          <div>
            <p className="eyebrow">Administración de huéspedes</p>
            <h1 id="page-title">Registro hotel</h1>
          </div>
          <div className="hotel-mark" aria-hidden="true">H</div>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <Field label="Identificación" name="identification" value={form.identification} error={errors.identification} onChange={handleChange} inputMode="numeric" />
            <Field label="Nombres" name="firstName" value={form.firstName} error={errors.firstName} onChange={handleChange} />
            <Field label="Apellidos" name="lastName" value={form.lastName} error={errors.lastName} onChange={handleChange} />
            <Field label="Teléfono" name="phone" value={form.phone} error={errors.phone} onChange={handleChange} inputMode="tel" />
            <Field label="Habitación" name="room" value={form.room} error={errors.room} onChange={handleChange} inputMode="numeric" />
            <div className="field-group compact-field">
              <label htmlFor="bloodType">RH</label>
              <select id="bloodType" name="bloodType" value={form.bloodType} onChange={handleChange} aria-invalid={Boolean(errors.bloodType)}>
                <option value="">Seleccionar</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
              <ErrorMessage message={errors.bloodType} />
            </div>
            <Field label="Fecha de ingreso" name="checkIn" type="date" value={form.checkIn} error={errors.checkIn} onChange={handleChange} />
            <Field label="Fecha de salida" name="checkOut" type="date" value={form.checkOut} error={errors.checkOut} onChange={handleChange} />
          </div>

          <div className="form-footer">
            <p className="form-hint">Todos los campos son obligatorios.</p>
            {notice && <p className="success-message" role="status">{notice}</p>}
            <div className="actions">
              <button className="button button-primary" type="submit" onClick={() => window.alert('Se presionó el botón Registrar.')}>Registrar</button>
              <button className="button button-secondary" type="button" onClick={() => { window.alert('Se presionó el botón Cancelar.'); handleCancel() }}>Cancelar</button>
            </div>
          </div>
        </form>
      </section>
    </main>
  )
}

function Field({ label, name, type = 'text', value, error, onChange, inputMode }) {
  return (
    <div className="field-group">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} value={value} onChange={onChange} inputMode={inputMode} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} />
      <ErrorMessage id={`${name}-error`} message={error} />
    </div>
  )
}

function ErrorMessage({ id, message }) {
  return message ? <p className="error-message" id={id} role="alert">{message}</p> : null
}

export default App
