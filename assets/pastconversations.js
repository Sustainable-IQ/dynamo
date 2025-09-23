// DYNAMO Past Conversations Data Module
// Provides data structure and retrieval functions for the Memory Dashboard

const pastConversations = {
  ledgers: [
    {
      ledgerId: "ledger_001",
      title: "Navigating Educational Freedom", 
      dateCreated: "2025-03-15",
      globalMetaTags: ["education", "parental_sovereignty", "institutional_critique"],
      summary: "Discussion about homeschooling vs public school choices and associated risks",
      conversations: [
        {
          exchangeId: "ex_001_01",
          timestamp: "2025-03-15T10:30:00",
          userMessage: "Should I homeschool my children or send them to public school?",
          userMetaTags: ["education", "homeschooling", "decision_making"],
          councilResponse: "The choice between homeschooling and public schooling reflects deeper questions about educational sovereignty and institutional trust. Public schools provide standardized credentials and socialization but often suppress individual curiosity through rigid curricula designed for compliance rather than learning. Homeschooling preserves educational freedom and allows customized learning but requires significant parental investment and intentional community building. Consider your family's capacity for educational leadership, your children's learning styles, and your tolerance for institutional compromise versus personal responsibility.",
          councilMetaTags: ["educational_sovereignty", "institutional_analysis", "parental_responsibility"],
          status: "unresolved",
          contextReferences: []
        },
        {
          exchangeId: "ex_001_02",
          timestamp: "2025-03-15T10:35:00", 
          userMessage: "What are the biggest risks of homeschooling that I should prepare for?",
          userMetaTags: ["homeschooling", "risk_assessment", "preparation"],
          councilResponse: "The primary risks include social isolation, gaps in specialized subjects, and parental burnout. Combat isolation by joining homeschool cooperatives, sports teams, and community activities - children need diverse adult mentors and peer relationships. Address subject gaps by networking with other homeschool families, using online resources, or hiring tutors for advanced topics. Prevent burnout by sharing teaching responsibilities with your spouse, taking breaks when needed, and remembering that learning happens everywhere, not just during formal lessons. The biggest long-term risk is actually over-protection - ensure your children face age-appropriate challenges and develop independence.",
          councilMetaTags: ["social_development", "educational_planning", "community_building"],
          status: "resolved",
          contextReferences: ["ex_001_01"]
        }
      ]
    },
    {
      ledgerId: "ledger_002",
      title: "Corporate Spirituality Integration",
      dateCreated: "2025-05-22",
      globalMetaTags: ["spirituality", "workplace_integration", "corporate_culture"],
      summary: "Exploring how to maintain spiritual practice and integrity within corporate work environments",
      conversations: [
        {
          exchangeId: "ex_002_01",
          timestamp: "2025-05-22T14:15:00",
          userMessage: "How can I maintain spiritual practice while working in a corporate environment?",
          userMetaTags: ["spirituality", "workplace_integration", "daily_practice"],
          councilResponse: "Corporate environments often operate through extraction and competition that can conflict with spiritual development, but they also provide laboratories for practicing compassion under pressure. Establish non-negotiable daily practices before and after work hours - meditation, prayer, or journaling that ground you in your values. Use workplace challenges as spiritual curriculum: difficult colleagues become teachers of patience, ethical dilemmas become opportunities for moral clarity. Create subtle ritual anchors throughout your day without drawing attention to yourself.",
          councilMetaTags: ["spiritual_practice", "workplace_ethics", "integrity"],
          status: "unresolved",
          contextReferences: []
        },
        {
          exchangeId: "ex_002_02",
          timestamp: "2025-05-22T14:22:00",
          userMessage: "Is it hypocritical to work for a company whose values don't align with my spiritual beliefs?",
          userMetaTags: ["ethics", "career_choices", "moral_compromise"],
          councilResponse: "Hypocrisy lies in contradiction between stated values and actions, not in working within imperfect systems while maintaining personal integrity. Most people need income to survive, and complete ethical purity in employment is nearly impossible under current economic structures. The key questions are: Can you do your specific role with integrity? Are you actively participating in harm or simply working within a flawed system? Can you use your position to influence positive change, even incrementally? Sometimes working from within corrupt systems while maintaining your values creates more positive impact than pure withdrawal.",
          councilMetaTags: ["moral_integrity", "systemic_change", "authentic_living"],
          status: "resolved",
          contextReferences: ["ex_002_01"]
        }
      ]
    },
    {
      ledgerId: "ledger_003", 
      title: "Media Manipulation Awareness",
      dateCreated: "2025-07-08",
      globalMetaTags: ["media_literacy", "propaganda", "critical_thinking"],
      summary: "Understanding how to identify and protect against media manipulation and information warfare",
      conversations: [
        {
          exchangeId: "ex_003_01",
          timestamp: "2025-07-08T09:45:00",
          userMessage: "How can I tell when news reports are manipulating me versus informing me?",
          userMetaTags: ["media_literacy", "propaganda", "information_warfare"],
          councilResponse: "Media manipulation operates through recognizable patterns: emotional amplification without proportional evidence, repetitive messaging across outlets using identical phrases, focus on reactions rather than root causes, omission of historical context, and artificial urgency demanding immediate response. Legitimate information provides multiple viewpoints, acknowledges uncertainty, includes historical precedent, and allows reflection time. Always ask: Who benefits from me believing this? What am I being asked to feel or do? What voices are excluded? What historical patterns does this echo?",
          councilMetaTags: ["pattern_recognition", "critical_thinking", "information_analysis"],
          status: "unresolved",
          contextReferences: []
        },
        {
          exchangeId: "ex_003_02",
          timestamp: "2025-07-08T09:52:00",
          userMessage: "Should I just avoid all mainstream news to protect myself from manipulation?",
          userMetaTags: ["information_diet", "news_consumption", "alternative_media"],
          councilResponse: "Complete news avoidance creates dangerous blind spots, while exclusive mainstream consumption limits perspective. Develop a diverse information diet: read mainstream sources to understand dominant narratives, follow independent journalists for suppressed perspectives, study historical context to recognize recurring patterns, and maintain direct community connections for local reality checks. The goal isn't finding perfect sources but developing discernment across multiple viewpoints. Spend more time analyzing information patterns than consuming information volume. Quality discernment matters more than information quantity.",
          councilMetaTags: ["balanced_perspective", "information_literacy", "discernment"],
          status: "resolved", 
          contextReferences: ["ex_003_01"]
        }
      ]
    },
    {
      ledgerId: "ledger_004",
      title: "Authentic Relationship Navigation", 
      dateCreated: "2025-02-28",
      globalMetaTags: ["relationships", "boundaries", "authenticity"],
      summary: "Exploring how to set healthy boundaries and navigate relationships with integrity",
      conversations: [
        {
          exchangeId: "ex_004_01",
          timestamp: "2025-02-28T16:20:00",
          userMessage: "How do I set boundaries without damaging my relationships?",
          userMetaTags: ["boundaries", "relationships", "communication"],
          councilResponse: "Healthy boundaries actually strengthen relationships by creating clarity and preventing resentment. Start by being clear about your own needs and limits before communicating them. Frame boundaries in terms of what you can do rather than what others must do: 'I need to leave by 9 PM' rather than 'You always keep me too late.' Expect some pushback initially - people may test new boundaries. Stay consistent and kind but firm. Remember that people who truly care about you want to know your actual limits rather than having you secretly resent them for crossing unknown lines.",
          councilMetaTags: ["healthy_communication", "relationship_dynamics", "conflict_resolution"],
          status: "unresolved",
          contextReferences: []
        },
        {
          exchangeId: "ex_004_02", 
          timestamp: "2025-02-28T16:28:00",
          userMessage: "What if someone gets angry or guilt-trips me when I try to set boundaries?",
          userMetaTags: ["manipulation", "guilt_trips", "emotional_blackmail"],
          councilResponse: "Anger or guilt-tripping in response to reasonable boundaries reveals that person's investment in controlling or using you rather than having an authentic relationship. This reaction is actually valuable information about their character and intentions. Respond with calm consistency: acknowledge their feelings without changing your boundary. 'I understand you're disappointed, but this is what I need.' Don't argue, justify extensively, or negotiate core boundaries. People who respect you will adjust; those who don't will reveal themselves as unsuitable for close relationship. Short-term conflict often leads to long-term clarity and healthier dynamics.",
          councilMetaTags: ["boundary_violations", "relationship_assessment", "personal_sovereignty"],
          status: "resolved",
          contextReferences: ["ex_004_01"]
        }
      ]
    },
    {
      ledgerId: "ledger_005",
      title: "Financial Independence Strategy",
      dateCreated: "2025-06-14", 
      globalMetaTags: ["financial_planning", "economic_instability", "wealth_preservation"],
      summary: "Discussing strategies for achieving financial independence in an unstable economic environment",
      conversations: [
        {
          exchangeId: "ex_005_01",
          timestamp: "2025-06-14T11:10:00",
          userMessage: "Is financial independence still achievable with inflation destroying savings?",
          userMetaTags: ["financial_planning", "inflation", "economic_instability"],
          councilResponse: "Traditional financial independence through savings alone has been undermined by currency debasement, but alternative strategies remain viable. Focus on inflation-resistant assets: real estate, productive land, business ownership, hard assets, and skills that retain value regardless of monetary conditions. Develop multiple income streams rather than depending on single employment. Build local economic networks and barter capabilities. The key is creating antifragile systems that benefit from instability rather than depending on institutional stability. This requires higher financial literacy and entrepreneurial thinking than previous generations needed.",
          councilMetaTags: ["alternative_economics", "asset_diversification", "economic_resilience"],
          status: "unresolved",
          contextReferences: []
        },
        {
          exchangeId: "ex_005_02",
          timestamp: "2025-06-14T11:18:00",
          userMessage: "Should I invest in cryptocurrency or stick to traditional investments like stocks?",
          userMetaTags: ["cryptocurrency", "investment_strategy", "portfolio_diversification"],
          councilResponse: "Both crypto and traditional investments carry different risk profiles during monetary transition. Traditional assets (stocks, bonds) remain anchored to established systems but face devaluation through currency printing and institutional capture. Crypto offers potential hedge against traditional system collapse but carries volatility and regulatory risk. A balanced approach: maintain traditional assets for stability, allocate small percentage to crypto for asymmetric upside, but prioritize tangible assets (land, tools, skills, relationships) that retain value regardless of monetary system. The fundamental question isn't which investment vehicle but how to preserve wealth during systemic change.",
          councilMetaTags: ["monetary_transition", "risk_management", "wealth_preservation"],
          status: "resolved",
          contextReferences: ["ex_005_01"]
        }
      ]
    },
    {
      ledgerId: "ledger_006",
      title: "Health Sovereignty Navigation",
      dateCreated: "2025-04-11",
      globalMetaTags: ["health_sovereignty", "medical_autonomy", "alternative_medicine"],
      summary: "Exploring how to make informed health decisions while navigating institutional healthcare",
      conversations: [
        {
          exchangeId: "ex_006_01",
          timestamp: "2025-04-11T13:30:00",
          userMessage: "How do I make informed health decisions when I don't trust mainstream medical advice?",
          userMetaTags: ["health_sovereignty", "medical_autonomy", "informed_consent"],
          councilResponse: "Medical sovereignty requires developing personal health literacy while strategically engaging institutional healthcare when beneficial. Build foundational knowledge of anatomy, nutrition, and preventive principles. Cultivate relationships with practitioners who respect patient autonomy and integrate multiple healing modalities. Use institutional medicine for acute emergencies and diagnostic tools while maintaining decision-making authority. Develop alternative health support networks and learn traditional healing methods. Document your health choices and reasoning to maintain consistency under pressure.",
          councilMetaTags: ["health_literacy", "practitioner_relationships", "integrative_medicine"],
          status: "unresolved",
          contextReferences: []
        },
        {
          exchangeId: "ex_006_02",
          timestamp: "2025-04-11T13:38:00",
          userMessage: "What's the most effective way to research health information without getting overwhelmed by conflicting studies?",
          userMetaTags: ["health_research", "scientific_literacy", "information_evaluation"],
          councilResponse: "Focus on research methodology and funding sources rather than just conclusions. Look for studies with proper control groups, adequate sample sizes, and longer time frames. Identify who funded the research and whether they benefit from specific outcomes. Prioritize meta-analyses and systematic reviews over single studies. Pay attention to biological plausibility - does the mechanism make sense? Cross-reference findings across different research traditions (Western medical, traditional medicine, biochemistry). Most importantly, observe your own body's responses to different interventions. Your direct experience, properly tracked, provides valuable data alongside formal research.",
          councilMetaTags: ["research_methodology", "evidence_assessment", "personal_experimentation"],
          status: "resolved",
          contextReferences: ["ex_006_01"]
        }
      ]
    },
    {
      ledgerId: "ledger_007",
      title: "Digital Privacy and Surveillance",
      dateCreated: "2025-08-17",
      globalMetaTags: ["digital_privacy", "surveillance", "data_sovereignty"],
      summary: "Understanding digital surveillance threats and implementing privacy protection strategies",
      conversations: [
        {
          exchangeId: "ex_007_01",
          timestamp: "2025-08-17T15:45:00",
          userMessage: "How concerned should I be about digital surveillance and privacy?",
          userMetaTags: ["digital_privacy", "surveillance", "personal_freedom"],
          councilResponse: "Digital surveillance has reached unprecedented levels with direct implications for personal freedom and social control. Every digital interaction creates behavioral profiles used for influence and potential exclusion from economic opportunities. However, complete digital withdrawal is impractical. Strategic approach: understand your threat model (who might target you and why), use privacy tools proportional to your risk level, maintain alternative communication channels, and develop digital literacy to recognize manipulation. The goal isn't perfect privacy but maintaining agency and choice while resisting normalization of total surveillance.",
          councilMetaTags: ["threat_assessment", "digital_literacy", "privacy_strategy"],
          status: "unresolved",
          contextReferences: []
        },
        {
          exchangeId: "ex_007_02",
          timestamp: "2025-08-17T15:53:00",
          userMessage: "What are the most important privacy tools I should start using immediately?",
          userMetaTags: ["privacy_tools", "digital_security", "data_protection"],
          councilResponse: "Start with high-impact, low-friction changes: use Signal for messaging, switch to a privacy-focused browser like Brave or Firefox with uBlock Origin, use a VPN for browsing, and enable two-factor authentication on important accounts. For email, consider ProtonMail or Tutanota. Use privacy-focused search engines like DuckDuckGo or Startpage. Most importantly, change your default mindset: assume everything digital is being monitored and ask whether you need to make each digital interaction. The most powerful privacy tool is often choosing not to create the digital record in the first place.",
          councilMetaTags: ["security_tools", "privacy_mindset", "digital_minimalism"],
          status: "resolved",
          contextReferences: ["ex_007_01"]
        }
      ]
    },
    {
      ledgerId: "ledger_008",
      title: "Creative Integrity and Commerce",
      dateCreated: "2025-01-29",
      globalMetaTags: ["artistic_integrity", "creative_commerce", "authentic_expression"],
      summary: "Balancing artistic authenticity with commercial needs and market pressures",
      conversations: [
        {
          exchangeId: "ex_008_01",
          timestamp: "2025-01-29T12:15:00",
          userMessage: "How do I maintain artistic integrity while needing to make money from creative work?",
          userMetaTags: ["artistic_integrity", "creative_commerce", "financial_sustainability"],
          councilResponse: "The tension between artistic integrity and commercial viability requires strategic balance rather than choosing one over the other. Develop multiple revenue streams so no single source controls your creative choices. Build direct relationships with audiences who value your authentic voice rather than competing in algorithmic attention markets. Create different creative tracks - some commercial, some purely artistic - and price your authentic work to reflect its true value. Remember that commercial success can provide resources for more experimental work. The key is conscious choice rather than unconscious compromise.",
          councilMetaTags: ["revenue_diversification", "audience_development", "creative_sovereignty"],
          status: "unresolved",
          contextReferences: []
        },
        {
          exchangeId: "ex_008_02",
          timestamp: "2025-01-29T12:23:00",
          userMessage: "Should I change my art to fit what's popular on social media platforms?",
          userMetaTags: ["social_media_algorithms", "artistic_authenticity", "platform_dependency"],
          councilResponse: "Algorithmic platforms reward engagement over quality, creating a race to the bottom of human attention. Adapting your art to platform algorithms often compromises the very qualities that make it meaningful and unique. Instead, use platforms strategically to showcase your authentic work while building direct relationships that exist independent of any platform. Share your creative process, values, and story alongside finished work. Focus on attracting the right audience rather than the largest audience. The artists with lasting careers typically maintain creative integrity while learning to communicate their vision effectively, not by chasing trends.",
          councilMetaTags: ["platform_strategy", "authentic_marketing", "long_term_vision"],
          status: "resolved",
          contextReferences: ["ex_008_01"]
        }
      ]
    },
    {
      ledgerId: "ledger_009",
      title: "Community Building and Resilience",
      dateCreated: "2025-09-05",
      globalMetaTags: ["community_building", "social_isolation", "local_networks"],
      summary: "Strategies for creating meaningful community connections and building social resilience",
      conversations: [
        {
          exchangeId: "ex_009_01",
          timestamp: "2025-09-05T17:30:00",
          userMessage: "How do I build meaningful community when everyone seems isolated and busy?",
          userMetaTags: ["community_building", "social_isolation", "meaningful_connection"],
          councilResponse: "Community building requires swimming against cultural currents toward individualism and digital substitution. Start with shared activities that create natural interaction: skill sharing, food production, tool libraries, or study groups. Focus on mutual benefit rather than social networking - people bond through working together toward common goals. Establish regular rhythms people can depend on. Be prepared to invest time and vulnerability before receiving reciprocal investment. Most people crave real connection but don't know how to create it. By taking initiative, you're often providing something others desperately want.",
          councilMetaTags: ["mutual_aid", "shared_activities", "social_initiative"],
          status: "unresolved",
          contextReferences: []
        },
        {
          exchangeId: "ex_009_02",
          timestamp: "2025-09-05T17:38:00",
          userMessage: "What makes some communities last while others fall apart quickly?",
          userMetaTags: ["community_sustainability", "group_dynamics", "leadership"],
          councilResponse: "Lasting communities share several characteristics: clear shared values that guide decision-making, effective conflict resolution processes that preserve relationships while addressing problems, distributed leadership that prevents both chaos and authoritarianism, economic cooperation that creates interdependence, and cultural traditions that maintain identity across time. They also adapt to circumstances without losing core identity. Fragmenting communities typically suffer from unclear values, poor communication, concentrated power, economic competition between members, or inability to integrate newcomers. Build resilient social architecture rather than depending on charismatic leadership alone.",
          councilMetaTags: ["community_sustainability", "shared_values", "resilient_systems"],
          status: "resolved",
          contextReferences: ["ex_009_01"]
        }
      ]
    },
    {
      ledgerId: "ledger_010",
      title: "Consciousness Development and Practice",
      dateCreated: "2025-12-03",
      globalMetaTags: ["spiritual_progress", "consciousness_development", "personal_practice"],
      summary: "Exploring authentic spiritual development and the balance between individual and collective awakening",
      conversations: [
        {
          exchangeId: "ex_010_01",
          timestamp: "2025-12-03T19:15:00",
          userMessage: "How do I know if I'm making real spiritual progress or just having interesting experiences?",
          userMetaTags: ["spiritual_progress", "self_assessment", "authentic_growth"],
          councilResponse: "Authentic spiritual progress manifests through sustained changes in daily behavior and relationship quality rather than peak experiences or esoteric knowledge. Real progress includes: increased capacity for patience under stress, reduced reactive patterns and ego defensiveness, improved discernment between truth and illusion, and expanded capacity for service without attachment to recognition. Spiritual experiences can catalyze growth but don't constitute growth themselves. The test is integration - do insights translate into wisdom in ordinary circumstances? Do you become easier to live with, more trustworthy, more genuinely loving?",
          councilMetaTags: ["character_development", "spiritual_integration", "practical_wisdom"],
          status: "unresolved",
          contextReferences: []
        },
        {
          exchangeId: "ex_010_02",
          timestamp: "2025-12-03T19:23:00",
          userMessage: "Should I focus on individual spiritual development or community engagement for awakening?",
          userMetaTags: ["individual_vs_collective", "spiritual_community", "balanced_development"],
          councilResponse: "Individual and collective awakening are interdependent processes that mutually catalyze each other. Personal development creates capacity for authentic relationship and clear discernment - essential for healthy collective function. Collective engagement provides supportive environment and larger purpose that accelerate individual growth. However, neither alone is sufficient. Individual focus without community can become narcissistic bypassing. Community focus without personal work can become groupthink or mob dynamics. The integration requires individuals committed to their own growth who also engage responsibly in collective transformation. Both levels must evolve together for sustainable awakening.",
          councilMetaTags: ["holistic_development", "community_engagement", "spiritual_balance"],
          status: "resolved",
          contextReferences: ["ex_010_01"]
        }
      ]
    }
  ],

  // Index structures for fast lookups
  indexes: {
    byDate: new Map(),
    byMetaTag: new Map(),
    byStatus: new Map(),
    byLedger: new Map()
  },

  // Caching for search results
  searchCache: new Map(),
  userPatterns: new Map()
}

