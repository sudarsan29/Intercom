import React, { useState, useRef } from "react";

const refundGuideText = `We understand that sometimes a purchase may not meet your expectations, and you may need to request a refund. This guide outlines the simple steps to help you navigate the refund process and ensure a smooth resolution to your concern.`;

const returnQRCodeText = `Once your return is approved, a QR code will be sent to you. You can take this QR code to your local post office to ship the item back at no extra cost.`;

const fullFinMessage = `
We understand that sometimes a purchase may not meet your expectations, and you may need to request a refund. 
This guide outlines the simple steps to help you navigate the refund process and ensure a smooth resolution to your concern.

To assist you with our refund request, could you please provide me your order ID and proof of purchase?

Please Note:
We only refund orders placed within the last 60 days, and your items must meet our requirements for the condition to be returned. Please check when you placed your order before proceeding.

Once I check these details, if everything looks OK, I will send a return QR Code which you can use to post the item back to us. Your refund will be automatically issued once you put it in the post.
`;

const TooltipBadge = ({ count, title, author, timeAgo, text, fullText, onAddToCompose, setActiveMobileView }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const insideBadge = useRef(false);
  const insideTooltip = useRef(false);

  const checkHide = () => {
    if (!insideBadge.current && !insideTooltip.current) {
      setShowTooltip(false);
    }
  };

  // NEW: Wrap the addToCompose click handler to also switch mobile view
  const handleAddToComposeClick = (e) => {
    e.stopPropagation();
    onAddToCompose(fullText);
    if (setActiveMobileView) {
      setActiveMobileView("chat"); // Switch to chat panel on small devices
    }
  };

  return (
    <div className="relative inline-block mx-1">
      <div
        className="w-4 h-4 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-bold cursor-pointer"
        onMouseEnter={() => {
          insideBadge.current = true;
          setShowTooltip(true);
        }}
        onMouseLeave={() => {
          insideBadge.current = false;
          setTimeout(checkHide, 100);
        }}
      >
        {count}
      </div>

      {showTooltip && (
        <div
          className="absolute z-50 w-72 top-full left-1/2 -translate-x-1/2 mt-2 p-4 rounded-xl shadow-lg border bg-white"
          onMouseEnter={() => {
            insideTooltip.current = true;
            setShowTooltip(true);
          }}
          onMouseLeave={() => {
            insideTooltip.current = false;
            setTimeout(checkHide, 100);
          }}
        >
          <div className="text-sm font-semibold mb-1">{title}</div>
          <div className="text-xs text-gray-500 mb-2">
            <span className="bg-yellow-100 text-yellow-800 text-[10px] px-1.5 py-0.5 rounded mr-1">
              Public article
            </span>
            <span className="text-[10px]">
              {author} · {timeAgo}
            </span>
          </div>
          <p className="text-xs text-gray-700 mb-3">{text}</p>
          <div className="flex justify-center">
            <button
              className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
              onClick={handleAddToComposeClick} // updated here
            >
              ➕ Add to composer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const UserDetailsPanel = ({ onAddToCompose, setActiveMobileView }) => {
  const [activeTab, setActiveTab] = useState("copilot");
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);

  // Generates AI response card with JSX based on input text
  const generateFinResponse = (text) => {
    if (text.toLowerCase().includes("refund")) {
      return {
        text: (
          <div className="text-xs text-gray-600 mt-1 space-y-2">
            <div>
              We understand that sometimes a purchase may not meet your expectations...
              <TooltipBadge
                count="1"
                title="Getting a refund"
                author="Amy Adams"
                timeAgo="1d ago"
                text={refundGuideText}
                fullText={fullFinMessage}
                onAddToCompose={onAddToCompose}
                setActiveMobileView={setActiveMobileView} // pass down here
              />
            </div>
            <div>
              To assist you with our refund request, could you please provide me your order ID and proof of purchase.
            </div>
            <div>Please Note:</div>
            <div>
              We only refund orders placed within the last 60 days...
            </div>
            <div>
              Once I check these details, if everything looks OK, I will send a return QR Code...
              <TooltipBadge
                count="2"
                title="Return QR Code"
                author="John Doe"
                timeAgo="2d ago"
                text={returnQRCodeText}
                fullText={returnQRCodeText}
                onAddToCompose={onAddToCompose}
                setActiveMobileView={setActiveMobileView} // pass down here too
              />
            </div>
          </div>
        ),
      };
    }

    // default fallback response
    return {
      text: (
        <div className="text-xs text-gray-600 mt-1 space-y-4">
          <div>
            Our standard refund policy does not allow for refunds after 60 days of purchase date.{" "}
            <TooltipBadge
              count="1"
              title="Refund Policy"
              author="Support Team"
              timeAgo="Just now"
              text="Our standard refund policy does not allow for refunds after 60 days of purchase date."
              fullText="Our standard refund policy does not allow for refunds after 60 days of purchase date."
              onAddToCompose={onAddToCompose}
              setActiveMobileView={setActiveMobileView} // pass down
            />
          </div>

          <div>
            However in certain situations where orders were placed over 60 days. We recognise the need for flexibility. Refund request for orders placed over 60 days ago will need to be evaluated by our{" "}
            <span className="underline">senior returns teams</span>.
            <TooltipBadge
              count="2"
              title="Senior Returns Team Evaluation"
              author="Support Team"
              timeAgo="Just now"
              text="Refund requests over 60 days require senior returns team evaluation."
              fullText="Refund request for orders placed over 60 days ago will need to be evaluated by our senior returns teams."
              onAddToCompose={onAddToCompose}
              setActiveMobileView={setActiveMobileView} // pass down
            />
          </div>

          <div className="mt-3">
            <button
              onClick={() => {
                onAddToCompose(
                  `Our standard refund policy does not allow for refunds after 60 days of purchase date.\n\nHowever in certain situations where orders were placed over 60 days. Refund requests over 60 days require evaluation by our senior returns teams.`
                );
                if (setActiveMobileView) {
                  setActiveMobileView("chat"); // switch to chat panel on mobile
                }
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition relative group"
            >
              ➕ Add to composer
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block w-72 text-xs bg-yellow-200 text-black rounded-lg p-3 shadow-md z-50">
                <div className="font-bold">These answer uses content from an internal article</div>
                <div>Please make sure you can send this to the customer.</div>
              </div>
            </button>
          </div>
        </div>
      ),
    };
  };

  // handle sending message: add user message + generate AI reply
  const handleSend = () => {
    if (!inputText.trim()) return; // no empty sends
    // Add user message
    const newUserMessage = { sender: "user", text: inputText.trim() };
    // Generate AI reply
    const aiResponse = generateFinResponse(inputText.trim());

    const newAIMessage = { sender: "fin", text: aiResponse.text };

    setMessages((prev) => [...prev, newUserMessage, newAIMessage]);
    setInputText("");
  };

  return (
    <div className="w-full sm:w-[360px] border-r flex flex-col h-full bg-[radial-gradient(circle_at_bottom_left,_#fef9c3,_#ede9fe)]">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("copilot")}
          className={`flex-1 px-4 py-2 text-sm font-medium ${activeTab === "copilot" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
            }`}
        >
          AI Copilot
        </button>
        <button
          onClick={() => setActiveTab("details")}
          className={`flex-1 px-4 py-2 text-sm font-medium ${activeTab === "details" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
            }`}
        >
          Details
        </button>
      </div>

      {/* Chat or details */}
      <div className="flex-1 flex flex-col p-6 text-sm text-gray-600 overflow-auto relative">
        {activeTab === "copilot" && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center flex-grow h-full">
            <div className="text-lg font-medium mb-2">Hi, I’m Fin AI Copilot</div>
            <p className="mb-6">Ask me anything about this conversation.</p>
            <div
              className="bg-gray-100 text-gray-700 rounded-lg px-3 py-2 mb-4 inline-block cursor-pointer hover:bg-gray-200"
              onClick={() => {
                setInputText("How do I get a refund?");
                setTimeout(handleSend, 50);
              }}
            >
              💡 How do I get a refund?
            </div>
          </div>
        )}

        {activeTab === "copilot" && messages.length > 0 && (
          <div className="space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className="flex items-start">
                {msg.sender === "user" ? (
                  <>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-white">
                      😊
                    </div>
                    <div className="ml-3 text-left">
                      <div className="text-sm font-semibold text-gray-800">You</div>
                      <div className="text-sm text-gray-600">{msg.text}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-5 h-5 bg-black flex flex-col items-center justify-center rounded-md mt-1">
                      <div className="w-3 h-0.5 bg-white my-[1px]" />
                      <div className="w-3 h-0.5 bg-white my-[1px]" />
                      <div className="w-3 h-0.5 bg-white my-[1px]" />
                    </div>
                    <div className="ml-3 text-left">
                      <div className="text-sm font-semibold text-gray-800">Fin</div>
                      {/* Card with radial background */}
                      <div className="mt-1 p-4 rounded-2xl shadow-md bg-[radial-gradient(circle_at_bottom_left,_#fef9c3,_#ede9fe)]">
                        {msg.text}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "details" && (
          <div className="text-sm text-gray-700 p-4 space-y-4">

            {/* Assignee */}
            <div>
              <h3 className="font-semibold text-gray-800">Assignee</h3>
              <p className="text-gray-600">Brian Byrne</p>
            </div>
            <hr className="border-t border-gray-300" />

            {/* Team */}
            <div>
              <h3 className="font-semibold text-gray-800">Team</h3>
              <p className="text-gray-600">Unassigned</p>
            </div>
            <hr className="border-t border-gray-300" />

            {/* Links (Dropdown) */}
            <details className="cursor-pointer">
              <summary className="font-semibold text-gray-800">Links</summary>
              <div className="list-disc list-inside text-blue-600 ml-4 mt-2">
                <a href="#">Tracker ticket</a>
                <a href="#">Back-office tickets</a>
                <a href="#">Side conversations</a>
              </div>
            </details>
            <hr className="border-t border-gray-300" />

            {/* User Data */}
            <details className="cursor-pointer">
              <summary className="font-semibold text-gray-800">User Data</summary>
              <div className="ml-4 text-gray-600 mt-2">
                Name: Nikola Tesla<br />
                Email: nikola@example.com<br />
                Joined: Jan 1, 2025
              </div>
            </details>
            <hr className="border-t border-gray-300" />

            {/* Conversation Attributes */}
            <details className="cursor-pointer">
              <summary className="font-semibold text-gray-800">Conversation Attributes</summary>
              <div className="ml-4 text-gray-600 mt-2">
                Channel: Chat<br />
                Status: Open<br />
                Priority: Normal
              </div>
            </details>
            <hr className="border-t border-gray-300" />

            {/* Company Details */}
            <details className="cursor-pointer">
              <summary className="font-semibold text-gray-800">Company Details</summary>
              <div className="ml-4 text-gray-600 mt-2">
                Company: Intercom-AI.<br />
                Location: New York, USA<br />
                Industry: AI
              </div>
            </details>
            <hr className="border-t border-gray-300" />

            {/* Salesforce */}
            <details className="cursor-pointer">
              <summary className="font-semibold text-gray-800">Salesforce</summary>
              <div className="ml-4 text-gray-600 mt-2">
                No linked record found.
              </div>
            </details>
            <hr className="border-t border-gray-300" />

            {/* Stripe */}
            <details className="cursor-pointer">
              <summary className="font-semibold text-gray-800">Stripe</summary>
              <div className="ml-4 text-gray-600 mt-2">
                No payment info available.
              </div>
            </details>
            <hr className="border-t border-gray-300" />

            {/* JIRA */}
            <details className="cursor-pointer">
              <summary className="font-semibold text-gray-800">JIRA for Tickets</summary>
              <div className="ml-4 text-gray-600 mt-2">
                No active issues.
              </div>
            </details>

          </div>
        )}

      </div>

      {activeTab === "copilot" && (
        <div className="p-4  flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPanel;
