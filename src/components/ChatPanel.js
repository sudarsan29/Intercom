import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

const ChatPanel = forwardRef(({ conversation }, ref) => {
  const [messages, setMessages] = useState(conversation.messages || []);
  const [newMessage, setNewMessage] = useState("");
  const [panelFlash, setPanelFlash] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    setPanelFlash(true);

    const adminMessage = {
      sender: "admin",
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, adminMessage]);
    setNewMessage("");

    setTimeout(() => {
      const autoReply = {
        sender: "leo",
        text: "I placed an order 60 days ago. Could you make an exception please?",
        time: "1 min ago",
      };
      setMessages((prev) => [...prev, autoReply]);
    }, 500);

    setTimeout(() => setPanelFlash(false), 600);
  };

  useImperativeHandle(ref, () => ({
    addToCompose: (text) => {
      setNewMessage((prev) => `${prev} ${text}`.trim());
      inputRef.current?.focus();
    },
  }));

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setMessages(conversation.messages || []);
  }, [conversation]);

  return (
    <div
      className={`w-full sm:w-[calc(100%-40px)] h-full flex flex-col transition-all duration-300 ${
        panelFlash ? "animate-fade-flash" : ""
      } bg-gradient-to-br from-purple-100 via-blue-200 to-orange-300`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-300 font-semibold text-gray-800 shadow-sm">
        {conversation.name}
        <div className="text-xs text-gray-500 mt-1">Company: {conversation.company || "Tesla"}</div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xs p-3 rounded-lg shadow text-sm flex items-start gap-2 animate-slide-up-fade ${
              msg.sender === "admin"
                ? "ml-auto bg-purple-600 text-white"
                : "bg-white border"
            }`}
          >
            {msg.sender === "leo" && (
              <div className="min-w-6 min-h-6 w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                L
              </div>
            )}
            <div className="flex-1">
              {msg.text}
              <div className="text-[10px] mt-1 opacity-70 text-right">{msg.time}</div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>


      {/* Input field */}
      <div className="p-3 border-t border-gray-200 flex items-center gap-2 ">
        <input
          ref={inputRef}
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={sendMessage}
          className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
});

export default ChatPanel;
