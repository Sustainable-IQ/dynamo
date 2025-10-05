/**
 * DYNAMO Community Dashboard - State Management
 * Centralized application state
 */

const AppState = {
    // Current selections
    currentWorkspace: CONFIG.DEFAULT_WORKSPACE,
    currentProject: null,
    currentThread: null,
    currentLens: CONFIG.LENSES.DIALOGUE,
    currentLane: CONFIG.LANES.HUMAN,
    
    // Current user (mock)
    currentUser: {
        id: 'user_sarah',
        name: 'Sarah Chen',
        email: 'sarah@firm.com',
        role: CONFIG.ROLES.OWNER
    },
    
    // UI state
    activeModal: null,
    pendingCommand: null,
    
    // Data references
    projects: MOCK_PROJECTS,
    threads: MOCK_THREADS,
    packs: MOCK_AGENT_PACKS,
    ledgerEntries: MOCK_LEDGER_ENTRIES,
    
    // Methods
    setProject(projectId) {
        this.currentProject = projectId;
        this.currentThread = null; // Reset thread when project changes
    },
    
    setThread(threadId) {
        this.currentThread = threadId;
    },
    
    setLens(lens) {
        this.currentLens = lens;
    },
    
    setLane(lane) {
        this.currentLane = lane;
    },
    
    getCurrentProject() {
        return getProjectById(this.currentProject);
    },
    
    getCurrentThread() {
        return getThreadById(this.currentThread);
    },
    
    getProjectThreads() {
        if (!this.currentProject) return [];
        return this.threads.filter(t => t.projectId === this.currentProject);
    },
    
    getInstalledPacks() {
        const project = this.getCurrentProject();
        if (!project) return [];
        return project.installedPacks
            .map(packId => getPackById(packId))
            .filter(Boolean);
    },
    
    getAvailablePacks() {
        const project = this.getCurrentProject();
        if (!project) return this.packs;
        return this.packs.filter(pack => !project.installedPacks.includes(pack.id));
    },
    
    addMessage(threadId, message) {
        const thread = getThreadById(threadId);
        if (!thread) return false;
        
        const msg = {
            id: generateId('msg'),
            timestamp: getTimestamp(),
            ...message
        };
        
        thread.messages.push(msg);
        return msg;
    },
    
    addDecision(threadId, decision) {
        const thread = getThreadById(threadId);
        if (!thread) return false;
        
        const dec = {
            id: generateId('dec'),
            timestamp: getTimestamp(),
            ...decision
        };
        
        thread.decisions.push(dec);
        return dec;
    },
    
    addQuestion(threadId, question) {
        const thread = getThreadById(threadId);
        if (!thread) return false;
        
        const q = {
            id: generateId('q'),
            timestamp: getTimestamp(),
            ...question
        };
        
        thread.questions.push(q);
        return q;
    },
    
    addArtefact(threadId, artefact) {
        const thread = getThreadById(threadId);
        if (!thread) return false;
        
        const art = {
            id: generateId('art'),
            timestamp: getTimestamp(),
            ...artefact
        };
        
        thread.artefacts.push(art);
        return art;
    },
    
    addLedgerEntry(entry) {
        const ledgerEntry = {
            id: generateId('ledger'),
            timestamp: getTimestamp(),
            ...entry
        };
        
        this.ledgerEntries.unshift(ledgerEntry); // Add to beginning
        return ledgerEntry;
    },
    
    updateDecisionStatus(threadId, decisionId, newStatus) {
        const thread = getThreadById(threadId);
        if (!thread) return false;
        
        const decision = thread.decisions.find(d => d.id === decisionId);
        if (!decision) return false;
        
        decision.status = newStatus;
        decision.updatedAt = getTimestamp();
        
        // Log to ledger
        this.addLedgerEntry({
            action: 'decision_status_changed',
            details: `Decision "${decision.title}" changed to ${newStatus}`,
            threadId,
            userId: this.currentUser.id
        });
        
        return true;
    },
    
    updateQuestionStatus(threadId, questionId, newStatus) {
        const thread = getThreadById(threadId);
        if (!thread) return false;
        
        const question = thread.questions.find(q => q.id === questionId);
        if (!question) return false;
        
        question.status = newStatus;
        question.updatedAt = getTimestamp();
        
        return true;
    },

    completeCurrentPhase() {
            const project = this.getCurrentProject();
            if (!project || !project.workflow) return false;
            
            const currentPhase = project.workflow[project.currentPhaseIndex];
            if (!currentPhase) return false;
            
            // Mark current phase complete
            currentPhase.status = 'complete';
            
            // Move to next phase if exists
            if (project.currentPhaseIndex < project.workflow.length - 1) {
                project.currentPhaseIndex++;
                project.workflow[project.currentPhaseIndex].status = 'active';
                
                // Log transition
                this.addLedgerEntry({
                    action: 'phase_transition',
                    details: `Completed "${currentPhase.name}", moved to "${project.workflow[project.currentPhaseIndex].name}"`,
                    projectId: project.id,
                    userId: this.currentUser.id
                });
                
                return true;
            }
            
            return false;
        },
        
        getCurrentPhase() {
            const project = this.getCurrentProject();
            if (!project || !project.workflow) return null;
            return project.workflow[project.currentPhaseIndex];
        },
};
