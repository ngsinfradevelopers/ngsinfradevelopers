import { useState } from 'react'

const initialForm = {
  name: '',
  mobile: '',
  email: '',
  plotSize: '',
  message: '',
  company: '', // honeypot field — real users never fill this in
}

export default function EnquiryForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Enter your name.'
    if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) next.mobile = 'Enter a valid 10-digit mobile number.'
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.company) return // honeypot triggered, silently drop
    if (!validate()) return

    // No backend is wired up yet. Point this at a form-to-email service
    // such as Formspree, Netlify Forms, or emailJS, e.g.:
    // fetch('https://formspree.io/f/your-id', { method: 'POST', body: new FormData(e.target) })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="form-success" role="status">
        Thank you, {form.name.split(' ')[0]}. We've received your enquiry and will call you on{' '}
        {form.mobile} shortly.
      </div>
    )
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        name="company"
        value={form.company}
        onChange={update('company')}
        className="honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="field">
        <label htmlFor="name">Full name</label>
        <input id="name" type="text" value={form.name} onChange={update('name')} required />
        {errors.name && <p className="field-error">{errors.name}</p>}
      </div>

      <div className="field">
        <label htmlFor="mobile">Mobile number</label>
        <input id="mobile" type="tel" inputMode="numeric" value={form.mobile} onChange={update('mobile')} required />
        {errors.mobile && <p className="field-error">{errors.mobile}</p>}
      </div>

      <div className="field">
        <label htmlFor="email">Email (optional)</label>
        <input id="email" type="email" value={form.email} onChange={update('email')} />
        {errors.email && <p className="field-error">{errors.email}</p>}
      </div>

      <div className="field">
        <label htmlFor="plotSize">Interested plot size</label>
        <select id="plotSize" value={form.plotSize} onChange={update('plotSize')}>
          <option value="">Any size</option>
          <option value="Under 200 sq yds">Under 200 sq yds</option>
          <option value="200–300 sq yds">200–300 sq yds</option>
          <option value="300+ sq yds">300+ sq yds</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" value={form.message} onChange={update('message')} placeholder="Tell us what you're looking for" />
      </div>

      <button className="btn btn-solid" type="submit">Send enquiry</button>
    </form>
  )
}
