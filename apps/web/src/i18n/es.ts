export const es = {
    common: {
        loading: 'Cargando...',
        error: 'Error',
        save: 'Guardar Cambios',
        cancel: 'Cancelar',
        delete: 'Eliminar',
        edit: 'Editar',
        active: 'Activo'
    },
    dashboard: {
        chip: 'Creator Dashboard',
        title: 'Panel',
        subtitle: 'Mira cuánto dinero generan tus links y tu página bio en tiempo real.',
        stats: {
            revenue: {
                label: 'Ingresos totales',
                sub: 'Links + Bio, combinados',
                links: 'Enlaces',
                bio: 'Bio Page'
            },
            clicks: {
                label: 'Clics totales',
                sub: 'Impacto real de tus links'
            },
            referrals: {
                label: 'Programa de referidos',
                sub: 'Invita creadores, cobra en automático',
                text: 'Comparte tu link personal y genera ingresos adicionales por cada creador que moneticemos.',
                copy_alert: '¡Link de referido copiado!'
            },
            rpm: {
                label: 'RPM medio',
                sub: 'Ingreso por cada 1.000 visitas'
            }
        },
        recent: {
            title: 'Actividad reciente',
            subtitle: 'Últimos Smart Links creados y cuánto están generando.'
        },
        loading_text: 'Sincronizando datos financieros...'
    },
    analytics: {
        loading: 'Cargando analíticas en tiempo real...',
        chip: 'Live Analytics',
        header: 'Métricas de rendimiento en tiempo real para todos tus enlaces.',
        timeline: {
            title: 'Tráfico e Ingresos',
            badge: 'Últimos 30 días',
            subtitle: 'Actividad combinada de todos tus Smart Links y Bio Page.',
            empty_title: 'Aún no hay suficientes datos.',
            empty_desc: 'Empieza a compartir tus Smart Links para activar las analíticas.',
            clicks: 'Clics',
            earnings: 'Ganancias'
        },
        locations: {
            title: 'Top Geografías',
            subtitle: 'Países que generan más clics.',
            empty: 'Sin datos geográficos.',
            clicks: 'Clics'
        },
        devices: {
            title: 'Dispositivos',
            subtitle: 'División del tráfico entre móvil, pc y otros.',
            empty: 'Esperando tráfico...',
            total: 'Clics Totales',
            desktop: 'Escritorio',
            mobile: 'Móvil',
            tablet: 'Tablet',
            other: 'Otro',
            visitors: 'Visitantes'
        }
    },
    settings: {
        header: {
            title: 'Ajustes',
            subtitle: 'Gestiona tu identidad, seguridad y métodos de cobro.',
            verified: 'VERIFICADO'
        },
        nav: {
            profile: 'Perfil',
            security: 'Seguridad',
            billing: 'Pagos',
            logout: 'Cerrar Sesión'
        },
        profile: {
            name_label: 'Nombre Completo',
            bio_label: 'Biografía',
            bio_placeholder: 'Cuéntanos sobre ti...'
        },
        security: {
            title: 'Seguridad de la Cuenta',
            desc: 'Protege tu cuenta con autenticación de dos factores.',
            '2fa_title': 'Autenticación 2FA',
            '2fa_on': 'Tu cuenta está protegida.',
            '2fa_off': 'Recomendado para proteger tus ingresos.',
            enable: 'Activar',
            disable: 'Desactivar',
            scan: 'Escanea con Google Authenticator',
            confirm: 'Confirmar Escaneo'
        },
        billing: {
            title: 'Métodos de Cobro',
            desc: 'Configura dónde quieres recibir tus ganancias.',
            paypal_label: 'Correo asociado a PayPal',
            paypal_help: 'Usado para pagos automáticos mensuales.',
            bank_title: 'Transferencia Bancaria',
            bank_label: 'IBAN / SWIFT / Cuenta',
            bank_help: 'Solo para retiros mayores a $500.'
        },
        common: {
            save: 'Guardar Cambios'
        }
    },
    tech: {
        title: 'LinkPay Neural Engine™',
        desc: 'Nuestra infraestructura de monetización impulsada por IA optimiza cada visita en tiempo real, garantizando el CPM más alto sin comprometer la experiencia del usuario.',
        status: {
            online: 'SISTEMA ONLINE',
            latency: 'lat: 12ms | region: global-edge'
        },
        metrics: {
            speed: 'Velocidad Subasta',
            ai: 'Predicción IA',
            nodes: 'Nodos Activos'
        },
        banner: {
            text: 'Protección Activa:',
            sub: 'El algoritmo bloquea el 99.9% del tráfico bot antes de que afecte tu reputación.'
        },
        features: {
            cpm_title: 'CPM Predictivo',
            cpm_desc: 'No vendemos a ciegas. Nuestra IA predice qué anunciante pagará más en el futuro inmediato y reserva el espacio.',
            edge_title: 'Edge Computing Global',
            edge_desc: 'Tus enlaces se sirven desde 240+ puntos de presencia (PoP). La lógica ocurre en el "borde", eliminando latencia.',
            fraud_title: 'Escudo Anti-Fraude',
            fraud_desc: 'Huella digital avanzada para detectar bots. Solo monetizas humanos reales, protegiendo tu cuenta.',
            scale_title: 'Escalabilidad Serverless',
            scale_desc: 'Sin servidores. Nuestra arquitectura escala automáticamente para manejar millones de clics por segundo.'
        }
    }
};