// Build indexes on initialization
function buildIndexes() {
  // Clear existing indexes
  pastConversations.indexes.byDate.clear();
  pastConversations.indexes.byMetaTag.clear();
  pastConversations.indexes.byStatus.clear();
  pastConversations.indexes.byLedger.clear();

  pastConversations.ledgers.forEach(ledger => {
    // Index by ledger ID
    pastConversations.indexes.byLedger.set(ledger.ledgerId, ledger);

    // Index by date
    const dateKey = ledger.dateCreated;
    if (!pastConversations.indexes.byDate.has(dateKey)) {
      pastConversations.indexes.byDate.set(dateKey, []);
    }

    ledger.conversations.forEach(exchange => {
      // Add to date index
      const exchangeDate = exchange.timestamp.split('T')[0];
      if (!pastConversations.indexes.byDate.has(exchangeDate)) {
        pastConversations.indexes.byDate.set(exchangeDate, []);
      }
      pastConversations.indexes.byDate.get(exchangeDate).push({
        ledgerId: ledger.ledgerId,
        exchangeId: exchange.exchangeId,
        exchange: exchange,
        ledger: ledger
      });

      // Index by status
      if (!pastConversations.indexes.byStatus.has(exchange.status)) {
        pastConversations.indexes.byStatus.set(exchange.status, []);
      }
      pastConversations.indexes.byStatus.get(exchange.status).push({
        ledgerId: ledger.ledgerId,
        exchangeId: exchange.exchangeId,
        exchange: exchange,
        ledger: ledger
      });

      // Index by meta tags (both user and council tags)
      const allTags = [
        ...ledger.globalMetaTags || [],
        ...exchange.userMetaTags || [],
        ...exchange.councilMetaTags || []
      ];

      const uniqueTags = [...new Set(allTags)];
      uniqueTags.forEach(tag => {
        if (!pastConversations.indexes.byMetaTag.has(tag)) {
          pastConversations.indexes.byMetaTag.set(tag, []);
        }
        // Calculate relevance score based on tag position
        const relevanceScore = exchange.councilMetaTags?.includes(tag) ? 0.9 :
                               exchange.userMetaTags?.includes(tag) ? 0.8 : 0.7;

        pastConversations.indexes.byMetaTag.get(tag).push({
          ledgerId: ledger.ledgerId,
          exchangeId: exchange.exchangeId,
          relevanceScore: relevanceScore,
          exchange: exchange,
          ledger: ledger
        });
      });
    });
  });
}

