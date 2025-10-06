/**
 * DYNAMO Community Dashboard - Configuration
 * Global constants and configuration settings
 */

const CONFIG = {
    // Application metadata
    APP_NAME: 'DYNAMO Community Dashboard',
    VERSION: '1.0.0-MVP',
    
    // UI settings
    DEFAULT_WORKSPACE: 'ws1',
    MAX_RECENT_THREADS: 10,
    COMPOSER_MIN_HEIGHT: 60,
    COMPOSER_MAX_HEIGHT: 200,
    
    // Agent processing simulation
    AGENT_RESPONSE_DELAY_MIN: 2000, // ms
    AGENT_RESPONSE_DELAY_MAX: 8000, // ms
    
    // Lens types
    LENSES: {
        DIALOGUE: 'dialogue',
        SYNTHESIS: 'synthesis',
        DECISIONS: 'decisions',
        QUESTIONS: 'questions'
    },
    
    // Composer lanes
    LANES: {
        HUMAN: 'human',
        AGENT: 'agent'
    },
    
    // Message author types
    AUTHOR_TYPES: {
        HUMAN: 'human',
        AGENT: 'agent'
    },
    
    // Status types
    STATUS: {
        DECISION: {
            PROPOSED: 'proposed',
            DISCUSSED: 'discussed',
            ACCEPTED: 'accepted',
            REJECTED: 'rejected'
        },
        QUESTION: {
            OPEN: 'open',
            ATTEMPTED: 'attempted',
            ANSWERED: 'answered',
            CLOSED: 'closed'
        },
        ARTEFACT: {
            DRAFT: 'draft',
            REVIEW: 'review',
            FINAL: 'final'
        },
        TASK: {
            QUEUED: 'queued',
            PROCESSING: 'processing',
            COMPLETE: 'complete',
            FAILED: 'failed',
            REQUIRES_APPROVAL: 'requires_approval'
        }
    },
    
    // Agent Pack IDs
    PACKS: {
        LEGAL_RESEARCH: 'legal-research-v1',
        AGILE_PM: 'agile-pm-v1'
    },
    
    // Slash commands
    COMMANDS: {
        ANSWER: '/answer',
        DRAFT: '/draft',
        SCHEDULE: '/schedule',
        // Phase 2 commands (grayed out)
        SUMMARIZE: '/summarize',
        EXTRACT: '/extract',
        COMPARE: '/compare',
        PUBLISH: '/publish'
    },
    
    // User roles
    ROLES: {
        OWNER: 'owner',
        EDITOR: 'editor',
        VIEWER: 'viewer',
        AGENT_INVOKER: 'agent_invoker',
        DECISION_APPROVER: 'decision_approver'
    }
};

// Color coding for different entities
const COLORS = {
    HUMAN: '#06b6d4',      // Cyan
    AGENT: '#10b981',      // Green
    COUNCIL: '#7c3aed',    // Purple
    DECISION: '#fbbf24',   // Yellow
    QUESTION: '#f59e0b',   // Orange
    ARTEFACT: '#4f46e5',   // Blue
    ERROR: '#ef4444'       // Red
};

// Provenance badge templates
const PROVENANCE = {
    human: {
        color: COLORS.HUMAN,
        icon: '👤',
        label: 'Human'
    },
    agent: {
        color: COLORS.AGENT,
        icon: '🤖',
        label: 'Agent'
    },
    council: {
        color: COLORS.COUNCIL,
        icon: '⚡',
        label: 'Council'
    }
};
