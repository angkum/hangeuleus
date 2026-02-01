
import React, { useState, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import { Button, Input, TextArea } from '../components/UI';
import { MenuItem, NewsPost, MenuCategory, MenuSubCategory } from '../types';
import { 
  Trash2, Plus, Edit2, LogOut, Layout, Coffee, FileText, 
  Settings, AlignLeft, Phone, Share2, BarChart, FileImage, Upload,
  Download, Database, Copy, AlertTriangle, RefreshCw, RotateCcw, Code,
  Rocket, Smartphone, Globe, Layers, ArrowUp, ArrowDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ImagePicker: React.FC<{ label: string; value: string; onChange: (val: string) => void }> = ({ label, value, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Limit to 1.5MB to be safe with LocalStorage (5MB typical limit)
      if (file.size > 1.5 * 1024 * 1024) {
         alert("File is too large! Please choose an image smaller than 1.5MB.\n\nBrowser storage is limited, and large images may crash the application.");
         // Reset input
         if (fileInputRef.current) fileInputRef.current.value = '';
         return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    onChange('');
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const isBase64 = value && value.startsWith('data:image');

  return (
    <div className="mb-6">
      <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">{label}</label>
      
      {value && (
        <div className="mb-3 w-full max-w-xs aspect-video border border-neutral-700 bg-neutral-900 relative overflow-hidden group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
             <span className="text-xs text-white font-mono">Preview</span>
          </div>
          <button 
             type="button"
             onClick={handleClear}
             className="absolute top-2 right-2 bg-red-600/90 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
             title="Remove Image"
          >
             <Trash2 size={14} />
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-3">
        <label className="cursor-pointer bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-3 text-sm border border-neutral-600 transition-colors flex items-center justify-center gap-2 min-w-[140px] shadow-sm whitespace-nowrap">
          <Upload size={16} />
          <span>{isBase64 ? 'Change File' : 'Upload File'}</span>
          <input 
            ref={fileInputRef}
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileChange} 
          />
        </label>
        <div className="flex-1 w-full">
           {isBase64 ? (
               <div className="w-full bg-neutral-900 border border-neutral-800 text-gray-400 p-3 text-sm flex justify-between items-center h-[46px]">
                   <span className="flex items-center gap-2 truncate max-w-[200px]"><FileImage size={14} /> <span className="truncate">Local Image Loaded</span></span>
                   <button type="button" onClick={handleClear} className="text-xs text-red-400 hover:text-white uppercase tracking-wider px-2">Remove</button>
               </div>
           ) : (
               <input 
                  type="text"
                  className="w-full bg-neutral-900 border border-neutral-800 text-white p-3 text-sm focus:outline-none focus:border-white transition-colors placeholder-gray-600 h-[46px]"
                  placeholder="Or paste image URL..."
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
               />
           )}
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1">Recommended: JPG/PNG under 1MB.</p>
    </div>
  );
};

const Admin: React.FC = () => {
  const { 
    state, 
    updateContent, 
    updateTheme, 
    addMenuItem, 
    updateMenuItem, 
    deleteMenuItem,
    addCategory,
    updateCategory,
    deleteCategory,
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,
    addNews, 
    updateNews, 
    deleteNews 
  } = useApp();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'menu' | 'categories' | 'news' | 'theme' | 'deploy'>('content');
  const navigate = useNavigate();

  // Simple hardcoded auth
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1111') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid Password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6">
        <div className="bg-neutral-900 p-8 md:p-12 w-full max-w-md border border-neutral-800">
          <h2 className="text-2xl text-white font-serif mb-6 text-center">Admin Access</h2>
          <form onSubmit={handleLogin}>
            <Input 
              type="password" 
              label="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <Button type="submit" className="w-full mt-4">Login</Button>
            <button onClick={() => navigate('/')} type="button" className="w-full text-gray-500 text-xs uppercase tracking-widest mt-6 hover:text-white">Back to Home</button>
          </form>
        </div>
      </div>
    );
  }

  // --- Sub-components for Tabs ---

  // 1. Content Editor
  const ContentEditor = () => {
    // Local state for Hero
    const [heroTitleEn, setHeroTitleEn] = useState(state.content.hero.title.en);
    const [heroTitleKo, setHeroTitleKo] = useState(state.content.hero.title.ko);
    const [heroImg, setHeroImg] = useState(state.content.hero.image);
    const [heroOpacity, setHeroOpacity] = useState(state.content.hero.imageOpacity || 0.6);

    // Local state for About (Philosophy)
    const [aboutTitleEn, setAboutTitleEn] = useState(state.content.about.title.en);
    const [aboutTitleKo, setAboutTitleKo] = useState(state.content.about.title.ko);
    const [aboutDescEn, setAboutDescEn] = useState(state.content.about.description.en);
    const [aboutDescKo, setAboutDescKo] = useState(state.content.about.description.ko);
    const [aboutDetailsEn, setAboutDetailsEn] = useState(state.content.about.details?.en || '');
    const [aboutDetailsKo, setAboutDetailsKo] = useState(state.content.about.details?.ko || '');
    const [aboutImg, setAboutImg] = useState(state.content.about.image);

    // Stats
    const defaultStat1 = { value: '20+', label: { en: 'Years of Experience', ko: '년 경력' } };
    const defaultStat2 = { value: '100%', label: { en: 'Fresh Ingredients', ko: '신선한 재료' } };
    const currentStats = state.content.about.stats || { stat1: defaultStat1, stat2: defaultStat2 };

    const [stat1Value, setStat1Value] = useState(currentStats.stat1.value);
    const [stat1LabelEn, setStat1LabelEn] = useState(currentStats.stat1.label.en);
    const [stat1LabelKo, setStat1LabelKo] = useState(currentStats.stat1.label.ko);

    const [stat2Value, setStat2Value] = useState(currentStats.stat2.value);
    const [stat2LabelEn, setStat2LabelEn] = useState(currentStats.stat2.label.en);
    const [stat2LabelKo, setStat2LabelKo] = useState(currentStats.stat2.label.ko);

    // Footer & Brand
    const defaultFooter = { brandName: { en: 'HAN GEU LEUS', ko: '한 그 릇' }, tagline: { en: 'Authentic Korean-Chinese Cuisine.', ko: '정통 중화요리의 진수.' }, logo: '' };
    const currentFooter = state.content.footer || defaultFooter;

    const [brandNameEn, setBrandNameEn] = useState(currentFooter.brandName.en);
    const [brandNameKo, setBrandNameKo] = useState(currentFooter.brandName.ko);
    const [taglineEn, setTaglineEn] = useState(currentFooter.tagline.en);
    const [taglineKo, setTaglineKo] = useState(currentFooter.tagline.ko);
    const [footerLogo, setFooterLogo] = useState(currentFooter.logo);


    // Local state for Contact & Social
    const [contactAddressEn, setContactAddressEn] = useState(state.content.contact.address.en);
    const [contactAddressKo, setContactAddressKo] = useState(state.content.contact.address.ko);
    const [contactPhone, setContactPhone] = useState(state.content.contact.phone);
    const [contactHoursEn, setContactHoursEn] = useState(state.content.contact.hours.en);
    const [contactHoursKo, setContactHoursKo] = useState(state.content.contact.hours.ko);
    
    const [socialInsta, setSocialInsta] = useState(state.content.contact.social?.instagram || '');
    const [socialFb, setSocialFb] = useState(state.content.contact.social?.facebook || '');
    const [socialThreads, setSocialThreads] = useState(state.content.contact.social?.threads || '');

    const saveHero = () => {
      updateContent('hero', {
        title: { en: heroTitleEn, ko: heroTitleKo },
        image: heroImg,
        imageOpacity: Number(heroOpacity)
      });
      alert('Hero saved!');
    };

    const saveAbout = () => {
      updateContent('about', {
        title: { en: aboutTitleEn, ko: aboutTitleKo },
        description: { en: aboutDescEn, ko: aboutDescKo },
        details: { en: aboutDetailsEn, ko: aboutDetailsKo },
        image: aboutImg,
        stats: {
            stat1: { value: stat1Value, label: { en: stat1LabelEn, ko: stat1LabelKo } },
            stat2: { value: stat2Value, label: { en: stat2LabelEn, ko: stat2LabelKo } }
        }
      });
      alert('About section saved!');
    };

    const saveFooter = () => {
      updateContent('footer', {
        brandName: { en: brandNameEn, ko: brandNameKo },
        tagline: { en: taglineEn, ko: taglineKo },
        logo: footerLogo
      });
      alert('Footer Brand Info saved!');
    };

    const saveContact = () => {
      updateContent('contact', {
        address: { en: contactAddressEn, ko: contactAddressKo },
        phone: contactPhone,
        hours: { en: contactHoursEn, ko: contactHoursKo },
        social: {
          instagram: socialInsta,
          facebook: socialFb,
          threads: socialThreads
        }
      });
      alert('Contact & Social saved!');
    };

    return (
      <div className="space-y-8 animate-fade-in pb-12">
        {/* HERO */}
        <div className="bg-neutral-900 p-6 rounded border border-neutral-800">
          <h3 className="text-xl text-white mb-4 flex items-center gap-2"><Layout size={20} /> Hero Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Input label="Title (EN)" value={heroTitleEn} onChange={e => setHeroTitleEn(e.target.value)} />
             <Input label="Title (KO)" value={heroTitleKo} onChange={e => setHeroTitleKo(e.target.value)} />
          </div>
          <ImagePicker label="Background Image" value={heroImg} onChange={setHeroImg} />
          
          <div className="mb-4">
            <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
              Background Opacity ({Math.round(heroOpacity * 100)}%)
            </label>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05" 
                value={heroOpacity} 
                onChange={(e) => setHeroOpacity(Number(e.target.value))}
                className="w-full accent-white cursor-pointer h-1 bg-neutral-700 rounded-lg appearance-none"
              />
              <span className="text-white font-mono text-sm w-12 text-right">{heroOpacity}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Adjust transparency of the background image. 0 is invisible (black), 1 is full visibility.</p>
          </div>

          <Button onClick={saveHero} size="sm" className="mt-2">Save Changes</Button>
        </div>

        {/* ABOUT (PHILOSOPHY) */}
        <div className="bg-neutral-900 p-6 rounded border border-neutral-800">
           <h3 className="text-xl text-white mb-4 flex items-center gap-2"><AlignLeft size={20} /> About Us Content</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Title (EN)" value={aboutTitleEn} onChange={e => setAboutTitleEn(e.target.value)} />
              <Input label="Title (KO)" value={aboutTitleKo} onChange={e => setAboutTitleKo(e.target.value)} />
           </div>
           
           <div className="mt-4 mb-4">
             <h4 className="text-sm text-gray-400 uppercase tracking-widest mb-2 border-b border-gray-800 pb-1">Home Page Summary</h4>
             <TextArea label="Description (EN)" rows={3} value={aboutDescEn} onChange={e => setAboutDescEn(e.target.value)} />
             <TextArea label="Description (KO)" rows={3} value={aboutDescKo} onChange={e => setAboutDescKo(e.target.value)} />
           </div>

           <div className="mt-4 mb-4">
             <h4 className="text-sm text-gray-400 uppercase tracking-widest mb-2 border-b border-gray-800 pb-1">Full Story (About Page)</h4>
             <TextArea label="Full Details (EN)" rows={6} value={aboutDetailsEn} onChange={e => setAboutDetailsEn(e.target.value)} />
             <TextArea label="Full Details (KO)" rows={6} value={aboutDetailsKo} onChange={e => setAboutDetailsKo(e.target.value)} />
           </div>
           
           <div className="mt-4 mb-4 border-t border-neutral-800 pt-4">
             <h4 className="text-sm text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2"><BarChart size={16} /> Statistics</h4>
             
             {/* Stat 1 */}
             <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-black/20 rounded">
                <div className="col-span-1">
                   <Input label="Stat 1 Value" value={stat1Value} onChange={e => setStat1Value(e.target.value)} />
                </div>
                <div className="col-span-1">
                   <Input label="Label (EN)" value={stat1LabelEn} onChange={e => setStat1LabelEn(e.target.value)} />
                </div>
                <div className="col-span-1">
                   <Input label="Label (KO)" value={stat1LabelKo} onChange={e => setStat1LabelKo(e.target.value)} />
                </div>
             </div>

             {/* Stat 2 */}
             <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-black/20 rounded">
                <div className="col-span-1">
                   <Input label="Stat 2 Value" value={stat2Value} onChange={e => setStat2Value(e.target.value)} />
                </div>
                <div className="col-span-1">
                   <Input label="Label (EN)" value={stat2LabelEn} onChange={e => setStat2LabelEn(e.target.value)} />
                </div>
                <div className="col-span-1">
                   <Input label="Label (KO)" value={stat2LabelKo} onChange={e => setStat2LabelKo(e.target.value)} />
                </div>
             </div>
           </div>

           <ImagePicker label="Section Image" value={aboutImg} onChange={setAboutImg} />
           <Button onClick={saveAbout} size="sm" className="mt-2">Save Changes</Button>
        </div>

        {/* FOOTER & BRAND */}
        <div className="bg-neutral-900 p-6 rounded border border-neutral-800">
           <h3 className="text-xl text-white mb-4 flex items-center gap-2"><FileImage size={20} /> Footer Brand Info</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Brand Name (EN)" value={brandNameEn} onChange={e => setBrandNameEn(e.target.value)} />
              <Input label="Brand Name (KO)" value={brandNameKo} onChange={e => setBrandNameKo(e.target.value)} />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <Input label="Tagline (EN)" value={taglineEn} onChange={e => setTaglineEn(e.target.value)} />
              <Input label="Tagline (KO)" value={taglineKo} onChange={e => setTaglineKo(e.target.value)} />
           </div>
           <ImagePicker label="Logo Image" value={footerLogo} onChange={setFooterLogo} />
           <p className="text-xs text-gray-500 mb-4">If a logo is provided, it will be displayed on the far right of the footer.</p>
           <Button onClick={saveFooter} size="sm" className="mt-2">Save Changes</Button>
        </div>

        {/* CONTACT & SOCIAL */}
        <div className="bg-neutral-900 p-6 rounded border border-neutral-800">
           <h3 className="text-xl text-white mb-4 flex items-center gap-2"><Phone size={20} /> Contact & Info</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Phone Number" value={contactPhone} onChange={e => setContactPhone(e.target.value)} />
              <div />
              <Input label="Address (EN)" value={contactAddressEn} onChange={e => setContactAddressEn(e.target.value)} />
              <Input label="Address (KO)" value={contactAddressKo} onChange={e => setContactAddressKo(e.target.value)} />
              <Input label="Operating Hours (EN)" value={contactHoursEn} onChange={e => setContactHoursEn(e.target.value)} />
              <Input label="Operating Hours (KO)" value={contactHoursKo} onChange={e => setContactHoursKo(e.target.value)} />
           </div>

           <h4 className="text-lg text-white mt-6 mb-3 flex items-center gap-2"><Share2 size={18} /> Social Media Links</h4>
           <Input label="Instagram URL" value={socialInsta} onChange={e => setSocialInsta(e.target.value)} placeholder="https://instagram.com/..." />
           <Input label="Facebook URL" value={socialFb} onChange={e => setSocialFb(e.target.value)} placeholder="https://facebook.com/..." />
           <Input label="Threads URL" value={socialThreads} onChange={e => setSocialThreads(e.target.value)} placeholder="https://threads.net/..." />

           <Button onClick={saveContact} size="sm" className="mt-4">Save Changes</Button>
        </div>
      </div>
    );
  };

  // 2. Menu Editor
  const MenuEditor = () => {
    const [editingId, setEditingId] = useState<string | null>(null);
    // Extra state to handle 2-level selection UI in form
    const [selectedCatId, setSelectedCatId] = useState<string>(state.categories[0]?.id || '');
    const [formState, setFormState] = useState<Partial<MenuItem>>({});

    const startEdit = (item: MenuItem) => {
      setEditingId(item.id);
      // Find parent category to set dropdowns correctly
      const sub = state.subCategories.find(s => s.id === item.subCategoryId);
      if (sub) {
          setSelectedCatId(sub.categoryId);
      }
      setFormState({ ...item });
    };

    const startNew = () => {
      setEditingId('new');
      const defaultSub = state.subCategories.find(s => s.categoryId === selectedCatId) || state.subCategories[0];
      
      // Default order: Put at the end of the current subcategory list
      const existingItems = state.menu.filter(m => m.subCategoryId === defaultSub?.id);
      const nextOrder = existingItems.length > 0 ? (Math.max(...existingItems.map(i => i.order || 0)) + 1) : 1;

      setFormState({
        id: Date.now().toString(),
        subCategoryId: defaultSub?.id || '',
        name: { en: '', ko: '' },
        description: { en: '', ko: '' },
        price: 0,
        originalPrice: 0,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
        isPopular: false,
        isSoldOut: false,
        order: nextOrder
      });
    };

    const handleSave = () => {
      if (editingId === 'new') {
        addMenuItem(formState as MenuItem);
      } else {
        updateMenuItem(formState as MenuItem);
      }
      setEditingId(null);
    };

    // Reordering Logic
    const moveItem = (item: MenuItem, direction: 'up' | 'down') => {
        // Get all items in this subcategory sorted by order
        const siblings = state.menu
            .filter(m => m.subCategoryId === item.subCategoryId)
            .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
        
        const currentIndex = siblings.findIndex(m => m.id === item.id);
        if (currentIndex === -1) return;

        const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        if (targetIndex < 0 || targetIndex >= siblings.length) return;

        // Create a new array with normalized orders
        const newSiblings = siblings.map((sib, idx) => ({ ...sib, order: idx }));
        
        // Swap in the array
        [newSiblings[currentIndex], newSiblings[targetIndex]] = [newSiblings[targetIndex], newSiblings[currentIndex]];
        
        // Re-assign order based on new array position
        const updates = newSiblings.map((sib, idx) => ({ ...sib, order: idx }));
        
        // Dispatch updates
        updates.forEach(u => updateMenuItem(u));
    };

    // Filter available subcategories based on selected large category
    const availableSubCats = state.subCategories.filter(s => s.categoryId === selectedCatId);

    return (
      <div className="space-y-6 animate-fade-in pb-12">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl text-white">Menu Items</h3>
            <Button onClick={startNew} className="flex items-center gap-2"><Plus size={16}/> Add New Item</Button>
        </div>

        {editingId && (
          <div className="bg-neutral-800 p-6 border border-gold mb-8">
            <h4 className="text-white mb-4">{editingId === 'new' ? 'Create Item' : 'Edit Item'}</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                 <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Large Category</label>
                 <select 
                    value={selectedCatId} 
                    onChange={e => {
                        const newCatId = e.target.value;
                        setSelectedCatId(newCatId);
                        // Auto-select first subcategory of new category
                        const firstSub = state.subCategories.find(s => s.categoryId === newCatId);
                        setFormState({...formState, subCategoryId: firstSub?.id || ''});
                    }}
                    className="w-full bg-neutral-900 border border-neutral-700 text-white p-3"
                 >
                    {state.categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name.en} / {c.name.ko}</option>
                    ))}
                 </select>
              </div>
              <div className="col-span-2 md:col-span-1">
                 <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Sub Category</label>
                 <select 
                    value={formState.subCategoryId} 
                    onChange={e => setFormState({...formState, subCategoryId: e.target.value})}
                    className="w-full bg-neutral-900 border border-neutral-700 text-white p-3"
                 >
                    {availableSubCats.map(s => (
                        <option key={s.id} value={s.id}>{s.name.en} / {s.name.ko}</option>
                    ))}
                 </select>
              </div>

              <Input label="Name (EN)" value={formState.name?.en} onChange={e => setFormState({...formState, name: {...formState.name!, en: e.target.value}})} />
              <Input label="Name (KO)" value={formState.name?.ko} onChange={e => setFormState({...formState, name: {...formState.name!, ko: e.target.value}})} />
              <Input label="Desc (EN)" value={formState.description?.en} onChange={e => setFormState({...formState, description: {...formState.description!, en: e.target.value}})} />
              <Input label="Desc (KO)" value={formState.description?.ko} onChange={e => setFormState({...formState, description: {...formState.description!, ko: e.target.value}})} />
              
              <div className="col-span-2 md:col-span-1">
                <Input label="Selling Price" type="number" value={formState.price} onChange={e => setFormState({...formState, price: Number(e.target.value)})} />
              </div>
              <div className="col-span-2 md:col-span-1">
                <Input label="Original Price (For Discounts)" type="number" value={formState.originalPrice} onChange={e => setFormState({...formState, originalPrice: Number(e.target.value)})} />
              </div>
              
              <Input label="Order (Optional)" type="number" value={formState.order || 0} onChange={e => setFormState({...formState, order: Number(e.target.value)})} />
              
              <div className="col-span-2">
                <ImagePicker 
                  label="Item Image" 
                  value={formState.image || ''} 
                  onChange={val => setFormState({...formState, image: val})} 
                />
              </div>

              <div className="col-span-2 flex gap-8">
                 <label className="text-white flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formState.isPopular} onChange={e => setFormState({...formState, isPopular: e.target.checked})} />
                    Is Popular Item?
                 </label>
                 <label className="text-red-400 flex items-center gap-2 cursor-pointer font-bold">
                    <input type="checkbox" checked={formState.isSoldOut} onChange={e => setFormState({...formState, isSoldOut: e.target.checked})} />
                    Sold Out (품절)
                 </label>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
               <Button onClick={handleSave} size="sm">Save Item</Button>
               <Button onClick={() => setEditingId(null)} variant="outline" size="sm">Cancel</Button>
            </div>
          </div>
        )}

        {/* Grouped View for Reordering */}
        <div className="space-y-6">
           {state.categories.sort((a,b) => a.order - b.order).map(cat => (
             <div key={cat.id} className="border border-neutral-800 rounded-lg overflow-hidden">
                <div className="bg-neutral-800 px-4 py-2 font-bold text-white flex items-center gap-2">
                   <span className="text-gold text-xs border border-gold px-1 rounded">{cat.order}</span> 
                   {cat.name.en} / {cat.name.ko}
                </div>
                
                <div className="p-4 bg-neutral-900/50 space-y-4">
                   {state.subCategories
                      .filter(s => s.categoryId === cat.id)
                      .sort((a,b) => a.order - b.order)
                      .map(sub => (
                        <div key={sub.id} className="ml-4 pl-4 border-l border-neutral-700">
                           <h5 className="text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                              {sub.name.en} / {sub.name.ko}
                           </h5>
                           
                           <div className="space-y-2">
                              {state.menu
                                 .filter(m => m.subCategoryId === sub.id)
                                 .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999))
                                 .map((item, index, array) => (
                                    <div key={item.id} className={`bg-neutral-900 p-3 flex justify-between items-center border hover:border-neutral-600 transition-colors ${item.isSoldOut ? 'border-red-900/30 opacity-60' : 'border-neutral-800'}`}>
                                       <div className="flex gap-4 items-center">
                                          {/* Reorder Buttons */}
                                          <div className="flex flex-col gap-1">
                                             <button 
                                                onClick={() => moveItem(item, 'up')}
                                                disabled={index === 0}
                                                className="text-gray-500 hover:text-gold disabled:opacity-20"
                                             >
                                                <ArrowUp size={14} />
                                             </button>
                                             <button 
                                                onClick={() => moveItem(item, 'down')}
                                                disabled={index === array.length - 1}
                                                className="text-gray-500 hover:text-gold disabled:opacity-20"
                                             >
                                                <ArrowDown size={14} />
                                             </button>
                                          </div>
                                          
                                          <div className="w-10 h-10 shrink-0 overflow-hidden rounded bg-neutral-800 relative">
                                             <img src={item.image} alt={item.name.en} className={`w-full h-full object-cover ${item.isSoldOut ? 'grayscale blur-[1px]' : ''}`} />
                                             {item.originalPrice && item.originalPrice > item.price && !item.isSoldOut && (
                                                 <div className="absolute top-0 left-0 bg-gold w-2 h-2 rounded-full border border-black animate-pulse" />
                                             )}
                                             {item.isSoldOut && (
                                                 <div className="absolute top-0 left-0 bg-red-600 w-full h-full flex items-center justify-center">
                                                     <span className="text-[6px] font-black text-white leading-none">SOLD</span>
                                                 </div>
                                             )}
                                          </div>
                                          <div>
                                             <div className="flex items-center gap-2">
                                                <p className={`font-medium text-sm ${item.isSoldOut ? 'text-gray-500 line-through' : 'text-white'}`}>{item.name.en}</p>
                                                {item.isSoldOut && <span className="text-[8px] bg-red-600/20 text-red-500 px-1 font-bold">품절</span>}
                                                {item.originalPrice && item.originalPrice > item.price && !item.isSoldOut && (
                                                    <span className="text-[9px] text-gold font-bold">-%{Math.round((1 - item.price / item.originalPrice) * 100)}</span>
                                                )}
                                             </div>
                                             <div className="flex items-center gap-2">
                                                <p className={`text-xs ${item.isSoldOut ? 'text-gray-600' : 'text-gray-300'}`}>RM {item.price}</p>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="flex gap-2">
                                          <button onClick={() => startEdit(item)} className="p-2 text-blue-400 hover:bg-neutral-800 rounded"><Edit2 size={16}/></button>
                                          <button onClick={() => deleteMenuItem(item.id)} className="p-2 text-red-400 hover:bg-neutral-800 rounded"><Trash2 size={16}/></button>
                                       </div>
                                    </div>
                                 ))
                              }
                              {state.menu.filter(m => m.subCategoryId === sub.id).length === 0 && (
                                 <p className="text-gray-600 text-xs italic">No items in this category.</p>
                              )}
                           </div>
                        </div>
                   ))}
                </div>
             </div>
           ))}
        </div>
      </div>
    );
  };

  // 3. Category Manager (New)
  const CategoryManager = () => {
    // ---- Large Category State ----
    const [editingCatId, setEditingCatId] = useState<string | null>(null);
    const [catForm, setCatForm] = useState<Partial<MenuCategory>>({});
    
    // ---- Sub Category State ----
    const [editingSubId, setEditingSubId] = useState<string | null>(null);
    const [subForm, setSubForm] = useState<Partial<MenuSubCategory>>({});

    // -- Category Handlers --
    const startNewCat = () => {
        setEditingCatId('new');
        setCatForm({ id: `c_${Date.now()}`, name: { en: '', ko: '' }, order: state.categories.length + 1 });
    }
    const editCat = (c: MenuCategory) => {
        setEditingCatId(c.id);
        setCatForm({...c});
    }
    const saveCat = () => {
        if(editingCatId === 'new') addCategory(catForm as MenuCategory);
        else updateCategory(catForm as MenuCategory);
        setEditingCatId(null);
    }

    // -- SubCategory Handlers --
    const startNewSub = (parentId: string) => {
        setEditingSubId('new');
        setSubForm({ id: `s_${Date.now()}`, categoryId: parentId, name: { en: '', ko: '' }, order: state.subCategories.filter(s=>s.categoryId===parentId).length + 1 });
    }
    const editSub = (s: MenuSubCategory) => {
        setEditingSubId(s.id);
        setSubForm({...s});
    }
    const saveSub = () => {
        if(editingSubId === 'new') addSubCategory(subForm as MenuSubCategory);
        else updateSubCategory(subForm as MenuSubCategory);
        setEditingSubId(null);
    }

    return (
        <div className="space-y-12 animate-fade-in pb-12">
            
            {/* Intro */}
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded">
                <h3 className="text-xl text-white mb-2">Category Structure</h3>
                <p className="text-gray-400 text-sm">Define the hierarchy: Large Category &gt; Sub Category &gt; Items.</p>
                <div className="mt-4">
                    <Button onClick={startNewCat} size="sm" className="flex gap-2"><Plus size={14}/> New Large Category</Button>
                </div>
            </div>

            {/* Editing Large Category Modal/Form */}
            {editingCatId && (
                <div className="bg-neutral-800 p-6 border border-gold">
                    <h4 className="text-white mb-4">{editingCatId === 'new' ? 'New Large Category' : 'Edit Category'}</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Name (EN)" value={catForm.name?.en} onChange={e => setCatForm({...catForm, name: {...catForm.name!, en: e.target.value}})} />
                        <Input label="Name (KO)" value={catForm.name?.ko} onChange={e => setCatForm({...catForm, name: {...catForm.name!, ko: e.target.value}})} />
                        <Input label="Order" type="number" value={catForm.order} onChange={e => setCatForm({...catForm, order: Number(e.target.value)})} />
                    </div>
                    <div className="flex gap-4 mt-4">
                        <Button onClick={saveCat} size="sm">Save</Button>
                        <Button onClick={() => setEditingCatId(null)} variant="outline" size="sm">Cancel</Button>
                    </div>
                </div>
            )}

            {/* List of Categories */}
            <div className="space-y-8">
                {state.categories.sort((a,b) => a.order - b.order).map(cat => (
                    <div key={cat.id} className="bg-neutral-900 border border-neutral-800 rounded overflow-hidden">
                        {/* Header */}
                        <div className="bg-neutral-800 p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <span className="bg-gold text-black text-xs font-bold px-2 py-1 rounded">{cat.order}</span>
                                <h4 className="text-lg text-white font-bold">{cat.name.en} / {cat.name.ko}</h4>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => editCat(cat)} className="text-blue-400 hover:text-white p-2"><Edit2 size={16}/></button>
                                <button onClick={() => deleteCategory(cat.id)} className="text-red-400 hover:text-white p-2"><Trash2 size={16}/></button>
                            </div>
                        </div>

                        {/* SubCategories Area */}
                        <div className="p-4 bg-black/20">
                            <div className="flex justify-between items-center mb-4">
                                <h5 className="text-xs uppercase text-gray-500 font-bold tracking-widest">Sub-Categories</h5>
                                <button onClick={() => startNewSub(cat.id)} className="text-gold text-xs flex items-center gap-1 hover:underline"><Plus size={12}/> Add Sub-Category</button>
                            </div>
                            
                            {/* Editing Sub Form (Inline) */}
                            {editingSubId && subForm.categoryId === cat.id && (
                                <div className="bg-neutral-800 p-4 mb-4 border-l-2 border-gold">
                                    <div className="grid grid-cols-3 gap-2">
                                        <Input label="Sub Name (EN)" value={subForm.name?.en} onChange={e => setSubForm({...subForm, name: {...subForm.name!, en: e.target.value}})} />
                                        <Input label="Sub Name (KO)" value={subForm.name?.ko} onChange={e => setSubForm({...subForm, name: {...subForm.name!, ko: e.target.value}})} />
                                        <Input label="Order" type="number" value={subForm.order} onChange={e => setSubForm({...subForm, order: Number(e.target.value)})} />
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <Button onClick={saveSub} size="sm" className="py-1">Save</Button>
                                        <Button onClick={() => setEditingSubId(null)} variant="outline" size="sm" className="py-1">Cancel</Button>
                                    </div>
                                </div>
                            )}

                            {/* Sub List */}
                            <div className="space-y-2">
                                {state.subCategories
                                    .filter(s => s.categoryId === cat.id)
                                    .sort((a,b) => a.order - b.order)
                                    .map(sub => (
                                    <div key={sub.id} className="flex justify-between items-center p-3 bg-neutral-900/50 border border-neutral-800/50 hover:bg-neutral-800 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-600 text-xs font-mono">{sub.order}</span>
                                            <span className="text-gray-300 text-sm">{sub.name.en} / {sub.name.ko}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => editSub(sub)} className="text-blue-400/70 hover:text-blue-400 p-1"><Edit2 size={14}/></button>
                                            <button onClick={() => deleteSubCategory(sub.id)} className="text-red-400/70 hover:text-red-400 p-1"><Trash2 size={14}/></button>
                                        </div>
                                    </div>
                                ))}
                                {state.subCategories.filter(s => s.categoryId === cat.id).length === 0 && (
                                    <p className="text-gray-600 text-xs italic">No sub-categories defined.</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
  }

  // 4. News Editor
  const NewsEditor = () => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formState, setFormState] = useState<Partial<NewsPost>>({});

    const startNew = () => {
      setEditingId('new');
      setFormState({
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        title: { en: '', ko: '' },
        content: { en: '', ko: '' },
        image: '' // Initialize image field
      });
    };

    const startEdit = (post: NewsPost) => {
      setEditingId(post.id);
      setFormState({ ...post });
    };

    const handleSave = () => {
      if (editingId === 'new') {
        addNews(formState as NewsPost);
      } else {
        updateNews(formState as NewsPost);
      }
      setEditingId(null);
    };

    return (
      <div className="space-y-8 animate-fade-in pb-12">
        <Button onClick={startNew} className="flex items-center gap-2"><Plus size={16}/> Post News</Button>

        {editingId && (
          <div className="bg-neutral-800 p-6 border border-gold mb-8">
            <h4 className="text-white mb-4">{editingId === 'new' ? 'New Post' : 'Edit Post'}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Title (EN)" value={formState.title?.en} onChange={e => setFormState({...formState, title: {...formState.title!, en: e.target.value}})} />
              <Input label="Title (KO)" value={formState.title?.ko} onChange={e => setFormState({...formState, title: {...formState.title!, ko: e.target.value}})} />
              <Input label="Date" type="date" value={formState.date} onChange={e => setFormState({...formState, date: e.target.value})} />
              <div />
              <div className="col-span-2">
                 <ImagePicker 
                    label="Post Image (Optional)" 
                    value={formState.image || ''} 
                    onChange={val => setFormState({...formState, image: val})} 
                 />
              </div>
              <div className="col-span-2">
                <TextArea label="Content (EN)" value={formState.content?.en} onChange={e => setFormState({...formState, content: {...formState.content!, en: e.target.value}})} rows={3} />
              </div>
              <div className="col-span-2">
                <TextArea label="Content (KO)" value={formState.content?.ko} onChange={e => setFormState({...formState, content: {...formState.content!, ko: e.target.value}})} rows={3} />
              </div>
            </div>
            <div className="flex gap-4 mt-4">
               <Button onClick={handleSave} size="sm">Save Post</Button>
               <Button onClick={() => setEditingId(null)} variant="outline" size="sm">Cancel</Button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {state.news.map(post => (
             <div key={post.id} className="bg-neutral-900/50 p-4 border border-neutral-800 flex justify-between items-center">
                <div className="flex items-center gap-4">
                   {post.image && (
                      <div className="w-16 h-12 bg-neutral-800 rounded overflow-hidden">
                         <img src={post.image} alt="Thumbnail" className="w-full h-full object-cover" />
                      </div>
                   )}
                   <div>
                      <p className="text-white font-medium">{post.title.en} <span className="text-gray-500 text-sm">/ {post.title.ko}</span></p>
                      <p className="text-xs text-gray-500">{post.date}</p>
                   </div>
                </div>
                <div className="flex gap-2">
                   <button onClick={() => startEdit(post)} className="p-2 text-blue-400 hover:bg-neutral-800 rounded"><Edit2 size={16}/></button>
                   <button onClick={() => deleteNews(post.id)} className="p-2 text-red-400 hover:bg-neutral-800 rounded"><Trash2 size={16}/></button>
                </div>
             </div>
           ))}
        </div>
      </div>
    );
  };

  // 5. Theme Editor
  const ThemeEditor = () => {
     return (
        <div className="bg-neutral-900 p-6 border border-neutral-800 animate-fade-in">
           <h3 className="text-white mb-6">Visual Theme</h3>
           <div className="space-y-4">
              <label className="block text-gray-400">Primary Accent Color</label>
              <div className="flex gap-4">
                 {['#D4AF37', '#C0C0C0', '#E53935', '#43A047', '#3949AB'].map(color => (
                    <button 
                       key={color}
                       onClick={() => updateTheme(color)}
                       className={`w-12 h-12 rounded-full border-2 ${state.theme.primaryColor === color ? 'border-white scale-110' : 'border-transparent'}`}
                       style={{ backgroundColor: color }}
                    />
                 ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Current: {state.theme.primaryColor}</p>
           </div>
        </div>
     )
  }

  // 6. Deployment Editor
  const DeploymentEditor = () => {
    const handleExport = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "hangeuleus_backup_" + new Date().toISOString().slice(0,10) + ".json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (confirm("Importing data will overwrite all current changes. Continue?")) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const parsed = JSON.parse(event.target?.result as string);
                    if (parsed.content && parsed.menu) {
                        localStorage.setItem('hangeuleus_state', JSON.stringify(parsed));
                        alert("Data imported successfully! The page will reload.");
                        window.location.reload();
                    } else {
                        alert("Invalid data file.");
                    }
                } catch (err) {
                    alert("Failed to parse JSON.");
                }
            };
            reader.readAsText(file);
        }
    };

    const handleCopyConfig = () => {
         // Create the string representation of the code file
         const stateJson = JSON.stringify(state, null, 2);
         
         const codeTemplate = `import { AppState, MenuItem, NewsPost, MenuCategory, MenuSubCategory } from './types';

// PASTE START: Generated from Admin (${new Date().toISOString()})
const CURRENT_STATE: AppState = ${stateJson};
// PASTE END

export const INITIAL_MENU: MenuItem[] = CURRENT_STATE.menu;
export const INITIAL_NEWS: NewsPost[] = CURRENT_STATE.news;
export const INITIAL_STATE: AppState = CURRENT_STATE;`;

         navigator.clipboard.writeText(codeTemplate).then(() => {
             alert("Full configuration code copied to clipboard! \n\nNow, update 'constants.ts' in your project code to publish these changes to the world.");
         });
    };

    const handleReset = () => {
        if (confirm("Are you sure? This will delete ALL local changes and revert to the original website data.")) {
            localStorage.removeItem('hangeuleus_state');
            window.location.reload();
        }
    }

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            
            <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 border-l-4 border-gold p-6 rounded shadow-lg">
                <h3 className="text-xl text-white font-bold mb-3">Why aren't my changes showing up on Mobile?</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  This website uses <strong>Client-Side Storage</strong> (Local Storage). Changes you make here are saved 
                  only in <em>this specific browser</em>. To update the public website for everyone (including your mobile phone), 
                  you must use <strong>Method 1</strong> below.
                </p>
            </div>

            {/* Method 1: Permanent */}
            <div className="bg-neutral-900 border border-gold/50 p-6 rounded relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Globe size={120} className="text-gold" />
                </div>
                <div className="relative z-10">
                    <h3 className="text-xl text-white mb-2 flex items-center gap-2">
                        <span className="bg-gold text-black text-xs font-bold px-2 py-1 rounded">METHOD 1</span>
                        <RefreshCw size={20} className="text-gold" /> 
                        <span>Publish to World (Permanent)</span>
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 max-w-2xl leading-relaxed">
                        Updates the actual source code of the website so all visitors see your changes.
                    </p>

                    <div className="bg-black/40 p-5 rounded border border-neutral-800">
                        <ol className="list-decimal list-inside text-sm text-gray-300 space-y-3 mb-6">
                            <li>Click the <strong className="text-white">Copy Code</strong> button below.</li>
                            <li>Send this code to your developer or open <code className="bg-neutral-800 px-1 py-0.5 rounded text-gold">constants.ts</code>.</li>
                            <li>Replace the entire content of that file with the copied code.</li>
                            <li>Deploy to GitHub.</li>
                        </ol>

                        <Button onClick={handleCopyConfig} size="sm" className="flex items-center gap-2 w-full md:w-auto justify-center bg-gold text-black hover:bg-white border-none font-bold">
                            <Copy size={16} /> Copy Configuration Code
                        </Button>
                    </div>
                </div>
            </div>

            {/* Method 2: Temporary Sync */}
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded relative">
                <h3 className="text-xl text-white mb-2 flex items-center gap-2">
                    <span className="bg-neutral-700 text-white text-xs font-bold px-2 py-1 rounded">METHOD 2</span>
                    <Smartphone size={20} /> 
                    <span>Sync to Mobile (Temporary)</span>
                </h3>
                <p className="text-gray-400 text-sm mb-6 max-w-2xl">
                    Manually transfer your settings to another device using a file. Good for testing before publishing.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-black/20 p-4 rounded border border-neutral-800">
                        <h4 className="text-white text-sm font-bold mb-2 flex items-center gap-2"><Download size={14}/> Step 1: Export</h4>
                        <Button onClick={handleExport} variant="outline" size="sm" className="w-full flex justify-center items-center gap-2 text-xs">
                            Download Backup (.json)
                        </Button>
                    </div>

                    <div className="bg-black/20 p-4 rounded border border-neutral-800">
                        <h4 className="text-white text-sm font-bold mb-2 flex items-center gap-2"><Upload size={14}/> Step 2: Import on Mobile</h4>
                        <label className="cursor-pointer bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 text-xs border border-neutral-600 transition-colors flex items-center justify-center gap-2 w-full uppercase tracking-wider font-medium">
                            <span>Select JSON File...</span>
                            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                        </label>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="border-t border-red-900/30 pt-8 mt-8">
                <h3 className="text-lg text-red-400 mb-4 flex items-center gap-2">
                    <AlertTriangle size={18} /> Danger Zone
                </h3>
                <div className="flex items-center justify-between bg-red-950/10 border border-red-900/30 p-4 rounded">
                    <div>
                        <p className="text-white font-medium">Factory Reset</p>
                        <p className="text-xs text-red-400/70 mt-1">Reverts all local changes to the original code defaults.</p>
                    </div>
                    <Button onClick={handleReset} variant="outline" size="sm" className="border-red-800 text-red-400 hover:bg-red-900/20">
                        <RotateCcw size={14} className="mr-2" /> Reset
                    </Button>
                </div>
            </div>
        </div>
    );
  };

  // --- Main Dashboard Layout ---
  const activeColor = state.theme.primaryColor;

  return (
    <div className="min-h-screen bg-neutral-950 pt-24 px-6 pb-12 text-gray-200">
      <div className="container mx-auto">
        
        {/* Warning Banner */}
        <div className="bg-yellow-900/20 border border-yellow-700/30 p-4 rounded mb-8 text-center animate-fade-in">
           <p className="text-yellow-200/80 text-sm flex flex-col md:flex-row items-center justify-center gap-2">
             <span className="flex items-center gap-2"><AlertTriangle size={16} /> You are editing in <strong>Local Mode</strong>.</span>
             <span className="hidden md:inline text-yellow-700">|</span>
             <span>Changes are only saved to this browser.</span>
             <button onClick={() => setActiveTab('deploy')} className="underline font-bold text-yellow-400 hover:text-white ml-2 flex items-center gap-1">
                Publish to update Mobile/Public <Rocket size={12} />
             </button>
           </p>
        </div>

        <div className="flex justify-between items-center mb-8">
           <div>
              <h1 className="text-3xl font-serif text-white">Dashboard</h1>
              <p className="text-gray-500 text-sm">Manage website content</p>
           </div>
           <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
              <LogOut size={16} /> Logout
           </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           {/* Sidebar */}
           <div className="lg:col-span-1 space-y-2">
              <button onClick={() => setActiveTab('content')} className={`w-full text-left p-4 flex items-center gap-3 transition-colors ${activeTab === 'content' ? 'bg-neutral-900 text-white border-l-2' : 'hover:bg-neutral-900/50 text-gray-400'}`} style={{ borderColor: activeTab === 'content' ? activeColor : 'transparent' }}>
                 <Layout size={18} /> Site Content
              </button>
              
              <button onClick={() => setActiveTab('categories')} className={`w-full text-left p-4 flex items-center gap-3 transition-colors ${activeTab === 'categories' ? 'bg-neutral-900 text-white border-l-2' : 'hover:bg-neutral-900/50 text-gray-400'}`} style={{ borderColor: activeTab === 'categories' ? activeColor : 'transparent' }}>
                 <Layers size={18} /> Categories
              </button>

              <button onClick={() => setActiveTab('menu')} className={`w-full text-left p-4 flex items-center gap-3 transition-colors ${activeTab === 'menu' ? 'bg-neutral-900 text-white border-l-2' : 'hover:bg-neutral-900/50 text-gray-400'}`} style={{ borderColor: activeTab === 'menu' ? activeColor : 'transparent' }}>
                 <Coffee size={18} /> Menu Items
              </button>

              <button onClick={() => setActiveTab('news')} className={`w-full text-left p-4 flex items-center gap-3 transition-colors ${activeTab === 'news' ? 'bg-neutral-900 text-white border-l-2' : 'hover:bg-neutral-900/50 text-gray-400'}`} style={{ borderColor: activeTab === 'news' ? activeColor : 'transparent' }}>
                 <FileText size={18} /> News Posts
              </button>
              
              <button onClick={() => setActiveTab('theme')} className={`w-full text-left p-4 flex items-center gap-3 transition-colors ${activeTab === 'theme' ? 'bg-neutral-900 text-white border-l-2' : 'hover:bg-neutral-900/50 text-gray-400'}`} style={{ borderColor: activeTab === 'theme' ? activeColor : 'transparent' }}>
                 <Settings size={18} /> Appearance
              </button>
              
              <button onClick={() => setActiveTab('deploy')} className={`w-full text-left p-4 flex items-center gap-3 transition-colors ${activeTab === 'deploy' ? 'bg-neutral-900 text-white border-l-2' : 'hover:bg-neutral-900/50 text-gray-400'}`} style={{ borderColor: activeTab === 'deploy' ? activeColor : 'transparent' }}>
                 <Rocket size={18} /> Publish / Sync
              </button>
           </div>

           {/* Content Area */}
           <div className="lg:col-span-3">
              {activeTab === 'content' && <ContentEditor />}
              {activeTab === 'categories' && <CategoryManager />}
              {activeTab === 'menu' && <MenuEditor />}
              {activeTab === 'news' && <NewsEditor />}
              {activeTab === 'theme' && <ThemeEditor />}
              {activeTab === 'deploy' && <DeploymentEditor />}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
