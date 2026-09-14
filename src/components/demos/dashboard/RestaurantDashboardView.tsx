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
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
              Kitchen Display & POS
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs font-medium text-emerald-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Live Order Queue
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {customization.businessName}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Real-time kitchen order tickets (KOT), active table layout, and instant cashier bills.
          </p>
        </div>

        <button
          onClick={() => setViewMode('customer')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
        >
          <Eye className="w-4 h-4" />
          <span>Place Order on Customer Side</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((metric, idx) => (
          <StatCard key={idx} metric={metric} />
        ))}
      </div>

      {/* View Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('kitchen')}
          className={`px-3 py-1.5 rounded-md font-medium transition ${
            activeTab === 'kitchen'
              ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Kitchen Order Display ({restaurantOrders.length})
        </button>

        <button
          onClick={() => setActiveTab('tables')}
          className={`px-3 py-1.5 rounded-md font-medium transition ${
            activeTab === 'tables'
              ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Table Layout & Reservations ({restaurantTables.length} Tables)
        </button>
      </div>

      {/* TAB 1: KITCHEN ORDER TICKETS (KOT) */}
      {activeTab === 'kitchen' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">
              Live Kitchen Tickets (KOT)
            </h3>
            <span className="text-xs text-gray-500">
              Advance ticket: <strong>New → Preparing → Ready → Completed</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {restaurantOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col justify-between space-y-3 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-bold text-amber-700">
                        {order.orderNumber}
                      </span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200">
                        {order.type} {order.tableNumber ? `(${order.tableNumber})` : ''}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500">{order.orderTime}</span>
                  </div>

                  <div className="py-2">
                    <div className="text-xs font-semibold text-gray-900 mb-1">{order.customerName}</div>
                    <div className="space-y-1 text-xs text-gray-700">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>
                            <strong className="text-amber-700 font-semibold">{it.quantity}×</strong> {it.name}
                          </span>
                          <span className="font-mono text-gray-500">₹{it.price * it.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-gray-100 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Status:</span>
                    <StatusBadge status={order.status} />
                  </div>

                  {/* Sequential Action Button */}
                  {order.status !== 'Completed' ? (
                    <button
                      onClick={() => advanceRestaurantOrderStatus(order.id)}
                      className="w-full py-1.5 px-3 rounded-md bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs shadow-sm transition flex items-center justify-center gap-1.5"
                    >
                      <ChefHat className="w-3.5 h-3.5" />
                      <span>
                        {order.status === 'New' && 'Accept Order (Start Prep)'}
                        {order.status === 'Preparing' && 'Mark as Ready for Service'}
                        {order.status === 'Ready' && 'Mark as Completed / Billed'}
                      </span>
                    </button>
                  ) : (
                    <div className="w-full py-1 text-center text-xs text-emerald-700 font-medium bg-emerald-50 rounded border border-emerald-200">
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
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Interactive Table Map</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Click any table to cycle status between <strong>Available</strong>, <strong>Reserved</strong>, and <strong>Occupied</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
                  className={`p-3.5 rounded-lg border cursor-pointer transition flex flex-col justify-between space-y-2.5 ${
                    table.status === 'Occupied'
                      ? 'bg-rose-50 border-rose-200 text-gray-900'
                      : table.status === 'Reserved'
                      ? 'bg-amber-50 border-amber-200 text-gray-900'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-gray-900">{table.name}</span>
                    <span className="text-[10px] text-gray-500">{table.capacity} Seats</span>
                  </div>

                  <div className="text-xs">
                    <StatusBadge status={table.status} />
                    {table.reservedFor && (
                      <div className="text-[11px] text-gray-600 mt-1 truncate">
                        {table.reservedFor}
                      </div>
                    )}
                  </div>

                  <div className="text-[10px] text-gray-400 text-right">
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