// Core Retrieval Functions

function getConversationsByDate(dateRange) {
  const { startDate, endDate } = dateRange;
  const results = [];

  pastConversations.indexes.byDate.forEach((conversations, date) => {
    if (date >= startDate && date <= endDate) {
      results.push(...conversations);
    }
  });

  return results.sort((a, b) => b.exchange.timestamp.localeCompare(a.exchange.timestamp));
}

function searchByMetaTags(tagArray, operator = 'OR') {
  if (!tagArray || tagArray.length === 0) return [];

  const resultMap = new Map();

  tagArray.forEach(tag => {
    const tagResults = pastConversations.indexes.byMetaTag.get(tag) || [];
    tagResults.forEach(result => {
      const key = `${result.ledgerId}_${result.exchangeId}`;
      if (!resultMap.has(key)) {
        resultMap.set(key, {
          ...result,
          matchedTags: [tag],
          totalRelevance: result.relevanceScore
        });
      } else {
        const existing = resultMap.get(key);
        existing.matchedTags.push(tag);
        existing.totalRelevance += result.relevanceScore;
      }
    });
  });

  // Filter based on operator
  let results = Array.from(resultMap.values());
  if (operator === 'AND') {
    results = results.filter(r => r.matchedTags.length === tagArray.length);
  }

  // Sort by relevance score
  return results.sort((a, b) => b.totalRelevance - a.totalRelevance);
}

