import React, { useState } from 'react';
import { Image, Plus, Trash2, Eye, ExternalLink, X, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SliderImage } from '../../types';

export const SliderImagesView: React.FC = () => {
  const { sliders, addSlider, deleteSlider, toggleSlider } = useApp();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) return;

    addSlider({
      title,
      imageUrl,
      targetUrl,
      displayOrder,
      isActive: true
    });

    setIsAddOpen(false);
    setTitle('');
    setImageUrl('');
    setTargetUrl('');
    setDisplayOrder(sliders.length + 1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Slider & Promotional Banners
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage carousel hero banners shown on player mobile apps and web homepage.
          </p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
          Add Slider Banner
        </button>
      </div>

      {/* Grid of Sliders */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {sliders.map(item => (
          <div
            key={item.id}
            className="flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              {/* Banner Image Preview */}
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden dark:bg-slate-800">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-3 top-3 rounded-md bg-black/60 px-2 py-0.5 font-mono text-[10px] font-bold text-white backdrop-blur-xs">
                  Order: #{item.displayOrder}
                </span>
                <span
                  className={`absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    item.isActive
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-600 text-slate-200'
                  }`}
                >
                  {item.isActive ? 'Active' : 'Hidden'}
                </span>
              </div>

              <div className="p-4">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white line-clamp-1">
                  {item.title}
                </h3>
                {item.targetUrl && (
                  <div className="mt-1 flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 font-mono">
                    <ExternalLink className="h-3 w-3" />
                    {item.targetUrl}
                  </div>
                )}
                <div className="mt-2 text-[10px] text-slate-400">
                  Uploaded: {item.createdAt}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 p-3 dark:border-slate-800">
              <button
                onClick={() => toggleSlider(item.id)}
                className="text-xs font-bold text-slate-700 hover:text-amber-600 dark:text-slate-300"
              >
                {item.isActive ? 'Disable Banner' : 'Enable Banner'}
              </button>

              <button
                onClick={() => deleteSlider(item.id)}
                className="flex h-7 w-7 items-center justify-center rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-400"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD SLIDER MODAL */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Add Slider Banner
              </h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Banner Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Weekend Special Deposit 10% Bonus"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Target Route / URL
                </label>
                <input
                  type="text"
                  placeholder="e.g. /promotions/weekend"
                  value={targetUrl}
                  onChange={e => setTargetUrl(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Display Order Priority
                </label>
                <input
                  type="number"
                  min={1}
                  value={displayOrder}
                  onChange={e => setDisplayOrder(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-amber-500 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-amber-600"
                >
                  Publish Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
