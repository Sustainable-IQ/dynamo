/**
 * DYNAMO Community Dashboard - Mock Data
 * Sample data structures for demonstration
 */

// Workspaces
const MOCK_WORKSPACES = [
    {
        id: 'ws1',
        name: 'Default Workspace',
        created: '2025-01-15'
    }
];

// Projects
// Projects
const MOCK_PROJECTS = [
    {
        id: 'proj_legal_001',
        workspaceId: 'ws1',
        name: 'ACME v. Northwind',
        description: 'Legal case management for ACME lawsuit',
        created: '2025-03-01',
        installedPacks: ['legal-research-v1'],
        members: [
            { userId: 'user_sarah', role: CONFIG.ROLES.OWNER },
            { userId: 'user_mike', role: CONFIG.ROLES.DECISION_APPROVER }
        ],
        workflow: [
            { id: 'phase_1', name: 'Research & Analysis', status: 'complete' },
            { id: 'phase_2', name: 'Motion Drafting', status: 'active' },
            { id: 'phase_3', name: 'Filing & Service', status: 'pending' },
            { id: 'phase_4', name: 'Response Phase', status: 'pending' }
        ],
        currentPhaseIndex: 1
    },
    {
        id: 'proj_agile_001',
        workspaceId: 'ws1',
        name: 'Mobile Banking App Redesign',
        description: 'Agile project for mobile banking UX overhaul',
        created: '2025-01-29',
        installedPacks: ['agile-pm-v1'],
        members: [
            { userId: 'user_jessica', role: CONFIG.ROLES.OWNER },
            { userId: 'user_marcus', role: CONFIG.ROLES.AGENT_INVOKER }
        ],
        workflow: [
            { id: 'phase_1', name: 'Sprint 1: Planning', status: 'complete' },
            { id: 'phase_2', name: 'Sprint 1: Execution', status: 'active' },
            { id: 'phase_3', name: 'Sprint 1: Review', status: 'pending' },
            { id: 'phase_4', name: 'Sprint 1: Retrospective', status: 'pending' }
        ],
        currentPhaseIndex: 1
    },
];

// Agent Packs
const MOCK_AGENT_PACKS = [
    {
        id: 'legal-research-v1',
        name: 'Legal Research Pack',
        version: '1.0.0',
        domain: 'legal',
        description: 'Five specialized agents for legal research, memo drafting, and case analysis',
        agents: [
            { name: 'Legal Researcher', role: 'Research legal questions with citations' },
            { name: 'Legal Drafter', role: 'Draft legal documents from templates' },
            { name: 'Scheduler', role: 'Propose attorney meeting times' }
        ],
        tools: ['Notion', 'Google Calendar', 'Google Meet'],
        guardrails: [
            'Jurisdiction filtering (5th Circuit, Texas State)',
            'Privilege awareness (summary-only mode)',
            'Citation verification (85% confidence threshold)',
            'PII redaction enabled'
        ],
        commands: [
            {
                name: '/answer',
                description: 'Research legal question with cited answer',
                parameters: [
                    { name: 'query', type: 'text', required: true },
                    { name: 'sources', type: 'select', options: ['all', 'project_docs', 'workspace_library'], default: 'all' },
                    { name: 'confidence_threshold', type: 'select', options: ['high', 'medium', 'exploratory'], default: 'high' }
                ]
            },
            {
                name: '/draft',
                description: 'Draft legal document from template',
                parameters: [
                    { name: 'template', type: 'select', options: ['research_memo', 'motion_to_dismiss', 'appellate_brief'], required: true },
                    { name: 'sources', type: 'multiselect', options: ['previous_answer', 'project_docs', 'specific_cases'], required: true },
                    { name: 'destination', type: 'text', placeholder: 'Notion/ACME/Memos', required: true }
                ]
            },
            {
                name: '/schedule',
                description: 'Propose attorney meeting times',
                parameters: [
                    { name: 'participants', type: 'text', placeholder: '@Sarah, @Mike', required: true },
                    { name: 'duration', type: 'select', options: ['30min', '1hr', '2hr'], default: '1hr' },
                    { name: 'constraints', type: 'text', placeholder: 'Before Friday, mornings only' },
                    { name: 'action', type: 'select', options: ['propose', 'book'], default: 'propose' }
                ]
            }
        ],
        ragSources: ['Project uploads', 'Workspace legal library'],
        citationStyle: 'Bluebook pincite'
    },
    {
        id: 'agile-pm-v1',
        name: 'Agile Project Management Pack',
        version: '1.0.0',
        domain: 'software_development',
        description: 'Five specialized agents for agile software development (Envision, Speculate, Explore, Adapt, Close)',
        agents: [
            { name: 'Envision Agent', role: 'Vision & goal definition' },
            { name: 'Speculate Agent', role: 'Backlog management & prioritization' },
            { name: 'Explore Agent', role: 'Development & testing guidance' },
            { name: 'Adapt Agent', role: 'Retrospectives & continuous improvement' },
            { name: 'Close Agent', role: 'Release & knowledge capture' }
        ],
        tools: ['Notion', 'Google Calendar', 'GitHub'],
        guardrails: [
            'Story point range: 1-13',
            'Sprint capacity warnings (>20% over velocity)',
            'Blocked item escalation (>3 days)',
            'Testing gate requirements'
        ],
        commands: [
            {
                name: '/answer',
                description: 'Answer sprint methodology question',
                parameters: [
                    { name: 'query', type: 'text', required: true },
                    { name: 'sources', type: 'select', options: ['playbook', 'project_docs'], default: 'playbook' }
                ]
            },
            {
                name: '/draft',
                description: 'Draft sprint artifact',
                parameters: [
                    { name: 'template', type: 'select', options: ['retrospective', 'synthesis', 'user_stories'], required: true },
                    { name: 'sources', type: 'select', options: ['this_thread', 'project_docs'], default: 'this_thread' },
                    { name: 'destination', type: 'text', placeholder: 'Notion/Sprint12', required: true }
                ]
            },
            {
                name: '/schedule',
                description: 'Schedule agile ceremony',
                parameters: [
                    { name: 'ceremony', type: 'select', options: ['sprint_planning', 'daily_standup', 'sprint_review', 'retrospective'], required: true },
                    { name: 'participants', type: 'text', placeholder: 'All team', required: true },
                    { name: 'constraints', type: 'text', placeholder: 'Timing preferences' }
                ]
            }
        ],
        ragSources: ['Scrum Guide', 'Agile best practices', 'Project history'],
        citationStyle: 'Inline links'
    }
];

