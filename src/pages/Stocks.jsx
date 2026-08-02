import { useState, useMemo } from 'react'
import {
  Search,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Package,
  Layers,
  ArrowUpRight,
} from 'lucide-react'
import DashboardLayout from '../layout/DashboardLayout'
const initialInventory = [
  { sku: 'NK-AM270-10', name: 'Nike Air Max 270 (Size 10)', category: 'Footwear', qty: 84, reorderPoint: 20, status: 'OK' },
  { sku: 'SN-WH1000-BLK', name: 'Sony WH-1000XM5 Black', category: 'Electronics', qty: 23, reorderPoint: 10, status: 'OK' },
  { sku: 'LV-511-32W', name: 'Levi\'s 511 Slim (32W x 32L)', category: 'Apparel', qty: 156, reorderPoint: 30, status: 'OK' },
  { sku: 'AP-APP2-WHT', name: 'Apple AirPods Pro 2nd Gen', category: 'Electronics', qty: 7, reorderPoint: 15, status: 'Low Stock' },
  { sku: 'AD-UB22-10-BLK', name: 'Adidas Ultraboost 22 (Size 10)', category: 'Footwear', qty: 3, reorderPoint: 10, status: 'Critical' },
  { sku: 'CN-R6M2', name: 'Canon EOS R6 Mark II', category: 'Electronics', qty: 1, reorderPoint: 5, status: 'Critical' },
  { sku: 'DY-V15-DET', name: 'Dyson V15 Detect', category: 'Home Appliances', qty: 18, reorderPoint: 8, status: 'OK' },
  { sku: 'AP-MBP14-1TB', name: 'MacBook Pro 14" 1TB', category: 'Electronics', qty: 0, reorderPoint: 5, status: 'Out of Stock' },
  { sku: 'PT-FL-NVY-M', name: 'Patagonia Fleece Jacket (Navy M)', category: 'Apparel', qty: 4, reorderPoint: 10, status: 'Critical' },
  { sku: 'SG-65Q80', name: 'Samsung 65" QLED TV', category: 'Electronics', qty: 12, reorderPoint: 5, status: 'OK' },
]

const categoryStats = [
  { name: 'Footwear', count: 87, max: 160 },
  { name: 'Electronics', count: 54, max: 160 },
  { name: 'Apparel', count: 160, max: 160 },
  { name: 'Home Appliances', count: 18, max: 160 },
]

export default function StockManagement() {
  const [items, setItems] = useState(initialInventory)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.sku.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase())

      if (filter === 'All') return matchesSearch
      if (filter === 'OK') return matchesSearch && item.status === 'OK'
      if (filter === 'Critical') return matchesSearch && item.status === 'Critical'
      if (filter === 'Low') return matchesSearch && item.status === 'Low Stock'
      if (filter === 'Out') return matchesSearch && item.status === 'Out of Stock'
      return matchesSearch
    })
  }, [items, search, filter])

  const handleRestock = (sku) => {
    setItems((prev) =>
      prev.map((item) =>
        item.sku === sku
          ? { ...item, qty: item.reorderPoint + 20, status: 'OK' }
          : item
      )
    )
  }

  return (
    <DashboardLayout>
    <div className="p-6 max-w-[1400px] mx-auto space-y-6 text-slate-800">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Stock Management
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Inventory overview and real-time stock alerts
        </p>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total SKUs */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{items.length}</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">Total SKUs</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
            #
          </div>
        </div>

        {/* In Stock */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-extrabold text-slate-900">
              {items.filter((i) => i.status === 'OK').length}
            </p>
            <p className="text-xs font-semibold text-slate-500 mt-1">In Stock</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
            #
          </div>
        </div>

        {/* Low / Critical */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-extrabold text-slate-900">
              {items.filter((i) => i.status === 'Low Stock' || i.status === 'Critical').length}
            </p>
            <p className="text-xs font-semibold text-slate-500 mt-1">Low / Critical</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
            #
          </div>
        </div>

        {/* Out of Stock */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-extrabold text-slate-900">
              {items.filter((i) => i.status === 'Out of Stock').length}
            </p>
            <p className="text-xs font-semibold text-slate-500 mt-1">Out of Stock</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm">
            #
          </div>
        </div>
      </div>

      {/* Main Grid: Inventory Table (Left) + Category Breakdown (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Inventory List (8 Columns) */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
          
          {/* Search & Status Filter Controls */}
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50">
            <div className="relative w-full sm:w-72">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search SKU or product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              {['All', 'OK', 'Critical', 'Low', 'Out'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    filter === t
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200/60 bg-white border border-slate-200/80 sm:border-transparent'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Clean Table with explicit spacing */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-4 py-3.5">SKU</th>
                  <th className="px-4 py-3.5">Product</th>
                  <th className="px-4 py-3.5 text-center">Qty</th>
                  <th className="px-4 py-3.5 text-center">Reorder Point</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredItems.map((item) => (
                  <tr key={item.sku} className="hover:bg-slate-50/60 transition-colors">
                    {/* SKU */}
                    <td className="px-4 py-3.5 font-mono font-semibold text-slate-600 whitespace-nowrap">
                      {item.sku}
                    </td>

                    {/* Product Name */}
                    <td className="px-4 py-3.5 font-bold text-slate-900 min-w-[180px]">
                      {item.name}
                    </td>

                    {/* Qty */}
                    <td className="px-4 py-3.5 text-center whitespace-nowrap">
                      <span
                        className={`font-extrabold text-sm ${
                          item.qty === 0
                            ? 'text-rose-600'
                            : item.qty <= item.reorderPoint
                            ? 'text-amber-600'
                            : 'text-slate-900'
                        }`}
                      >
                        {item.qty}
                      </span>
                    </td>

                    {/* Reorder Point */}
                    <td className="px-4 py-3.5 text-center font-medium text-slate-500 whitespace-nowrap">
                      {item.reorderPoint}
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {item.status === 'OK' && (
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                          OK
                        </span>
                      )}
                      {item.status === 'Low Stock' && (
                        <span className="inline-flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                          <AlertTriangle size={11} /> Low Stock
                        </span>
                      )}
                      {item.status === 'Critical' && (
                        <span className="inline-flex items-center gap-1 font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60">
                          <AlertTriangle size={11} /> Critical
                        </span>
                      )}
                      {item.status === 'Out of Stock' && (
                        <span className="inline-flex items-center gap-1 font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                          <XCircle size={11} /> Out of Stock
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      {item.qty <= item.reorderPoint ? (
                        <button
                          onClick={() => handleRestock(item.sku)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <RotateCcw size={12} /> Restock
                        </button>
                      ) : (
                        <span className="text-slate-300 text-[11px]">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Stock by Category Bar Chart (4 Columns) */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-900">Stock by Category</h3>
            <p className="text-xs text-slate-500 mt-0.5">Total units per category</p>
          </div>

          <div className="space-y-4">
            {categoryStats.map((cat) => {
              const pct = Math.min(100, Math.round((cat.count / cat.max) * 100))
              return (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-600">{cat.name}</span>
                    <span className="font-bold text-slate-900">{cat.count} units</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Scale Axis Legend */}
          <div className="pt-3 border-t border-slate-100 flex justify-between text-[10px] text-slate-400 font-mono">
            <span>0</span>
            <span>40</span>
            <span>80</span>
            <span>120</span>
            <span>160</span>
          </div>
        </div>

      </div>
    </div>
    </DashboardLayout>
  )
}