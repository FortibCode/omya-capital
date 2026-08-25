import React, { createContext, useContext, useState } from 'react';

// Slugs in display order — shared across languages, used wherever the 4
// services need to be listed (nav mega menu, contact subject dropdown, etc).
export const SERVICE_SLUG_ORDER = [
    'financement-de-projets',
    'fusions-acquisitions',
    'restructuration',
    'conseil-strategique',
];

export const TRANSLATIONS = {
    fr: {
        code: 'fr',
        label: 'Français',
        flag: '🇫🇷',
        tagline: "Redéfinir l'investissement en Afrique Centrale",

        common: { prev: 'Précédent', next: 'Suivant' },

        nav: {
            home: 'Accueil',
            about: 'À propos',
            services: 'Services',
            team: 'Équipe',
            partners: 'Partenaires',
            news: 'Actualités',
            documents: 'Documents',
            contact: 'Contact',
            contactBtn: 'Prendre contact',
            ourServices: 'Nos expertises',
            aboutItems: [
                { key: 'presentation', href: '/a-propos#presentation', title: 'Présentation' },
                { key: 'mission', href: '/a-propos#mission', title: 'Mission' },
                { key: 'vision', href: '/a-propos#vision', title: 'Vision' },
                { key: 'valeurs', href: '/a-propos#valeurs', title: 'Valeurs' },
            ],
            newsItems: [
                { key: 'actualites', routeName: 'news.index', title: 'Actualités' },
                { key: 'publications', routeName: 'news.publications', title: 'Publications' },
                { key: 'communiques', routeName: 'news.communiques', title: 'Communiqués' },
            ],
        },

        hero: {
            heading: "En tant que pionnier de la croissance du secteur privé, nous façonnons le paysage économique de la sous-région en investissant notre capital, notre expérience et notre expertise là où ils ont le plus d'impact.",
            subheading: "Redéfinir l'investissement en Afrique Centrale",
            discoverServices: 'Découvrir nos services',
            contactUs: 'Prendre contact',
            shuffleHint: 'Cliquer pour battre les cartes',
        },

        home: {
            pillarsEyebrow: 'Notre Différence',
            pillarsTitle: 'Pourquoi OMYA Capital ?',
            pillars: [
                { title: 'Expertise Régionale', desc: 'Un ancrage profond en Afrique Centrale et une compréhension fine de ses dynamiques économiques.' },
                { title: 'Rigueur & Standards Internationaux', desc: 'Diligence et rigueur dans chaque mandat, selon les meilleurs standards internationaux.' },
                { title: 'Accompagnement sur-Mesure', desc: "De la structuration à l'exécution, un accompagnement complet de vos projets stratégiques." },
            ],
            aboutEyebrow: "À Propos d'OMYA Capital",
            aboutTitle: 'OMYA Capital',
            aboutP1: "OMYA Capital est un cabinet de conseil financier de référence, dédié aux opérateurs économiques privés et aux institutions d'Afrique centrale. Nous accompagnons nos clients dans la structuration, le financement et l'exécution de leurs projets stratégiques et dirigeons nos actions vers les acteurs à fort potentiel de croissance afin de transformer ceux-ci en champions régionaux.",
            aboutP2: "OMYA Capital se positionne comme un véritable partenaire en matière de création de valeur et d'essor économique de la sous-région.",
            aboutCta: 'En savoir plus sur OMYA CAPITAL',
            servicesEyebrow: 'Nos Services',
            servicesTitleLine1: 'Une expertise sur-mesure.',
            servicesTitleLine2: 'Une exigence sans compromis.',
            learnMore: 'En savoir plus',
            teamEyebrow: 'Notre Équipe',
            teamTitle: "L'Équipe Dirigeante",
            teamSubtitle: 'Des experts engagés au service de la croissance de nos clients.',
            teamCta: "Découvrir toute l'équipe dirigeante",
            partnersEyebrow: 'Réseau Partenaire',
            partnersTitle: 'Ils nous font confiance',
            partnersCta: 'Voir tous nos partenaires',
            newsEyebrow: 'Actualités',
            newsTitle: 'Nos dernières publications',
            newsEmpty: 'Aucune actualité publiée pour le moment.',
            ctaTitle: "Votre projet mérite un accompagnement d'exception",
            ctaText: 'Chaque situation est unique. Prenez contact avec nos équipes pour une analyse confidentielle et sans engagement de votre projet.',
            ctaBtn: 'Prendre contact',
        },

        about: {
            heroDescription: "Redéfinir l'investissement en Afrique Centrale.",
            presEyebrow: 'Qui sommes-nous',
            presTitle: 'Présentation',
            missionEyebrow: 'Notre raison d’être',
            missionTitle: 'Mission',
            missionQuote: "Être acteur du progrès en Afrique. Impacter positivement notre environnement à travers nos investissements et notre expertise en agissant avec diligence et rigueur dans les meilleurs standards internationaux.",
            visionEyebrow: 'Là où nous voulons aller',
            visionTitle: 'Vision',
            visionQuote: "Devenir la plus grande société régionale d'investissement en Afrique centrale à travers l'accompagnement stratégique, financier des acteurs publics et privés.",
            valeursEyebrow: 'Ce qui nous guide',
            valeursTitle: 'Nos Valeurs',
            valeursSubtitle: 'Ce sont ces principes qui guident nos décisions au quotidien.',
            valeurs: [
                { title: 'Probité, Intégrité, Responsabilité', desc: 'Agir avec respect.' },
                { title: 'Excellence', desc: 'Toujours se former et être informé.' },
                { title: 'Engagement', desc: 'Loyauté envers nos clients, partenaires, employés.' },
                { title: 'Innovation', desc: "Transformer le présent et penser l'avenir." },
            ],
            ctaTitle: 'Travaillons ensemble',
            ctaText: 'Prenez contact avec nos équipes pour un premier échange confidentiel.',
            ctaBtn: 'Prendre contact avec nos équipes',
        },

        services: {
            heroEyebrow: 'Nos Expertises',
            heroTitle: 'Nos Services',
            heroDescription: 'Un accompagnement sur-mesure à chaque étape de vos projets stratégiques.',
            solicitBtn: 'Solliciter ce service',
            ctaTitle: "Votre projet mérite un accompagnement d'exception",
            ctaText: 'Chaque situation est unique. Prenez contact avec nos équipes pour une analyse confidentielle et sans engagement de votre projet.',
            ctaBtn: 'Nous contacter',
        },

        team: {
            heroEyebrow: 'Notre Équipe',
            heroTitle: "L'Équipe Dirigeante",
            heroDescription: 'Des professionnels engagés au service de la croissance de nos clients.',
        },

        partners: {
            heroEyebrow: 'Réseau Partenaire',
            heroTitle: 'Nos Partenaires',
        },

        contact: {
            heroEyebrow: 'Prendre Contact',
            heroTitle: 'Parlons de votre Projet',
            heroDescription: 'Nos équipes sont disponibles pour vous écouter, analyser votre situation et vous proposer un accompagnement sur-mesure.',
            phoneLabel: 'Téléphone',
            emailLabel: 'E-mail',
            addressLabel: 'Siège Social',
            formTitle: 'Envoyez-nous un message',
            formSubtitle: 'Décrivez votre projet ou votre question, un conseiller vous répondra dans les meilleurs délais.',
            successTitle: 'Message envoyé avec succès !',
            nameLabel: 'Nom complet *',
            namePlaceholder: 'Jean Dupont',
            phoneFieldLabel: 'Téléphone',
            phonePlaceholder: '+242 ...',
            emailFieldLabel: 'Adresse e-mail *',
            emailPlaceholder: 'vous@exemple.com',
            subjectLabel: 'Objet de votre demande',
            subjectPlaceholder: '— Sélectionner un sujet —',
            subjectOther: 'Autre renseignement',
            messageLabel: 'Votre message *',
            messagePlaceholder: 'Décrivez votre projet...',
            sendBtn: 'Envoyer mon message',
            sendingBtn: 'Envoi en cours…',
            socialTitle: 'Réseaux Sociaux',
            socialText: 'Nos comptes officiels seront communiqués prochainement.',
        },

        news: {
            heroEyebrow: 'Actualités & Publications',
            types: { actualite: 'Actualités', publication: 'Publications', communique: 'Communiqués' },
            download: 'Télécharger le document',
            empty: 'Aucun contenu publié pour le moment dans cette rubrique.',
        },

        documents: {
            heroEyebrow: 'Bibliothèque de Documents',
            heroTitle: 'Documents',
            tableHeaders: { document: 'Document', type: 'Type', date: 'Date', description: 'Description', actions: 'Actions' },
            consult: 'Consulter',
            download: 'Télécharger',
            soon: 'Bientôt disponible',
            empty: 'Aucun document disponible pour le moment.',
        },

        footer: {
            description: "OMYA Capital est un cabinet de conseil financier de référence, dédié aux opérateurs économiques privés et aux institutions d'Afrique centrale.",
            navTitle: 'Navigation',
            servicesTitle: 'Nos Services',
            contactTitle: 'Contact',
            followTitle: 'Suivez OMYA CAPITAL',
            copyright: 'Tous droits réservés.',
        },

        servicesContent: {
            'financement-de-projets': { title: 'Financement de projets', desc: 'Structuration et accès aux marchés de capitaux locaux et internationaux' },
            'fusions-acquisitions': { title: 'Fusions & Acquisitions', desc: 'Accompagnement buy-side & sell-side, négociation et closing' },
            restructuration: { title: 'Restructuration', desc: 'Optimisation bilancielle, refinancement, plans de redressement' },
            'conseil-strategique': { title: 'Conseil stratégique', desc: "Business plan, valorisation, préparation à l'investissement" },
        },

        teamRoles: {
            'Christelle BASILUA SEMY': 'Directrice Générale',
            'Suzick TOMA': 'Directrice de mission',
            'Louis-Raymond GOMES': 'Conseiller Juridique',
            'Sarah BONANA': 'Assistante Exécutive',
        },
    },

    en: {
        code: 'en',
        label: 'English',
        flag: '🇬🇧',
        tagline: 'Redefining Investment in Central Africa',

        common: { prev: 'Previous', next: 'Next' },

        nav: {
            home: 'Home',
            about: 'About',
            services: 'Services',
            team: 'Team',
            partners: 'Partners',
            news: 'News',
            documents: 'Documents',
            contact: 'Contact',
            contactBtn: 'Get in Touch',
            ourServices: 'Our Expertise',
            aboutItems: [
                { key: 'presentation', href: '/a-propos#presentation', title: 'Overview' },
                { key: 'mission', href: '/a-propos#mission', title: 'Mission' },
                { key: 'vision', href: '/a-propos#vision', title: 'Vision' },
                { key: 'valeurs', href: '/a-propos#valeurs', title: 'Values' },
            ],
            newsItems: [
                { key: 'actualites', routeName: 'news.index', title: 'News' },
                { key: 'publications', routeName: 'news.publications', title: 'Publications' },
                { key: 'communiques', routeName: 'news.communiques', title: 'Press Releases' },
            ],
        },

        hero: {
            heading: "As a pioneer of private-sector growth, we shape the sub-region's economic landscape by investing our capital, experience and expertise where they have the greatest impact.",
            subheading: 'Redefining Investment in Central Africa',
            discoverServices: 'Discover our services',
            contactUs: 'Get in touch',
            shuffleHint: 'Click to shuffle the cards',
        },

        home: {
            pillarsEyebrow: 'Our Difference',
            pillarsTitle: 'Why OMYA Capital?',
            pillars: [
                { title: 'Regional Expertise', desc: 'A deep foothold in Central Africa and a sharp understanding of its economic dynamics.' },
                { title: 'Rigor & International Standards', desc: 'Diligence and rigor on every mandate, in line with the highest international standards.' },
                { title: 'Tailored Support', desc: 'From structuring to execution, comprehensive support for your strategic projects.' },
            ],
            aboutEyebrow: 'About OMYA Capital',
            aboutTitle: 'OMYA Capital',
            aboutP1: 'OMYA Capital is a leading financial advisory firm dedicated to private economic operators and institutions across Central Africa. We support our clients in structuring, financing and executing their strategic projects, directing our efforts toward high-growth-potential players to help transform them into regional champions.',
            aboutP2: 'OMYA Capital positions itself as a true partner in value creation and economic growth for the sub-region.',
            aboutCta: 'Learn more about OMYA CAPITAL',
            servicesEyebrow: 'Our Services',
            servicesTitleLine1: 'Tailored expertise.',
            servicesTitleLine2: 'Uncompromising standards.',
            learnMore: 'Learn more',
            teamEyebrow: 'Our Team',
            teamTitle: 'Executive Team',
            teamSubtitle: "Committed experts serving our clients' growth.",
            teamCta: 'Discover the whole executive team',
            partnersEyebrow: 'Partner Network',
            partnersTitle: 'They trust us',
            partnersCta: 'See all our partners',
            newsEyebrow: 'News',
            newsTitle: 'Our latest publications',
            newsEmpty: 'No news published at this time.',
            ctaTitle: 'Your project deserves exceptional support',
            ctaText: 'Every situation is unique. Get in touch with our teams for a confidential, no-obligation review of your project.',
            ctaBtn: 'Get in touch',
        },

        about: {
            heroDescription: 'Redefining Investment in Central Africa.',
            presEyebrow: 'Who we are',
            presTitle: 'Overview',
            missionEyebrow: 'Our purpose',
            missionTitle: 'Mission',
            missionQuote: 'To be a driving force of progress in Africa. To positively impact our environment through our investments and expertise, acting with diligence and rigor to the highest international standards.',
            visionEyebrow: 'Where we want to go',
            visionTitle: 'Vision',
            visionQuote: 'To become the leading regional investment company in Central Africa through strategic and financial support to public and private players.',
            valeursEyebrow: 'What guides us',
            valeursTitle: 'Our Values',
            valeursSubtitle: 'These are the principles that guide our decisions every day.',
            valeurs: [
                { title: 'Integrity, Probity, Accountability', desc: 'Acting with respect.' },
                { title: 'Excellence', desc: 'Always learning and staying informed.' },
                { title: 'Commitment', desc: 'Loyalty to our clients, partners and employees.' },
                { title: 'Innovation', desc: 'Transforming the present, shaping the future.' },
            ],
            ctaTitle: "Let's work together",
            ctaText: 'Get in touch with our teams for a first confidential conversation.',
            ctaBtn: 'Get in touch with our teams',
        },

        services: {
            heroEyebrow: 'Our Expertise',
            heroTitle: 'Our Services',
            heroDescription: 'Tailored support at every stage of your strategic projects.',
            solicitBtn: 'Request this service',
            ctaTitle: 'Your project deserves exceptional support',
            ctaText: 'Every situation is unique. Get in touch with our teams for a confidential, no-obligation review of your project.',
            ctaBtn: 'Contact us',
        },

        team: {
            heroEyebrow: 'Our Team',
            heroTitle: 'Executive Team',
            heroDescription: "Committed professionals serving our clients' growth.",
        },

        partners: {
            heroEyebrow: 'Partner Network',
            heroTitle: 'Our Partners',
        },

        contact: {
            heroEyebrow: 'Get in Touch',
            heroTitle: "Let's Talk About Your Project",
            heroDescription: 'Our teams are available to listen, review your situation and offer tailored support.',
            phoneLabel: 'Phone',
            emailLabel: 'Email',
            addressLabel: 'Head Office',
            formTitle: 'Send us a message',
            formSubtitle: 'Describe your project or question — an advisor will get back to you as soon as possible.',
            successTitle: 'Message sent successfully!',
            nameLabel: 'Full name *',
            namePlaceholder: 'Jean Dupont',
            phoneFieldLabel: 'Phone',
            phonePlaceholder: '+242 ...',
            emailFieldLabel: 'Email address *',
            emailPlaceholder: 'you@example.com',
            subjectLabel: 'Subject of your request',
            subjectPlaceholder: '— Select a subject —',
            subjectOther: 'Other inquiry',
            messageLabel: 'Your message *',
            messagePlaceholder: 'Describe your project...',
            sendBtn: 'Send my message',
            sendingBtn: 'Sending…',
            socialTitle: 'Social Media',
            socialText: 'Our official accounts will be announced soon.',
        },

        news: {
            heroEyebrow: 'News & Publications',
            types: { actualite: 'News', publication: 'Publications', communique: 'Press Releases' },
            download: 'Download the document',
            empty: 'No content has been published in this section yet.',
        },

        documents: {
            heroEyebrow: 'Document Library',
            heroTitle: 'Documents',
            tableHeaders: { document: 'Document', type: 'Type', date: 'Date', description: 'Description', actions: 'Actions' },
            consult: 'View',
            download: 'Download',
            soon: 'Coming soon',
            empty: 'No documents available at this time.',
        },

        footer: {
            description: 'OMYA Capital is a leading financial advisory firm dedicated to private economic operators and institutions across Central Africa.',
            navTitle: 'Navigation',
            servicesTitle: 'Our Services',
            contactTitle: 'Contact',
            followTitle: 'Follow OMYA CAPITAL',
            copyright: 'All rights reserved.',
        },

        servicesContent: {
            'financement-de-projets': { title: 'Project Financing', desc: 'Structuring and access to local and international capital markets' },
            'fusions-acquisitions': { title: 'Mergers & Acquisitions', desc: 'Buy-side & sell-side support, negotiation and closing' },
            restructuration: { title: 'Restructuring', desc: 'Balance sheet optimization, refinancing, recovery plans' },
            'conseil-strategique': { title: 'Strategic Advisory', desc: 'Business plan, valuation, investment readiness' },
        },

        teamRoles: {
            'Christelle BASILUA SEMY': 'Chief Executive Officer',
            'Suzick TOMA': 'Engagement Director',
            'Louis-Raymond GOMES': 'Legal Advisor',
            'Sarah BONANA': 'Executive Assistant',
        },
    },

    pt: {
        code: 'pt',
        label: 'Português',
        flag: '🇵🇹',
        tagline: 'Redefinindo o Investimento na África Central',

        common: { prev: 'Anterior', next: 'Seguinte' },

        nav: {
            home: 'Início',
            about: 'Sobre nós',
            services: 'Serviços',
            team: 'Equipa',
            partners: 'Parceiros',
            news: 'Notícias',
            documents: 'Documentos',
            contact: 'Contacto',
            contactBtn: 'Entrar em Contacto',
            ourServices: 'A Nossa Especialização',
            aboutItems: [
                { key: 'presentation', href: '/a-propos#presentation', title: 'Apresentação' },
                { key: 'mission', href: '/a-propos#mission', title: 'Missão' },
                { key: 'vision', href: '/a-propos#vision', title: 'Visão' },
                { key: 'valeurs', href: '/a-propos#valeurs', title: 'Valores' },
            ],
            newsItems: [
                { key: 'actualites', routeName: 'news.index', title: 'Notícias' },
                { key: 'publications', routeName: 'news.publications', title: 'Publicações' },
                { key: 'communiques', routeName: 'news.communiques', title: 'Comunicados' },
            ],
        },

        hero: {
            heading: 'Como pioneiros no crescimento do setor privado, moldamos o panorama económico da sub-região investindo o nosso capital, a nossa experiência e a nossa especialização onde têm maior impacto.',
            subheading: 'Redefinindo o Investimento na África Central',
            discoverServices: 'Descobrir os nossos serviços',
            contactUs: 'Entrar em contacto',
            shuffleHint: 'Clique para baralhar os cartões',
        },

        home: {
            pillarsEyebrow: 'A Nossa Diferença',
            pillarsTitle: 'Porquê a OMYA Capital?',
            pillars: [
                { title: 'Especialização Regional', desc: 'Uma presença sólida na África Central e uma compreensão fina das suas dinâmicas económicas.' },
                { title: 'Rigor & Padrões Internacionais', desc: 'Diligência e rigor em cada mandato, segundo os melhores padrões internacionais.' },
                { title: 'Acompanhamento Personalizado', desc: 'Da estruturação à execução, um acompanhamento completo dos seus projetos estratégicos.' },
            ],
            aboutEyebrow: 'Sobre a OMYA Capital',
            aboutTitle: 'OMYA Capital',
            aboutP1: 'A OMYA Capital é uma consultora financeira de referência, dedicada aos operadores económicos privados e às instituições da África Central. Acompanhamos os nossos clientes na estruturação, no financiamento e na execução dos seus projetos estratégicos, direcionando as nossas ações para os atores com forte potencial de crescimento, a fim de os transformar em campeões regionais.',
            aboutP2: 'A OMYA Capital posiciona-se como um verdadeiro parceiro na criação de valor e no desenvolvimento económico da sub-região.',
            aboutCta: 'Saber mais sobre a OMYA CAPITAL',
            servicesEyebrow: 'Os Nossos Serviços',
            servicesTitleLine1: 'Uma especialização à medida.',
            servicesTitleLine2: 'Uma exigência sem compromissos.',
            learnMore: 'Saber mais',
            teamEyebrow: 'A Nossa Equipa',
            teamTitle: 'A Equipa Dirigente',
            teamSubtitle: 'Especialistas empenhados ao serviço do crescimento dos nossos clientes.',
            teamCta: 'Descobrir toda a equipa dirigente',
            partnersEyebrow: 'Rede de Parceiros',
            partnersTitle: 'Confiam em nós',
            partnersCta: 'Ver todos os nossos parceiros',
            newsEyebrow: 'Notícias',
            newsTitle: 'As nossas últimas publicações',
            newsEmpty: 'Nenhuma notícia publicada de momento.',
            ctaTitle: 'O seu projeto merece um acompanhamento de exceção',
            ctaText: 'Cada situação é única. Entre em contacto com as nossas equipas para uma análise confidencial e sem compromisso do seu projeto.',
            ctaBtn: 'Entrar em contacto',
        },

        about: {
            heroDescription: 'Redefinindo o Investimento na África Central.',
            presEyebrow: 'Quem somos',
            presTitle: 'Apresentação',
            missionEyebrow: 'A nossa razão de ser',
            missionTitle: 'Missão',
            missionQuote: 'Ser um agente do progresso em África. Impactar positivamente o nosso ambiente através dos nossos investimentos e da nossa especialização, agindo com diligência e rigor segundo os melhores padrões internacionais.',
            visionEyebrow: 'Onde queremos chegar',
            visionTitle: 'Visão',
            visionQuote: 'Tornar-se a maior sociedade regional de investimento na África Central através do acompanhamento estratégico e financeiro dos atores públicos e privados.',
            valeursEyebrow: 'O que nos guia',
            valeursTitle: 'Os Nossos Valores',
            valeursSubtitle: 'São estes os princípios que orientam as nossas decisões no dia a dia.',
            valeurs: [
                { title: 'Probidade, Integridade, Responsabilidade', desc: 'Agir com respeito.' },
                { title: 'Excelência', desc: 'Formar-se e informar-se continuamente.' },
                { title: 'Compromisso', desc: 'Lealdade para com os nossos clientes, parceiros e colaboradores.' },
                { title: 'Inovação', desc: 'Transformar o presente e pensar o futuro.' },
            ],
            ctaTitle: 'Vamos trabalhar juntos',
            ctaText: 'Entre em contacto com as nossas equipas para uma primeira conversa confidencial.',
            ctaBtn: 'Entrar em contacto com as nossas equipas',
        },

        services: {
            heroEyebrow: 'A Nossa Especialização',
            heroTitle: 'Os Nossos Serviços',
            heroDescription: 'Um acompanhamento à medida em cada etapa dos seus projetos estratégicos.',
            solicitBtn: 'Solicitar este serviço',
            ctaTitle: 'O seu projeto merece um acompanhamento de exceção',
            ctaText: 'Cada situação é única. Entre em contacto com as nossas equipas para uma análise confidencial e sem compromisso do seu projeto.',
            ctaBtn: 'Contactar-nos',
        },

        team: {
            heroEyebrow: 'A Nossa Equipa',
            heroTitle: 'A Equipa Dirigente',
            heroDescription: 'Profissionais empenhados ao serviço do crescimento dos nossos clientes.',
        },

        partners: {
            heroEyebrow: 'Rede de Parceiros',
            heroTitle: 'Os Nossos Parceiros',
        },

        contact: {
            heroEyebrow: 'Entrar em Contacto',
            heroTitle: 'Vamos Falar do Seu Projeto',
            heroDescription: 'As nossas equipas estão disponíveis para o(a) ouvir, analisar a sua situação e propor um acompanhamento à medida.',
            phoneLabel: 'Telefone',
            emailLabel: 'E-mail',
            addressLabel: 'Sede Social',
            formTitle: 'Envie-nos uma mensagem',
            formSubtitle: 'Descreva o seu projeto ou a sua questão; um consultor responderá o mais brevemente possível.',
            successTitle: 'Mensagem enviada com sucesso!',
            nameLabel: 'Nome completo *',
            namePlaceholder: 'Jean Dupont',
            phoneFieldLabel: 'Telefone',
            phonePlaceholder: '+242 ...',
            emailFieldLabel: 'Endereço de e-mail *',
            emailPlaceholder: 'voce@exemplo.com',
            subjectLabel: 'Assunto do seu pedido',
            subjectPlaceholder: '— Selecionar um assunto —',
            subjectOther: 'Outra informação',
            messageLabel: 'A sua mensagem *',
            messagePlaceholder: 'Descreva o seu projeto...',
            sendBtn: 'Enviar a minha mensagem',
            sendingBtn: 'A enviar…',
            socialTitle: 'Redes Sociais',
            socialText: 'As nossas contas oficiais serão comunicadas brevemente.',
        },

        news: {
            heroEyebrow: 'Notícias & Publicações',
            types: { actualite: 'Notícias', publication: 'Publicações', communique: 'Comunicados' },
            download: 'Descarregar o documento',
            empty: 'Ainda não há conteúdo publicado nesta secção.',
        },

        documents: {
            heroEyebrow: 'Biblioteca de Documentos',
            heroTitle: 'Documentos',
            tableHeaders: { document: 'Documento', type: 'Tipo', date: 'Data', description: 'Descrição', actions: 'Ações' },
            consult: 'Consultar',
            download: 'Descarregar',
            soon: 'Brevemente disponível',
            empty: 'Nenhum documento disponível de momento.',
        },

        footer: {
            description: 'A OMYA Capital é uma consultora financeira de referência, dedicada aos operadores económicos privados e às instituições da África Central.',
            navTitle: 'Navegação',
            servicesTitle: 'Os Nossos Serviços',
            contactTitle: 'Contacto',
            followTitle: 'Siga a OMYA CAPITAL',
            copyright: 'Todos os direitos reservados.',
        },

        servicesContent: {
            'financement-de-projets': { title: 'Financiamento de Projetos', desc: 'Estruturação e acesso aos mercados de capitais locais e internacionais' },
            'fusions-acquisitions': { title: 'Fusões & Aquisições', desc: 'Acompanhamento buy-side & sell-side, negociação e fecho' },
            restructuration: { title: 'Reestruturação', desc: 'Otimização do balanço, refinanciamento, planos de recuperação' },
            'conseil-strategique': { title: 'Consultoria Estratégica', desc: 'Plano de negócios, avaliação, preparação para o investimento' },
        },

        teamRoles: {
            'Christelle BASILUA SEMY': 'Diretora Geral',
            'Suzick TOMA': 'Diretora de Missão',
            'Louis-Raymond GOMES': 'Consultor Jurídico',
            'Sarah BONANA': 'Assistente Executiva',
        },
    },
};

