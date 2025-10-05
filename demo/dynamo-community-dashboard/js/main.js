/**
 * DYNAMO Community Dashboard - Main Application
 * Event handlers and initialization
 */

// ===========================
// EVENT HANDLERS
// ===========================

function initEventHandlers() {
    // Project selector
    document.getElementById('projectSelect').addEventListener('change', (e) => {
        const projectId = e.target.value;
        if (projectId) {
            AppState.setProject(projectId);
            UI.renderProjectNav();
            UI.renderWorkflowTracker();
            UI.renderPackLibrary();
            UI.renderThreadList();
            UI.renderThreadHeader();
            UI.renderCurrentLens();
        }
    });
    
    // New thread button
    document.getElementById('newThreadBtn').addEventListener('click', () => {
        createNewThread();
    });
    
    // Lens tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const lens = tab.dataset.lens;
            
            // Update active tab
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active lens
            document.querySelectorAll('.lens').forEach(l => l.classList.remove('active'));
            document.getElementById(`lens${lens.charAt(0).toUpperCase() + lens.slice(1)}`).classList.add('active');
            
            AppState.setLens(lens);
            UI.renderCurrentLens();
        });
    });
    
    // Composer lane toggle
    document.querySelectorAll('.lane-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lane = btn.dataset.lane;
            
            // Update active button
            document.querySelectorAll('.lane-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update active lane
            document.querySelectorAll('.composer-lane').forEach(l => l.classList.remove('active'));
            document.getElementById(`${lane}Lane`).classList.add('active');
            
            // Update mode indicator
            const modeText = lane === 'human' ? 'Human Communication' : 'Agent Invocation';
            document.getElementById('composerMode').textContent = modeText;
            
            AppState.setLane(lane);
        });
    });
    
    // Human lane - send message
    document.getElementById('sendHumanBtn').addEventListener('click', () => {
        sendHumanMessage();
    });
    
    // Human lane - Enter key
    document.getElementById('humanInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendHumanMessage();
        }
    });
    
    // Agent lane - command input
    const commandInput = document.getElementById('commandInput');
    commandInput.addEventListener('input', (e) => {
        handleCommandInput(e.target.value);
    });
    
    // Agent lane - submit command
    document.getElementById('submitCommandBtn').addEventListener('click', () => {
        submitAgentCommand();
    });
    
    // Agent lane - cancel command
    document.getElementById('cancelCommandBtn').addEventListener('click', () => {
        cancelCommand();
    });
    
    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            UI.hideModal();
        });
    });
    
    // Modal overlay click
    document.getElementById('modalOverlay').addEventListener('click', () => {
        UI.hideModal();
    });
    
    // Ledger collapse
    document.getElementById('ledgerHeader').addEventListener('click', () => {
        const section = document.getElementById('ledgerHeader').closest('.collapsible');
        section.classList.toggle('collapsed');
    });
    
    // Help button
    document.getElementById('helpBtn').addEventListener('click', () => {
        showHelpModal();
    });

    // Go To DYNAMO Council Chat button
    document.getElementById('showAllCommsBtn').addEventListener('click', () => {
        console.log('Go To DYNAMO Council Chat clicked');
        showToast('Opening Council Chat...');
        // navigate to index.html
        window.location.href = "../index.html";
    });

    // Create project button
    document.getElementById('createProjectBtn').addEventListener('click', () => {
        showCreateProjectModal();
    });

    // Create project next button
    document.getElementById('createProjectNextBtn').addEventListener('click', () => {
        createNewProject();
    });
}

// ===========================
// HUMAN LANE FUNCTIONS
// ===========================

function sendHumanMessage() {
    const thread = AppState.getCurrentThread();
    if (!thread) {
        alert('Please select a thread first');
        return;
    }
    
    const input = document.getElementById('humanInput');
    const content = input.value.trim();
    
    if (!content) return;
    
    // Add message to thread
    AppState.addMessage(thread.id, {
        authorType: CONFIG.AUTHOR_TYPES.HUMAN,
        authorName: AppState.currentUser.name,
        content: content
    });
    
    // Log to ledger
    AppState.addLedgerEntry({
        action: 'message_sent',
        details: `Human message in "${thread.title}"`,
        threadId: thread.id,
        userId: AppState.currentUser.id
    });
    
    // Clear input
    input.value = '';
    
    // Re-render
    UI.renderDialogueLens();
    UI.renderActionLedger();
    
    // Optionally trigger auto-synthesis after a few messages
    if (thread.messages.length % 5 === 0) {
        generateSynthesis(thread.id);
    }
}

