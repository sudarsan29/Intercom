import React, { useState, useRef } from "react";
import Sidebar from "./components/Sidebar";
import ChatPanel from "./components/ChatPanel";
import UserDetailsPanel from "./components/UserDetailsPanel";
import { dummyConversations } from "./components/Conversation";

function App() {
  const [selectedId, setSelectedId] = useState(dummyConversations[0]?.id || null);
  const [activeMobileView, setActiveMobileView] = useState("chat");
  const [showDropdown, setShowDropdown] = useState(false);
  const [panelFlash, setPanelFlash] = useState(false);
  const selectedConversation = dummyConversations.find((c) => c.id === selectedId);

  const chatPanelRef = useRef();


  const handleAddToCompose = (text) => {
    if (chatPanelRef.current && chatPanelRef.current.addToCompose) {
      chatPanelRef.current.addToCompose(text);
    }
  };

  return (
    <div className={`min-h-screen p-4 ${
        panelFlash ? "animate-fade-flash" : ""
      } bg-gradient-to-br from-orange-300 via-red-200 to-orange-300` }>
      <div className="flex flex-col sm:flex-row h-[95vh] rounded-2xl overflow-hidden shadow-xl bg-white relative">

        {/* Sidebar */}
        <Sidebar
          onSelectConversation={(id) => {
            setSelectedId(id);
            setActiveMobileView((prev) => (prev === "copilot" ? "copilot" : "chat"));
          }}
          setActiveMobileView={setActiveMobileView}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
        />

        {/* Main content */}
        <div className="flex-1 relative flex overflow-hidden">
          {/* Mobile view */}
          <div className="flex-1 block sm:hidden overflow-hidden">
            {activeMobileView === "chat" && selectedConversation && (
              <ChatPanel ref={chatPanelRef} conversation={selectedConversation} />
            )}
            {activeMobileView === "copilot" && selectedConversation && (
              <UserDetailsPanel
                conversation={selectedConversation}
                onAddToCompose={handleAddToCompose}
                setActiveMobileView={setActiveMobileView}
              />
            )}
          </div>

          {/* Desktop view */}
          <div className="hidden sm:flex flex-1 overflow-hidden">
            <div
              className="flex-1 overflow-y-auto relative"
              style={{ marginLeft: '-20px', paddingLeft: '20px' }}
            >
              {selectedConversation && (
                <ChatPanel ref={chatPanelRef} conversation={selectedConversation} />
              )}
            </div>
            <div
              className="w-[320px] border-r bg-[radial-gradient(circle_at_bottom_left,_#fef9c3,_#ede9fe)] relative z-10"
              style={{ transform: 'translateX(-40px)' }}
            >
              {selectedConversation && (
                <UserDetailsPanel
                  conversation={selectedConversation}
                  onAddToCompose={handleAddToCompose} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;