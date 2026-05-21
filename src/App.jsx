import { useState, useRef, useEffect } from "react";

const HISTORY = [
  { id: 1, title: "Build my personal AI project", time: "2h ago", active: true },
  { id: 2, title: "GitHub folder structure setup", time: "Yesterday" },
  { id: 3, title: "Groq API integration", time: "2 days ago" },
  { id: 4, title: "Gradio UI customization", time: "3 days ago" },
  { id: 5, title: "Python module design", time: "4 days ago" },
];

const MODELS = ["Kraft-1 Ultra", "Kraft-1 Pro", "Kraft-1 Flash"];

const SUGGESTIONS = [
  { icon: "⚡", text: "What can you do?" },
  { icon: "🧠", text: "Remember something about me" },
  { icon: "🔍", text: "Search the web for AI news" },
  { icon: "💻", text: "Write me a Python script" },
];

function Glow({ color = "#e11d48", size = 400, opacity = 0.06, top, left, right, bottom }) {
  return (
    <div style={{
      position: "absolute", width: size, height: size, borderRadius: "50%",
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      opacity, pointerEvents: "none", top, left, right, bottom,
      filter: "blur(40px)", zIndex: 0,
    }} />
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "14px 18px",
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "20px 20px 20px 4px", width: "fit-content" }}>
      {[0,1,2].map(i => (
        <div key={i} style={{
          width: 6, height: 6, borderRadius: "50%", background: "#e11d48",
          animation: `pulse 1.4s ease-in-out ${i*0.2}s infinite`,
        }}/>
      ))}
      <style>{`@keyframes pulse{0%,60%,100%{transform:scale(1);opacity:0.4}30%{transform:scale(1.4);opacity:1}}`}</style>
    </div>
  );
}

function Toast({ msg, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      position: "fixed", bottom: 90, right: 24, background: "#111",
      border: "1px solid #2a2a2a", borderRadius: 12, padding: "12px 18px",
      color: "#f0f0f0", fontSize: 13, fontWeight: 500, zIndex: 999,
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      animation: "fadeUp 0.3s ease-out",
    }}>✅ {msg}</div>
  );
}