function getFullLedger(ledgerId) {
  return pastConversations.indexes.byLedger.get(ledgerId) || null;
}

function searchFullText(queryString) {
  if (!queryString) return [];

  const query = queryString.toLowerCase();
  const results = [];

  pastConversations.ledgers.forEach(ledger => {
    ledger.conversations.forEach(exchange => {
      let score = 0;
      let highlights = [];

      // Search in user message
      if (exchange.userMessage.toLowerCase().includes(query)) {
        score += 2;
        highlights.push('userMessage');
      }

      // Search in council response
      if (exchange.councilResponse.toLowerCase().includes(query)) {
        score += 1.5;
        highlights.push('councilResponse');
      }

      // Search in ledger title
      if (ledger.title.toLowerCase().includes(query)) {
        score += 1;
        highlights.push('title');
      }

      // Search in tags
      const allTags = [
        ...ledger.globalMetaTags || [],
        ...exchange.userMetaTags || [],
        ...exchange.councilMetaTags || []
      ];

      if (allTags.some(tag => tag.toLowerCase().includes(query))) {
        score += 0.5;
        highlights.push('tags');
      }

      if (score > 0) {
        results.push({
          ledgerId: ledger.ledgerId,
          exchangeId: exchange.exchangeId,
          exchange: exchange,
          ledger: ledger,
          score: score,
          highlights: highlights
        });
      }
    });
  });

  return results.sort((a, b) => b.score - a.score);
}

