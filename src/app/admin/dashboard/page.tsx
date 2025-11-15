'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Package, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Search,
  Filter,
  BarChart3,
  Settings,
  LogOut,
  User,
  Shield
} from 'lucide-react';
// import { getSupabaseClient } from '@/lib/supabaseClient'; // Unused import
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  available: boolean;
  images?: string[];
  createdAt: string;
}

const mockProducts: Product[] = [];

function AdminDashboardContent() {
  const router = useRouter();
  const { user, isAdmin, signOut } = useAuth();
  // const client = getSupabaseClient(); // Unused variable
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showAdd, setShowAdd] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', category: 'Molhos', available: true, images: [''] });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editFileInputRef = useRef<HTMLInputElement | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [notice, setNotice] = useState<string>('');
  const [errorNotice, setErrorNotice] = useState<string>('');
  const [savingAdd, setSavingAdd] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/products');
      const json = await res.json();
      const list = (json.data || []).map((p: { id: string; name: string; description: string; category: string; available: boolean; images?: string[] }) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        category: p.category,
        images: p.images,
        available: p.available,
        createdAt: new Date().toISOString().slice(0, 10)
      }));
      setProducts(list);
    };
    load();
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.push('/admin/login');
  };

  const handleAddProduct = async () => {
    setErrorNotice('');
    setSavingAdd(true);
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    });
    if (res.ok) {
      const json = await res.json();
      const p = json.data;
      setProducts(prev => [
        ...prev,
        {
          id: p.id,
          name: p.name,
          description: p.description,
          category: p.category,
          images: p.images,
          available: p.available,
          createdAt: new Date().toISOString().slice(0, 10)
        }
      ]);
      setShowAdd(false);
      setNewProduct({ name: '', description: '', category: 'Molhos', available: true, images: [''] });
      setNotice('Produto cadastrado com sucesso');
    } else {
      const err = await res.json().catch(() => ({}));
      setErrorNotice(err?.error || 'Falha ao salvar produto');
    }
    setSavingAdd(false);
  };

  const uploadFiles = async (files: File[]) => {
    const form = new FormData();
    files.forEach(f => form.append('files', f));
    const res = await fetch('/api/upload', { method: 'POST', body: form });
    const json = await res.json();
    return Array.isArray(json.urls) ? json.urls : [];
  };

  const handleEditSave = async () => {
    if (!editProduct) return;
    setErrorNotice('');
    setSavingEdit(true);
    const res = await fetch(`/api/products?id=${editProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: editProduct.name,
        description: editProduct.description,
        category: editProduct.category,
        available: editProduct.available,
        images: editProduct.images
      })
    });
    if (res.ok) {
      const json = await res.json();
      const p = json.data;
      setProducts(prev => prev.map(item => item.id === p.id ? {
        id: p.id,
        name: p.name,
        description: p.description,
        category: p.category,
        images: p.images,
        available: p.available,
        createdAt: item.createdAt
      } : item));
      setShowEdit(false);
      setEditProduct(null);
      setNotice('Produto atualizado com sucesso');
    } else {
      const err = await res.json().catch(() => ({}));
      setErrorNotice(err?.error || 'Falha ao atualizar produto');
    }
    setSavingEdit(false);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Todos', 'Molhos', 'Conservas', 'Temperos', 'Azeites', 'Vinagres'];

  const stats = [
    {
      title: 'Total de Produtos',
      value: products.length,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Produtos Ativos',
      value: products.filter(p => p.available).length,
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    // Removed price stats for catalog-only mode
    {
      title: 'Categorias',
      value: new Set(products.map(p => p.category)).size,
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SN</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Admin Sol Nascente</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* User Info */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{user?.email}</span>
                {isAdmin && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    <Shield className="w-3 h-3" />
                    Admin
                  </span>
                )}
              </div>
              
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Add Product Button */}
            <button onClick={() => setShowAdd(true)} className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Adicionar Produto</span>
            </button>
          </div>
          {notice && (
            <div className="mt-4 text-sm text-green-700 bg-green-100 px-3 py-2 rounded">{notice}</div>
          )}
        </div>
        {showAdd && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white text-gray-900 rounded-lg shadow-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Novo Produto</h3>
              <div className="space-y-4">
                <input value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Nome" className="w-full px-3 py-2 border border-gray-300 rounded placeholder-gray-900" />
                <textarea value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="Descrição" className="w-full px-3 py-2 border border-gray-300 rounded placeholder-gray-900" />
                <input value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} placeholder="Categoria" className="w-full px-3 py-2 border border-gray-300 rounded placeholder-gray-900" />
                {/* Removed price field for catalog-only */}
                <div className="space-y-2">
                  {newProduct.images.map((img, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input value={img} onChange={(e) => {
                        const arr = [...newProduct.images];
                        arr[idx] = e.target.value;
                        setNewProduct({ ...newProduct, images: arr });
                      }} placeholder={`URL da imagem ${idx + 1}`} className="w-full px-3 py-2 border border-gray-300 rounded placeholder-gray-900" />
                      <button onClick={() => {
                        const arr = newProduct.images.filter((_, i) => i !== idx);
                        setNewProduct({ ...newProduct, images: arr.length ? arr : [''] });
                      }} className="px-3 py-2 border rounded">Remover</button>
                    </div>
                  ))}
                  {newProduct.images.length < 5 && (
                    <>
                      <button onClick={() => fileInputRef.current?.click()} className="px-3 py-2 border rounded">Adicionar Imagem</button>
                      <input ref={fileInputRef} type="file" multiple accept="image/jpeg,image/png,image/webp" className="hidden" onChange={async (e) => {
                        const inputEl = e.currentTarget as HTMLInputElement;
                        const files = Array.from(inputEl.files || []);
                        if (!files.length) return;
                        const urls = await uploadFiles(files.slice(0, 5 - newProduct.images.length));
                        setNewProduct({ ...newProduct, images: [...newProduct.images.filter(Boolean), ...urls].slice(0,5) });
                        inputEl.value = '';
                      }} />
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" checked={newProduct.available} onChange={(e) => setNewProduct({ ...newProduct, available: e.target.checked })} />
                  <span>Disponível</span>
                </div>
                <div className="flex justify-end space-x-2">
                  <button onClick={() => setShowAdd(false)} className="px-4 py-2 border rounded">Cancelar</button>
                  <button onClick={handleAddProduct} disabled={savingAdd} className={`px-4 py-2 rounded ${savingAdd ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white'}`}>{savingAdd ? 'Salvando...' : 'Salvar'}</button>
                </div>
                {errorNotice && (
                  <div className="text-sm text-red-700 bg-red-100 px-3 py-2 rounded">{errorNotice}</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  {/* Removed price column */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                          <Package className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {product.category}
                      </span>
                    </td>
                    {/* Removed price cell */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.available ? 'Disponível' : 'Indisponível'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => router.push(`/produtos/${product.id}`)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setShowEdit(true);
                            setEditProduct(product);
                          }}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={async () => {
                            const res = await fetch(`/api/products?id=${product.id}`, { method: 'DELETE' });
                            if (res.ok) {
                              setProducts(prev => prev.filter(p => p.id !== product.id));
                            }
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-500">
                Tente ajustar seus filtros ou adicione um novo produto.
              </p>
            </div>
          )}
        </div>
      </div>

      {showEdit && editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white text-gray-900 rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Editar Produto</h3>
            <div className="space-y-4">
              <input value={editProduct.name} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} placeholder="Nome" className="w-full px-3 py-2 border border-gray-300 rounded placeholder-gray-900" />
              <textarea value={editProduct.description} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} placeholder="Descrição" className="w-full px-3 py-2 border border-gray-300 rounded placeholder-gray-900" />
              <input value={editProduct.category} onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })} placeholder="Categoria" className="w-full px-3 py-2 border border-gray-300 rounded placeholder-gray-900" />
              <div className="space-y-2">
                {(editProduct.images || ['']).map((img, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input value={img} onChange={(e) => {
                      const arr = [...(editProduct.images || [])];
                      arr[idx] = e.target.value;
                      setEditProduct({ ...editProduct, images: arr });
                    }} placeholder={`URL da imagem ${idx + 1}`} className="w-full px-3 py-2 border border-gray-300 rounded placeholder-gray-900" />
                    <button onClick={() => {
                      const arr = (editProduct.images || []).filter((_, i) => i !== idx);
                      setEditProduct({ ...editProduct, images: arr.length ? arr : [''] });
                    }} className="px-3 py-2 border rounded">Remover</button>
                  </div>
                ))}
                {(editProduct.images || []).length < 5 && (
                  <>
                    <button onClick={() => editFileInputRef.current?.click()} className="px-3 py-2 border rounded">Adicionar Imagem</button>
                    <input ref={editFileInputRef} type="file" multiple accept="image/jpeg,image/png,image/webp" className="hidden" onChange={async (e) => {
                      const inputEl = e.currentTarget as HTMLInputElement;
                      const files = Array.from(inputEl.files || []);
                      if (!files.length || !editProduct) return;
                      const urls = await uploadFiles(files.slice(0, 5 - (editProduct.images?.length || 0)));
                      setEditProduct({ ...editProduct, images: [ ...(editProduct.images || []).filter(Boolean), ...urls ].slice(0,5) });
                      inputEl.value = '';
                    }} />
                  </>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" checked={editProduct.available} onChange={(e) => setEditProduct({ ...editProduct, available: e.target.checked })} />
                <span>Disponível</span>
              </div>
              <div className="flex justify-end space-x-2">
                <button onClick={() => { setShowEdit(false); setEditProduct(null); }} className="px-4 py-2 border rounded">Cancelar</button>
                <button onClick={handleEditSave} disabled={savingEdit} className={`px-4 py-2 rounded ${savingEdit ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white'}`}>{savingEdit ? 'Salvando...' : 'Salvar'}</button>
              </div>
              {errorNotice && (
                <div className="text-sm text-red-700 bg-red-100 px-3 py-2 rounded">{errorNotice}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}