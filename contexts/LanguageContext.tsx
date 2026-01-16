import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';

export const translations = {
  pt: {
    nav: {
      raffles: 'Sorteios',
      myTickets: 'Meus Títulos',
      cart: 'Carrinho'
    },
    home: {
      heroTitle: 'Sua sorte está a um clique de distância.',
      heroSubtitle: 'Participe dos melhores sorteios de carros, motos e eletrônicos. Transparência total e prêmios entregues.',
      cta: 'Ver Prêmios',
      activeRaffles: 'Sorteios Ativos'
    },
    raffle: {
      sold: 'vendidos',
      draw: 'Sorteio:',
      participate: 'Participar Agora',
      perNumber: '/ número',
      priceLabel: 'Preço do Título',
      drawLabel: 'Sorteio',
      promoPacks: 'Pacotes Promocionais',
      numbers: 'números',
      yourNumbers: 'Seus Números',
      total: 'Total:',
      selectPrompt: 'Selecione números acima ou use a IA para escolher.',
      addToCart: 'Adicionar ao Carrinho',
      back: 'Voltar',
      notFound: 'Sorteio não encontrado',
      off: 'OFF'
    },
    dreamer: {
      title: 'Sonhador da Sorte (IA)',
      description: 'Conte seu sonho ou o que você está sentindo hoje. Nossa Inteligência Artificial vai interpretar os sinais do universo e sugerir seus números da sorte.',
      placeholder: 'Ex: Sonhei que estava voando sobre um mar azul...',
      error: 'A sorte está tímida hoje. Tente novamente.',
      loading: 'Interpretando Cosmos...',
      reveal: 'Revelar Números'
    },
    cart: {
      title: 'Carrinho de Compras',
      emptyTitle: 'Seu carrinho está vazio',
      emptyText: 'Escolha um sorteio e tente a sua sorte!',
      seeRaffles: 'Ver Sorteios',
      selectedNumbers: 'números selecionados',
      remove: 'Remover',
      summary: 'Resumo',
      subtotal: 'Subtotal',
      discounts: 'Descontos',
      total: 'Total',
      checkout: 'Finalizar Pagamento',
      secure: 'Pagamento 100% seguro via PIX ou Cartão.',
      success: 'Compra realizada com sucesso! Boa sorte!',
      customerDetails: 'Dados para Contato',
      nameLabel: 'Nome Completo',
      phoneLabel: 'Telefone / WhatsApp',
      fillAlert: 'Preencha nome e telefone para continuar.'
    },
    myRaffles: {
      title: 'Meus Títulos',
      emptyTitle: 'Você ainda não tem tickets',
      emptyText: 'Participe dos sorteios para ver seus números aqui.',
      goToHome: 'Ir para Home',
      boughtOn: 'Comprado em:',
      confirmed: 'Confirmado',
      pending: 'Pendente',
      yourNumbers: 'Seus Números:'
    },
    footer: {
      aboutTitle: 'Mi Suerte',
      aboutText: 'A plataforma mais transparente e divertida para você testar sua sorte. Sorteios regulamentados e prêmios incríveis.',
      linksTitle: 'Links Úteis',
      terms: 'Termos de Uso',
      privacy: 'Política de Privacidade',
      regulation: 'Regulamento',
      supportTitle: 'Atendimento',
      rights: '© 2024 Mi Suerte Participações. Todos os direitos reservados.'
    }
  },
  es: {
    nav: {
      raffles: 'Sorteos',
      myTickets: 'Mis Boletos',
      cart: 'Carrito'
    },
    home: {
      heroTitle: 'Tu suerte está a un clic de distancia.',
      heroSubtitle: 'Participa en los mejores sorteos de autos, motos y electrónicos. Total transparencia y premios entregados.',
      cta: 'Ver Premios',
      activeRaffles: 'Sorteos Activos'
    },
    raffle: {
      sold: 'vendidos',
      draw: 'Sorteo:',
      participate: 'Participar Ahora',
      perNumber: '/ número',
      priceLabel: 'Precio del Boleto',
      drawLabel: 'Sorteo',
      promoPacks: 'Paquetes Promocionales',
      numbers: 'números',
      yourNumbers: 'Tus Números',
      total: 'Total:',
      selectPrompt: 'Selecciona números arriba o usa la IA para elegir.',
      addToCart: 'Añadir al Carrito',
      back: 'Volver',
      notFound: 'Sorteo no encontrado',
      off: 'OFF'
    },
    dreamer: {
      title: 'Soñador de la Suerte (IA)',
      description: 'Cuéntanos tu sueño o lo que sientes hoy. Nuestra IA interpretará las señales del universo y sugerirá tus números de la suerte.',
      placeholder: 'Ej: Soñé que volaba sobre un mar azul...',
      error: 'La suerte es tímida hoy. Intenta de nuevo.',
      loading: 'Interpretando el Cosmos...',
      reveal: 'Revelar Números'
    },
    cart: {
      title: 'Carrito de Compras',
      emptyTitle: 'Tu carrito está vacío',
      emptyText: '¡Elige un sorteo y prueba tu suerte!',
      seeRaffles: 'Ver Sorteos',
      selectedNumbers: 'números seleccionados',
      remove: 'Eliminar',
      summary: 'Resumen',
      subtotal: 'Subtotal',
      discounts: 'Descuentos',
      total: 'Total',
      checkout: 'Finalizar Pago',
      secure: 'Pago 100% seguro vía PIX o Tarjeta.',
      success: '¡Compra realizada con éxito! ¡Buena suerte!',
      customerDetails: 'Datos de Contacto',
      nameLabel: 'Nombre Completo',
      phoneLabel: 'Teléfono / WhatsApp',
      fillAlert: 'Complete nombre y teléfono para continuar.'
    },
    myRaffles: {
      title: 'Mis Boletos',
      emptyTitle: 'Aún no tienes boletos',
      emptyText: 'Participa en los sorteos para ver tus números aquí.',
      goToHome: 'Ir a Inicio',
      boughtOn: 'Comprado el:',
      confirmed: 'Confirmado',
      pending: 'Pendiente',
      yourNumbers: 'Tus Números:'
    },
    footer: {
      aboutTitle: 'Mi Suerte',
      aboutText: 'La plataforma más transparente y divertida para probar tu suerte. Sorteos regulados y premios increíbles.',
      linksTitle: 'Enlaces Útiles',
      terms: 'Términos de Uso',
      privacy: 'Política de Privacidad',
      regulation: 'Reglamento',
      supportTitle: 'Atención',
      rights: '© 2024 Mi Suerte Participaciones. Todos los derechos reservados.'
    }
  },
  en: {
    nav: {
      raffles: 'Raffles',
      myTickets: 'My Tickets',
      cart: 'Cart'
    },
    home: {
      heroTitle: 'Your luck is just a click away.',
      heroSubtitle: 'Participate in the best raffles for cars, bikes, and electronics. Total transparency and delivered prizes.',
      cta: 'See Prizes',
      activeRaffles: 'Active Raffles'
    },
    raffle: {
      sold: 'sold',
      draw: 'Draw:',
      participate: 'Participate Now',
      perNumber: '/ number',
      priceLabel: 'Ticket Price',
      drawLabel: 'Draw',
      promoPacks: 'Promo Packs',
      numbers: 'numbers',
      yourNumbers: 'Your Numbers',
      total: 'Total:',
      selectPrompt: 'Select numbers above or use AI to choose.',
      addToCart: 'Add to Cart',
      back: 'Back',
      notFound: 'Raffle not found',
      off: 'OFF'
    },
    dreamer: {
      title: 'Lucky Dreamer (AI)',
      description: 'Tell us your dream or how you feel today. Our AI will interpret universe signals and suggest your lucky numbers.',
      placeholder: 'Ex: I dreamt I was flying over a blue sea...',
      error: 'Luck is shy today. Try again.',
      loading: 'Interpreting Cosmos...',
      reveal: 'Reveal Numbers'
    },
    cart: {
      title: 'Shopping Cart',
      emptyTitle: 'Your cart is empty',
      emptyText: 'Choose a raffle and try your luck!',
      seeRaffles: 'See Raffles',
      selectedNumbers: 'numbers selected',
      remove: 'Remove',
      summary: 'Summary',
      subtotal: 'Subtotal',
      discounts: 'Discounts',
      total: 'Total',
      checkout: 'Checkout',
      secure: '100% secure payment via PIX or Card.',
      success: 'Purchase successful! Good luck!',
      customerDetails: 'Contact Details',
      nameLabel: 'Full Name',
      phoneLabel: 'Phone / WhatsApp',
      fillAlert: 'Fill name and phone to continue.'
    },
    myRaffles: {
      title: 'My Tickets',
      emptyTitle: 'You have no tickets yet',
      emptyText: 'Participate in raffles to see your numbers here.',
      goToHome: 'Go to Home',
      boughtOn: 'Purchased on:',
      confirmed: 'Confirmed',
      pending: 'Pending',
      yourNumbers: 'Your Numbers:'
    },
    footer: {
      aboutTitle: 'Mi Suerte',
      aboutText: 'The most transparent and fun platform to test your luck. Regulated raffles and amazing prizes.',
      linksTitle: 'Useful Links',
      terms: 'Terms of Use',
      privacy: 'Privacy Policy',
      regulation: 'Regulation',
      supportTitle: 'Support',
      rights: '© 2024 Mi Suerte Participações. All rights reserved.'
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (path: string) => {
    const keys = path.split('.');
    let current: any = translations[language];
    for (const key of keys) {
      if (current[key] === undefined) return path;
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};