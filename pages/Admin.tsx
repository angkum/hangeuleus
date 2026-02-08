
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Button, Input, TextArea, SectionTitle } from '../components/UI';
import { MenuItem, NewsPost, MenuCategory, MenuSubCategory, SiteContent } from '../types';
import { 
  Trash2, Plus, Edit2, LogOut, Layout, Coffee, FileText, 
  Settings, AlignLeft, Phone, Share2, BarChart, FileImage, Upload,
  Download, Database, Copy, AlertTriangle, RefreshCw, RotateCcw, Code,
  Rocket, Smartphone, Globe, Layers, ArrowUp, ArrowDown, X, MapPin, Clock, Info, Instagram, Facebook, AtSign, MessageCircle,
  PlusCircle, Utensils, Maximize, Sparkles, Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- Shared Components ---

const ImagePicker: React.FC<{ label: string; value: string; onChange: (val: string) => void }> = ({ label, value, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1.5 * 1024 * 1024) {
         alert("File is too large! Please choose an image smaller than 1.5MB.");
         if (fileInputRef.current) fileInputRef.current.value = '';
         return;
      }
      const reader = new FileReader();
      reader.onloadend = () => onChange(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    onChange('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const isBase64 = value && value.startsWith('data:image');

  return (
    <div className="mb-6">
      <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">{label}</label>
      {value && (
        <div className="mb-3 w-full max-w-xs aspect-video border border-neutral-700 bg-neutral-900 relative overflow-hidden group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button type="button" onClick={handleClear} className="absolute top-2 right-2 bg-red-600/90 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Trash2 size={14} />
          </button>
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-3">
        <label className="cursor-pointer bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-3 text-sm border border-neutral-600 flex items-center justify-center gap-2 min-w-[140px] shadow-sm whitespace-nowrap">
          <Upload size={16} />
          <span>{isBase64 ? 'Change Image' : 'Upload Image'}</span>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
        <input 
          type="text"
          className="flex-1 bg-neutral-900 border border-neutral-800 text-white p-3 text-sm focus:outline-none focus:border-white transition-colors h-[46px]"
          placeholder="Or paste image URL..."
          value={isBase64 ? 'Local Image Loaded' : value}
          onChange={(e) => !isBase64 && onChange(e.target.value)}
          disabled={isBase64}
        />
      </div>
    </div>
  );
};

interface MenuEditFormProps {
  editingId: string;
  initialForm: Partial<MenuItem>;
  categories: MenuCategory[];
  subCategories: MenuSubCategory[];
  onSave: (formData: MenuItem) => void;
  onCancel: () => void;
}

const MenuEditForm: React.FC<MenuEditFormProps> = ({ 
  editingId, 
  initialForm, 
  categories, 
  subCategories, 
  onSave, 
  onCancel 
}) => {
  const [form, setForm] = useState<Partial<MenuItem>>(initialForm);

  useEffect(() => {
    const initial = { ...initialForm };
    if (!initial.toppingText) initial.toppingText = { ko: '', en: '' };
    setForm(initial);
  }, [initialForm.id]);

  return (
    <div className="bg-neutral-800 p-6 border-2 border-gold mb-8 mt-2 shadow-2xl animate-fade-in relative z-10">
      <style>{`
        @keyframes burst {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-burst {
          animation: burst 1.5s infinite ease-in-out;
        }
      `}</style>
      <button onClick={onCancel} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20} /></button>
      <h4 className="text-gold font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
        {editingId === 'new' ? <Plus size={18} /> : <Edit2 size={18} />}
        {editingId === 'new' ? 'New Menu Item' : 'Edit Menu Item'}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <label className="block text-gray-400 text-xs uppercase mb-2">Sub Category</label>
          <select 
            value={form.subCategoryId} 
            onChange={e => setForm({...form, subCategoryId: e.target.value})} 
            className="w-full bg-neutral-900 border border-neutral-700 text-white p-3 focus:outline-none focus:border-gold transition-colors"
          >
            {categories.sort((a,b) => a.order - b.order).map(cat => (
              <optgroup key={cat.id} label={`${cat.name.ko} / ${cat.name.en}`}>
                {subCategories
                  .filter(s => s.categoryId === cat.id)
                  .sort((a,b) => a.order - b.order)
                  .map(sub => (
                    <option key={sub.id} value={sub.id}>{sub.name.ko} / {sub.name.en}</option>
                  ))
                }
              </optgroup>
            ))}
          </select>
        </div>
        <div className="hidden md:block"></div>
        
        <Input label="Name (KO)" value={form.name?.ko} onChange={e => setForm({...form, name: {...form.name!, ko: e.target.value}})} />
        <Input label="Name (EN)" value={form.name?.en} onChange={e => setForm({...form, name: {...form.name!, en: e.target.value}})} />
        
        <TextArea label="Description (KO)" value={form.description?.ko} onChange={e => setForm({...form, description: {...form.description!, ko: e.target.value}})} />
        <TextArea label="Description (EN)" value={form.description?.en} onChange={e => setForm({...form, description: {...form.description!, en: e.target.value}})} />

        <Input label="Selling Price (RM)" type="number" value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} />
        <Input label="Original Price (RM)" type="number" value={form.originalPrice || 0} onChange={e => setForm({...form, originalPrice: Number(e.target.value)})} />
        
        {/* Menu Options Section */}
        <div className="col-span-2 space-y-6 py-6 border-y border-neutral-700/50 mt-2">
           <h5 className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black mb-2">Menu Display Options</h5>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* TOPPING Toggle & Input */}
              <div className="space-y-4">
                 <label className="text-white flex items-center gap-3 cursor-pointer group w-fit">
                    <input type="checkbox" className="w-4 h-4 accent-gold" checked={form.hasToppings} onChange={e => setForm({...form, hasToppings: e.target.checked})} />
                    <div className="flex items-center gap-2 group-hover:text-gold transition-colors">
                      <PlusCircle size={18} className="text-gold" />
                      <span className="font-bold text-xs uppercase tracking-widest">Topping Addition (토핑 추가 안내)</span>
                    </div>
                 </label>
                 {form.hasToppings && (
                    <div className="space-y-3 p-4 bg-neutral-900 border border-gold/30 rounded-sm animate-fade-in shadow-xl">
                       <div className="flex items-center gap-2 mb-1">
                          <Info size={12} className="text-gold" />
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Use "/" or new line to separate multiple toppings</p>
                       </div>
                       <TextArea 
                          className="!mb-2 !p-3 text-xs border-gold/10 font-sans" 
                          rows={2}
                          placeholder="국문 안내 (예: 치즈 추가: 5RM / 메추리알: 3RM)" 
                          value={form.toppingText?.ko} 
                          onChange={e => setForm({...form, toppingText: {...form.toppingText!, ko: e.target.value}})} 
                       />
                       <TextArea 
                          className="!mb-0 !p-3 text-xs border-gold/10 font-sans" 
                          rows={2}
                          placeholder="English Details (e.g. Cheese: 5RM / Quail Eggs: 3RM)" 
                          value={form.toppingText?.en} 
                          onChange={e => setForm({...form, toppingText: {...form.toppingText!, en: e.target.value}})} 
                       />
                    </div>
                 )}
              </div>

              {/* Other Toggles */}
              <div className="flex flex-col gap-6">
                  {/* NEW MENU Toggle with Burst Animation */}
                  <label className="text-white flex items-center gap-3 cursor-pointer group w-fit relative">
                    <input type="checkbox" className="w-4 h-4 accent-gold" checked={form.isNew} onChange={e => setForm({...form, isNew: e.target.checked})} />
                    <div className={`flex items-center gap-2 group-hover:text-gold transition-colors ${form.isNew ? 'animate-burst' : ''}`}>
                      <Zap size={18} className={form.isNew ? 'text-gold fill-gold' : 'text-gray-400'} />
                      <span className="font-bold text-xs uppercase tracking-[0.2em]">New Menu (신메뉴)</span>
                    </div>
                    {form.isNew && <div className="absolute -top-1 -right-4 w-2 h-2 bg-gold rounded-full animate-ping opacity-75"></div>}
                  </label>

                  <label className="text-white flex items-center gap-3 cursor-pointer group w-fit">
                    <input type="checkbox" className="w-4 h-4 accent-gold" checked={form.hasExtraNoodles} onChange={e => setForm({...form, hasExtraNoodles: e.target.checked})} />
                    <div className="flex items-center gap-2 group-hover:text-gold transition-colors">
                      <Utensils size={18} />
                      <span className="font-bold text-xs uppercase tracking-widest">Noodle Option (면 추가 아이콘)</span>
                    </div>
                  </label>

                  <label className="text-white flex items-center gap-3 cursor-pointer group w-fit">
                    <input type="checkbox" className="w-4 h-4 accent-gold" checked={form.hasSizeUp} onChange={e => setForm({...form, hasSizeUp: e.target.checked})} />
                    <div className="flex items-center gap-2 group-hover:text-gold transition-colors">
                      <Maximize size={18} />
                      <span className="font-bold text-xs uppercase tracking-widest">Size Up Option (사이즈 업 아이콘)</span>
                    </div>
                  </label>

                  <label className="text-white flex items-center gap-3 cursor-pointer group w-fit">
                    <input type="checkbox" className="w-4 h-4 accent-gold" checked={form.isPopular} onChange={e => setForm({...form, isPopular: e.target.checked})} />
                    <div className="flex items-center gap-2 group-hover:text-gold transition-colors">
                      <Sparkles size={18} className="text-gold" />
                      <span className="font-bold text-xs uppercase tracking-widest">Best Item (BEST 아이콘)</span>
                    </div>
                  </label>
              </div>

              <label className="text-red-400 flex items-center gap-3 cursor-pointer group col-span-2 pt-4 border-t border-neutral-700/30">
                 <input type="checkbox" className="w-4 h-4 accent-red-600" checked={form.isSoldOut} onChange={e => setForm({...form, isSoldOut: e.target.checked})} />
                 <span className="group-hover:text-red-300 transition-colors uppercase font-black text-xs tracking-widest">Sold Out (품절 상태로 표시)</span>
              </label>
           </div>
        </div>
        
        <div className="col-span-2 mt-4">
          <ImagePicker label="Item Image" value={form.image || ''} onChange={val => setForm({...form, image: val})} />
        </div>
        
        <div className="col-span-2 flex gap-4 mt-4">
          <Button onClick={() => onSave(form as MenuItem)} className="px-10">Save Changes</Button>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

const Admin: React.FC = () => {
  const { 
    state, updateContent, updateTheme, addMenuItem, updateMenuItem, batchUpdateMenuItems, deleteMenuItem,
    addCategory, updateCategory, deleteCategory, addSubCategory, updateSubCategory, deleteSubCategory,
    addNews, updateNews, deleteNews 
  } = useApp() as any;
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'menu' | 'news' | 'theme' | 'deploy'>('content');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1111') setIsAuthenticated(true);
    else alert('Invalid Password');
  };

  const handleLogout = () => { setIsAuthenticated(false); navigate('/'); };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6">
        <div className="bg-neutral-900 p-8 md:p-12 w-full max-md border border-neutral-800">
          <h2 className="text-2xl text-white font-serif mb-6 text-center">Admin Access</h2>
          <form onSubmit={handleLogin}>
            <Input type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" className="w-full mt-4">Login</Button>
            <button onClick={() => navigate('/')} type="button" className="w-full text-gray-500 text-xs uppercase tracking-widest mt-6 hover:text-white">Back to Home</button>
          </form>
        </div>
      </div>
    );
  }

  // --- Sub-Editor Components ---

  const ContentEditor = () => {
    const [localContent, setLocalContent] = useState<SiteContent>(state.content);

    const handleSave = (section: keyof SiteContent) => {
      updateContent(section, localContent[section]);
      alert(`${section.toUpperCase()} saved successfully!`);
    };

    return (
      <div className="space-y-12 animate-fade-in pb-12">
        {/* 1. Hero Section */}
        <div className="bg-neutral-900 p-8 border border-neutral-800 rounded">
          <h3 className="text-xl text-white mb-6 flex items-center gap-2 font-serif text-gold"><Layout size={20} /> Hero Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             <Input label="Title (KO)" value={localContent.hero.title.ko} onChange={e => setLocalContent({...localContent, hero: {...localContent.hero, title: {...localContent.hero.title, ko: e.target.value}}})} />
             <Input label="Title (EN)" value={localContent.hero.title.en} onChange={e => setLocalContent({...localContent, hero: {...localContent.hero, title: {...localContent.hero.title, en: e.target.value}}})} />
             <Input label="Subtitle (KO)" value={localContent.hero.subtitle.ko} onChange={e => setLocalContent({...localContent, hero: {...localContent.hero, subtitle: {...localContent.hero.subtitle, ko: e.target.value}}})} />
             <Input label="Subtitle (EN)" value={localContent.hero.subtitle.en} onChange={e => setLocalContent({...localContent, hero: {...localContent.hero, subtitle: {...localContent.hero.subtitle, en: e.target.value}}})} />
             <Input label="CTA Button (KO)" value={localContent.hero.cta.ko} onChange={e => setLocalContent({...localContent, hero: {...localContent.hero, cta: {...localContent.hero.cta, ko: e.target.value}}})} />
             <Input label="CTA Button (EN)" value={localContent.hero.cta.en} onChange={e => setLocalContent({...localContent, hero: {...localContent.hero, cta: {...localContent.hero.cta, en: e.target.value}}})} />
          </div>
          <ImagePicker label="Hero Background Image" value={localContent.hero.image} onChange={val => setLocalContent({...localContent, hero: {...localContent.hero, image: val}})} />
          <Button onClick={() => handleSave('hero')}>Save Hero</Button>
        </div>

        {/* 2. About Section */}
        <div className="bg-neutral-900 p-8 border border-neutral-800 rounded">
          <h3 className="text-xl text-white mb-6 flex items-center gap-2 font-serif text-gold"><AlignLeft size={20} /> About Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             <TextArea label="Brand Story (KO)" rows={8} value={localContent.about.details?.ko || localContent.about.description.ko} onChange={e => setLocalContent({...localContent, about: {...localContent.about, details: {...(localContent.about.details || localContent.about.description), ko: e.target.value}}})} />
             <TextArea label="Brand Story (EN)" rows={8} value={localContent.about.details?.en || localContent.about.description.en} onChange={e => setLocalContent({...localContent, about: {...localContent.about, details: {...(localContent.about.details || localContent.about.description), en: e.target.value}}})} />
          </div>
          <ImagePicker label="About Image" value={localContent.about.image} onChange={val => setLocalContent({...localContent, about: {...localContent.about, image: val}})} />
          <Button onClick={() => handleSave('about')}>Save About</Button>
        </div>

        {/* 3. Location & Contact Section */}
        <div className="bg-neutral-900 p-8 border border-neutral-800 rounded">
          <h3 className="text-xl text-white mb-6 flex items-center gap-2 font-serif text-gold"><MapPin size={20} /> Location & Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             <Input label="Full Address (KO)" value={localContent.contact.address.ko} onChange={e => setLocalContent({...localContent, contact: {...localContent.contact, address: {...localContent.contact.address, ko: e.target.value}}})} />
             <Input label="Full Address (EN)" value={localContent.contact.address.en} onChange={e => setLocalContent({...localContent, contact: {...localContent.contact, address: {...localContent.contact.address, en: e.target.value}}})} />
             <Input label="Public Phone" value={localContent.contact.phone} onChange={e => setLocalContent({...localContent, contact: {...localContent.contact, phone: e.target.value}})} />
             <Input 
                label="WhatsApp Number (Hero Button Link)" 
                value={localContent.contact.whatsapp} 
                placeholder="+60 11-1635-2210"
                onChange={e => setLocalContent({...localContent, contact: {...localContent.contact, whatsapp: e.target.value}})} 
             />
             <Input label="Email" value={localContent.contact.email} onChange={e => setLocalContent({...localContent, contact: {...localContent.contact, email: e.target.value}})} />
             <Input label="Business Hours (KO)" value={localContent.contact.hours.ko} onChange={e => setLocalContent({...localContent, contact: {...localContent.contact, hours: {...localContent.contact.hours, ko: e.target.value}}})} />
             <Input label="Business Hours (EN)" value={localContent.contact.hours.en} onChange={e => setLocalContent({...localContent, contact: {...localContent.contact, hours: {...localContent.contact.hours, en: e.target.value}}})} />
          </div>
          <Button onClick={() => handleSave('contact')}>Save Contact Info</Button>
        </div>

        {/* 4. Footer & Logo Section */}
        <div className="bg-neutral-900 p-8 border border-neutral-800 rounded">
          <h3 className="text-xl text-white mb-6 flex items-center gap-2 font-serif text-gold"><FileImage size={20} /> Branding & Footer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             <Input label="Brand Name (KO)" value={localContent.footer.brandName.ko} onChange={e => setLocalContent({...localContent, footer: {...localContent.footer, brandName: {...localContent.footer.brandName, ko: e.target.value}}})} />
             <Input label="Brand Name (EN)" value={localContent.footer.brandName.en} onChange={e => setLocalContent({...localContent, footer: {...localContent.footer, brandName: {...localContent.footer.brandName, en: e.target.value}}})} />
             <Input label="Tagline (KO)" value={localContent.footer.tagline.ko} onChange={e => setLocalContent({...localContent, footer: {...localContent.footer, tagline: {...localContent.footer.tagline, ko: e.target.value}}})} />
             <Input label="Tagline (EN)" value={localContent.footer.tagline.en} onChange={e => setLocalContent({...localContent, footer: {...localContent.footer, tagline: {...localContent.footer.tagline, en: e.target.value}}})} />
          </div>
          <ImagePicker label="Main Logo Image" value={localContent.footer.logo} onChange={val => setLocalContent({...localContent, footer: {...localContent.footer, logo: val}})} />
          
          <h4 className="text-gray-400 text-xs uppercase tracking-widest mb-4 mt-8 flex items-center gap-2"><Share2 size={14} /> Social Links</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
             <Input label="Instagram URL" value={localContent.contact.social.instagram} onChange={e => setLocalContent({...localContent, contact: {...localContent.contact, social: {...localContent.contact.social, instagram: e.target.value}}})} />
             <Input label="Facebook URL" value={localContent.contact.social.facebook} onChange={e => setLocalContent({...localContent, contact: {...localContent.contact, social: {...localContent.contact.social, facebook: e.target.value}}})} />
             <Input label="Threads URL" value={localContent.contact.social.threads} onChange={e => setLocalContent({...localContent, contact: {...localContent.contact, social: {...localContent.contact.social, threads: e.target.value}}})} />
          </div>
          <Button onClick={() => handleSave('footer')}>Save Footer & Social</Button>
        </div>
      </div>
    );
  };

  const MenuEditor = () => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<Partial<MenuItem>>({});

    const startEdit = (item: MenuItem) => {
      setForm({ ...item });
      setEditingId(item.id);
    };

    const startNew = () => {
      setForm({ 
        id: Date.now().toString(), 
        subCategoryId: state.subCategories[0]?.id || '', 
        name: {en:'', ko:''}, 
        description:{en:'', ko:''}, 
        price: 0, 
        originalPrice: 0,
        isPopular: false, 
        isNew: true, 
        isSoldOut: false, 
        image: '',
        hasToppings: false,
        toppingText: { ko: '', en: '' },
        hasExtraNoodles: false,
        hasSizeUp: false
      });
      setEditingId('new');
    };

    const handleSave = (formData: MenuItem) => {
      if (editingId === 'new') addMenuItem(formData);
      else updateMenuItem(formData);
      setEditingId(null);
    };

    // --- ENHANCED REORDERING LOGIC (Supports crossing subcategories) ---
    const handleMove = (item: MenuItem, direction: 'up' | 'down') => {
      // 1. Build a flattened list of all categories -> subcategories -> items in their correct visual order
      const visualItems: { item: MenuItem; subId: string }[] = [];
      const sortedCats = [...state.categories].sort((a,b) => a.order - b.order);
      
      sortedCats.forEach(cat => {
        const sortedSubs = [...state.subCategories]
          .filter(s => s.categoryId === cat.id)
          .sort((a,b) => a.order - b.order);
          
        sortedSubs.forEach(sub => {
          const itemsInSub = state.menu
            .filter(m => m.subCategoryId === sub.id)
            .sort((a,b) => (a.order ?? 0) - (b.order ?? 0));
          
          itemsInSub.forEach(m => visualItems.push({ item: m, subId: sub.id }));
        });
      });

      // 2. Find the current item's index in this global visual list
      const currentIndex = visualItems.findIndex(v => v.item.id === item.id);
      if (currentIndex === -1) return;

      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      
      // Check boundaries
      if (targetIndex < 0 || targetIndex >= visualItems.length) return;

      const targetEntry = visualItems[targetIndex];
      const targetItem = targetEntry.item;
      const targetSubId = targetEntry.subId;

      // 3. Perform the swap
      // We swap the 'order' values. If they cross subcategories, the target subCategoryId is inherited.
      const currentOrder = item.order ?? 0;
      const targetOrder = targetItem.order ?? 0;

      // If they are exactly the same order (newly created), we just nudge them apart
      let newCurrentOrder = targetOrder;
      let newTargetOrder = currentOrder;
      if (newCurrentOrder === newTargetOrder) {
         newCurrentOrder = direction === 'up' ? targetOrder - 1 : targetOrder + 1;
      }

      batchUpdateMenuItems([
        { ...item, order: newCurrentOrder, subCategoryId: targetSubId },
        { ...targetItem, order: newTargetOrder }
      ]);
    };

    return (
      <div className="space-y-12 animate-fade-in pb-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl text-white font-serif">Menu Management</h3>
          <Button onClick={startNew} className="flex items-center gap-2"><Plus size={18} /> Add New Item</Button>
        </div>

        {editingId === 'new' && (
          <MenuEditForm 
            editingId="new" 
            initialForm={form} 
            categories={state.categories} 
            subCategories={state.subCategories} 
            onSave={handleSave} 
            onCancel={() => setEditingId(null)} 
          />
        )}

        <div className="space-y-16">
          {state.categories.sort((a,b) => a.order - b.order).map((cat, catIdx, catArr) => (
            <div key={cat.id} className="space-y-6">
              <div className="flex items-center gap-4">
                 <h4 className="text-xl font-bold text-gold uppercase tracking-widest whitespace-nowrap">{cat.name.ko} / {cat.name.en}</h4>
                 <div className="h-px bg-neutral-800 w-full"></div>
              </div>

              <div className="space-y-10 pl-4 border-l border-neutral-900">
                {state.subCategories
                  .filter(sub => sub.categoryId === cat.id)
                  .sort((a,b) => a.order - b.order)
                  .map((sub, subIdx, subArr) => {
                    const subItems = state.menu
                      .filter(item => item.subCategoryId === sub.id)
                      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

                    return (
                      <div key={sub.id} className="space-y-4">
                        <h5 className="text-sm font-bold text-gray-500 uppercase tracking-widest">{sub.name.ko} / {sub.name.en}</h5>
                        <div className="grid gap-3">
                          {subItems.length === 0 ? (
                            <p className="text-xs text-gray-700 italic">No items here.</p>
                          ) : (
                            subItems.map((item, idx) => {
                              // Logic for global boundary check for buttons
                              const isFirstOverall = catIdx === 0 && subIdx === 0 && idx === 0;
                              const isLastOverall = catIdx === catArr.length - 1 && subIdx === subArr.length - 1 && idx === subItems.length - 1;

                              return (
                                <React.Fragment key={item.id}>
                                  <div className={`bg-neutral-900/60 p-4 flex justify-between items-center border transition-all rounded ${editingId === item.id ? 'border-gold bg-gold/5' : 'border-neutral-800 hover:border-neutral-600'}`}>
                                    <div className="flex items-center gap-6">
                                      <div className="relative w-16 h-16 shrink-0 rounded overflow-hidden">
                                        <img src={item.image} className={`w-full h-full object-cover ${item.isSoldOut ? 'grayscale blur-[1px]' : ''}`} />
                                        {item.isPopular && <div className="absolute top-0 right-0 bg-gold text-black text-[8px] px-1 font-bold">BEST</div>}
                                        {item.isNew && <div className="absolute top-0 left-0 bg-gold text-black text-[8px] px-1 font-bold">NEW</div>}
                                        {item.isSoldOut && <div className="absolute inset-0 bg-red-600/30 flex items-center justify-center font-black text-[10px] text-white">SOLD</div>}
                                      </div>
                                      <div>
                                         <div className="flex items-center gap-2">
                                           <p className={`font-bold text-lg ${item.isSoldOut ? 'text-gray-500' : 'text-white'}`}>{item.name.ko}</p>
                                           <div className="flex gap-1">
                                             {item.hasToppings && <PlusCircle size={10} className="text-gold" />}
                                             {item.hasExtraNoodles && <Utensils size={10} className="text-gold" />}
                                             {item.hasSizeUp && <Maximize size={10} className="text-gold" />}
                                             {item.isNew && <Zap size={10} className="text-gold fill-gold" />}
                                           </div>
                                         </div>
                                         <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">RM {item.price}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="flex flex-col gap-1 mr-2">
                                        <button 
                                          disabled={isFirstOverall} 
                                          onClick={() => handleMove(item, 'up')} 
                                          className={`p-1.5 rounded ${isFirstOverall ? 'text-gray-800 cursor-not-allowed' : 'text-gray-400 hover:text-white hover:bg-neutral-800'}`}
                                        >
                                          <ArrowUp size={14} />
                                        </button>
                                        <button 
                                          disabled={isLastOverall} 
                                          onClick={() => handleMove(item, 'down')} 
                                          className={`p-1.5 rounded ${isLastOverall ? 'text-gray-800 cursor-not-allowed' : 'text-gray-400 hover:text-white hover:bg-neutral-800'}`}
                                        >
                                          <ArrowDown size={14} />
                                        </button>
                                      </div>
                                      <button onClick={() => startEdit(item)} className={`p-3 rounded ${editingId === item.id ? 'bg-gold text-black' : 'text-blue-400 hover:bg-neutral-800'}`}><Edit2 size={18}/></button>
                                      <button onClick={() => window.confirm('Delete?') && deleteMenuItem(item.id)} className="p-3 text-red-400 hover:bg-neutral-800 rounded"><Trash2 size={18}/></button>
                                    </div>
                                  </div>
                                  {editingId === item.id && (
                                    <MenuEditForm editingId={item.id} initialForm={form} categories={state.categories} subCategories={state.subCategories} onSave={handleSave} onCancel={() => setEditingId(null)} />
                                  )}
                                </React.Fragment>
                              );
                            })
                          )}
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const NewsEditor = () => {
    const [editing, setEditing] = useState<Partial<NewsPost> | null>(null);

    return (
      <div className="space-y-8 animate-fade-in pb-12">
        <div className="flex justify-between items-center">
          <h3 className="text-xl text-white font-serif">Board / News Management</h3>
          <Button size="sm" onClick={() => setEditing({ id: Date.now().toString(), title: {en:'', ko:''}, content: {en:'', ko:''}, date: new Date().toISOString().split('T')[0] })}>Create New Post</Button>
        </div>
        {editing && (
          <div className="bg-neutral-800 p-8 border-2 border-gold mb-12 shadow-2xl animate-fade-in">
            <h4 className="text-gold font-bold uppercase tracking-widest mb-6">Edit Post (EN/KO)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Input label="Title (KO)" value={editing.title?.ko} onChange={e => setEditing({...editing, title: {...editing.title!, ko: e.target.value}})} />
              <Input label="Title (EN)" value={editing.title?.en} onChange={e => setEditing({...editing, title: {...editing.title!, en: e.target.value}})} />
              <TextArea label="Content (KO)" rows={10} value={editing.content?.ko} onChange={e => setEditing({...editing, content: {...editing.content!, ko: e.target.value}})} />
              <TextArea label="Content (EN)" rows={10} value={editing.content?.en} onChange={e => setEditing({...editing, content: {...editing.content!, en: e.target.value}})} />
              <Input label="Date" type="date" value={editing.date} onChange={e => setEditing({...editing, date: e.target.value})} />
            </div>
            <ImagePicker label="Featured Image" value={editing.image || ''} onChange={val => setEditing({...editing, image: val})} />
            <div className="flex gap-4">
              <Button onClick={() => { 
                const isExisting = state.news.some(n => n.id === editing.id);
                isExisting ? updateNews(editing as NewsPost) : addNews(editing as NewsPost);
                setEditing(null);
              }}>Save Post</Button>
              <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            </div>
          </div>
        )}
        <div className="grid gap-4">
          {state.news.map(post => (
            <div key={post.id} className="bg-neutral-900 p-6 border border-neutral-800 flex justify-between items-center rounded hover:border-gold transition-colors">
              <div className="flex items-center gap-6">
                {post.image && <img src={post.image} className="w-16 h-16 object-cover rounded" />}
                <div>
                   <h4 className="text-white font-bold">{post.title.ko}</h4>
                   <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{post.date} | {post.title.en}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing(post)} className="p-3 text-blue-400 hover:bg-neutral-800 rounded"><Edit2 size={20}/></button>
                <button onClick={() => window.confirm('Delete?') && deleteNews(post.id)} className="p-3 text-red-400 hover:bg-neutral-800 rounded"><Trash2 size={20}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ThemeEditor = () => (
    <div className="bg-neutral-900 p-8 border border-neutral-800 rounded animate-fade-in space-y-8">
      <div>
        <h3 className="text-xl text-white mb-6 flex items-center gap-2 font-serif text-gold"><Settings size={20} /> Branding Theme</h3>
        <div className="space-y-4">
          <label className="block text-gray-400 text-sm uppercase tracking-widest">Primary Accent Color</label>
          <div className="flex flex-wrap gap-6">
            {['#D4AF37', '#E53935', '#3949AB', '#43A047', '#C0C0C0', '#F06292', '#8BC34A'].map(c => (
              <button 
                key={c} 
                onClick={() => updateTheme(c)} 
                className={`w-14 h-14 rounded-full transition-transform hover:scale-110 shadow-xl border-4 ${state.theme.primaryColor === c ? 'border-white scale-110' : 'border-transparent'}`} 
                style={{backgroundColor: c}} 
              />
            ))}
          </div>
          <div className="flex items-center gap-4 mt-8">
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase">Current Color Hex</p>
              <input 
                type="text" 
                value={state.theme.primaryColor} 
                onChange={(e) => updateTheme(e.target.value)}
                className="bg-neutral-800 border border-neutral-700 text-white font-mono p-2 text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div className="w-10 h-10 border border-neutral-700" style={{ backgroundColor: state.theme.primaryColor }}></div>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-neutral-800">
        <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-4">Color Preview</h4>
        <div className="flex gap-4 items-center">
            <Button>Primary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <span style={{ color: state.theme.primaryColor }} className="font-bold text-lg">Accent Text</span>
        </div>
      </div>
    </div>
  );

  const DeploymentEditor = () => {
    const handleCopyConfig = () => {
      const code = `import { AppState, MenuItem, NewsPost, MenuCategory, MenuSubCategory } from './types';\n\n// PASTE START: Generated from Admin (${new Date().toISOString()})\nconst CURRENT_STATE: AppState = ${JSON.stringify(state, null, 2)};\n// PASTE END\n\nexport const INITIAL_MENU: MenuItem[] = CURRENT_STATE.menu;\nexport const INITIAL_NEWS: NewsPost[] = CURRENT_STATE.news;\nexport const INITIAL_STATE: AppState = CURRENT_STATE;`;
      navigator.clipboard.writeText(code).then(() => alert("✅ Configuration code copied!\n\nPlease replace the content of 'constants.ts' with this code to publish changes to the live site."));
    };

    return (
      <div className="space-y-8 animate-fade-in pb-12">
        <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 border-l-4 border-gold p-8 rounded shadow-2xl">
          <h3 className="text-2xl text-white font-bold mb-4 font-serif">Publish Changes</h3>
          <p className="text-gray-300 text-sm mb-8 leading-relaxed max-w-2xl">
            To make your changes visible to everyone permanently, copy the configuration code below and update the `constants.ts` file in your source code.
          </p>
          <Button onClick={handleCopyConfig} className="flex items-center gap-3 bg-gold text-black font-bold py-4 px-8 shadow-lg hover:bg-white transition-colors">
            <Copy size={20} /> Copy Site Configuration Code
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <SectionTitle title="CMS DASHBOARD" subtitle="Management" centered={false} />
          <Button onClick={handleLogout} variant="outline" size="sm" className="flex items-center gap-2 border-white/20 text-white hover:bg-red-600 hover:border-red-600">
            <LogOut size={16} /> Logout
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-12 border-b border-neutral-800 pb-4 overflow-x-auto scrollbar-hide">
          {[
            { id: 'content', label: 'Content', icon: <Layout size={14} /> },
            { id: 'menu', label: 'Menu', icon: <Coffee size={14} /> },
            { id: 'news', label: 'News', icon: <FileText size={14} /> },
            { id: 'theme', label: 'Theme', icon: <Settings size={14} /> },
            { id: 'deploy', label: 'Publish', icon: <Rocket size={14} /> },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-8 py-4 text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 border-b-2 whitespace-nowrap ${activeTab === tab.id ? 'text-gold border-gold font-bold bg-white/5' : 'text-gray-500 border-transparent hover:text-white hover:bg-white/5'}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
        
        <div className="min-h-[500px]">
          {activeTab === 'content' && <ContentEditor />}
          {activeTab === 'menu' && <MenuEditor />}
          {activeTab === 'news' && <NewsEditor />}
          {activeTab === 'theme' && <ThemeEditor />}
          {activeTab === 'deploy' && <DeploymentEditor />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
