import React, { useState } from "react";
import { dummyConversations } from "./Conversation";
import { Menu } from "lucide-react";

const Sidebar = ({
  onSelectConversation,
  setActiveMobileView,
  showDropdown,
  setShowDropdown,
}) => {
  const [openDropdown, setOpenDropdown] = useState(true);

  const openCount = dummyConversations.length;

  return (
    <div className="w-full sm:w-64 md:w-72 lg:w-80 bg- border-r border-gray-20white0 p-4 sm:p-5 flex flex-col relative">
      <div className="flex justify-between items-center mb-6">
        <div className="font-bold text-xl text-gray-800">Intercom Clone</div>

        {/* Mobile menu button */}
        <div className="sm:hidden relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-purple-600 text-white p-2 rounded-md shadow"
          >
            <Menu className="w-5 h-5" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow z-50 text-sm w-36">
              <button
                onClick={() => {
                  setActiveMobileView("chat");
                  setShowDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Chat
              </button>
              <button
                onClick={() => {
                  setActiveMobileView("copilot");
                  setShowDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                AI Copilot
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Open Dropdown */}
      <div>
        <button
          onClick={() => setOpenDropdown(!openDropdown)}
          className="w-full flex justify-between items-center p-2 hover:bg-purple-50 rounded cursor-pointer"
        >
          <span className="font-semibold text-gray-900">
            Open ({openCount})
          </span>
          <svg
            className={`w-5 h-5 text-gray-500 transform transition-transform ${
              openDropdown ? "rotate-90" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {openDropdown && (
          <ul className="mt-2 flex flex-col gap-1 max-h-[280px] overflow-y-auto pr-1">
            {dummyConversations.map((conv) => (
              <li
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className="p-2 rounded-lg hover:bg-purple-100 cursor-pointer flex justify-between items-center transition-all"
              >
                <div className="flex-1 mr-2">
                  <div className="font-medium text-sm text-gray-900 truncate">
                    {conv.name}
                  </div>
                  <div className="text-xs text-gray-600 truncate">
                    {conv.message}
                  </div>
                </div>
                <div
                  className={`text-xs text-nowrap ${
                    conv.unread
                      ? "text-purple-700 font-bold"
                      : "text-gray-400"
                  }`}
                >
                  {conv.time}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
