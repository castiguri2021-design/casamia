import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">Casa <span className="text-mia-red">Mia</span></h3>
            <p className="font-cinzel text-sm text-mia-gold tracking-widest">Cucina di Fuoco</p>
          </div>
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-white/60 text-sm"><Phone size={14} className="text-mia-gold" /> +40 720 718 719</p>
            <p className="flex items-center gap-2 text-white/60 text-sm"><Mail size={14} className="text-mia-gold" /> ristorantemia@gmail.com</p>
            <p className="flex items-center gap-2 text-white/60 text-sm"><MapPin size={14} className="text-mia-gold" /> Str. San Marco 1-5, Tunari</p>
          </div>
          <div className="text-right md:text-left">
            <p className="text-white/40 text-xs">Prețurile includ TVA.</p>
            <p className="text-white/40 text-xs mt-1">© 2026 Ristorante Casa Mia. Toate drepturile rezervate.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