// ===========================
// AGENT LANE FUNCTIONS
// ===========================

function handleCommandInput(value) {
    const autocomplete = document.getElementById('commandAutocomplete');
    
    if (!value.startsWith('/')) {
        autocomplete.classList.add('hidden');
        return;
    }
    
    const thread = AppState.getCurrentThread();
    if (!thread || !thread.activePack) {
        autocomplete.classList.add('hidden');
        return;
    }
    
    const pack = getPackById(thread.activePack);
    if (!pack) return;
    
    const query = value.toLowerCase();
    const matches = pack.commands.filter(cmd => cmd.name.toLowerCase().startsWith(query));
    
    if (matches.length === 0) {
        autocomplete.classList.add('hidden');
        return;
    }
    
    autocomplete.innerHTML = matches.map(cmd => `
        <div class="autocomplete-item" onclick="selectCommand('${cmd.name}')">
            <strong>${cmd.name}</strong> - ${UI.escapeHtml(cmd.description)}
        </div>
    `).join('');
    
    autocomplete.classList.remove('hidden');
}

function selectCommand(commandName) {
    const thread = AppState.getCurrentThread();
    if (!thread) return;
    
    const commandDef = getCommandDef(thread.activePack, commandName);
    if (!commandDef) return;
    
    // Hide autocomplete
    document.getElementById('commandAutocomplete').classList.add('hidden');
    
    // Update input
    document.getElementById('commandInput').value = commandName;
    
    // Show command form
    renderCommandForm(commandDef);
    
    // Store pending command
    AppState.pendingCommand = {
        command: commandName,
        definition: commandDef,
        parameters: {}
    };
}

function renderCommandForm(commandDef) {
    const formContainer = document.getElementById('commandForm');
    
    formContainer.innerHTML = `
        <div style="padding: 16px; background: var(--overlay-light); border-radius: var(--radius-md); margin-top: 12px;">
            <h4 style="font-size: 13px; font-weight: 700; margin-bottom: 12px;">
                ${commandDef.name} Parameters
            </h4>
            ${commandDef.parameters.map((param, idx) => {
                return `
                    <div style="margin-bottom: 12px;">
                        <label style="display: block; font-size: 12px; font-weight: 600; margin-bottom: 4px; color: var(--text-secondary);">
                            ${UI.escapeHtml(param.name)} ${param.required ? '<span style="color: var(--accent-red);">*</span>' : ''}
                        </label>
                        ${renderParameterInput(param, idx)}
                    </div>
                `;
            }).join('')}
        </div>
    `;
    
    formContainer.classList.remove('hidden');
    
    // Enable submit button
    document.getElementById('submitCommandBtn').disabled = false;
    
    // Add change listeners
    formContainer.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('change', (e) => {
            updateCommandParameter(e.target.dataset.paramName, e.target.value);
        });
    });
}

function renderParameterInput(param, idx) {
    const paramId = `param_${idx}`;
    
    switch (param.type) {
        case 'select':
            return `
                <select id="${paramId}" data-param-name="${param.name}" style="width: 100%; padding: 8px; background: var(--bg-tertiary); border: 1px solid var(--border-normal); border-radius: var(--radius-sm); color: var(--text-primary);">
                    ${param.options.map(opt => `
                        <option value="${opt}" ${param.default === opt ? 'selected' : ''}>
                            ${UI.escapeHtml(opt)}
                        </option>
                    `).join('')}
                </select>
            `;
        case 'multiselect':
            return `
                <select id="${paramId}" data-param-name="${param.name}" multiple style="width: 100%; padding: 8px; background: var(--bg-tertiary); border: 1px solid var(--border-normal); border-radius: var(--radius-sm); color: var(--text-primary);">
                    ${param.options.map(opt => `
                        <option value="${opt}">${UI.escapeHtml(opt)}</option>
                    `).join('')}
                </select>
            `;
        case 'text':
        default:
            return `
                <input type="text" id="${paramId}" data-param-name="${param.name}" 
                       placeholder="${param.placeholder || ''}"
                       style="width: 100%; padding: 8px; background: var(--bg-tertiary); border: 1px solid var(--border-normal); border-radius: var(--radius-sm); color: var(--text-primary);" />
            `;
    }
}

