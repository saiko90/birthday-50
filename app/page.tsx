'use client';

import React, { useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import confetti from 'canvas-confetti';
import NeoCardFloatingBadge from './components/NeoCardFloatingBadge';
import {
  Crown,
  MapPin,
  Calendar,
  Gift,
  Music,
  Wine,
  Camera,
  X,
  ChevronDown,
  Star,
  Award,
  Utensils,
  Navigation,
  Mail,
  Users
} from 'lucide-react';

// --- DATA ---
const DATA = {
  name: "MARC",
  age: "50",
  birth_year: "1976",
  current_year: "2026",
  date: "Samedi 14 Novembre 2026",
  place: {
    name: "Rooftop du Kube",
    address: "1 Passage Ruelle, 75018 Paris",
    google_maps: "https://goo.gl/maps/example",
    waze: "https://waze.com/ul/example"
  },
  images: {
    hero: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1920&auto=format&fit=crop",
    // NOUVELLE PHOTO : Homme 50 ans, charismatique, élégant, N&B
    portrait: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop", 
    party: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1920&auto=format&fit=crop",
  },
  timeline: [
    { year: "1976", title: "La Légende commence", desc: "Un grand millésime. Steve Jobs lance Apple, et Marc arrive sur Terre." },
    { year: "1994", title: "La Majorité", desc: "Le permis en poche, le monde s'ouvre. L'époque du grunge et des premiers voyages." },
    { year: "2006", title: "L'Ascension", desc: "30 ans. Les responsabilités, les grands projets, la construction de l'empire." },
    { year: "2026", title: "L'Apogée", desc: "50 ans. L'âge de la sagesse ? Pas sûr. L'âge de la fête ? Absolument." }
  ]
};

export default function Birthday50Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [isRsvpOpen, setRsvpOpen] = useState(false);
  
  // --- LOGIN LOGIC ---
  const handleLogin = (e: any) => {
    e.preventDefault();
    if (passwordInput.toUpperCase() === 'GOLD50') {
      setIsAuthenticated(true);
      launchFireworks();
    } else {
      alert('Code: GOLD50');
    }
  };

  const launchFireworks = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#fbbf24', '#f59e0b', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#fbbf24', '#f59e0b', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse"></div>
        <div className="z-10 text-center space-y-8 p-6">
           <div className="inline-block border-2 border-yellow-500/50 p-8 rounded-full bg-black/50 backdrop-blur-md">
              <Crown className="w-16 h-16 text-yellow-500 mx-auto" />
              
           </div>
           <div>
             <h1 className="text-6xl font-black text-white tracking-tighter mb-2">GOLDEN 50</h1>
             <p className="text-yellow-500 uppercase tracking-[0.5em] text-sm">L'édition Prestige</p>
           </div>
           <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-xs mx-auto">
              <input 
                type="password" 
                className="bg-white/10 border border-white/20 rounded-lg p-4 text-center text-white text-xl outline-none focus:border-yellow-500 transition-colors uppercase"
                placeholder="CODE VIP"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              <button className="bg-yellow-500 text-black font-bold py-4 rounded-lg hover:bg-yellow-400 transition-all uppercase tracking-widest">
                Entrer
              </button>
           </form>
           <p className="text-white/20 text-xs mt-4">Code: GOLD50</p>
        </div>
        <NeoCardFloatingBadge theme="light" />
      </div>
    );
  }

  // --- MAIN SITE ---
  return (
    <div className="bg-black text-white font-sans selection:bg-yellow-500 selection:text-black overflow-x-hidden">
      <HeroSection />
      <StorySection />
      <PortraitSection />
      <LocationSection />
      <ProgramSection />
      <GalleryTeaser />
      
      {/* RSVP BUTTON */}
      <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <motion.button 
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => setRsvpOpen(true)}
          className="pointer-events-auto bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-10 py-4 rounded-full font-black uppercase tracking-widest shadow-[0_0_50px_rgba(234,179,8,0.6)] border-4 border-black ring-2 ring-yellow-500"
        >
          Je viens !
        </motion.button>
      </div>

      <AnimatePresence>
        {isRsvpOpen && <RsvpModal onClose={() => setRsvpOpen(false)} />}
      </AnimatePresence>
      <NeoCardFloatingBadge theme="light" />
      
      <footer className="py-20 text-center border-t border-white/10 bg-neutral-900">
        <h2 className="text-[15vw] leading-none font-black text-white/5 select-none">{DATA.birth_year}</h2>
        <p className="text-yellow-500/50 text-xs uppercase tracking-widest -mt-10">Created by NeoCard</p>
      </footer>
    </div>
  );
}

