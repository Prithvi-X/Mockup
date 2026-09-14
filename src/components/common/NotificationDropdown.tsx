import React, { useState, useRef, useEffect } from 'react';
import { useWorkflow } from '../../context/WorkflowContext';
import { Bell, CheckCheck } from 'lucide-react';

export const NotificationDropdown: React.FC = () => {
  const { notifications, markAllNotificationsRead } = useWorkflow();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-md text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 transition"
        aria-label="Notifications"
        title="Live System Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-100">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.2 rounded font-medium border border-indigo-200/60">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-[11px] text-gray-500 hover:text-gray-900 flex items-center gap-1 transition font-medium"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-gray-400">
                No notifications yet.
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3 text-xs transition ${
                    notif.read ? 'bg-white text-gray-500' : 'bg-blue-50/30 text-gray-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-gray-900">{notif.title}</span>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap">{notif.time}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">{notif.detail}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