function updateCommandParameter(paramName, value) {
    if (AppState.pendingCommand) {
        AppState.pendingCommand.parameters[paramName] = value;
    }
}

function submitAgentCommand() {
    const thread = AppState.getCurrentThread();
    if (!thread || !AppState.pendingCommand) return;
    
    const command = AppState.pendingCommand;
    
    // Validate required parameters
    const missingParams = command.definition.parameters
        .filter(p => p.required && !command.parameters[p.name])
        .map(p => p.name);
    
    if (missingParams.length > 0) {
        alert(`Missing required parameters: ${missingParams.join(', ')}`);
        return;
    }
    
    // Create task card message
    const taskId = generateId('task');
    const taskMessage = AppState.addMessage(thread.id, {
        authorType: CONFIG.AUTHOR_TYPES.AGENT,
        authorName: 'Agent Task',
        content: `Processing ${command.command} with parameters: ${JSON.stringify(command.parameters, null, 2)}`,
        taskStatus: CONFIG.STATUS.TASK.QUEUED,
        taskId: taskId
    });
    
    // Log to ledger
    AppState.addLedgerEntry({
        action: 'agent_command_submitted',
        details: `${command.command} submitted to ${thread.activePack}`,
        threadId: thread.id,
        taskId: taskId,
        parameters: command.parameters,
        userId: AppState.currentUser.id
    });
    
    // Clear command form
    cancelCommand();
    
    // Render dialogue
    UI.renderDialogueLens();
    UI.renderActionLedger();
    
    // Simulate agent processing
    simulateAgentProcessing(thread.id, taskId, command);
}

function cancelCommand() {
    document.getElementById('commandInput').value = '';
    document.getElementById('commandForm').innerHTML = '';
    document.getElementById('commandForm').classList.add('hidden');
    document.getElementById('commandAutocomplete').classList.add('hidden');
    document.getElementById('submitCommandBtn').disabled = true;
    AppState.pendingCommand = null;
}

// ===========================
// AGENT SIMULATION
// ===========================

function simulateAgentProcessing(threadId, taskId, command) {
    const thread = getThreadById(threadId);
    if (!thread) return;
    
    // Update task to processing
    updateTaskStatus(threadId, taskId, CONFIG.STATUS.TASK.PROCESSING);
    
    // Simulate delay
    const delay = Math.random() * (CONFIG.AGENT_RESPONSE_DELAY_MAX - CONFIG.AGENT_RESPONSE_DELAY_MIN) + CONFIG.AGENT_RESPONSE_DELAY_MIN;
    
    setTimeout(() => {
        // Generate response based on command
        const response = generateMockAgentResponse(command);
        
        // Add agent response
        AppState.addMessage(threadId, {
            authorType: CONFIG.AUTHOR_TYPES.AGENT,
            authorName: getPackById(thread.activePack).name,
            content: response.content,
            citations: response.citations,
            taskStatus: CONFIG.STATUS.TASK.COMPLETE,
            taskId: taskId
        });
        
        // Create artefact if applicable
        if (command.command === '/draft') {
            const artefact = AppState.addArtefact(threadId, {
                type: command.parameters.template || 'document',
                title: `Draft: ${command.parameters.template}`,
                status: CONFIG.STATUS.ARTEFACT.DRAFT,
                authorType: CONFIG.AUTHOR_TYPES.AGENT,
                authorName: getPackById(thread.activePack).name,
                publishedUrl: 'https://notion.so/mock-draft-url',
                ragQuery: `Generate ${command.parameters.template} from ${command.parameters.sources}`,
                retrievalResults: [
                    { source: 'Document A, Section 2.1', score: 0.92 },
                    { source: 'Document B, Page 14', score: 0.87 },
                    { source: 'Previous conversation', score: 0.81 }
                ],
                toolActions: [
                    { tool: 'notion', description: 'Created page in specified location', responseCode: 200 }
                ]
            });
        }
        
        // Update task to complete
        updateTaskStatus(threadId, taskId, CONFIG.STATUS.TASK.COMPLETE);
        
        // Re-render
        UI.renderDialogueLens();
        UI.renderArtefactsList();
        UI.renderActionLedger();
    }, delay);
}

