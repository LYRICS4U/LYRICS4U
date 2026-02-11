
import React, { useState, useEffect } from 'react';
import { firebaseService } from '../services/firebase';
import { LyricRequest, ChatMessage } from '../types';

const AdminDashboard: React.FC = () => {
  const [requests, setRequests] = useState<LyricRequest[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'requests' | 'chat'>('requests');
  const [selectedRequest, setSelectedRequest] = useState<LyricRequest | null>(null);
  const [lyricText, setLyricText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Real-time listener for requests
    const unsubscribeRequests = firebaseService.listenToRequests(setRequests);
    // Real-time listener for chat
    const unsubscribeChat = firebaseService.listenToChat(setMessages);
    
    return () => {
      unsubscribeRequests();
      unsubscribeChat();
    };
  }, []);

  const handleSendLyrics = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest || !lyricText.trim()) return;
    
    setSubmitting(true);
    try {
      await firebaseService.sendLyricsToUser({
        userEmail: selectedRequest.email,
        songName: selectedRequest.songName,
        artistName: selectedRequest.artistName,
        language: selectedRequest.language,
        lyrics: lyricText
      }, selectedRequest.id);

      setLyricText('');
      setSelectedRequest(null);
      setSubmitting(false);
      alert(`Lyrics successfully published to ${selectedRequest.email}'s library.`);
    } catch (error) {
      console.error("Failed to send lyrics:", error);
      alert("Error sending lyrics. Please check connection.");
      setSubmitting(false);
    }
  };

  const handleSendReply = async () => {
    if (!replyText.trim()) return;
    await firebaseService.sendMessage({
      sender: 'admin',
      text: replyText
    });
    setReplyText('');
  };

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-bold">Manager <span className="text-[#ffd700]">Dashboard</span></h2>
          <p className="text-white/40">Real-time Submission & Library Control Center.</p>
        </div>
        <div className="flex glass p-1 rounded-2xl">
          <button 
            onClick={() => setActiveTab('requests')}
            className={`px-8 py-3 rounded-xl font-bold transition ${activeTab === 'requests' ? 'bg-[#ffd700] text-purple-950' : 'text-white hover:bg-white/5'}`}
          >
            Submissions ({requests.filter(r => r.status === 'pending').length})
          </button>
          <button 
            onClick={() => setActiveTab('chat')}
            className={`px-8 py-3 rounded-xl font-bold transition ${activeTab === 'chat' ? 'bg-[#ffd700] text-purple-950' : 'text-white hover:bg-white/5'}`}
          >
            Live Chat
          </button>
        </div>
      </div>

      {activeTab === 'requests' ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 glass rounded-[2rem] overflow-hidden border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                    <th className="px-6 py-4">Artist/Song</th>
                    <th className="px-6 py-4">Details</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {requests.map((req) => (
                    <tr key={req.id} className={`hover:bg-white/[0.02] transition ${selectedRequest?.id === req.id ? 'bg-white/[0.05]' : ''}`}>
                      <td className="px-6 py-6">
                        <div className="font-bold text-white text-sm">{req.songName}</div>
                        <div className="text-[10px] text-[#ffd700] uppercase font-bold">{req.artistName}</div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="text-xs text-white/70">{req.language}</div>
                        <div className="text-[10px] text-white/30 truncate max-w-[150px]">{req.email}</div>
                      </td>
                      <td className="px-6 py-6">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          req.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          req.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-6">
                        <button 
                          disabled={req.status === 'completed'}
                          onClick={() => setSelectedRequest(req)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition ${
                            req.status === 'completed' 
                            ? 'bg-white/5 text-white/20 cursor-not-allowed' 
                            : 'bg-[#ffd700] text-purple-950 hover:scale-110'
                          }`}
                        >
                          {req.status === 'completed' ? 'DONE' : 'SEND LYRICS'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="xl:col-span-1">
            {selectedRequest ? (
              <div className="glass rounded-[2.5rem] p-8 border border-[#ffd700]/20 animate-in fade-in slide-in-from-right-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-[#ffd700]">Write Lyrics</h3>
                  <button onClick={() => setSelectedRequest(null)} className="text-white/30 hover:text-white">&times;</button>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/5 text-xs text-white/50">
                  <p><strong>For:</strong> {selectedRequest.songName}</p>
                  <p><strong>To:</strong> {selectedRequest.email}</p>
                  <p className="mt-2 text-white/30 italic">"{selectedRequest.specialRequests}"</p>
                </div>
                <form onSubmit={handleSendLyrics} className="space-y-4">
                  <textarea 
                    required
                    rows={12}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm outline-none focus:border-[#ffd700]/50 resize-none font-serif"
                    placeholder="Type the masterpiece here..."
                    value={lyricText}
                    onChange={(e) => setLyricText(e.target.value)}
                  />
                  <button 
                    disabled={submitting}
                    className="w-full py-4 bg-[#ffd700] text-purple-950 font-bold rounded-2xl hover:bg-[#ffeb3b] transition flex items-center justify-center gap-2"
                  >
                    {submitting ? 'Publishing...' : 'Publish to User Library'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="glass rounded-[2.5rem] p-12 text-center border border-dashed border-white/10 h-full flex flex-col justify-center">
                <p className="text-white/20 italic">Select a request from the table to start writing lyrics.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[600px]">
          <div className="glass rounded-[2rem] p-6 flex flex-col gap-4">
            <h3 className="font-bold border-b border-white/10 pb-4">Artists List</h3>
            <div className="p-4 bg-[#ffd700] text-purple-950 rounded-2xl font-bold flex justify-between items-center cursor-pointer">
              <span>Public Stream</span>
              <span className="bg-purple-950 text-white text-[10px] px-2 py-0.5 rounded-full">{messages.length}</span>
            </div>
          </div>
          <div className="md:col-span-2 glass rounded-[2rem] flex flex-col overflow-hidden">
            <div className="bg-white/5 p-4 flex justify-between items-center border-b border-white/10">
              <span className="font-bold">Live Consultation</span>
            </div>
            <div className="flex-grow p-6 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'admin' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-4 rounded-2xl text-sm max-w-[80%] ${msg.sender === 'admin' ? 'bg-[#ffd700] text-purple-950' : 'bg-white/5 border border-white/10'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-white/10 flex gap-4">
              <input 
                className="flex-grow bg-white/5 border border-white/10 rounded-xl px-5 py-4"
                placeholder="Reply as Muzamil..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
              />
              <button onClick={handleSendReply} className="px-6 bg-[#ffd700] text-purple-950 font-bold rounded-xl">SEND</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