// --- COMPONENTS ---

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 500]);
  
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
       <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img src={DATA.images.hero} className="w-full h-full object-cover opacity-60" alt="Party" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
       </motion.div>

       <div className="relative z-10 text-center px-4 mix-blend-screen">
          <motion.div 
            initial={{ scale: 5, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-[12rem] md:text-[20rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-2xl">
              {DATA.age}
            </h1>
          </motion.div>
          
          <motion.div 
             initial={{ y: 50, opacity: 0 }} 
             animate={{ y: 0, opacity: 1 }} 
             transition={{ delay: 0.5 }}
             className="relative -top-4 md:-top-12"
          >
             <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white mb-4">
               The Golden Jubilee
             </h2>
             <div className="inline-block border border-yellow-500 px-6 py-2 rounded-full bg-black/50 backdrop-blur-md">
                <span className="text-yellow-400 font-mono text-sm md:text-lg">{DATA.date} • PARIS</span>
             </div>
          </motion.div>
       </div>
       
       <div className="absolute bottom-10 animate-bounce text-yellow-500">
         <ChevronDown size={32} />
       </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="py-24 bg-neutral-900 relative border-t border-white/10">
      <div className="container mx-auto px-6">
         <div className="flex flex-col gap-16">
            <motion.div 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              className="text-center mb-12"
            >
              <h3 className="text-yellow-500 uppercase tracking-[0.5em] font-bold mb-4">La Rétrospective</h3>
              <h2 className="text-4xl md:text-6xl font-black text-white">50 ANS D'HISTOIRE</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {DATA.timeline.map((item, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 30 }} 
                   whileInView={{ opacity: 1, y: 0 }} 
                   transition={{ delay: i * 0.2 }}
                   className="bg-black border border-white/10 p-8 rounded-2xl hover:border-yellow-500/50 transition-colors group"
                 >
                    <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white/5 group-hover:from-yellow-500 group-hover:to-yellow-600 transition-all duration-500 block mb-4">
                      {item.year}
                    </span>
                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
                 </motion.div>
               ))}
            </div>
         </div>
      </div>
    </section>
  );
}

function PortraitSection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
       <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full overflow-hidden opacity-5 pointer-events-none select-none">
          <h2 className="text-[20vw] whitespace-nowrap font-black text-white leading-none">VINTAGE 1976</h2>
       </div>

       <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
             <motion.div 
               initial={{ rotate: -5, scale: 0.9 }} 
               whileInView={{ rotate: 0, scale: 1 }} 
               transition={{ duration: 0.8 }}
               className="relative"
             >
                <div className="absolute inset-0 bg-yellow-500 rounded-2xl rotate-3 blur-sm opacity-50"></div>
                <img 
                  src={DATA.images.portrait} 
                  className="relative rounded-2xl shadow-2xl w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                  alt="Portrait" 
                />
             </motion.div>
          </div>
          
          <div className="w-full md:w-1/2 md:pl-12">
             <Star className="w-12 h-12 text-yellow-500 mb-6 animate-spin-slow" />
             <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase leading-tight">
               Demi-Siècle <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">D'Excellence</span>
             </h2>
             <p className="text-xl text-neutral-300 leading-relaxed mb-8">
               "On n'a pas 50 ans tous les jours. C'est l'occasion unique de réunir ceux qui ont marqué ma vie, de la cour de récré aux salles de réunion, des vacances en famille aux soirées inoubliables."
             </p>
          </div>
       </div>
    </section>
  );
}

// --- NOUVELLE SECTION : LIEU & ACCÈS ---
function LocationSection() {
    return (
        <section className="py-24 bg-neutral-900 border-y border-white/10 relative overflow-hidden">
             <div className="container mx-auto px-6 max-w-5xl flex flex-col md:flex-row items-center gap-12">
                 <div className="w-full md:w-1/2">
                     <div className="bg-black p-8 rounded-2xl border border-yellow-500/30">
                         <div className="flex items-center gap-3 mb-4 text-yellow-500">
                             <MapPin className="w-6 h-6" />
                             <span className="font-bold uppercase tracking-widest text-sm">Le Lieu</span>
                         </div>
                         <h2 className="text-4xl font-black text-white mb-2">{DATA.place.name}</h2>
                         <p className="text-xl text-neutral-400 mb-8">{DATA.place.address}</p>
                         
                         <div className="flex flex-col gap-3">
                             <a href={DATA.place.google_maps} target="_blank" className="flex items-center justify-center gap-2 bg-white text-black font-bold py-4 rounded-lg hover:bg-neutral-200 transition-colors w-full">
                                 <Navigation size={18} /> Ouvrir Google Maps
                             </a>
                             <a href={DATA.place.waze} target="_blank" className="flex items-center justify-center gap-2 bg-[#33CCFF] text-white font-bold py-4 rounded-lg hover:bg-[#33CCFF]/80 transition-colors w-full">
                                 <Navigation size={18} /> Ouvrir Waze
                             </a>
                         </div>
                     </div>
                 </div>
                 
                 <div className="w-full md:w-1/2">
                      <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 relative group">
                          <img src={DATA.images.party} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" alt="Lieu" />
                          <div className="absolute inset-0 flex items-center justify-center">
                              <span className="bg-black/50 backdrop-blur px-6 py-2 rounded-full text-white text-sm uppercase tracking-widest border border-white/20">Vue Panoramique</span>
                          </div>
                      </div>
                 </div>
             </div>
        </section>
    )
}