function updateTaskStatus(threadId, taskId, status) {
    const thread = getThreadById(threadId);
    if (!thread) return;
    
    const message = thread.messages.find(m => m.taskId === taskId);
    if (message) {
        message.taskStatus = status;
        UI.renderDialogueLens();
    }
}

function generateMockAgentResponse(command) {
    const responses = {
        '/answer': {
            content: `Based on analysis of the relevant sources, here is the answer to your query:\n\nThe key finding is that the standard applies when specific conditions are met. Three primary factors must be considered: (1) the jurisdictional requirements, (2) the procedural prerequisites, and (3) the substantive merits.\n\nCurrent jurisprudence in the 5th Circuit establishes a clear framework for evaluation. The controlling precedent provides substantial guidance on application.`,
            citations: [
                'Smith v. Jones, 123 F.3d 456 (5th Cir. 2024)',
                'Brown v. State, 789 F.Supp.2d 123 (N.D. Tex. 2023)',
                'Legal treatise § 45.2'
            ]
        },
        '/draft': {
            content: `I've created a draft document using the specified template. The draft includes:\n\n- Comprehensive analysis of the relevant materials\n- Proper citations and formatting\n- Structured sections per template requirements\n- Ready for your review and editing\n\nThe document has been published to your specified Notion location. You can view and edit it there.`,
            citations: []
        },
        '/schedule': {
            content: `I've analyzed calendars for all participants and propose the following meeting times:\n\n1. **Tuesday, 2:00 PM - 3:00 PM** (All available) ⭐ Recommended\n2. Wednesday, 10:00 AM - 11:00 AM (2 tentative)\n3. Friday, 3:00 PM - 4:00 PM (All available)\n\nCalendar holds have been created for Option 1. Click to confirm and send invites.`,
            citations: []
        }
    };
    
    return responses[command.command] || {
        content: 'Agent processed your request successfully.',
        citations: []
    };
}

// ===========================
// THREAD MANAGEMENT
// ===========================

function createNewThread() {
    const project = AppState.getCurrentProject();
    if (!project) {
        alert('Please select a project first');
        return;
    }
    
    const title = prompt('Thread title:');
    if (!title) return;
    
    const newThread = {
        id: generateId('thread'),
        projectId: project.id,
        title: title,
        created: getTimestamp(),
        isPrivileged: false,
        participants: [AppState.currentUser.id],
        tags: ['general'],
        activePack: project.installedPacks[0] || null,
        messages: [],
        synthesis: '',
        decisions: [],
        questions: [],
        artefacts: []
    };
    
    MOCK_THREADS.push(newThread);
    
    // Log to ledger
    AppState.addLedgerEntry({
        action: 'thread_created',
        details: `Created thread "${title}"`,
        threadId: newThread.id,
        projectId: project.id,
        userId: AppState.currentUser.id
    });
    
    // Select the new thread
    AppState.setThread(newThread.id);
    
    // Re-render
    UI.renderThreadList();
    UI.renderThreadHeader();
    UI.renderCurrentLens();
    UI.renderActivePackInfo();
    UI.renderActionLedger();
}

function generateSynthesis(threadId) {
    const thread = getThreadById(threadId);
    if (!thread) return;
    
    thread.synthesis = `Council synthesis generated from ${thread.messages.length} messages:\n\nKey themes identified: The discussion has focused on establishing foundational understanding and coordinating next steps. Multiple perspectives have been shared, with convergence on primary objectives.\n\nOpen questions requiring resolution: Further clarification needed on specific implementation details and timeline considerations.\n\nRecommended actions: Continue collaborative dialogue and leverage agent capabilities for deeper analysis where appropriate.`;
    
    if (AppState.currentLens === CONFIG.LENSES.SYNTHESIS) {
        UI.renderSynthesisLens();
    }
}

// ===========================
// PROJECT CREATION
// ===========================

