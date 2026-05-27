import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactForm.css';
import Button from '../UI/Button/Button';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'invalid'>('idle');
  const isEmailConfigured = Boolean(
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY &&
    import.meta.env.VITE_CONTACT_EMAIL
  );

  const validateInput = (value: string) => {
    const xssPattern = /[<>{}]/;
    return !xssPattern.test(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'message' && value.length > 500) return;
    if (name === 'name' && value.length > 50) return;
    
    if (validateInput(value)) {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (status === 'invalid') setStatus('idle');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailConfigured) {
      setStatus('error');
      return;
    }

    if (!formData.name || !formData.email || !formData.message) return;
    
    if (!validateInput(formData.name) || !validateInput(formData.message)) {
      setStatus('invalid');
      return;
    }

    setStatus('sending');

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
        to_email: import.meta.env.VITE_CONTACT_EMAIL
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    
    .then(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    })
    .catch((error) => {
      if (import.meta.env.DEV) {
        console.error('Error al enviar correo:', error);
      }
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    });
  };

  return (
    <section className="ContactForm__container">
      <h2 className="title ContactForm__title">Hablemos de tu próximo proyecto</h2>
      <p className="ContactForm__subtitle">Si buscás a alguien que entienda tu problema y lo resuelva, escribime.</p>
      
      <form onSubmit={handleSubmit} className="ContactForm__form">
        <div className="ContactForm__input-group">
          <label htmlFor="name">Nombre / Empresa</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe Corp."
            required
          />
        </div>
        
        <div className="ContactForm__input-group">
          <label htmlFor="email">Correo electrónico de contacto</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
          />
        </div>
        
        <div className="ContactForm__input-group">
          <label htmlFor="message">Mensaje (máx. 500 caracteres)</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Hola, me gustaría conversar sobre... (Acepta solo texto limpio)"
            rows={5}
            required
          />
          <div className="ContactForm__counter">
            {formData.message.length}/500
          </div>
        </div>

        <div aria-live="polite">
          {!isEmailConfigured && <p className="ContactForm__feedback error">El formulario no está configurado todavía. Usa LinkedIn o GitHub para contactarme.</p>}
          {status === 'invalid' && <p className="ContactForm__feedback error">Caracteres inválidos detectados. Solo utiliza texto estándar.</p>}
          {status === 'error' && isEmailConfigured && <p className="ContactForm__feedback error">Ocurrió un error al enviar. Intenta de nuevo más tarde.</p>}
          {status === 'success' && <p className="ContactForm__feedback success">¡Mensaje enviado con éxito!</p>}
        </div>
        
        <div style={{ alignSelf: 'center', marginTop: "var(--space-2)" }}>
          <Button type="submit" disabled={status === 'sending' || !isEmailConfigured} isLoading={status === 'sending'}>
            {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
          </Button>
        </div>
      </form>
    </section>
  );
}