function ProgramSection() {
  return (
    <section className="py-32 bg-black">
       <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-16">LE PROGRAMME</h2>
          
          <div className="space-y-6">
             <ProgramItem time="19:30" title="Champagne & Sunset" icon={<Wine />} desc="Rooftop avec vue sur tout Paris" />
             <ProgramItem time="21:00" title="Dîner Gastronomique" icon={<Utensils />} desc="Saveurs d'hier et d'aujourd'hui" />
             <ProgramItem time="23:00" title="Speech & Surprise" icon={<Award />} desc="Le moment émotion (préparez vos mouchoirs)" />
             <ProgramItem time="00:00" title="Dancefloor 70's - 2020's" icon={<Music />} desc="DJ Set Rétrospectif jusqu'à l'aube" />
          </div>
       </div>
    </section>
  );
}

function ProgramItem({ time, title, icon, desc }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
      className="flex items-center gap-6 bg-neutral-900 p-6 rounded-xl border border-white/5 hover:border-yellow-500 transition-colors group text-left"
    >
       <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform shrink-0">
          {icon}
       </div>
       <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
             <span className="text-yellow-500 font-mono font-bold text-xl">{time}</span>
             <h3 className="text-2xl font-bold text-white uppercase">{title}</h3>
          </div>
          <p className="text-neutral-400">{desc}</p>
       </div>
    </motion.div>
  );
}

function GalleryTeaser() {
  return (
    <section className="py-24 bg-neutral-900 relative border-t border-white/10">
       <div className="container mx-auto px-6 text-center">
          <Camera className="w-12 h-12 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">MUR DE SOUVENIRS</h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
             Nous préparons une projection géante. Envoyez vos photos "dossier" ou vos meilleurs souvenirs avec Marc avant le jour J.
          </p>
          <button className="border border-white/20 hover:bg-white hover:text-black text-white px-8 py-3 rounded-full uppercase tracking-widest text-sm transition-all">
             Uploader une photo
          </button>
       </div>
    </section>
  );
}

// --- RSVP MODAL (AMÉLIORÉ) ---
function RsvpModal({ onClose }: any) {
  const [adults, setAdults] = useState(1);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
    >
       <div className="bg-neutral-900 border border-yellow-500/30 p-8 rounded-2xl max-w-md w-full relative max-h-[90vh] overflow-y-auto">
          <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-white"><X /></button>
          
          <h3 className="text-3xl font-black text-white mb-2 uppercase text-center">Confirmation</h3>
          <p className="text-center text-yellow-500 text-sm mb-8 uppercase tracking-widest">Avant le 1er Octobre</p>
          
          <div className="space-y-4">
             {/* Identité */}
             <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-[10px] font-bold text-neutral-500 mb-1 uppercase">Prénom</label>
                    <input type="text" className="w-full bg-black border border-white/10 p-4 rounded-lg text-white outline-none focus:border-yellow-500 transition-colors" placeholder="Jean" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-neutral-500 mb-1 uppercase">Nom</label>
                    <input type="text" className="w-full bg-black border border-white/10 p-4 rounded-lg text-white outline-none focus:border-yellow-500 transition-colors" placeholder="Dupont" />
                 </div>
             </div>

             {/* Email */}
             <div>
                <label className="block text-[10px] font-bold text-neutral-500 mb-1 uppercase flex items-center gap-2">
                    <Mail size={12} /> Email
                </label>
                <input type="email" className="w-full bg-black border border-white/10 p-4 rounded-lg text-white outline-none focus:border-yellow-500 transition-colors" placeholder="jean.dupont@email.com" />
             </div>
             
             {/* Checkbox Présence */}
             <div className="bg-yellow-500/5 p-4 rounded-lg border border-yellow-500/20">
                <label className="flex items-center gap-3 cursor-pointer">
                   <input type="checkbox" className="w-5 h-5 accent-yellow-500" defaultChecked />
                   <span className="text-white font-bold">Je serai là pour célébrer !</span>
                </label>
             </div>

             {/* Compteur Invités */}
             <div>
                <label className="block text-[10px] font-bold text-neutral-500 mb-2 uppercase flex items-center gap-2">
                    <Users size={12} /> Nombre de personnes
                </label>
                <div className="flex items-center bg-black border border-white/10 rounded-lg px-2">
                    <button onClick={() => setAdults(Math.max(1, adults-1))} className="p-4 text-neutral-400 hover:text-white">-</button>
                    <span className="flex-1 text-center text-white font-bold text-xl">{adults}</span>
                    <button onClick={() => setAdults(adults+1)} className="p-4 text-neutral-400 hover:text-white">+</button>
                </div>
             </div>
             
             {/* Message */}
             <div>
                <label className="block text-[10px] font-bold text-neutral-500 mb-1 uppercase">Un petit mot pour Marc ?</label>
                <textarea className="w-full bg-black border border-white/10 p-4 rounded-lg text-white outline-none focus:border-yellow-500 transition-colors h-24" placeholder="Joyeux anniversaire..."></textarea>
             </div>
             
             <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 rounded-lg uppercase tracking-widest text-sm transition-colors shadow-lg shadow-yellow-500/20">
                Valider ma réponse
             </button>
          </div>
       </div>
    </motion.div>
  );
}