function showCreateProjectModal() {
    // Clear previous inputs
    document.getElementById('projectNameInput').value = '';
    document.querySelectorAll('input[name="projectUser"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    UI.showModal('createProjectModal');
}

function createNewProject() {
    const projectName = document.getElementById('projectNameInput').value.trim();
    const selectedUsers = Array.from(document.querySelectorAll('input[name="projectUser"]:checked'))
        .map(checkbox => ({
            userId: checkbox.value,
            role: CONFIG.ROLES.OWNER // Default role
        }));

    // Validation
    if (!projectName) {
        alert('Please enter a project name');
        return;
    }

    if (selectedUsers.length === 0) {
        alert('Please select at least one team member');
        return;
    }

    // Create new project
    const newProject = {
        id: generateId('proj'),
        workspaceId: 'ws1',
        name: projectName,
        description: `Project created by ${AppState.currentUser.name}`,
        created: getTimestamp(),
        installedPacks: [],
        members: selectedUsers,
        workflow: [],
        currentPhaseIndex: 0
    };

    // Add to mock projects
    MOCK_PROJECTS.push(newProject);

    // Log to ledger
    AppState.addLedgerEntry({
        action: 'project_created',
        details: `Created project "${projectName}" with ${selectedUsers.length} members`,
        projectId: newProject.id,
        userId: AppState.currentUser.id
    });

    // Update project selector dropdown
    UI.renderProjectSelector();

    // Close modal
    UI.hideModal();

    // Show success message
    showToast(`Project "${projectName}" created successfully!`);
}

// ===========================
// HELP MODAL
// ===========================

function showHelpModal() {
    const thread = AppState.getCurrentThread();
    const pack = thread ? getPackById(thread.activePack) : null;
    
    const modalBody = document.getElementById('helpModal').querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <h3 style="margin-bottom: 16px;">Available Commands</h3>
        
        ${pack ? `
            <div style="margin-bottom: 24px;">
                <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 12px; color: var(--accent-purple);">
                    ${pack.name}
                </h4>
                ${pack.commands.map(cmd => `
                    <div style="margin-bottom: 16px; padding: 12px; background: var(--overlay-light); border-radius: var(--radius-sm);">
                        <div style="font-weight: 700; color: ${COLORS.AGENT}; margin-bottom: 6px;">
                            ${cmd.name}
                        </div>
                        <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px;">
                            ${UI.escapeHtml(cmd.description)}
                        </div>
                        <div style="font-size: 12px; color: var(--text-muted);">
                            Parameters: ${cmd.parameters.map(p => p.name + (p.required ? '*' : '')).join(', ')}
                        </div>
                    </div>
                `).join('')}
            </div>
        ` : '<p class="empty-state">No pack active. Select a thread with an installed pack to see available commands.</p>'}
        
        <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border-subtle);">
            <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 12px;">Keyboard Shortcuts</h4>
            <div style="font-size: 13px; color: var(--text-secondary);">
                <div style="margin-bottom: 6px;"><kbd>Enter</kbd> - Send human message (without Shift)</div>
                <div style="margin-bottom: 6px;"><kbd>Shift + Enter</kbd> - New line in composer</div>
                <div style="margin-bottom: 6px;"><kbd>/</kbd> - Start typing command in Agent Lane</div>
            </div>
        </div>
    `;
    
    UI.showModal('helpModal');
}

// ===========================
// UTILITY FUNCTIONS
// ===========================

function showToast(message, duration = 3000) {
    // Create toast element if it doesn't exist
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: rgba(6, 182, 212, 0.95);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        document.body.appendChild(toast);
    }

    // Set message and show
    toast.textContent = message;
    toast.style.opacity = '1';

    // Hide after duration
    setTimeout(() => {
        toast.style.opacity = '0';
    }, duration);
}

// ===========================
// INITIALIZATION
// ===========================

function initializeApp() {
    console.log('Initializing DYNAMO Community Dashboard...');

    // Render initial UI
    UI.renderProjectSelector();
    UI.renderWorkflowTracker();
    UI.renderPackLibrary();
    UI.renderThreadList();
    UI.renderThreadHeader();
    UI.renderCurrentLens();
    UI.renderActivePackInfo();
    UI.renderArtefactsList();
    UI.renderActionLedger();

    // Set up event handlers
    initEventHandlers();

    console.log('✓ Dashboard initialized');
    console.log('Select a project from the dropdown to get started');
}

// ===========================
// START APPLICATION
// ===========================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Make functions globally available for onclick handlers
window.selectCommand = selectCommand;
