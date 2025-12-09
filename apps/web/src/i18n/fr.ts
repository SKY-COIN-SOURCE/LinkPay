export const fr = {
    common: {
        loading: 'Chargement...',
        error: 'Erreur',
        save: 'Sauvegarder',
        cancel: 'Annuler',
        delete: 'Supprimer',
        edit: 'Modifier',
        active: 'Actif'
    },
    dashboard: {
        chip: 'Tableau de bord',
        title: 'Tableau de bord',
        subtitle: 'Voyez combien d\'argent vos liens et votre page bio génèrent en temps réel.',
        stats: {
            revenue: {
                label: 'Revenu Total',
                sub: 'Liens + Bio, combinés',
                links: 'Liens',
                bio: 'Bio Page'
            },
            clicks: {
                label: 'Clics Totaux',
                sub: 'Impact réel de vos liens'
            },
            referrals: {
                label: 'Programme de Parrainage',
                sub: 'Invitez des créateurs, gagnez automatiquement',
                text: 'Partagez votre lien et gagnez un revenu supplémentaire pour chaque créateur monétisé.',
                copy_alert: 'Lien copié!'
            },
            rpm: {
                label: 'RPM Moyen',
                sub: 'Revenu par 1 000 visites'
            }
        },
        recent: {
            title: 'Activité Récente',
            subtitle: 'Derniers liens créés et leurs revenus.'
        },
        loading_text: 'Synchronisation des données financières...'
    },
    analytics: {
        loading: 'Chargement des analyses...',
        chip: 'Analyses en Direct',
        header: 'Métriques de performance en temps réel.',
        timeline: {
            title: 'Trafic et Revenus',
            badge: '30 derniers jours',
            subtitle: 'Activité combinée de tous vos liens.',
            empty_title: 'Pas assez de données.',
            empty_desc: 'Partagez vos liens pour activer les analyses.',
            clicks: 'Clics',
            earnings: 'Gains'
        },
        locations: {
            title: 'Top Géographies',
            subtitle: 'Pays générant le plus de clics.',
            empty: 'Aucune donnée géographique.',
            clicks: 'Clics'
        },
        devices: {
            title: 'Appareils',
            subtitle: 'Répartition du trafic (mobile, bureau).',
            empty: 'En attente de trafic...',
            total: 'Clics Totaux',
            desktop: 'Bureau',
            mobile: 'Mobile',
            tablet: 'Tablette',
            other: 'Autre',
            visitors: 'Visiteurs'
        }
    },
    settings: {
        header: {
            title: 'Paramètres',
            subtitle: 'Gérez votre identité et vos paiements.',
            verified: 'VÉRIFIÉ'
        },
        nav: {
            profile: 'Profil',
            security: 'Sécurité',
            billing: 'Paiements',
            logout: 'Déconnexion'
        },
        profile: {
            name_label: 'Nom Complet',
            bio_label: 'Bio',
            bio_placeholder: 'Parlez-nous de vous...'
        },
        security: {
            title: 'Sécurité du Compte',
            desc: 'Protégez votre compte avec l\'authentification à deux facteurs.',
            '2fa_title': 'Authentification 2FA',
            '2fa_on': 'Votre compte est protégé.',
            '2fa_off': 'Recommandé pour protéger vos revenus.',
            enable: 'Activer',
            disable: 'Désactiver',
            scan: 'Scanner avec Google Authenticator',
            confirm: 'Confirmer'
        },
        billing: {
            title: 'Méthodes de Paiement',
            desc: 'Configurez où recevoir vos gains.',
            paypal_label: 'Email PayPal',
            paypal_help: 'Utilisé pour les paiements mensuels automatiques.',
            bank_title: 'Virement Bancaire',
            bank_label: 'IBAN / SWIFT',
            bank_help: 'Seulement pour les retraits > 500$.'
        },
        common: {
            save: 'Sauvegarder'
        }
    },
    tech: {
        title: 'Moteur Neural LinkPay™',
        desc: 'Notre infrastructure optimise chaque visite en temps réel.',
        status: {
            online: 'SYSTÈME EN LIGNE',
            latency: 'lat: 12ms | région: global-edge'
        },
        metrics: {
            speed: 'Vitesse Enchères',
            ai: 'Prédiction IA',
            nodes: 'Nœuds Actifs'
        },
        banner: {
            text: 'Protection Active:',
            sub: 'L\'algorithme bloque 99.9% du trafic bot.'
        },
        features: {
            cpm_title: 'CPM Prédictif',
            cpm_desc: 'L\'IA prédit quel annonceur paiera le plus.',
            edge_title: 'Edge Computing Global',
            edge_desc: 'Servi depuis 240+ points de présence.',
            fraud_title: 'Bouclier Anti-Fraude',
            fraud_desc: 'Protection avancée contre les bots.',
            scale_title: 'Évolutivité Serverless',
            scale_desc: 'Gère des millions de clics automatiquement.'
        }
    }
};
