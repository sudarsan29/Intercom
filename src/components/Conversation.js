export const dummyConversations = [
  {
    id: 1,
    name: "Alice Smith",
    time: "10:30 AM",
    unread: false,
    messages: [
      { sender: "user", text: "Hi, I need help with my order.", time: "10:25 AM" },
      { sender: "admin", text: "Sure, what seems to be the issue?", time: "10:28 AM" },
    ],
  },
  {
    id: 2,
    name: "John Doe",
    time: "11:00 AM",
    unread: true,
    messages: [
      { sender: "user", text: "When will my package arrive?", time: "10:55 AM" },
      { sender: "admin", text: "It should arrive by tomorrow.", time: "10:57 AM" },
    ],
  },
  {
    id: 3,
    name: "Bob Johnson",
    time: "12:15 PM",
    unread: true,
    messages: [
      { sender: "user", text: "Can you check my account status?", time: "12:10 PM" },
      { sender: "admin", text: "Sure, I’m checking now.", time: "12:12 PM" },
    ],
  },
  {
    id: 4,
    name: "Emma Williams",
    time: "1:45 PM",
    unread: false,
    messages: [
      { sender: "user", text: "I want to change my delivery address.", time: "1:40 PM" },
      { sender: "admin", text: "No problem, please provide the new address.", time: "1:42 PM" },
    ],
  },
  {
    id: 5,
    name: "Michael Brown",
    time: "2:30 PM",
    unread: true,
    messages: [
      { sender: "user", text: "My refund hasn’t processed yet.", time: "2:25 PM" },
      { sender: "admin", text: "Let me check your refund status.", time: "2:27 PM" },
    ],
  },
  {
    id: 6,
    name: "Sophia Davis",
    time: "3:15 PM",
    unread: false,
    messages: [
      { sender: "user", text: "Can you help me update my payment info?", time: "3:10 PM" },
      { sender: "admin", text: "Sure thing, please send the new details.", time: "3:12 PM" },
    ],
  },
];