/** Returns `service` with its title/description swapped for the active language's
 * translation (looked up by the language-independent `slug`), falling back to the
 * original DB value when no translation entry exists. */
export function translateService(service, lang) {
    if (!service) return service;
    const entry = TRANSLATIONS[lang]?.servicesContent?.[service.slug];
    if (!entry) return service;
    return { ...service, title: entry.title, description: entry.desc };
}

/** Returns `member` with its role title swapped for the active language's
 * translation (looked up by the person's name), falling back to the original
 * DB value when no translation entry exists. Names are proper nouns and are
 * never translated. */
export function translateMember(member, lang) {
    if (!member) return member;
    const role = TRANSLATIONS[lang]?.teamRoles?.[member.name];
    if (!role) return member;
    return { ...member, role_title: role };
}

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('omya_lang') || 'fr';
        }
        return 'fr';
    });

    const changeLanguage = (newLang) => {
        if (TRANSLATIONS[newLang]) {
            setLang(newLang);
            if (typeof window !== 'undefined') {
                localStorage.setItem('omya_lang', newLang);
            }
        }
    };

    const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;

    return (
        <LanguageContext.Provider value={{ lang, changeLanguage, t, languages: TRANSLATIONS }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        return {
            lang: 'fr',
            changeLanguage: () => {},
            t: TRANSLATIONS.fr,
            languages: TRANSLATIONS,
        };
    }
    return context;
}
