import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Search, 
  PlusCircle, 
  Tag, 
  Clock, 
  Sparkles, 
  Edit3, 
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { KnowledgeArticle } from '../../types';

export const HotelKnowledgeView: React.FC = () => {
  const { knowledge, addKnowledgeArticle, deleteKnowledgeArticle } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<KnowledgeArticle['category']>('Policies');
  const [content, setContent] = useState('');
  const [keywords, setKeywords] = useState('');

  const categories: (KnowledgeArticle['category'] | 'All')[] = [
    'All',
    'Hotel Information',
    'Rooms',
    'Dining',
    'Parking',
    'Pool',
    'Gym',
    'Wi-Fi',
    'Check-in / Checkout',
    'Nearby Attractions',
    'Policies',
    'Events',
    'Transportation'
  ];

  const filteredKnowledge = knowledge.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateKnowledge = (e: React.FormEvent) => {
    e.preventDefault();
    addKnowledgeArticle({
      category,
      title,
      content,
      tags: keywords.split(',').map(k => k.trim()).filter(Boolean),
      verifiedBy: 'AI Operations'
    });
    setIsNewModalOpen(false);
    setTitle('');
    setContent('');
    setKeywords('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Hotel AI Knowledge Base</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Grounding repository used by Receptionist AI and Sales AI to answer guest and client queries accurately.
          </p>
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Knowledge Document</span>
        </button>
      </div>

      {/* Search & Category Tabs */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search hotel policies, pool timings, breakfast hours, spa pricing..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-purple-500 font-medium"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Knowledge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredKnowledge.length === 0 ? (
          <div className="col-span-2 py-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
            <BookOpen className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold text-slate-700">No knowledge items match your search</p>
          </div>
        ) : (
          filteredKnowledge.map(item => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs transition-all space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-mono">ID: {item.id}</span>
                    <button 
                      onClick={() => deleteKnowledgeArticle(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed whitespace-pre-line">
                  {item.content}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((kw, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded">
                      #{kw}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Updated: {item.lastUpdated}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Knowledge Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <h3 className="text-sm font-bold text-slate-900">Add Hotel Knowledge Document</h3>
              </div>
              <button onClick={() => setIsNewModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleCreateKnowledge} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Document Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Infinity Rooftop Pool Timings & Regulations"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold"
                >
                  <option value="Hotel Information">Hotel Information</option>
                  <option value="Rooms">Rooms</option>
                  <option value="Dining">Dining</option>
                  <option value="Parking">Parking</option>
                  <option value="Pool">Pool</option>
                  <option value="Gym">Gym</option>
                  <option value="Wi-Fi">Wi-Fi</option>
                  <option value="Check-in / Checkout">Check-in / Checkout</option>
                  <option value="Nearby Attractions">Nearby Attractions</option>
                  <option value="Policies">Policies</option>
                  <option value="Events">Events</option>
                  <option value="Transportation">Transportation</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Content / Policy Description</label>
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  rows={4}
                  placeholder="Provide precise details, timings, rules, or pricing used by AI when answering guests..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Tags (Comma Separated)</label>
                <input
                  type="text"
                  value={keywords}
                  onChange={e => setKeywords(e.target.value)}
                  placeholder="pool, swimming, timings, towels, roof"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold shadow-xs"
                >
                  Save & Index Knowledge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
