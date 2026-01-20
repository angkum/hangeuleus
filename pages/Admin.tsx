import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Button, Input, TextArea } from '../components/UI';
import { MenuItem, NewsPost } from '../types';
import { Trash2, Plus, Edit2, Save, LogOut, Layout, Coffee, FileText, Settings, AlignLeft, Phone, Share2, BarChart, FileImage } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Admin: React.FC = () => {
  const { state, updateContent, updateTheme, addMenuItem, updateMenuItem, deleteMenuItem, addNews, updateNews, deleteNews } = useApp();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'menu' | 'news' | 'theme'>('content');
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
              placeholder="Enter password (1111)"
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
        image: heroImg
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
          <Input label="Background Image URL" value={heroImg} onChange={e => setHeroImg(e.target.value)} />
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

           <Input label="Image URL" value={aboutImg} onChange={e => setAboutImg(e.target.value)} />
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
           <Input label="Logo Image URL (Optional)" value={footerLogo} onChange={e => setFooterLogo(e.target.value)} placeholder="https://..." />
           <p className="text-xs text-gray-500 mb-4">If a logo URL is provided, it will be displayed on the far right of the footer.</p>
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
    const [formState, setFormState] = useState<Partial<MenuItem>>({});

    const startEdit = (item: MenuItem) => {
      setEditingId(item.id);
      setFormState({ ...item });
    };

    const startNew = () => {
      setEditingId('new');
      setFormState({
        id: Date.now().toString(),
        category: 'dishes',
        name: { en: '', ko: '' },
        description: { en: '', ko: '' },
        price: 0,
        image: 'https://picsum.photos/400',
        isPopular: false
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

    return (
      <div className="space-y-6 animate-fade-in pb-12">
        <Button onClick={startNew} className="flex items-center gap-2"><Plus size={16}/> Add New Item</Button>

        {editingId && (
          <div className="bg-neutral-800 p-6 border border-gold mb-8">
            <h4 className="text-white mb-4">{editingId === 'new' ? 'Create Item' : 'Edit Item'}</h4>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Name (EN)" value={formState.name?.en} onChange={e => setFormState({...formState, name: {...formState.name!, en: e.target.value}})} />
              <Input label="Name (KO)" value={formState.name?.ko} onChange={e => setFormState({...formState, name: {...formState.name!, ko: e.target.value}})} />
              <Input label="Desc (EN)" value={formState.description?.en} onChange={e => setFormState({...formState, description: {...formState.description!, en: e.target.value}})} />
              <Input label="Desc (KO)" value={formState.description?.ko} onChange={e => setFormState({...formState, description: {...formState.description!, ko: e.target.value}})} />
              <Input label="Price" type="number" value={formState.price} onChange={e => setFormState({...formState, price: Number(e.target.value)})} />
              <Input label="Image URL" value={formState.image} onChange={e => setFormState({...formState, image: e.target.value})} />
              <div className="col-span-2">
                 <label className="text-white flex items-center gap-2">
                    <input type="checkbox" checked={formState.isPopular} onChange={e => setFormState({...formState, isPopular: e.target.checked})} />
                    Is Popular Item?
                 </label>
              </div>
               <div className="col-span-2">
                 <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Category</label>
                 <select 
                    value={formState.category} 
                    onChange={e => setFormState({...formState, category: e.target.value as any})}
                    className="w-full bg-neutral-900 border border-neutral-700 text-white p-3"
                 >
                    <option value="noodles">Noodles</option>
                    <option value="rice">Rice</option>
                    <option value="dishes">Dishes</option>
                 </select>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
               <Button onClick={handleSave} size="sm">Save Item</Button>
               <Button onClick={() => setEditingId(null)} variant="outline" size="sm">Cancel</Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
           {state.menu.map(item => (
             <div key={item.id} className="bg-neutral-900 p-4 flex justify-between items-center border border-neutral-800">
                <div className="flex gap-4 items-center">
                   <img src={item.image} alt={item.name.en} className="w-12 h-12 object-cover rounded" />
                   <div>
                      <p className="text-white font-medium">{item.name.en} / {item.name.ko}</p>
                      <p className="text-xs text-gray-500 uppercase">{item.category} • RM {item.price}</p>
                   </div>
                </div>
                <div className="flex gap-2">
                   <button onClick={() => startEdit(item)} className="p-2 text-blue-400 hover:bg-neutral-800 rounded"><Edit2 size={16}/></button>
                   <button onClick={() => deleteMenuItem(item.id)} className="p-2 text-red-400 hover:bg-neutral-800 rounded"><Trash2 size={16}/></button>
                </div>
             </div>
           ))}
        </div>
      </div>
    );
  };

  // 3. News Editor
  const NewsEditor = () => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formState, setFormState] = useState<Partial<NewsPost>>({});

    const startNew = () => {
      setEditingId('new');
      setFormState({
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        title: { en: '', ko: '' },
        content: { en: '', ko: '' }
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
                <div>
                   <p className="text-white font-medium">{post.title.en} <span className="text-gray-500 text-sm">/ {post.title.ko}</span></p>
                   <p className="text-xs text-gray-500">{post.date}</p>
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

  // 4. Theme Editor
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

  // --- Main Dashboard Layout ---
  const activeColor = state.theme.primaryColor;

  return (
    <div className="min-h-screen bg-neutral-950 pt-24 px-6 pb-12 text-gray-200">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-12">
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
              <button onClick={() => setActiveTab('menu')} className={`w-full text-left p-4 flex items-center gap-3 transition-colors ${activeTab === 'menu' ? 'bg-neutral-900 text-white border-l-2' : 'hover:bg-neutral-900/50 text-gray-400'}`} style={{ borderColor: activeTab === 'menu' ? activeColor : 'transparent' }}>
                 <Coffee size={18} /> Menu Items
              </button>
              <button onClick={() => setActiveTab('news')} className={`w-full text-left p-4 flex items-center gap-3 transition-colors ${activeTab === 'news' ? 'bg-neutral-900 text-white border-l-2' : 'hover:bg-neutral-900/50 text-gray-400'}`} style={{ borderColor: activeTab === 'news' ? activeColor : 'transparent' }}>
                 <FileText size={18} /> News Posts
              </button>
              <button onClick={() => setActiveTab('theme')} className={`w-full text-left p-4 flex items-center gap-3 transition-colors ${activeTab === 'theme' ? 'bg-neutral-900 text-white border-l-2' : 'hover:bg-neutral-900/50 text-gray-400'}`} style={{ borderColor: activeTab === 'theme' ? activeColor : 'transparent' }}>
                 <Settings size={18} /> Appearance
              </button>
           </div>

           {/* Content Area */}
           <div className="lg:col-span-3">
              {activeTab === 'content' && <ContentEditor />}
              {activeTab === 'menu' && <MenuEditor />}
              {activeTab === 'news' && <NewsEditor />}
              {activeTab === 'theme' && <ThemeEditor />}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;