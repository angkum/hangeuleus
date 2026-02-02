
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Button, Input, TextArea, SectionTitle } from '../components/UI';
import { MenuItem, NewsPost, MenuCategory, MenuSubCategory } from '../types';
import { 
  Trash2, Plus, Edit2, LogOut, Layout, Coffee, FileText, 
  Settings, AlignLeft, Phone, Share2, BarChart, FileImage, Upload,
  Download, Database, Copy, AlertTriangle, RefreshCw, RotateCcw, Code,
  Rocket, Smartphone, Globe, Layers, ArrowUp, ArrowDown, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

// Separated EditForm component to prevent re-mounting on parent re-render
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

  // Synchronize local form state if initialForm changes externally (e.g. switching between items)
  useEffect(() => {
    setForm(initialForm);
  }, [initialForm.id]);

  return (
    <div className="bg-neutral-800 p-6 border-2 border-gold mb-8 mt-2 shadow-2xl animate-fade-in relative">
      <button 
        onClick={onCancel}
        className="absolute top-4 right-4 text-gray-500 hover:text-white"
      >
        <X size={20} />
      </button>
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
        
        <div className="col-span-2 flex gap-8 py-2">
           <label className="text-white flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 accent-gold" checked={form.isPopular} onChange={e => setForm({...form, isPopular: e.target.checked})} />
              <span className="group-hover:text-gold transition-colors">Mark as Popular Item</span>
           </label>
           <label className="text-red-400 flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 accent-red-600" checked={form.isSoldOut} onChange={e => setForm({...form, isSoldOut: e.target.checked})} />
              <span className="group-hover:text-red-300 transition-colors uppercase font-bold">Sold Out (품절)</span>
           </label>
        </div>
        
        <div className="col-span-2">
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
    state, updateContent, updateTheme, addMenuItem, updateMenuItem, deleteMenuItem,
    addCategory, updateCategory, deleteCategory, addSubCategory, updateSubCategory, deleteSubCategory,
    addNews, updateNews, deleteNews 
  } = useApp();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'menu' | 'categories' | 'news' | 'theme' | 'deploy'>('content');
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
        <div className="bg-neutral-900 p-8 md:p-12 w-full max-w-md border border-neutral-800">
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

  // --- Tabs Implementation ---

  const ContentEditor = () => {
    const [hero, setHero] = useState(state.content.hero);
    const [about, setAbout] = useState(state.content.about);

    return (
      <div className="space-y-8 animate-fade-in pb-12">
        <div className="bg-neutral-900 p-6 rounded border border-neutral-800">
          <h3 className="text-xl text-white mb-4 flex items-center gap-2 font-serif"><Layout size={20} /> Hero Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Input label="Title (EN)" value={hero.title.en} onChange={e => setHero({...hero, title: {...hero.title, en: e.target.value}})} />
             <Input label="Title (KO)" value={hero.title.ko} onChange={e => setHero({...hero, title: {...hero.title, ko: e.target.value}})} />
          </div>
          <ImagePicker label="Hero Image" value={hero.image} onChange={val => setHero({...hero, image: val})} />
          <Button onClick={() => { updateContent('hero', hero); alert('Hero Saved!'); }}>Save Hero</Button>
        </div>
        
        <div className="bg-neutral-900 p-6 rounded border border-neutral-800">
          <h3 className="text-xl text-white mb-4 flex items-center gap-2 font-serif"><AlignLeft size={20} /> About Section</h3>
          <TextArea label="Story (EN)" rows={6} value={about.details?.en || about.description.en} onChange={e => setAbout({...about, details: {...(about.details || about.description), en: e.target.value}})} />
          <TextArea label="Story (KO)" rows={6} value={about.details?.ko || about.description.ko} onChange={e => setAbout({...about, details: {...(about.details || about.description), ko: e.target.value}})} />
          <Button onClick={() => { updateContent('about', about); alert('About Saved!'); }}>Save About</Button>
        </div>
      </div>
    );
  };

  const CategoryManager = () => {
    const [editingCat, setEditingCat] = useState<Partial<MenuCategory> | null>(null);

    return (
      <div className="space-y-8 animate-fade-in pb-12">
        <div className="bg-neutral-900 p-6 border border-neutral-800 rounded">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl text-white font-serif">Main Categories</h3>
            <Button size="sm" onClick={() => setEditingCat({ id: `c_${Date.now()}`, name: {en:'', ko:''}, order: state.categories.length + 1 })}>Add Category</Button>
          </div>
          {editingCat && (
            <div className="bg-neutral-800 p-4 mb-6 border border-gold">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Input label="Name (EN)" value={editingCat.name?.en} onChange={e => setEditingCat({...editingCat, name: {...editingCat.name!, en: e.target.value}})} />
                <Input label="Name (KO)" value={editingCat.name?.ko} onChange={e => setEditingCat({...editingCat, name: {...editingCat.name!, ko: e.target.value}})} />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => { editingCat.id?.startsWith('c_') ? addCategory(editingCat as MenuCategory) : updateCategory(editingCat as MenuCategory); setEditingCat(null); }}>Save</Button>
                <Button size="sm" variant="outline" onClick={() => setEditingCat(null)}>Cancel</Button>
              </div>
            </div>
          )}
          <div className="space-y-2">
            {state.categories.sort((a,b) => a.order - b.order).map(cat => (
              <div key={cat.id} className="bg-black/20 p-3 flex justify-between items-center border border-neutral-800">
                <span className="text-white font-medium">{cat.name.ko} / {cat.name.en}</span>
                <div className="flex gap-2">
                  <button onClick={() => setEditingCat(cat)} className="p-2 text-blue-400 hover:bg-neutral-800 rounded"><Edit2 size={14}/></button>
                  <button onClick={() => deleteCategory(cat.id)} className="p-2 text-red-400 hover:bg-neutral-800 rounded"><Trash2 size={14}/></button>
                </div>
              </div>
            ))}
          </div>
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
        isSoldOut: false, 
        image: '' 
      });
      setEditingId('new');
    };

    const handleSave = (formData: MenuItem) => {
      if (editingId === 'new') {
        addMenuItem(formData);
      } else {
        updateMenuItem(formData);
      }
      setEditingId(null);
    };

    const handleMove = (item: MenuItem, direction: 'up' | 'down', siblingItems: MenuItem[]) => {
      const currentIndex = siblingItems.findIndex(i => i.id === item.id);
      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

      if (targetIndex < 0 || targetIndex >= siblingItems.length) return;

      const targetItem = siblingItems[targetIndex];
      
      const tempOrder = item.order ?? 0;
      updateMenuItem({ ...item, order: targetItem.order ?? 0 });
      updateMenuItem({ ...targetItem, order: tempOrder });
    };

    return (
      <div className="space-y-12 animate-fade-in pb-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl text-white font-serif">Menu Items Management</h3>
          <Button onClick={startNew} className="flex items-center gap-2">
            <Plus size={18} /> Add New Item
          </Button>
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
          {state.categories.sort((a,b) => a.order - b.order).map(cat => (
            <div key={cat.id} className="space-y-6">
              <div className="flex items-center gap-4">
                 <h4 className="text-xl font-bold text-gold uppercase tracking-widest whitespace-nowrap">{cat.name.ko} / {cat.name.en}</h4>
                 <div className="h-px bg-neutral-800 w-full"></div>
              </div>

              <div className="space-y-10 pl-4 border-l border-neutral-900">
                {state.subCategories
                  .filter(sub => sub.categoryId === cat.id)
                  .sort((a,b) => a.order - b.order)
                  .map(sub => {
                    const subItems = state.menu
                      .filter(item => item.subCategoryId === sub.id)
                      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

                    return (
                      <div key={sub.id} className="space-y-4">
                        <h5 className="text-sm font-bold text-gray-500 uppercase tracking-widest">{sub.name.ko} / {sub.name.en}</h5>
                        
                        <div className="grid gap-3">
                          {subItems.length === 0 ? (
                            <p className="text-xs text-gray-700 italic">No items in this subcategory.</p>
                          ) : (
                            subItems.map((item, idx) => (
                              <React.Fragment key={item.id}>
                                <div className={`bg-neutral-900/60 p-4 flex justify-between items-center border transition-all rounded ${editingId === item.id ? 'border-gold bg-gold/5' : 'border-neutral-800 hover:border-neutral-600'}`}>
                                  <div className="flex items-center gap-6">
                                    <div className="relative w-16 h-16 shrink-0 rounded overflow-hidden">
                                      <img src={item.image} className={`w-full h-full object-cover ${item.isSoldOut ? 'grayscale blur-[1px]' : ''}`} />
                                      {item.isPopular && <div className="absolute top-0 right-0 bg-gold text-black text-[8px] px-1 font-bold">BEST</div>}
                                      {item.isSoldOut && <div className="absolute inset-0 bg-red-600/30 flex items-center justify-center font-black text-[10px] text-white">SOLD</div>}
                                    </div>
                                    <div>
                                       <p className={`font-bold text-lg ${item.isSoldOut ? 'text-gray-500' : 'text-white'}`}>{item.name.ko}</p>
                                       <p className="text-xs text-gray-500 font-mono">RM {item.price} {!!(item.originalPrice && item.originalPrice > item.price) ? `(Disc. from ${item.originalPrice})` : ''}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="flex flex-col gap-1 mr-2">
                                      <button 
                                        disabled={idx === 0}
                                        onClick={() => handleMove(item, 'up', subItems)}
                                        className={`p-1.5 rounded transition-colors ${idx === 0 ? 'text-gray-700 cursor-not-allowed' : 'text-gray-400 hover:text-white hover:bg-neutral-800'}`}
                                      >
                                        <ArrowUp size={14} />
                                      </button>
                                      <button 
                                        disabled={idx === subItems.length - 1}
                                        onClick={() => handleMove(item, 'down', subItems)}
                                        className={`p-1.5 rounded transition-colors ${idx === subItems.length - 1 ? 'text-gray-700 cursor-not-allowed' : 'text-gray-400 hover:text-white hover:bg-neutral-800'}`}
                                      >
                                        <ArrowDown size={14} />
                                      </button>
                                    </div>

                                    <button 
                                      onClick={() => startEdit(item)} 
                                      className={`p-3 rounded transition-colors ${editingId === item.id ? 'bg-gold text-black' : 'text-blue-400 hover:bg-neutral-800'}`}
                                      title="Edit"
                                    >
                                      <Edit2 size={18}/>
                                    </button>
                                    <button 
                                      onClick={() => { if(window.confirm('Delete this item?')) deleteMenuItem(item.id); }} 
                                      className="p-3 text-red-400 hover:bg-neutral-800 rounded transition-colors"
                                      title="Delete"
                                    >
                                      <Trash2 size={18}/>
                                    </button>
                                  </div>
                                </div>
                                {editingId === item.id && (
                                  <MenuEditForm 
                                    editingId={item.id} 
                                    initialForm={form} 
                                    categories={state.categories} 
                                    subCategories={state.subCategories} 
                                    onSave={handleSave} 
                                    onCancel={() => setEditingId(null)} 
                                  />
                                )}
                              </React.Fragment>
                            ))
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
          <h3 className="text-xl text-white font-serif">News Posts</h3>
          <Button size="sm" onClick={() => setEditing({ id: Date.now().toString(), title: {en:'', ko:''}, content: {en:'', ko:''}, date: new Date().toISOString().split('T')[0] })}>Create Post</Button>
        </div>
        {editing && (
          <div className="bg-neutral-800 p-6 border border-gold mb-8">
            <Input label="Title (KO)" value={editing.title?.ko} onChange={e => setEditing({...editing, title: {...editing.title!, ko: e.target.value}})} />
            <TextArea label="Content (KO)" rows={5} value={editing.content?.ko} onChange={e => setEditing({...editing, content: {...editing.content!, ko: e.target.value}})} />
            <ImagePicker label="Image" value={editing.image || ''} onChange={val => setEditing({...editing, image: val})} />
            <div className="flex gap-2">
              <Button size="sm" onClick={() => { editing.id?.length ? (state.news.find(n=>n.id===editing.id) ? updateNews(editing as NewsPost) : addNews(editing as NewsPost)) : null; setEditing(null); }}>Save</Button>
              <Button size="sm" variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            </div>
          </div>
        )}
        <div className="grid gap-4">
          {state.news.map(post => (
            <div key={post.id} className="bg-neutral-900 p-4 border border-neutral-800 flex justify-between items-center rounded">
              <div className="flex items-center gap-4">
                {post.image && <img src={post.image} className="w-12 h-12 object-cover" />}
                <span className="text-white font-medium">{post.title.ko}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing(post)} className="p-2 text-blue-400 hover:bg-neutral-800 rounded"><Edit2 size={16}/></button>
                <button onClick={() => deleteNews(post.id)} className="p-2 text-red-400 hover:bg-neutral-800 rounded"><Trash2 size={16}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ThemeEditor = () => (
    <div className="bg-neutral-900 p-8 border border-neutral-800 rounded animate-fade-in">
      <h3 className="text-white text-xl font-serif mb-6">Brand Identity</h3>
      <div className="space-y-4">
        <label className="block text-gray-400 text-sm uppercase tracking-widest">Primary Accent Color</label>
        <div className="flex gap-6">
          {['#D4AF37', '#E53935', '#3949AB', '#43A047', '#C0C0C0'].map(c => (
            <button key={c} onClick={() => updateTheme(c)} className={`w-14 h-14 rounded-full transition-transform hover:scale-110 shadow-xl ${state.theme.primaryColor === c ? 'ring-4 ring-white ring-offset-4 ring-offset-black' : ''}`} style={{backgroundColor: c}} />
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4 uppercase">Current Color: <span className="text-gold font-mono">{state.theme.primaryColor}</span></p>
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
          <h3 className="text-2xl text-white font-bold mb-4 font-serif">Ready to Publish?</h3>
          <p className="text-gray-300 text-sm mb-8 leading-relaxed max-w-2xl">
            Currently, your changes are only saved in this browser (Local Storage). To make these updates visible to everyone (including mobile visitors), you must update the source code.
          </p>
          <div className="bg-black/50 p-6 rounded border border-white/5 space-y-6">
            <h4 className="text-gold font-bold uppercase tracking-[0.2em] flex items-center gap-2"><RefreshCw size={18} /> Method: Permanent Update</h4>
            <ul className="text-sm text-gray-400 list-decimal list-inside space-y-3">
              <li>Click the button below to copy the site configuration.</li>
              <li>Open <code className="text-gold font-mono">constants.ts</code> in your project.</li>
              <li>Replace the entire content with the copied code.</li>
              <li>Deploy to your web host (GitHub, etc).</li>
            </ul>
            <Button onClick={handleCopyConfig} className="flex items-center gap-3 bg-gold text-black border-none font-bold py-4 px-8 shadow-lg hover:bg-white transition-colors">
              <Copy size={20} /> Copy Configuration Code
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <SectionTitle title="Dashboard" subtitle="Management" centered={false} />
          <Button onClick={handleLogout} variant="outline" size="sm" className="flex items-center gap-2 border-white/20 text-white hover:bg-red-600 hover:border-red-600">
            <LogOut size={16} /> Logout
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-12 border-b border-neutral-800 pb-4 overflow-x-auto scrollbar-hide">
          {[
            { id: 'content', label: 'Content', icon: <Layout size={14} /> },
            { id: 'menu', label: 'Menu', icon: <Coffee size={14} /> },
            { id: 'categories', label: 'Categories', icon: <Layers size={14} /> },
            { id: 'news', label: 'News', icon: <FileText size={14} /> },
            { id: 'theme', label: 'Theme', icon: <Settings size={14} /> },
            { id: 'deploy', label: 'Deploy', icon: <Rocket size={14} /> },
          ].map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id as any)} 
              className={`px-8 py-4 text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 border-b-2 whitespace-nowrap ${
                activeTab === tab.id ? 'text-gold border-gold font-bold bg-white/5' : 'text-gray-500 border-transparent hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
        
        <div className="min-h-[500px]">
          {activeTab === 'content' && <ContentEditor />}
          {activeTab === 'menu' && <MenuEditor />}
          {activeTab === 'categories' && <CategoryManager />}
          {activeTab === 'news' && <NewsEditor />}
          {activeTab === 'theme' && <ThemeEditor />}
          {activeTab === 'deploy' && <DeploymentEditor />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