function CookieBanner({ onAccept }) {
  return (
    <div style={{
      position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
      background: "rgba(10,10,10,0.98)", border: "1px solid #222",
      borderRadius: 18, padding: "20px 28px", display: "flex",
      alignItems: "center", gap: 18, zIndex: 9999, maxWidth: 580, width: "92%",
      boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(225,29,72,0.1)",
      backdropFilter: "blur(24px)", animation: "slideUp 0.4s cubic-bezier(.4,0,.2,1)",
    }}>
      <style>{`
        @keyframes slideUp{from{opacity:0;transform:translateX(-50%) translateY(24px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
      <div style={{ fontSize: 28 }}>🍪</div>
      <div style={{ flex: 1 }}>
        <p style={{ color: "#888", fontSize: 12, margin: 0, lineHeight: 1.6 }}>
          We use cookies to enhance your experience and remember your preferences.
          By continuing you agree to our{" "}
          <span style={{ color: "#e11d48", cursor: "pointer", textDecoration: "underline" }}>Privacy Policy</span>
          {" "}and{" "}
          <span style={{ color: "#e11d48", cursor: "pointer", textDecoration: "underline" }}>Terms of Service</span>.
        </p>
      </div>
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <button onClick={onAccept} style={{
          background: "linear-gradient(135deg, #e11d48, #9f1239)",
          border: "none", borderRadius: 10, color: "#fff",
          padding: "10px 20px", cursor: "pointer", fontSize: 12,
          fontWeight: 700, fontFamily: "inherit",
          boxShadow: "0 4px 16px rgba(225,29,72,0.4)",
          transition: "all 0.2s",
        }}>Accept All</button>
        <button onClick={onAccept} style={{
          background: "transparent", border: "1px solid #2a2a2a",
          borderRadius: 10, color: "#666", padding: "10px 16px",
          cursor: "pointer", fontSize: 12, fontWeight: 600,
          fontFamily: "inherit", transition: "all 0.2s",
        }}>Decline</button>
      </div>
    </div>
  );
}

function Sidebar({ collapsed, setCollapsed, activeId, setActiveId, onNew, darkMode }) {
  const [search, setSearch] = useState("");
  const filtered = HISTORY.filter(h => h.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{
      width: collapsed ? 64 : 264, minWidth: collapsed ? 64 : 264,
      background: "#050505", borderRight: "1px solid #111",
      display: "flex", flexDirection: "column", height: "100vh",
      transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
      overflow: "hidden", position: "relative", flexShrink: 0,
    }}>
      <Glow color="#e11d48" size={300} opacity={0.04} top={-100} left={-100} />

      {/* Logo */}
      <div style={{ padding: "18px 14px 12px", display: "flex", alignItems: "center", gap: 10, position: "relative", zIndex: 1 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 11, flexShrink: 0,
          background: "linear-gradient(135deg, #e11d48 0%, #7f1d1d 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 17, fontWeight: 900, color: "#fff",
          boxShadow: "0 0 20px rgba(225,29,72,0.5)",
          letterSpacing: -1,
        }}>K</div>
        {!collapsed && (
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 16, letterSpacing: -0.5, fontFamily: "'Sora', sans-serif", whiteSpace: "nowrap" }}>
            KRAFT AI
          </span>
        )}
        <div style={{ flex: 1 }} />
        <button onClick={() => setCollapsed(!collapsed)} style={{
          background: "none", border: "none", color: "#333", cursor: "pointer",
          padding: 6, borderRadius: 8, fontSize: 14, transition: "color 0.2s",
          flexShrink: 0, display: "flex", alignItems: "center",
        }}>
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      {/* New Chat */}
      <div style={{ padding: "0 10px 12px", position: "relative", zIndex: 1 }}>
        <button onClick={onNew} style={{
          width: "100%",
          background: collapsed ? "rgba(225,29,72,0.1)" : "linear-gradient(135deg, #e11d48, #9f1239)",
          border: collapsed ? "1px solid rgba(225,29,72,0.2)" : "none",
          borderRadius: 12, color: "#fff",
          padding: collapsed ? "10px" : "11px 16px",
          cursor: "pointer", fontWeight: 700, fontSize: 13,
          display: "flex", alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          gap: 8, transition: "all 0.2s",
          boxShadow: collapsed ? "none" : "0 4px 20px rgba(225,29,72,0.3)",
          fontFamily: "inherit",
        }}>
          <span style={{ fontSize: 20, lineHeight: 1, fontWeight: 300 }}>+</span>
          {!collapsed && "New Chat"}
        </button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div style={{ padding: "0 10px 10px", position: "relative", zIndex: 1 }}>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#333", fontSize: 13 }}>🔍</span>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search chats..."
              style={{
                width: "100%", background: "#0d0d0d", border: "1px solid #1a1a1a",
                borderRadius: 10, padding: "8px 10px 8px 30px", color: "#888",
                fontSize: 12, outline: "none", fontFamily: "inherit", boxSizing: "border-box",
              }}
            />
          </div>
        </div>
      )}

      {/* History */}
      {!collapsed && (
        <div style={{ flex: 1, overflowY: "auto", padding: "0 6px" }}>
          <p style={{ color: "#2a2a2a", fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
            padding: "0 8px 8px", textTransform: "uppercase", margin: 0 }}>Recent</p>
          {filtered.map(h => (
            <div key={h.id} onClick={() => setActiveId(h.id)} style={{
              padding: "10px 12px", borderRadius: 10, cursor: "pointer",
              marginBottom: 2, transition: "all 0.15s",
              background: activeId === h.id ? "rgba(225,29,72,0.1)" : "transparent",
              borderLeft: `2px solid ${activeId === h.id ? "#e11d48" : "transparent"}`,
            }}>
              <p style={{ color: activeId === h.id ? "#fff" : "#555", fontSize: 12, margin: 0,
                fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{h.title}</p>
              <p style={{ color: "#2a2a2a", fontSize: 10, margin: "3px 0 0" }}>{h.time}</p>
            </div>
          ))}
        </div>
      )}

      {/* Profile */}
      <div style={{ padding: 10, borderTop: "1px solid #111", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 6px",
          borderRadius: 10, cursor: "pointer", transition: "background 0.2s" }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg, #e11d48, #7f1d1d)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 800, fontSize: 13,
            boxShadow: "0 0 10px rgba(225,29,72,0.3)",
          }}>K</div>
          {!collapsed && (
            <div>
              <p style={{ color: "#ddd", fontSize: 12, fontWeight: 700, margin: 0 }}>Kraft</p>
              <p style={{ color: "#e11d48", fontSize: 10, margin: 0, fontWeight: 500 }}>Pro Plan ✦</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Message({ msg, onCopy }) {
  const isUser = msg.role === "user";
  const [hover, setHover] = useState(false);

  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 24, animation: "fadeUp 0.3s ease-out", position: "relative" }}>
      {!isUser && (
        <div style={{
          width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
          marginRight: 12, marginTop: 2,
          background: "linear-gradient(135deg, #e11d48, #7f1d1d)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 900, color: "#fff",
          boxShadow: "0 0 16px rgba(225,29,72,0.35)",
        }}>K</div>
      )}
      <div style={{ maxWidth: "72%" }}>
        <div style={{
          padding: "14px 20px",
          borderRadius: isUser ? "22px 22px 5px 22px" : "22px 22px 22px 5px",
          background: isUser
            ? "linear-gradient(135deg, #e11d48 0%, #9f1239 100%)"
            : "rgba(255,255,255,0.035)",
          border: isUser ? "none" : "1px solid rgba(255,255,255,0.07)",
          color: "#f0f0f0", fontSize: 14, lineHeight: 1.75,
          boxShadow: isUser ? "0 6px 24px rgba(225,29,72,0.28)" : "none",
        }}>
          {msg.content}
        </div>
        {hover && !isUser && (
          <div style={{ display: "flex", gap: 6, marginTop: 6, animation: "fadeUp 0.2s ease-out" }}>
            {[["📋", "Copy", () => { navigator.clipboard?.writeText(msg.content); onCopy("Copied!"); }],
              ["👍", "Like", () => onCopy("Liked!")],
              ["👎", "Dislike", () => onCopy("Noted!")],
              ["🔄", "Retry", () => onCopy("Retrying...")],
            ].map(([icon, label, fn]) => (
              <button key={label} onClick={fn} style={{
                background: "#111", border: "1px solid #1e1e1e", borderRadius: 8,
                color: "#555", padding: "4px 10px", cursor: "pointer",
                fontSize: 11, fontFamily: "inherit", transition: "all 0.15s",
                display: "flex", alignItems: "center", gap: 4,
              }}>{icon} {label}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsPanel({ darkMode, setDarkMode, onClose }) {
  const [memory, setMemory] = useState(true);
  const [webSearch, setWebSearch] = useState(true);
  const [safeMode, setSafeMode] = useState(false);

  const Toggle = ({ on, setOn }) => (
    <div onClick={() => setOn(!on)} style={{
      width: 42, height: 24, borderRadius: 12, cursor: "pointer",
      background: on ? "linear-gradient(135deg, #e11d48, #9f1239)" : "#1a1a1a",
      border: on ? "none" : "1px solid #2a2a2a",
      position: "relative", transition: "all 0.25s",
      boxShadow: on ? "0 0 12px rgba(225,29,72,0.4)" : "none",
      flexShrink: 0,
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: "50%", background: "#fff",
        position: "absolute", top: 3, left: on ? 21 : 3,
        transition: "left 0.25s cubic-bezier(.4,0,.2,1)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
      }}/>
    </div>
  );

  return (
    <div style={{
      width: 290, borderLeft: "1px solid #111", background: "#050505",
      padding: 24, overflowY: "auto", animation: "fadeUp 0.25s ease-out",
      position: "relative",
    }}>
      <Glow color="#e11d48" size={200} opacity={0.04} top={-50} right={-50} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 15, margin: 0 }}>Settings</h3>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: 18 }}>✕</button>
      </div>

      {/* Toggles */}
      <p style={{ color: "#2a2a2a", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>AI Features</p>
      {[["🧠 Memory", "Remember conversations", memory, setMemory],
        ["🌐 Web Search", "Real-time information", webSearch, setWebSearch],
        ["🛡️ Safe Mode", "Filter sensitive content", safeMode, setSafeMode],
        ["🌙 Dark Mode", "Toggle light/dark theme", darkMode, setDarkMode],
      ].map(([label, desc, val, setVal]) => (
        <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <p style={{ color: "#ccc", fontSize: 13, fontWeight: 600, margin: 0 }}>{label}</p>
            <p style={{ color: "#444", fontSize: 11, margin: "2px 0 0" }}>{desc}</p>
          </div>
          <Toggle on={val} setOn={setVal} />
        </div>
      ))}

      <div style={{ borderTop: "1px solid #111", paddingTop: 20, marginTop: 4 }}>
        <p style={{ color: "#2a2a2a", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>API Configuration</p>
        <input placeholder="gsk_..." style={{
          width: "100%", background: "#0d0d0d", border: "1px solid #1a1a1a",
          borderRadius: 10, padding: "10px 14px", color: "#888",
          fontSize: 12, fontFamily: "monospace", boxSizing: "border-box", outline: "none",
        }}/>
        <p style={{ color: "#2a2a2a", fontSize: 10, margin: "8px 0 0" }}>Groq API key for AI responses</p>
      </div>

      <div style={{ borderTop: "1px solid #111", paddingTop: 20, marginTop: 20 }}>
        <p style={{ color: "#2a2a2a", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Danger Zone</p>
        <button style={{
          width: "100%", background: "rgba(225,29,72,0.06)",
          border: "1px solid rgba(225,29,72,0.2)", borderRadius: 10,
          color: "#e11d48", padding: "10px 0", cursor: "pointer",
          fontSize: 12, fontWeight: 700, fontFamily: "inherit", transition: "all 0.2s",
        }}>🗑️ Clear All Conversations</button>
      </div>

      <div style={{ marginTop: 20 }}>
        <p style={{ color: "#2a2a2a", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Legal</p>
        {["Privacy Policy", "Terms of Service", "Cookie Policy", "Export My Data"].map(l => (
          <p key={l} style={{ color: "#e11d48", fontSize: 12, cursor: "pointer", margin: "0 0 8px", textDecoration: "underline" }}>{l}</p>
        ))}
      </div>
    </div>
  );
}

export default function KraftAI() {
  const [collapsed, setSidebarCollapsed] = useState(false);
  const [activeId, setActiveId] = useState(1);
  const [model, setModel] = useState(MODELS[0]);
  const [darkMode, setDarkMode] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [cookie, setCookie] = useState(true);
  const [toast, setToast] = useState(null);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hey Kraft 👋 I'm your personal AI — sharp, loyal, and always ready. Memory is on, web search is active. What are we building today?" }
  ]);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, thinking]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const send = () => {
    if (!input.trim() || thinking) return;
    const userMsg = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `Got it. You said: "${userMsg.content}"\n\nConnect your Groq API key in Settings to get real AI responses. This premium UI is fully ready for your backend!`
      }]);
    }, 2000);
  };

  const bg = darkMode ? "#080808" : "#f8f8f8";
  const textColor = darkMode ? "#f0f0f0" : "#111";

  return (
    <div style={{ display: "flex", height: "100vh", background: bg, color: textColor,
      fontFamily: "'Sora', 'DM Sans', sans-serif", overflow: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,60%,100%{transform:scale(1);opacity:0.4}30%{transform:scale(1.4);opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateX(-50%) translateY(24px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
        ::-webkit-scrollbar{width:3px;height:3px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#e11d48;border-radius:999px}
        ::-webkit-scrollbar-thumb:hover{background:#f43f5e;box-shadow:0 0 6px #e11d48}
        textarea{resize:none;outline:none}
        *{transition:background 0.2s, border-color 0.2s, color 0.15s}
        input{outline:none}
      `}</style>

      <Sidebar collapsed={collapsed} setCollapsed={setSidebarCollapsed}
        activeId={activeId} setActiveId={setActiveId} darkMode={darkMode}
        onNew={() => { setMessages([{ role: "assistant", content: "New conversation. What's on your mind, Kraft?" }]); setActiveId(null); }} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
        <Glow color="#e11d48" size={500} opacity={0.04} top={-200} right={-100} />

        {/* Top Nav */}
        <div style={{
          display: "flex", alignItems: "center", padding: "12px 20px",
          borderBottom: `1px solid ${darkMode ? "#111" : "#e5e5e5"}`,
          background: darkMode ? "rgba(8,8,8,0.85)" : "rgba(248,248,248,0.85)",
          backdropFilter: "blur(24px)", gap: 10, position: "relative", zIndex: 5,
        }}>
          <select value={model} onChange={e => setModel(e.target.value)} style={{
            background: darkMode ? "#0d0d0d" : "#fff", color: textColor,
            border: `1px solid ${darkMode ? "#1e1e1e" : "#e0e0e0"}`,
            borderRadius: 10, padding: "7px 12px", fontSize: 12,
            fontWeight: 700, cursor: "pointer", fontFamily: "inherit", outline: "none",
          }}>
            {MODELS.map(m => <option key={m}>{m}</option>)}
          </select>

          <div style={{ flex: 1, textAlign: "center" }}>
            <span style={{ color: darkMode ? "#222" : "#ccc", fontSize: 12, fontWeight: 500 }}>
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </span>
          </div>

          {[
            ["🔍", () => showToast("Search coming soon")],
            ["🔔", () => showToast("No new notifications")],
            [darkMode ? "☀️" : "🌙", () => setDarkMode(!darkMode)],
            ["⚙️", () => setShowSettings(!showSettings)],
          ].map(([icon, fn], i) => (
            <button key={i} onClick={fn} style={{
              background: showSettings && icon === "⚙️" ? "rgba(225,29,72,0.12)" : darkMode ? "#0d0d0d" : "#eee",
              border: `1px solid ${showSettings && icon === "⚙️" ? "#e11d48" : darkMode ? "#1e1e1e" : "#e0e0e0"}`,
              borderRadius: 10, color: textColor, width: 36, height: 36,
              cursor: "pointer", fontSize: 15, display: "flex",
              alignItems: "center", justifyContent: "center", transition: "all 0.2s",
            }}>{icon}</button>
          ))}

          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg, #e11d48, #7f1d1d)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 900, fontSize: 14, cursor: "pointer",
            boxShadow: "0 0 14px rgba(225,29,72,0.4)", flexShrink: 0,
          }}>K</div>
        </div>

        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Main chat */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
            <div style={{ flex: 1, overflowY: "auto", padding: "40px 8% 0", position: "relative", zIndex: 1 }}>
              <div style={{ maxWidth: 720, margin: "0 auto" }}>

                {messages.length === 1 && (
                  <div style={{ textAlign: "center", marginBottom: 48, animation: "fadeUp 0.5s ease-out" }}>
                    <div style={{
                      width: 64, height: 64, borderRadius: 20, margin: "0 auto 20px",
                      background: "linear-gradient(135deg, #e11d48, #7f1d1d)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 28, fontWeight: 900, color: "#fff",
                      boxShadow: "0 0 40px rgba(225,29,72,0.4)",
                    }}>K</div>
                    <h1 style={{
                      fontSize: 36, fontWeight: 900, margin: "0 0 8px",
                      background: "linear-gradient(90deg, #e11d48, #f97316, #e11d48)",
                      backgroundSize: "200% 100%",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                      letterSpacing: -1.5, animation: "shimmer 3s linear infinite",
                    }}>
                      Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}, Kraft.
                    </h1>
                    <style>{`@keyframes shimmer{0%{background-position:0% 0}100%{background-position:200% 0}}`}</style>
                    <p style={{ color: "#444", fontSize: 15, margin: "0 0 36px" }}>What can I help you with today?</p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, maxWidth: 480, margin: "0 auto" }}>
                      {SUGGESTIONS.map(s => (
                        <button key={s.text} onClick={() => setInput(s.text)} style={{
                          background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                          border: `1px solid ${darkMode ? "#1a1a1a" : "#e5e5e5"}`,
                          borderRadius: 14, padding: "14px 16px", cursor: "pointer",
                          color: darkMode ? "#888" : "#666", fontSize: 13, fontWeight: 500,
                          textAlign: "left", transition: "all 0.2s", fontFamily: "inherit",
                          display: "flex", alignItems: "center", gap: 8,
                        }}>
                          <span>{s.icon}</span>{s.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <Message key={i} msg={msg} onCopy={showToast} />
                ))}

                {thinking && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 24 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: "linear-gradient(135deg, #e11d48, #7f1d1d)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 14, fontWeight: 900, color: "#fff", flexShrink: 0,
                    }}>K</div>
                    <TypingIndicator />
                  </div>
                )}
                <div ref={bottomRef} style={{ height: 20 }} />
              </div>
            </div>

            {/* Input dock */}
            <div style={{ padding: "16px 8% 20px", position: "relative", zIndex: 2 }}>
              <div style={{ maxWidth: 720, margin: "0 auto" }}>
                <div style={{
                  display: "flex", alignItems: "flex-end", gap: 10,
                  background: darkMode ? "rgba(10,10,10,0.95)" : "rgba(255,255,255,0.95)",
                  border: `1px solid ${darkMode ? "#1e1e1e" : "#e0e0e0"}`,
                  borderRadius: 20, padding: "12px 14px",
                  boxShadow: darkMode ? "0 -4px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(225,29,72,0.06)" : "0 -4px 20px rgba(0,0,0,0.08)",
                  backdropFilter: "blur(24px)",
                }}>
                  <button style={{
                    background: "none", border: "none", color: "#333", cursor: "pointer",
                    fontSize: 18, padding: "4px", borderRadius: 8, transition: "color 0.2s", flexShrink: 0,
                  }} title="Attach file">📎</button>

                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                    placeholder="Message Kraft AI...  (Enter to send, Shift+Enter for new line)"
                    rows={1}
                    style={{
                      flex: 1, background: "none", border: "none", color: textColor,
                      fontSize: 14, lineHeight: 1.6, padding: "5px 0",
                      fontFamily: "inherit", maxHeight: 140, overflowY: "auto",
                    }}
                  />

                  <button style={{
                    background: "none", border: "none", color: "#333", cursor: "pointer",
                    fontSize: 18, padding: "4px", borderRadius: 8, transition: "color 0.2s", flexShrink: 0,
                  }} title="Voice input">🎙️</button>

                  <button onClick={send} disabled={!input.trim() || thinking} style={{
                    width: 38, height: 38, borderRadius: 12, flexShrink: 0,
                    background: input.trim() && !thinking
                      ? "linear-gradient(135deg, #e11d48, #9f1239)"
                      : darkMode ? "#111" : "#eee",
                    border: "none", color: input.trim() ? "#fff" : "#333",
                    cursor: input.trim() && !thinking ? "pointer" : "default",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, transition: "all 0.25s",
                    boxShadow: input.trim() ? "0 4px 18px rgba(225,29,72,0.4)" : "none",
                  }}>↑</button>
                </div>

                <p style={{ color: "#222", fontSize: 11, textAlign: "center", marginTop: 10, margin: "10px 0 0" }}>
                  Kraft AI · <span style={{ color: "#e11d48", cursor: "pointer" }}>Privacy</span> · <span style={{ color: "#e11d48", cursor: "pointer" }}>Terms</span> · <span style={{ color: "#e11d48", cursor: "pointer" }}>Cookies</span>
                </p>
              </div>
            </div>
          </div>

          {/* Settings panel */}
          {showSettings && (
            <SettingsPanel darkMode={darkMode} setDarkMode={setDarkMode} onClose={() => setShowSettings(false)} />
          )}
        </div>
      </div>

      {cookie && <CookieBanner onAccept={() => setCookie(false)} />}
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