// Dashboard Integration Functions

function getRecentConversations(limit = 10) {
  const allConversations = [];

  pastConversations.ledgers.forEach(ledger => {
    ledger.conversations.forEach(exchange => {
      allConversations.push({
        ledgerId: ledger.ledgerId,
        exchangeId: exchange.exchangeId,
        exchange: exchange,
        ledger: ledger,
        timestamp: exchange.timestamp
      });
    });
  });

  return allConversations
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, limit);
}

function getConversationsByStatus(statusFilter) {
  if (statusFilter === 'all') {
    return getRecentConversations(1000); // Get all
  }

  return pastConversations.indexes.byStatus.get(statusFilter) || [];
}

function getTagCloud() {
  const tagCounts = new Map();

  pastConversations.ledgers.forEach(ledger => {
    // Count global tags
    ledger.globalMetaTags?.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });

    // Count exchange tags
    ledger.conversations.forEach(exchange => {
      exchange.userMetaTags?.forEach(tag => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
      exchange.councilMetaTags?.forEach(tag => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });
  });

  // Convert to array and sort by frequency
  const tagArray = Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);

  return {
    tags: tagArray,
    totalTags: tagArray.length,
    maxCount: tagArray[0]?.count || 0
  };
}

function getMemoryStats() {
  const stats = {
    totalLedgers: pastConversations.ledgers.length,
    totalConversations: 0,
    statusCounts: {
      resolved: 0,
      unresolved: 0,
      dismissed: 0
    },
    dateRange: {
      earliest: null,
      latest: null
    },
    topTags: [],
    domainDistribution: new Map()
  };

  let earliestDate = null;
  let latestDate = null;

  pastConversations.ledgers.forEach(ledger => {
    stats.totalConversations += ledger.conversations.length;

    // Track date range
    ledger.conversations.forEach(exchange => {
      const date = exchange.timestamp;
      if (!earliestDate || date < earliestDate) earliestDate = date;
      if (!latestDate || date > latestDate) latestDate = date;

      // Count statuses
      if (stats.statusCounts[exchange.status] !== undefined) {
        stats.statusCounts[exchange.status]++;
      }
    });
  });

  stats.dateRange.earliest = earliestDate;
  stats.dateRange.latest = latestDate;

  // Get top tags
  const tagCloud = getTagCloud();
  stats.topTags = tagCloud.tags.slice(0, 10);

  return stats;
}

