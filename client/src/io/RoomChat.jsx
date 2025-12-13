import { useEffect, useState, useRef } from "react";
import socket from "../socket";
import { useNavigate } from "react-router-dom";

function RoomChat() {
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [isJoined, setIsJoined] = useState(false); 
  const [join, setJoin] = useState("");
  const [chat, setChat] = useState([]);
  const [onlineUsers, setOnlineUser] = useState([]);
  const [typing, setTyping] = useState("");
  const User = localStorage.getItem("userName");
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("message", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    socket.on("typing", (data) => {
      setTyping(`${data.sender} is typing...`);
      setTimeout(() => setTyping(""), 2000);
    });

    socket.on("onlineUsers", (users) => {
      console.log(users);
      setOnlineUser(users);
    });
    
    return () => {
      socket.off("message");
      socket.off("typing");
      socket.off("onlineUsers");
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const handleJoin = () => {
    if (join.trim()) {
      socket.emit("roomNumber", join);
      setIsJoined(true);
    }
  }

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendRoomMessage", { room: join, msg: message, sender: User });
      setMessage("");
    }
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom", join);
    setIsJoined(false);
    setJoin("");
    setChat([]);
  }

  const handleTyping = () => {
    socket.emit("typing", { sender: User, room: join });
  }
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (!isJoined) {
        handleJoin();
      } else {
        sendMessage();
      }
    }
  };
 
  const filteredUsers = onlineUsers.filter(user =>
    user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background with Gradient Orbs */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, rgba(59, 7, 100, 0.4) 35%, rgba(0, 0, 0, 0.8) 70%, #000000 100%)'
          }}
        ></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-screen">
        {/* Sidebar with Online Users */}
        <div 
          className="w-80 backdrop-blur-md border-r border-white/10 p-6 flex flex-col"
          style={{ 
            backdropFilter: 'blur(16px)',
            background: 'rgba(30, 30, 40, 0.8)'
          }}
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Online Users</h2>
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
            />
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, i) => (
                <div key={i} className="flex items-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-white">{user}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">No users found</p>
            )}
          </div>
          
          <div className="pt-4 mt-auto border-t border-white/10">
            <p className="text-purple-300 text-sm text-center">Chat anytime, anywhere</p>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div 
            className="backdrop-blur-md border-b border-white/10 shadow-lg p-6"
            style={{ 
              backdropFilter: 'blur(16px)',
              background: 'rgba(30, 30, 40, 0.8)'
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg" >
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent">
                    {isJoined ? `Room ${join}` : <button className="cursor-pointer" onClick={() => navigate("/")}>QuickChat Rooms</button>}
                  </h1>
                  <p className="text-purple-300 text-sm">
                    {isJoined ? `Connected to room ${join}` : <button className="cursor-pointer" onClick={() => navigate("/")}>Join a room to start chatting</button>}
                  </p>
                </div>
              </div>
              
              {isJoined && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">Connected</span>
                </div>
              )}
            </div>
          </div>
      
          {/* Chat Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {!isJoined ? (
              <div className="flex-1 flex items-center justify-center p-6">
                <div 
                  className="backdrop-blur-md bg-black/20 border border-white/10 p-8 rounded-3xl shadow-2xl w-full max-w-md"
                  style={{ 
                    backdropFilter: 'blur(16px)',
                    background: 'rgba(31, 31, 59, 0.8)'
                  }}
                >
                  <h2 className="text-3xl font-bold mb-6 text-white text-center">Join a Room</h2>
                  <p className="text-gray-300 text-center mb-8">Enter a room number to connect with others</p>
                  <div className="space-y-4">
                    <input
                      type="number"
                      placeholder="Enter room number"
                      value={join}
                      onChange={(e) => setJoin(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                    />
                    <button 
                      onClick={handleJoin}
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                      Join Room
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Messages Area with proper scrolling */}
                <div 
                  ref={chatContainerRef}
                  className="flex-1 p-6 overflow-y-auto"
                >
                  <div className="space-y-4 max-w-4xl mx-auto">
                    {chat.length === 0 ? (
                      <div className="text-center text-gray-400 py-12">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <p>No messages yet. Start the conversation!</p>
                      </div>
                    ) : (
                      chat.map((c, i) => (
                        <div key={i} className="flex justify-start">
                          <div 
                            className="backdrop-blur-md bg-white/10 border border-white/10 px-4 py-3 rounded-2xl max-w-xs lg:max-w-md shadow-lg"
                            style={{ 
                              backdropFilter: 'blur(16px)',
                              background: 'rgba(139, 92, 246, 0.2)'
                            }}
                          >
                            <p className="text-white">{c}</p>
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={chatEndRef} />
                  </div>
                </div>
                
                {typing !== "" && (
                  <div className="px-6 pb-2">
                    <p className="text-gray-400 text-sm italic">{typing}</p>
                  </div>
                )}
                
                {/* Message Input Area - Fixed at bottom */}
                <div 
                  className="backdrop-blur-md border-t border-white/10 p-6 mt-auto"
                  style={{ 
                    backdropFilter: 'blur(16px)',
                    background: 'rgba(30, 30, 40, 0.8)'
                  }}
                >
                  <div className="flex items-center gap-4 max-w-4xl mx-auto">
                    <div className="flex-1 flex gap-3">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          handleTyping();
                        }}
                        onKeyPress={handleKeyPress}
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                      />
                      <button 
                        onClick={sendMessage}
                        className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                    
                    <button 
                      onClick={leaveRoom}
                      className="bg-white/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 font-medium px-4 py-3 rounded-xl border border-red-400/30 hover:border-red-400/50 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      Leave
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomChat;