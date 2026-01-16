import React from 'react';
import { Raffle } from '../types';
import { Ticket, Clock, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface RaffleCardProps {
  raffle: Raffle;
  onClick: (id: string) => void;
}

export const RaffleCard: React.FC<RaffleCardProps> = ({ raffle, onClick }) => {
  const { t } = useLanguage();
  const progress = (raffle.soldNumbers / raffle.totalNumbers) * 100;

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 cursor-pointer group"
      onClick={() => onClick(raffle.id)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={raffle.imageUrl} 
          alt={raffle.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
          R$ {raffle.pricePerNumber.toFixed(2)} {t('raffle.perNumber')}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-900 mb-1">{raffle.title}</h3>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2">{raffle.description}</p>
        
        <div className="space-y-3">
          <div className="flex justify-between text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1">
              <Ticket className="w-3 h-3" /> {raffle.soldNumbers} {t('raffle.sold')}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {t('raffle.drawDate')} {new Date(raffle.endDate).toLocaleDateString()}
            </span>
          </div>

          <div className="relative w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium text-sm group-hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
            {t('raffle.participate')}
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};