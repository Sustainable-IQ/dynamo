// Shared data for DYNAMO application
// This file is used by both index.html and community.html to maintain synchronized data

// Active community threads
const threads = [
  { id: "t1", title: "Community Garden: irrigation plan", tags:["Project","Ops"], packs:[], dialogue:[], synthesis: "", decisions:[], questions:[] },
  { id: "t2", title: "Ethics Guidelines: consent patterns", tags:["Governance","Ethics"], packs:[], dialogue:[], synthesis: "", decisions:[], questions:[] },
  { id: "t3", title: "Website revamp: launch checklist", tags:["Comms","Launch"], packs:[], dialogue:[], synthesis: "", decisions:[], questions:[] }
];

// Agent packs available in the system
const packs = [
  { id:"sprint", name:"Sprint Pack", roles:["Facilitator","Synthesizer","Scheduler","Archivist"], outputs:["synthesis","decisions","questions"] },
  { id:"research", name:"Research Pack", roles:["Curator","Source Critic","Summarizer","Contrarian"], outputs:["synthesis","questions"] },
  { id:"governance", name:"Governance Pack", roles:["Consent Warden","Bias Sentinel","Decision Scribe"], outputs:["decisions","synthesis"] },
  { id:"launch", name:"Launch Pack", roles:["PM Orchestrator","Risk Scout","Docs Writer","Comms Drafter"], outputs:["synthesis","decisions"] }
];

// --- Universal navigation helper (works local + Cloudflare) ---
function _basePrefix() {
  const isLocal = location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.protocol === "file:";
  if (!isLocal) return ""; // production (Cloudflare): root is "/"

  const first = location.pathname.split("/")[1] || "";
  if (first.toLowerCase() === "dynamowebsite") return `/${first}`;
  return "";
}

function goTo(path) {
  let clean = path.startsWith("/") ? path : "/" + path;
  if (!clean.endsWith("/")) clean = clean + "/";
  window.location.href = _basePrefix() + clean;
}
// ----------------------------------------------------------------

// Export for use in Node.js if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { threads, packs };
}
