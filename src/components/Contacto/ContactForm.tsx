import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactForm.css';
import Button from '../UI/Button/Button';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'invalid'>('idle');

  // Prevención de inyección de código: bloquea etiquetas o caracteres maliciosos
  const validateInput = (value: string) => {
    const xssPattern = /[<>{}]/;
    return !xssPattern.test(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Filtro de resiliencia: límite de 500 caracteres (prevención de overflow por bots)
    if (name === 'message' && value.length > 500) return;
    if (name === 'name' && value.length > 50) return;
    
    if (validateInput(value)) {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (status === 'invalid') setStatus('idle');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    if (!validateInput(formData.name) || !validateInput(formData.message)) {
      setStatus('invalid');
      return;
    }

    setStatus('sending');

    /* NOTA DE CONEXIÓN: Reemplaza estos placeholders según correo.md */
    emailjs.send(
      'SERVICE_ID_PLACEHOLDER',
      'TEMPLATE_ID_PLACEHOLDER',
      {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
        to_email: 'gitrafuh@gmail.com'
      },
      'PUBLIC_KEY_PLACEHOLDER'
    )
    .then(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    })
    .catch((error) => {
      console.error('Error al enviar correo:', error);
      setStatus('error');
      // Set to idle after a few seconds so they can retry
      setTimeout(() => setStatus('idle'), 5000);
    });
  };

  return (
    <section className="ContactForm__container">
      <h2 className="title" style={{ fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-2)" }}>Contáctame</h2>
      <p className="ContactForm__subtitle">¿Tienes un proyecto en mente? Envíame un mensaje.</p>
      
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

        {status === 'invalid' && <p className="ContactForm__feedback error">Caracteres inválidos detectados. Solo utiliza texto estándar.</p>}
        {status === 'error' && <p className="ContactForm__feedback error">Ocurrió un error al enviar. El servicio requiere ser enlazado.</p>}
        {status === 'success' && <p className="ContactForm__feedback success">¡Mensaje enviado con éxito!</p>}
        
        <div style={{ alignSelf: 'center', marginTop: "var(--space-2)" }}>
          <Button type="submit" disabled={status === 'sending'} isLoading={status === 'sending'}>
            {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
          </Button>
        </div>
      </form>
    </section>
  );
}
