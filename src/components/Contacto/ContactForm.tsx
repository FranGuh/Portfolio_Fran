import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactForm.css';
import Button from '../UI/Button/Button';
import { useLanguage } from '../../contexts/LanguageContext';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'invalid'>('idle');
  const { t } = useLanguage();

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
      <h2 className="title ContactForm__title">{t("contact.title")}</h2>
      <p className="ContactForm__subtitle">{t("contact.description")}</p>
      
      <form onSubmit={handleSubmit} className="ContactForm__form">
        <div className="ContactForm__input-group">
          <label htmlFor="name">{t("contact.nameLabel")}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("contact.namePlaceholder")}
            required
            aria-required="true"
            aria-invalid={status === 'invalid' && !validateInput(formData.name) ? "true" : "false"}
            aria-describedby={status === 'invalid' && !validateInput(formData.name) ? "name-error" : undefined}
          />
          {status === 'invalid' && !validateInput(formData.name) && (
            <span id="name-error" className="ContactForm__field-error" style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
              {t("contact.errorFields")}
            </span>
          )}
        </div>
        
        <div className="ContactForm__input-group">
          <label htmlFor="email">{t("contact.emailLabel")}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("contact.emailPlaceholder")}
            required
            aria-required="true"
            aria-invalid={status === 'invalid' && !formData.email ? "true" : "false"}
          />
        </div>
        
        <div className="ContactForm__input-group">
          <label htmlFor="message">{t("contact.messageLabel")}</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t("contact.messagePlaceholder")}
            rows={5}
            required
            aria-required="true"
            aria-invalid={status === 'invalid' && !validateInput(formData.message) ? "true" : "false"}
            aria-describedby={status === 'invalid' && !validateInput(formData.message) ? "message-error" : undefined}
          />
          <div className="ContactForm__counter">
            {formData.message.length}/500
          </div>
          {status === 'invalid' && !validateInput(formData.message) && (
            <span id="message-error" className="ContactForm__field-error" style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
              {t("contact.errorFields")}
            </span>
          )}
        </div>

        <div role="alert" aria-live="assertive">
          {!isEmailConfigured && <p className="ContactForm__feedback error">{t("contact.errorEmail")}</p>}
          {status === 'invalid' && <p className="ContactForm__feedback error">{t("contact.errorFields")}</p>}
          {status === 'error' && isEmailConfigured && <p className="ContactForm__feedback error">{t("contact.error")}</p>}
          {status === 'success' && <p className="ContactForm__feedback success">{t("contact.success")}</p>}
        </div>
        
        <div style={{ alignSelf: 'center', marginTop: "var(--space-2)" }}>
          <Button type="submit" disabled={status === 'sending' || !isEmailConfigured} isLoading={status === 'sending'}>
            {status === 'sending' ? t("contact.buttonSending") : t("contact.buttonSend")}
          </Button>
        </div>
      </form>
    </section>
  );
}
