// Shared data for DYNAMO application
// This file is used by both index.html and community.html to maintain synchronized data

// Active community threads
 const threads = [
    { id: "t1", title: "Community Garden: irrigation plan", tags:["Project","Ops"], packs:[], dialogue:[
      { author: "Sarah", text: "We need to finalize the irrigation system before planting season starts." },
      { author: "Mike", text: "I've researched drip irrigation vs sprinkler systems. Drip seems more water-efficient." },
      { author: "Council", text: "Excellent research. Adding water efficiency as a key decision factor." }
    ], synthesis: "Water efficiency identified as key decision factor for irrigation system selection.", decisions:[], questions:[{prompt: "Which irrigation method provides best water efficiency for our garden size?", status: "Open"}] },
    { id: "t2", title: "Ethics Guidelines: consent patterns", tags:["Governance","Ethics"], packs:[], dialogue:[
      { author: "Dr. Chen", text: "We need clear opt-in consent for data collection, not buried in terms of service." },
      { author: "Jamie", text: "What about existing users? Do we need retroactive consent for current data?" },
      { author: "Alex", text: "GDPR requires explicit consent. We should implement progressive disclosure for complex permissions." },
      { author: "Dr. Chen", text: "Good point on progressive disclosure. Makes consent more meaningful and less overwhelming." },
      { author: "Council", text: "Synthesizing: Clear opt-in, retroactive consent review, and progressive disclosure as core principles." }
    ], synthesis: "Clear opt-in, retroactive consent review, and progressive disclosure established as core principles.", decisions:[{text: "Implement progressive disclosure for complex permissions", status: "Decided"}], questions:[{prompt: "What about existing users? Do we need retroactive consent for current data?", status: "Open"}] },
    { id: "t3", title: "Website revamp: launch checklist", tags:["Comms","Launch"], packs:[], dialogue:[
      { author: "Taylor", text: "Mobile responsiveness testing is complete. All breakpoints look good." },
      { author: "Morgan", text: "SEO audit shows we need meta descriptions for 12 pages. I can handle those this week." },
      { author: "Riley", text: "Load testing revealed some issues with the contact form under high traffic. Working on optimization." },
      { author: "Taylor", text: "Should we delay launch until the contact form is fixed? That's pretty critical." },
      { author: "Morgan", text: "Agreed. Better to launch clean than deal with frustrated users on day one." },
      { author: "Council", text: "Decision logged: Launch postponed pending contact form optimization. Quality over speed." }
    ], synthesis: "Mobile testing complete, SEO needs attention, contact form requires optimization before launch.", decisions:[{text: "Launch postponed pending contact form optimization", status: "Decided"}], questions:[{prompt: "Should we delay launch until the contact form is fixed?", status: "Resolved"}] }
  ];

// Agent packs available in the system
const packs = [
  { id:"sprint", name:"Sprint Pack", roles:["Facilitator","Synthesizer","Scheduler","Archivist"], outputs:["synthesis","decisions","questions"] },
  { id:"research", name:"Research Pack", roles:["Curator","Source Critic","Summarizer","Contrarian"], outputs:["synthesis","questions"] },
  { id:"governance", name:"Governance Pack", roles:["Consent Warden","Bias Sentinel","Decision Scribe"], outputs:["decisions","synthesis"] },
  { id:"launch", name:"Launch Pack", roles:["PM Orchestrator","Risk Scout","Docs Writer","Comms Drafter"], outputs:["synthesis","decisions"] }
];

// Export for use in both HTML files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { threads, packs };
}
