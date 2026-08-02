import { useState } from 'react'
import { Plus, Edit2, Trash2, X, Tag } from 'lucide-react'
import DashboardLayout from '../layout/DashboardLayout'
const initialPromos = [
  { id: 1, title: 'Summer Mega Sale', code: 'SUMMER30', discount: 30, type: '%', start: '2026-07-01', end: '2026-07-31', status: 'Active', used: 284, limit: 500 },
  { id: 2, title: 'New Customer Welcome', code: 'WELCOME15', discount: 15, type: '%', start: '2026-01-01', end: '2026-12-31', status: 'Active', used: 1042, limit: 0 },
  { id: 3, title: 'Free Shipping Weekend', code: 'FREESHIP', discount: 0, type: 'Free Shipping', start: '2026-07-19', end: '2026-07-21', status: 'Active', used: 67, limit: 200 },
  { id: 4, title: 'Back to School Discount', code: 'SCHOOL20', discount: 20, type: '%', start: '2026-08-01', end: '2026-08-31', status: 'Scheduled', used: 0, limit: 300 },
  { id: 5, title: 'Flash Sale Friday', code: 'FLASH50', discount: 50, type: '%', start: '2026-06-20', end: '2026-06-20', status: 'Expired', used: 198, limit: 200 },
  { id: 6, title: 'VIP Member Rewards', code: 'VIP25', discount: 25, type: '%', start: '2026-05-01', end: '2026-04-30', status: 'Expired', used: 340, limit: 400 },
]

const statusStyles = {
  Active: 'bg-emerald-100 text-emerald-700',
  Scheduled: 'bg-blue-100 text-blue-700',
  Expired: 'bg-slate-100 text-slate-600',
}

const emptyPromo = {
  id: 0,
  title: '',
  code: '',
  discount: 0,
  type: '%',
  start: '',
  end: '',
  status: 'Active',
  used: 0,
  limit: 0,
}

export default function Promotions() {
  const [promos, setPromos] = useState(initialPromos)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)

  function openAdd() {
    setEditing({ ...emptyPromo, id: Date.now() })
    setShowModal(true)
  }

  function openEdit(promo) {
    setEditing({ ...promo })
    setShowModal(true)
  }

  function save() {
    if (!editing) return
    setPromos((prev) =>
      prev.some((p) => p.id === editing.id)
        ? prev.map((p) => (p.id === editing.id ? editing : p))
        : [...prev, editing]
    )
    setShowModal(false)
  }

  function del(id) {
    setPromos((prev) => prev.filter((p) => p.id !== id))
  }

  const isNew = editing && !promos.some((p) => p.id === editing.id)

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Promotions & Coupons</h1>
            <p className="text-sm text-slate-500 mt-1">
            {promos.filter((p) => p.status === 'Active').length} active promotions
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <Plus size={16} /> New Promotion
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Active Coupons', value: promos.filter((p) => p.status === 'Active').length, color: 'text-emerald-600' },
          { label: 'Total Uses', value: promos.reduce((a, p) => a + p.used, 0).toLocaleString(), color: 'text-blue-600' },
          { label: 'Scheduled', value: promos.filter((p) => p.status === 'Scheduled').length, color: 'text-purple-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-1 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-xs text-slate-500 uppercase tracking-wider">
                <th className="px-5 py-3.5 font-semibold">Promotion</th>
                <th className="px-5 py-3.5 font-semibold">Code</th>
                <th className="px-5 py-3.5 font-semibold">Discount</th>
                <th className="px-5 py-3.5 font-semibold">Start Date</th>
                <th className="px-5 py-3.5 font-semibold">End Date</th>
                <th className="px-5 py-3.5 font-semibold">Usage</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {promos.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-slate-900">{p.title}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-md text-slate-700">
                      <Tag size={12} />
                      {p.code}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-bold text-emerald-600 whitespace-nowrap">
                    {p.type === '%' ? `${p.discount}%` : p.type}
                  </td>
                  <td className="px-5 py-4 text-slate-500 text-xs whitespace-nowrap">{p.start}</td>
                  <td className="px-5 py-4 text-slate-500 text-xs whitespace-nowrap">{p.end}</td>
                  <td className="px-5 py-4 whitespace-nowrap min-w-[130px]">
                    <div className="text-xs">
                      <span className="font-bold text-slate-800">{p.used}</span>
                      {p.limit > 0 && <span className="text-slate-400"> / {p.limit}</span>}
                    </div>
                    {p.limit > 0 && (
                      <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${Math.min(100, (p.used / p.limit) * 100)}%` }}
                        />
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[p.status] || 'bg-slate-100 text-slate-600'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => del(p.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 border border-red-100 bg-red-50/50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && editing && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">
                {isNew ? 'New Promotion' : 'Edit Promotion'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Promotion Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  placeholder="e.g. Summer Sale"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    value={editing.code}
                    onChange={(e) => setEditing({ ...editing, code: e.target.value.toUpperCase() })}
                    placeholder="SUMMER30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Discount %
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    value={editing.discount}
                    onChange={(e) => setEditing({ ...editing, discount: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    value={editing.start}
                    onChange={(e) => setEditing({ ...editing, start: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    value={editing.end}
                    onChange={(e) => setEditing({ ...editing, end: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Limit (0 = Unlimited)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    value={editing.limit}
                    onChange={(e) => setEditing({ ...editing, limit: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Status
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                    value={editing.status}
                    onChange={(e) => setEditing({ ...editing, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={save}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700"
              >
                Save Promotion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </DashboardLayout>
  )
}