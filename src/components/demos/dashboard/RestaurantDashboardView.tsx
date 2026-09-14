import React, { useState } from 'react';
import { useWorkflow } from '../../../context/WorkflowContext';
import { useDemo } from '../../../context/DemoContext';
import { StatCard } from '../../common/StatCard';
import { StatusBadge } from '../../common/StatusBadge';
import { UtensilsCrossed, ChefHat, CheckCircle2, Clock, Eye, Check } from 'lucide-react';

export const RestaurantDashboardView: React.FC = () => {
  const {
    restaurantOrders,
    restaurantTables,
    advanceRestaurantOrderStatus,
    toggleTableStatus
  } = useWorkflow();

  const { customization, setViewMode } = useDemo();
  const [activeTab, setActiveTab] = useState<'kitchen' | 'tables'>('kitchen');

  const occupiedTables = restaurantTables.filter((t) => t.status === 'Occupied').length;
  const liveKitchenOrders = restaurantOrders.filter((o) => o.status !== 'Completed').length;
  const totalSales = restaurantOrders.reduce((acc, o) => acc + o.totalAmount, 0);

  const stats = [
    { label: 'Active Tables', value: `${occupiedTables} / ${restaurantTables.length}`, change: 'Dining occupancy', isPositive: true },
    { label: 'Live Kitchen Orders', value: String(liveKitchenOrders), subtext: 'In preparation queue' },
    { label: "Today's Orders", value: String(restaurantOrders.length), subtext: 'Dine-in & takeaway' },
    { label: 'Avg Table Turnover', value: '38 mins', change: '-12m via QR menu', isPositive: true },
    { label: "Today's Gross Sales", value: `₹${totalSales.toLocaleString('en-IN')}`, change: 'Live sales total', isPositive: true }
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Banner */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 sm:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Kitchen Display & POS Billing
            </span>
            <span className="text-neutral-600">•</span>
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Live Order Queue
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {customization.businessName}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Real-time kitchen order tickets (KOT), active table layout, and instant cashier bills.
          </p>
        </div>

        <button
          onClick={() => setViewMode('customer')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-neutral-950 hover:bg-neutral-200 font-semibold text-xs sm:text-sm shadow-md transition"
        >
          <Eye className="w-4 h-4 text-amber-600" />
          <span>Place Order on Customer Side</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {stats.map((metric, idx) => (
          <StatCard key={idx} metric={metric} />
        ))}
      </div>

      {/* View Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 text-xs">
        <button
          onClick={() => setActiveTab('kitchen')}
          className={`px-3.5 py-1.5 rounded-lg font-semibold transition ${
            activeTab === 'kitchen'
              ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Kitchen Order Display ({restaurantOrders.length})
        </button>

        <button
          onClick={() => setActiveTab('tables')}
          className={`px-3.5 py-1.5 rounded-lg font-semibold transition ${
            activeTab === 'tables'
              ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Table Layout & Reservations ({restaurantTables.length} Tables)
        </button>
      </div>

      {/* TAB 1: KITCHEN ORDER TICKETS (KOT) */}
      {activeTab === 'kitchen' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white tracking-tight">
              Live Kitchen Tickets (KOT)
            </h3>
            <span className="text-xs text-neutral-400">
              Advance ticket: <strong>New → Preparing → Ready → Completed</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurantOrders.map((order) => (
              <div
                key={order.id}
                className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-extrabold text-amber-400">
                        {order.orderNumber}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                        {order.type} {order.tableNumber ? `(${order.tableNumber})` : ''}
                      </span>
                    </div>
                    <span className="text-[11px] text-neutral-400">{order.orderTime}</span>
                  </div>

                  <div className="py-2.5">
                    <div className="text-xs font-bold text-white mb-1">{order.customerName}</div>
                    <div className="space-y-1.5 text-xs text-neutral-300">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>
                            <strong className="text-amber-400">{it.quantity}×</strong> {it.name}
                          </span>
                          <span className="font-mono text-neutral-400">₹{it.price * it.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Status:</span>
                    <StatusBadge status={order.status} />
                  </div>

                  {/* Sequential Action Button */}
                  {order.status !== 'Completed' ? (
                    <button
                      onClick={() => advanceRestaurantOrderStatus(order.id)}
                      className="w-full py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                    >
                      <ChefHat className="w-4 h-4" />
                      <span>
                        {order.status === 'New' && 'Accept Order (Start Prep)'}
                        {order.status === 'Preparing' && 'Mark as Ready for Service'}
                        {order.status === 'Ready' && 'Mark as Completed / Billed'}
                      </span>
                    </button>
                  ) : (
                    <div className="w-full py-1.5 text-center text-xs text-emerald-400 font-semibold bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                      ✓ Order Billed & Closed
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: TABLE LAYOUT */}
      {activeTab === 'tables' && (
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Interactive Table Map</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Click any table to cycle its status between <strong>Available</strong>, <strong>Reserved</strong>, and <strong>Occupied</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {restaurantTables.map((table) => {
              const nextStatus =
                table.status === 'Available'
                  ? 'Reserved'
                  : table.status === 'Reserved'
                  ? 'Occupied'
                  : 'Available';

              return (
                <div
                  key={table.id}
                  onClick={() => toggleTableStatus(table.id, nextStatus, 'Walk-in Guests')}
                  className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between space-y-3 ${
                    table.status === 'Occupied'
                      ? 'bg-rose-950/40 border-rose-800/80 text-white shadow-sm'
                      : table.status === 'Reserved'
                      ? 'bg-amber-950/40 border-amber-800/80 text-white shadow-sm'
                      : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700 text-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{table.name}</span>
                    <span className="text-[10px] text-neutral-400">{table.capacity} Seats</span>
                  </div>

                  <div className="text-xs">
                    <StatusBadge status={table.status} />
                    {table.reservedFor && (
                      <div className="text-[11px] text-neutral-300 mt-1 truncate">
                        {table.reservedFor}
                      </div>
                    )}
                  </div>

                  <div className="text-[10px] text-neutral-400 text-right">
                    Tap to set {nextStatus}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
