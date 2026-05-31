import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import './InfrastructureDetail.css';

interface NodeInfo {
  id: string;
  nameEs: string;
  nameEn: string;
  icon: string;
  number: string;
  subtitleEs: string;
  subtitleEn: string;
  roleEs: string;
  roleEn: string;
  detailsEs: string;
  detailsEn: string;
  metricEs: string;
  metricEn: string;
  techs: string[];
}

export const InfrastructureDetail: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState<string>('api');

  const nodes: Record<string, NodeInfo> = {
    client: {
      id: 'client',
      nameEs: 'Aplicaciones Cliente',
      nameEn: 'Client Applications',
      icon: '💻',
      number: '01',
      subtitleEs: 'Interfaz SPA & Optimización Frontend',
      subtitleEn: 'SPA Interface & Frontend Optimization',
      roleEs: 'Desarrollo de la SPA modular en React con TypeScript, empaquetado optimizado mediante Vite y despliegue automatizado en Vercel con caching inteligente en CDN.',
      roleEn: 'Development of the modular React SPA with TypeScript, optimized bundling via Vite, and automated deployment on Vercel with smart CDN caching.',
      detailsEs: 'Se implementaron técnicas avanzadas de optimización de rendimiento: lazy loading a nivel de componentes y rutas, transiciones de hardware aceleradas mediante Framer Motion y auditoría rigurosa para alcanzar un rendimiento sobresaliente en navegadores móviles.',
      detailsEn: 'Advanced performance optimization techniques were implemented: lazy loading at component and route levels, hardware-accelerated transitions via Framer Motion, and strict auditing to achieve outstanding performance in mobile browsers.',
      metricEs: 'Performance: 98/100 Lighthouse • FCP: 0.8s',
      metricEn: 'Performance: 98/100 Lighthouse • FCP: 0.8s',
      techs: ['React 19', 'TypeScript', 'Vite', 'Framer Motion', 'Vercel CDN'],
    },
    alb: {
      id: 'alb',
      nameEs: 'Balanceador Edge',
      nameEn: 'Edge Load Balancer',
      icon: '⚖️',
      number: '02',
      subtitleEs: 'Enrutamiento y Balanceo de Carga de Capa 7',
      subtitleEn: 'Layer 7 Routing & Load Balancing',
      roleEs: 'Punto de entrada único al backend para la gestión segura de tráfico SSL/TLS, balanceo de carga entre contenedores y mitigación básica de ataques.',
      roleEn: 'Single entry point to the backend for secure SSL/TLS traffic management, container load balancing, and basic attack mitigation.',
      detailsEs: 'Configuración de listeners HTTPS en el puerto 443, políticas de redirección automática HTTP-to-HTTPS y enrutamiento basado en paths para desacoplar servicios. Reglas de CORS y límites de tamaño de payloads estrictos en frontera.',
      detailsEn: 'Configuration of HTTPS listeners on port 443, automatic HTTP-to-HTTPS redirection policies, and path-based routing to decouple services. Strict CORS rules and payload size limits enforced at the perimeter.',
      metricEs: 'Disponibilidad: 99.99% • SSL A+ Security',
      metricEn: 'Availability: 99.99% • SSL A+ Security',
      techs: ['AWS ALB', 'ACM Certificate', 'Route 53', 'DDoS Protection'],
    },
    api: {
      id: 'api',
      nameEs: 'Clúster Stateless',
      nameEn: 'Stateless Cluster',
      icon: '⚙️',
      number: '03',
      subtitleEs: 'Servicios de Backend & Lógica de Negocio',
      subtitleEn: 'Backend Services & Business Logic',
      roleEs: 'Implementación del backend core utilizando ExpressJS en TypeScript, estructurado de forma modular y empaquetado para despliegue en clústeres redundantes.',
      roleEn: 'Implementation of the core backend using ExpressJS in TypeScript, modularly structured and packaged for redundant clúster deployments.',
      detailsEs: 'Desarrollo de middlewares robustos para la validación de esquemas JSON Schema, sanitización de inputs para evitar inyecciones, controladores estructurados para el flujo de la app y un sistema de logging centralizado en consola. Stateless architecture.',
      detailsEn: 'Development of robust middlewares for JSON Schema validation, input sanitization to prevent injections, structured controllers for application flow, and a centralized console logging system. Stateless architecture.',
      metricEs: 'Latencia Core: <120ms • Clúster Activo-Activo',
      metricEn: 'Core Latency: <120ms • Active-Active Clúster',
      techs: ['Node.js', 'ExpressJS', 'TypeScript', 'JWT Auth', 'RESTful API'],
    },
    s3: {
      id: 's3',
      nameEs: 'Despliegues AWS S3',
      nameEn: 'AWS S3 Deployments',
      icon: '☁️',
      number: '04',
      subtitleEs: 'Almacenamiento de Archivos y Assets de Usuario',
      subtitleEn: 'User Asset & File Object Storage',
      roleEs: 'Orquestación de la carga segura de contenidos visuales pesados directamente desde el navegador utilizando credenciales temporales.',
      roleEn: 'Orchestration of secure high-volume visual asset uploads directly from the browser using temporary credentials.',
      detailsEs: 'Implementación de URLs firmadas (Presigned URLs) para que el cliente cargue archivos directamente a S3 sin saturar el ancho de banda del backend. Reglas CORS estrictas y automatización de compresión y renombrado de assets en subida.',
      detailsEn: 'Implementation of Presigned URLs to allow direct client uploads to S3, avoiding backend bandwidth saturation. Strict CORS policies and automated file compression and renaming upon upload.',
      metricEs: 'Escalabilidad: Ilimitada • Zero backend bandwidth',
      metricEn: 'Scalability: Unlimited • Zero backend bandwidth',
      techs: ['AWS S3', 'Presigned URLs', 'CORS policies', 'Lifecycle rules'],
    },
    rds: {
      id: 'rds',
      nameEs: 'Persistencia Relacional',
      nameEn: 'Relational Persistence',
      icon: '🗄️',
      number: '05',
      subtitleEs: 'Persistencia de Datos Relacional de Alta Disponibilidad',
      subtitleEn: 'High-Availability Relational Data Persistence',
      roleEs: 'Modelado y administración del motor PostgreSQL en AWS RDS con configuración optimizada y políticas de respaldo diario.',
      roleEn: 'Modeling and administration of the PostgreSQL engine on AWS RDS with optimized configuration and daily backup policies.',
      detailsEs: 'Diseño del esquema relacional altamente normalizado, configuración óptima del pool de conexiones para soportar ráfagas transaccionales, índices quirúrgicos para acelerar consultas complejas de clasificaciones y aislamiento de red en subred privada.',
      detailsEn: 'Highly normalized relational schema design, optimal connection pool configuration to support transactional bursts, surgical indexes to accelerate complex classification queries, and network isolation in private subnet.',
      metricEs: 'Pool: 50 max conn • Réplica multizona activa',
      metricEn: 'Pool: 50 max conn • Multi-AZ active replica',
      techs: ['PostgreSQL', 'AWS RDS', 'SQL Optimization', 'Subnet Isolation'],
    },
    stripe: {
      id: 'stripe',
      nameEs: 'Transacciones Webhook',
      nameEn: 'Webhook Transactions',
      icon: '💳',
      number: '06',
      subtitleEs: 'Integración Financiera y Autenticación Cifrada',
      subtitleEn: 'Financial Integration & Encrypted Authentication',
      roleEs: 'Arquitectura de pasarela de pagos integrada de forma asíncrona mediante webhooks, y esquema de sesiones seguras.',
      roleEn: 'Async payment gateway architecture integrated via webhooks, and secure session management schema.',
      detailsEs: 'Procesamiento de suscripciones concurrentes con Stripe API, asegurando consistencia mediante webhooks validados con firmas de Stripe. Autenticación robusta basada en JWT (JSON Web Tokens) cifrados, con almacenamiento seguro.',
      detailsEn: 'Concurrent subscription processing with Stripe API, guaranteeing consistency via cryptographically signed webhooks. Robust authentication based on encrypted JWTs, safely stored.',
      metricEs: 'Webhooks: 100% firmados • Transacciones SSL',
      metricEn: 'Webhooks: 100% signed • SSL Encrypted txs',
      techs: ['Stripe SDK', 'JWT', 'Cryptographic Signatures', 'TLS 1.3'],
    },
  };

  const currentNode = nodes[selectedNode];

  return (
    <div className="InfraDetail">
      <div className="InfraDetail__container">
        
        {/* Lado A: Títulos de Película en Scroll (Navegación Typográfica A24-style) */}
        <div className="InfraDetail__nav-column">
          <nav className="A24Marquee">
            {Object.values(nodes).map((node) => (
              <button
                key={node.id}
                className={`A24Marquee__row ${selectedNode === node.id ? 'is-selected' : ''}`}
                onClick={() => setSelectedNode(node.id)}
                aria-label={`Select ${language === 'en' ? node.nameEn : node.nameEs}`}
              >
                <span className="A24Marquee__num">{node.number}</span>
                <span className="A24Marquee__name">
                  {language === 'en' ? node.nameEn : node.nameEs}
                </span>
                <span className="A24Marquee__dot"></span>
              </button>
            ))}
          </nav>
        </div>
 
        {/* Lado B: Ficha Técnica Limpia Side-by-Side con Leve Gradiente Naranja */}
        <div className="InfraDetail__card-column">
          <div className="A24DetailCard">
            
            <div className="A24DetailCard__header">
              <div className="A24DetailCard__meta">
                <span className="A24DetailCard__number">{currentNode.number}</span>
                <div>
                  <h3 className="A24DetailCard__title">
                    {language === 'en' ? currentNode.nameEn : currentNode.nameEs}
                  </h3>
                  <p className="A24DetailCard__subtitle">
                    {language === 'en' ? currentNode.subtitleEn : currentNode.subtitleEs}
                  </p>
                </div>
              </div>
              
              <div className="A24DetailCard__telemetry">
                <span className="telemetry-label">{language === 'en' ? 'Core Telemetry' : 'Telemetría Core'}</span>
                <span className="telemetry-value">{language === 'en' ? currentNode.metricEn : currentNode.metricEs}</span>
              </div>
            </div>

            <div className="A24DetailCard__body">
              <div className="A24DetailCard__section">
                <span className="section-label">{language === 'en' ? 'DEVELOPMENT ROLE' : 'ROL DE DESARROLLO'}</span>
                <p>{language === 'en' ? currentNode.roleEn : currentNode.roleEs}</p>
              </div>

              <div className="A24DetailCard__section">
                <span className="section-label">{language === 'en' ? 'ENGINEERING & DEPLOYMENT' : 'INGENIERÍA Y DESPLIEGUE'}</span>
                <p>{language === 'en' ? currentNode.detailsEn : currentNode.detailsEs}</p>
              </div>
            </div>

            <div className="A24DetailCard__footer">
              <span className="tech-label">{language === 'en' ? 'STACK // ' : 'STACK // '}</span>
              <div className="A24DetailCard__techs">
                {currentNode.techs.map((tech) => (
                  <span key={tech} className="A24DetailCard__tag">{tech}</span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Fila CTA Final: Full-Width (Navegación tipo A24 hacia el portfolio de proyectos) */}
        <div className="A24CTA">
          <button onClick={() => navigate('/portfolio')} className="A24CTA__button">
            <span className="A24CTA__text">
              {language === 'en' ? 'EXPLORE OTHER PROJECTS ➔' : 'EXPLORAR OTROS PROYECTOS ➔'}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