// Additional Helper Functions

function searchByDate(dateRange) {
  return getConversationsByDate(dateRange);
}

function getConversationPreview(ledgerId, exchangeId) {
  const ledger = pastConversations.indexes.byLedger.get(ledgerId);
  if (!ledger) return null;

  const exchange = ledger.conversations.find(c => c.exchangeId === exchangeId);
  if (!exchange) return null;

  return {
    ledgerId: ledger.ledgerId,
    ledgerTitle: ledger.title,
    exchangeId: exchange.exchangeId,
    timestamp: exchange.timestamp,
    userMessage: exchange.userMessage.substring(0, 200) + '...',
    status: exchange.status,
    tags: [...(exchange.userMetaTags || []), ...(exchange.councilMetaTags || [])]
  };
}

function getFullConversation(ledgerId, exchangeId) {
  const ledger = pastConversations.indexes.byLedger.get(ledgerId);
  if (!ledger) return null;

  const exchange = ledger.conversations.find(c => c.exchangeId === exchangeId);
  if (!exchange) return null;

  return {
    ledger: ledger,
    exchange: exchange,
    context: exchange.contextReferences?.map(refId =>
      ledger.conversations.find(c => c.exchangeId === refId)
    ).filter(Boolean) || []
  };
}

function addConversation(ledgerId, newExchange) {
  const ledger = pastConversations.indexes.byLedger.get(ledgerId);
  if (!ledger) return false;

  ledger.conversations.push(newExchange);
  buildIndexes(); // Rebuild indexes
  return true;
}