// Threads (sample data for legal project)
// Threads (sample data for legal project) - WITH POPULATED DATA
const MOCK_THREADS = [
    {
        id: 'thread_001',
        projectId: 'proj_legal_001',
        title: 'Jurisdiction Strategy',
        created: '2025-03-15T10:30:00Z',
        isPrivileged: false,
        participants: ['user_sarah', 'user_mike'],
        tags: ['jurisdiction', 'venue', 'motion'],
        activePack: 'legal-research-v1',
        messages: [
            {
                id: 'msg_001',
                timestamp: '2025-03-15T10:35:00Z',
                authorType: CONFIG.AUTHOR_TYPES.HUMAN,
                authorName: 'Sarah Chen',
                content: 'We need to research venue transfer standards for federal court. Focus on 5th Circuit precedents from last 3 years.'
            },
            {
                id: 'msg_002',
                timestamp: '2025-03-15T10:38:00Z',
                authorType: CONFIG.AUTHOR_TYPES.HUMAN,
                authorName: 'Mike Torres',
                content: 'Agreed. Also need to consider witness convenience factors - most of our key witnesses are in Eastern District.'
            },
            {
                id: 'msg_003',
                timestamp: '2025-03-15T10:42:00Z',
                authorType: CONFIG.AUTHOR_TYPES.AGENT,
                authorName: 'Legal Research Pack',
                content: 'Based on analysis of 8 recent 5th Circuit cases, the standard for venue transfer requires showing: (1) convenience of witnesses, (2) access to proof, (3) availability of compulsory process, and (4) practical considerations. The burden of proof rests with the moving party to demonstrate that transfer serves the convenience of parties and witnesses and promotes the interests of justice.',
                citations: [
                    'Smith v. Jones, 123 F.3d 456, 461 (5th Cir. 2024)',
                    'Brown v. State Corp., 789 F.3d 234 (5th Cir. 2023)',
                    'Wilson v. Tech Industries, 456 F.3d 789 (5th Cir. 2023)'
                ],
                taskStatus: CONFIG.STATUS.TASK.COMPLETE,
                taskId: 'task_001'
            },
            {
                id: 'msg_004',
                timestamp: '2025-03-15T10:48:00Z',
                authorType: CONFIG.AUTHOR_TYPES.HUMAN,
                authorName: 'Sarah Chen',
                content: 'Excellent research. Let\'s draft a memo on this and then decide whether to file the motion.'
            }
        ],
        synthesis: 'The team has identified venue transfer as a viable strategy, focusing on 5th Circuit standards. Legal research confirms a four-factor test with emphasis on witness convenience. The Eastern District location aligns well with witness proximity, strengthening the motion\'s foundation. Next step: draft research memo for internal review before filing decision.',
        decisions: [
            {
                id: 'dec_001',
                timestamp: '2025-03-15T11:00:00Z',
                title: 'File motion to transfer venue to Eastern District of Texas',
                owner: 'Sarah Chen',
                proposedBy: 'Sarah Chen',
                rationale: 'Research memo shows 89% success rate for transfer motions when witness convenience is primary factor. Our key witnesses are in Eastern District, creating strong jurisdictional argument.',
                evidenceLinks: ['Research memo - Venue Standards', 'Agent analysis of 8 cases'],
                status: CONFIG.STATUS.DECISION.PROPOSED,
                agentProposed: false
            }
        ],
        questions: [
            {
                id: 'q_001',
                timestamp: '2025-03-15T10:50:00Z',
                prompt: 'What is the typical timeline for venue transfer motions in 5th Circuit?',
                askedBy: 'Mike Torres',
                status: CONFIG.STATUS.QUESTION.ANSWERED,
                answer: 'Based on recent case analysis, venue transfer motions in the 5th Circuit typically take 45-90 days from filing to ruling. The court usually schedules a hearing within 30 days, with additional time for briefing and the judge\'s decision. Expedited consideration can be requested for time-sensitive matters.',
                confidence: 0.87
            }
        ],
        artefacts: [
            {
                id: 'art_001',
                timestamp: '2025-03-15T10:55:00Z',
                type: 'research_memo',
                title: 'Venue Transfer Standards - 5th Circuit Analysis',
                status: CONFIG.STATUS.ARTEFACT.DRAFT,
                authorType: CONFIG.AUTHOR_TYPES.AGENT,
                authorName: 'Legal Research Pack',
                publishedUrl: 'https://notion.so/acme/venue-research-memo',
                ragQuery: 'venue transfer standards 5th circuit recent precedents',
                retrievalResults: [
                    { source: 'Smith v. Jones, 123 F.3d 456', score: 0.94 },
                    { source: 'Brown v. State Corp., 789 F.3d 234', score: 0.91 },
                    { source: 'Wilson v. Tech Industries, 456 F.3d 789', score: 0.88 },
                    { source: 'Federal Courts Treatise § 104.2', score: 0.82 }
                ],
                toolActions: [
                    { 
                        tool: 'notion', 
                        description: 'Created memo in ACME Project > Memos folder with structured sections',
                        responseCode: 200 
                    }
                ]
            }
        ]
    },
    {
        id: 'thread_002',
        projectId: 'proj_legal_001',
        title: 'Expert Discovery',
        created: '2025-03-18T14:20:00Z',
        isPrivileged: true,
        participants: ['user_sarah', 'user_mike'],
        tags: ['discovery', 'experts', 'compliance'],
        activePack: 'legal-research-v1',
        messages: [
            {
                id: 'msg_005',
                timestamp: '2025-03-18T14:25:00Z',
                authorType: CONFIG.AUTHOR_TYPES.HUMAN,
                authorName: 'Sarah Chen',
                content: 'We need to identify qualified expert witnesses for technical testimony. Looking for someone with blockchain infrastructure expertise.'
            },
            {
                id: 'msg_006',
                timestamp: '2025-03-18T14:30:00Z',
                authorType: CONFIG.AUTHOR_TYPES.HUMAN,
                authorName: 'Mike Torres',
                content: 'I have a contact at MIT who might be suitable. Should we also consider industry practitioners vs pure academics?'
            }
        ],
        synthesis: 'Initial discussion on expert witness requirements. Team seeking blockchain infrastructure expert with strong credentials. Considering both academic and industry practitioner options for credibility balance.',
        decisions: [],
        questions: [
            {
                id: 'q_002',
                timestamp: '2025-03-18T14:35:00Z',
                prompt: 'What are the Daubert standards for expert witness qualification in technical cases?',
                askedBy: 'Sarah Chen',
                status: CONFIG.STATUS.QUESTION.OPEN
            }
        ],
        artefacts: []
    },
    {
        id: 'thread_003',
        projectId: 'proj_agile_001',
        title: 'Sprint 1 Planning',
        created: '2025-02-01T09:00:00Z',
        isPrivileged: false,
        participants: ['user_jessica', 'user_marcus'],
        tags: ['sprint_planning', 'backlog', 'user_stories'],
        activePack: 'agile-pm-v1',
        messages: [
            {
                id: 'msg_007',
                timestamp: '2025-02-01T09:15:00Z',
                authorType: CONFIG.AUTHOR_TYPES.HUMAN,
                authorName: 'Jessica Park',
                content: 'Let\'s prioritize the onboarding flow improvements for Sprint 1. The data shows 45% drop-off at account creation.'
            },
            {
                id: 'msg_008',
                timestamp: '2025-02-01T09:20:00Z',
                authorType: CONFIG.AUTHOR_TYPES.AGENT,
                authorName: 'Agile PM Pack',
                content: 'I\'ve created 8 user stories for streamlined onboarding:\n\nMUST HAVE (Sprint 1):\n1. Phone + email verification only (5 pts)\n2. Biometric login setup during onboarding (3 pts)\n3. Plaid account linking (8 pts)\n\nTotal: 16 points - matches team velocity of 14-18 pts/sprint.\n\nRecommendation: The Plaid integration (8 pts) is highest risk. Suggest technical spike first.',
                citations: ['Scrum Guide - Story Estimation', 'Team velocity data Q4 2024'],
                taskStatus: CONFIG.STATUS.TASK.COMPLETE,
                taskId: 'task_002'
            },
            {
                id: 'msg_009',
                timestamp: '2025-02-01T09:25:00Z',
                authorType: CONFIG.AUTHOR_TYPES.HUMAN,
                authorName: 'Marcus Wu',
                content: 'Good call on the Plaid spike. I\'ll need 2 days to validate the integration approach before we commit to the 8-point estimate.'
            }
        ],
        synthesis: 'Sprint 1 focuses on reducing onboarding drop-off from 45% through streamlined user flow. Agent generated 8 user stories totaling 16 points, aligned with team velocity. Plaid integration identified as highest risk item requiring technical spike before commitment.',
        decisions: [
            {
                id: 'dec_002',
                timestamp: '2025-02-01T09:30:00Z',
                title: 'Commit to 16-point Sprint 1 with onboarding focus',
                owner: 'Jessica Park',
                proposedBy: 'Jessica Park',
                rationale: 'Stories are well-defined, team capacity matches, and business priority is clear. Technical spike on Plaid reduces risk.',
                evidenceLinks: ['Agent backlog analysis', 'Team velocity data'],
                status: CONFIG.STATUS.DECISION.ACCEPTED,
                agentProposed: false
            }
        ],
        questions: [],
        artefacts: [
            {
                id: 'art_002',
                timestamp: '2025-02-01T09:22:00Z',
                type: 'sprint_plan',
                title: 'Sprint 1 Plan - Onboarding Improvements',
                status: CONFIG.STATUS.ARTEFACT.FINAL,
                authorType: CONFIG.AUTHOR_TYPES.AGENT,
                authorName: 'Agile PM Pack',
                publishedUrl: 'https://notion.so/banking-app/sprint1-plan',
                ragQuery: 'create sprint plan from user stories onboarding focus',
                retrievalResults: [
                    { source: 'Product backlog - Onboarding epic', score: 0.96 },
                    { source: 'Team velocity data Q4 2024', score: 0.89 },
                    { source: 'Scrum Guide - Sprint Planning', score: 0.84 }
                ],
                toolActions: [
                    { 
                        tool: 'notion', 
                        description: 'Created sprint plan with story breakdown and capacity allocation',
                        responseCode: 200 
                    },
                    {
                        tool: 'github',
                        description: 'Created 8 issues with labels and story points',
                        responseCode: 201
                    }
                ]
            }
        ]
    }
];

// Action Ledger entries
const MOCK_LEDGER_ENTRIES = [];

// Generate unique IDs
function generateId(prefix = 'id') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Get current timestamp
function getTimestamp() {
    return new Date().toISOString();
}

// Helper: Get project by ID
function getProjectById(projectId) {
    return MOCK_PROJECTS.find(p => p.id === projectId);
}

// Helper: Get pack by ID
function getPackById(packId) {
    return MOCK_AGENT_PACKS.find(p => p.id === packId);
}

// Helper: Get thread by ID
function getThreadById(threadId) {
    return MOCK_THREADS.find(t => t.id === threadId);
}

// Helper: Get command definition from pack
function getCommandDef(packId, commandName) {
    const pack = getPackById(packId);
    if (!pack) return null;
    return pack.commands.find(c => c.name === commandName);
}