function updateConversationStatus(ledgerId, exchangeId, newStatus) {
  const ledger = pastConversations.indexes.byLedger.get(ledgerId);
  if (!ledger) return false;

  const exchange = ledger.conversations.find(c => c.exchangeId === exchangeId);
  if (!exchange) return false;

  exchange.status = newStatus;
  buildIndexes(); // Rebuild indexes
  return true;
}

function exportUserData(format = 'json') {
  if (format === 'json') {
    return JSON.stringify(pastConversations, null, 2);
  }
  // Could add other formats like CSV
  return null;
}

// Initialize indexes on load
buildIndexes();

// Export for use in dashboard
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    searchByDate,
    searchByMetaTags,
    searchFullText,
    getFullLedger,
    getConversationPreview,
    getFullConversation,
    getTagCloud,
    getMemoryStats,
    getRecentConversations,
    getConversationsByStatus,
    addConversation,
    updateConversationStatus,
    exportUserData
  };
} else {
  // Browser environment - make functions and data globally available
  window.pastConversations = pastConversations;
  window.searchByDate = searchByDate;
  window.searchByMetaTags = searchByMetaTags;
  window.searchFullText = searchFullText;
  window.getFullLedger = getFullLedger;
  window.getConversationPreview = getConversationPreview;
  window.getFullConversation = getFullConversation;
  window.getTagCloud = getTagCloud;
  window.getMemoryStats = getMemoryStats;
  window.getRecentConversations = getRecentConversations;
  window.getConversationsByStatus = getConversationsByStatus;
  window.addConversation = addConversation;
  window.updateConversationStatus = updateConversationStatus;
  window.exportUserData = exportUserData;
}
