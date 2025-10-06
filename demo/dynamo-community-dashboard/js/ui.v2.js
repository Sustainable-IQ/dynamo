/**
 * DYNAMO Community Dashboard - UI Rendering
 * Functions to render and update the interface
 */

const UI = {
    // ===========================
    // WORKSPACE & PROJECT & NAVIGATION
    // ===========================

    renderWorkspaceSelector() {
        const select = document.getElementById('workspaceSelect');
        select.innerHTML = '<option value="">Select a Workspace...</option>';

        AppState.workspaces.forEach(workspace => {
            const option = document.createElement('option');
            option.value = workspace.id;
            option.textContent = workspace.name;
            select.appendChild(option);
        });

        if (AppState.currentWorkspace) {
            select.value = AppState.currentWorkspace;
        }
    },

    renderProjectSelector() {
        const select = document.getElementById('projectSelect');
        select.innerHTML = '<option value="">Select Project...</option>';

        // Only show projects from selected workspace
        const projects = AppState.getWorkspaceProjects();

        projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = project.name;
            select.appendChild(option);
        });

        if (AppState.currentProject) {
            select.value = AppState.currentProject;
        }
    },
    
    renderProjectNav() {
        const container = document.getElementById('projectNav');
        const project = AppState.getCurrentProject();
        
        if (!project) {
            container.innerHTML = '<p class="empty-state">Select a project from the top menu</p>';
            return;
        }
        
        container.innerHTML = `
            <div class="project-card">
                <h4 style="margin-bottom: 8px; font-weight: 700;">${this.escapeHtml(project.name)}</h4>
                <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;">
                    ${this.escapeHtml(project.description)}
                </p>
                <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
                    ${project.installedPacks.map(packId => {
                        const pack = getPackById(packId);
                        return `<span class="chip chip-small">${pack ? pack.name : packId}</span>`;
                    }).join('')}
                </div>
                ${project.members && project.members.length > 0 ? `
                    <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border-subtle);">
                        <h5 style="font-size: 11px; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px;">TEAM MEMBERS</h5>
                        <div style="display: flex; flex-direction: column; gap: 6px;">
                            ${project.members.map(member => {
                                const user = AppState.users.find(u => u.userId === member.userId);
                                return `
                                    <div style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
                                        <span style="color: var(--accent-purple);">●</span>
                                        <span style="color: var(--text-primary);">${user ? this.escapeHtml(user.name) : member.userId}</span>
                                        <span style="color: var(--text-muted); font-size: 10px;">(${member.role})</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    },
    

    renderWorkflowTracker() {
            const container = document.getElementById('workflowTracker');
            const project = AppState.getCurrentProject();
            
            if (!project || !project.workflow) {
                container.innerHTML = '<p class="empty-state">No workflow defined</p>';
                return;
            }
            
            const currentPhase = AppState.getCurrentPhase();
            
            container.innerHTML = `
                <div class="workflow-tracker">
                    ${project.workflow.map((phase, index) => {
                        const isActive = phase.status === 'active';
                        const isComplete = phase.status === 'complete';
                        const isPending = phase.status === 'pending';
                        
                        return `
                            <div class="workflow-phase ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''} ${isPending ? 'pending' : ''}">
                                <div class="phase-indicator">
                                    ${isComplete ? '✓' : isActive ? '⚡' : (index + 1)}
                                </div>
                                <div class="phase-content">
                                    <div class="phase-name">${UI.escapeHtml(phase.name)}</div>
                                    <div class="phase-status">${phase.status}</div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                ${currentPhase && currentPhase.status === 'active' ? `
                    <button class="btn btn-primary btn-small" onclick="UI.completePhase()" style="width: 100%; margin-top: 12px;">
                        Complete Current Phase
                    </button>
                ` : ''}
            `;
        },
    
    completePhase() {
        const success = AppState.completeCurrentPhase();
        if (success) {
            this.renderWorkflowTracker();
            this.renderActionLedger();
            
            const currentPhase = AppState.getCurrentPhase();
            alert(`Phase transition complete!\n\nNow in: ${currentPhase.name}`);
        } else {
            alert('All phases complete!');
        }
    },

    // ===========================
    // AGENT PACKS
    // ===========================
    
    renderPackLibrary() {
        const container = document.getElementById('packLibrary');
        const availablePacks = AppState.getAvailablePacks();
        
        if (availablePacks.length === 0) {
            container.innerHTML = '<p class="empty-state">All packs installed</p>';
            return;
        }
        
        container.innerHTML = availablePacks.map(pack => `
            <div class="pack-card">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                    <div>
                        <h5 style="font-weight: 700; margin-bottom: 4px;">${this.escapeHtml(pack.name)}</h5>
                        <p style="font-size: 11px; color: var(--text-secondary);">${this.escapeHtml(pack.domain)}</p>
                    </div>
                    <button class="btn btn-small" onclick="UI.installPack('${pack.id}')" ${!AppState.currentProject ? 'disabled' : ''}>
                        Install
                    </button>
                </div>
                <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;">
                    ${this.escapeHtml(pack.description)}
                </p>
            </div>
        `).join('');
    },
    
    renderActivePackInfo() {
        const container = document.getElementById('activePackInfo');
        const thread = AppState.getCurrentThread();
        
        if (!thread || !thread.activePack) {
            container.innerHTML = '<p class="empty-state">No pack active</p>';
            return;
        }
        
        const pack = getPackById(thread.activePack);
        if (!pack) {
            container.innerHTML = '<p class="empty-state">Pack not found</p>';
            return;
        }
        
        container.innerHTML = `
            <div class="pack-info-card">
                <h4 style="font-weight: 700; margin-bottom: 8px;">${this.escapeHtml(pack.name)}</h4>
                <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px;">
                    v${pack.version} • ${this.escapeHtml(pack.domain)}
                </p>
                
                <div style="margin-bottom: 12px;">
                    <h5 style="font-size: 11px; font-weight: 700; color: var(--text-secondary); margin-bottom: 6px;">AGENTS</h5>
                    ${pack.agents.map(agent => `
                        <div style="font-size: 12px; margin-bottom: 4px;">
                            <span style="color: ${COLORS.AGENT};">●</span> ${this.escapeHtml(agent.name)}
                        </div>
                    `).join('')}
                </div>
                
                <div style="margin-bottom: 12px;">
                    <h5 style="font-size: 11px; font-weight: 700; color: var(--text-secondary); margin-bottom: 6px;">TOOLS</h5>
                    <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                        ${pack.tools.map(tool => `<span class="chip chip-small">${this.escapeHtml(tool)}</span>`).join('')}
                    </div>
                </div>
                
                <div>
                    <h5 style="font-size: 11px; font-weight: 700; color: var(--text-secondary); margin-bottom: 6px;">COMMANDS</h5>
                    ${pack.commands.map(cmd => `
                        <div style="font-size: 12px; margin-bottom: 4px; color: var(--text-secondary);">
                            <code style="color: ${COLORS.AGENT};">${cmd.name}</code> - ${this.escapeHtml(cmd.description)}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    installPack(packId) {
        const project = AppState.getCurrentProject();
        if (!project) {
            alert('Please select a project first');
            return;
        }
        
        if (!project.installedPacks.includes(packId)) {
            project.installedPacks.push(packId);
            
            // Log to ledger
            AppState.addLedgerEntry({
                action: 'pack_installed',
                details: `Installed ${getPackById(packId).name}`,
                projectId: project.id,
                packId: packId,
                userId: AppState.currentUser.id
            });
            
            this.renderPackLibrary();
            this.renderProjectNav();
            this.renderActionLedger();
            
            alert(`${getPackById(packId).name} installed successfully!`);
        }
    },
    
    // ===========================
    // THREADS
    // ===========================
    
    renderThreadList() {
        const container = document.getElementById('threadList');
        const threads = AppState.getProjectThreads();
        
        if (threads.length === 0) {
            container.innerHTML = '<p class="empty-state">No threads yet</p>';
            return;
        }
        
        container.innerHTML = threads.map(thread => `
            <div class="thread-item ${AppState.currentThread === thread.id ? 'active' : ''}" 
                 onclick="UI.selectThread('${thread.id}')">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 6px;">
                    <h5 style="font-weight: 700; font-size: 13px;">${this.escapeHtml(thread.title)}</h5>
                    ${thread.isPrivileged ? '<span class="chip chip-small" style="background: var(--accent-red); color: white;">Privileged</span>' : ''}
                </div>
                <div style="display: flex; gap: 8px; font-size: 11px; color: var(--text-secondary);">
                    <span>${thread.messages.length} msgs</span>
                    <span>•</span>
                    <span>${thread.decisions.length} decisions</span>
                    <span>•</span>
                    <span>${thread.questions.length} questions</span>
                </div>
            </div>
        `).join('');
    },
    
    selectThread(threadId) {
        AppState.setThread(threadId);
        this.renderThreadList();
        this.renderThreadHeader();
        this.renderCurrentLens();
        this.renderActivePackInfo();
        this.renderArtefactsList();
    },
    
    renderThreadHeader() {
        const thread = AppState.getCurrentThread();
        const titleEl = document.getElementById('threadTitle');
        const metaEl = document.getElementById('threadMeta');
        
        if (!thread) {
            titleEl.textContent = 'Select a thread';
            metaEl.innerHTML = '<span class="meta-item">No thread selected</span>';
            return;
        }
        
        titleEl.textContent = thread.title;
        
        const pack = getPackById(thread.activePack);
        metaEl.innerHTML = `
            <span class="meta-item">${thread.participants.length} participants</span>
            <span class="meta-item">•</span>
            <span class="meta-item">${pack ? pack.name : 'No pack'}</span>
            <span class="meta-item">•</span>
            <span class="meta-item">${thread.tags.join(', ')}</span>
        `;
    },
    
    // ===========================
    // LENSES
    // ===========================
    
    renderCurrentLens() {
        const lensMap = {
            [CONFIG.LENSES.DIALOGUE]: this.renderDialogueLens,
            [CONFIG.LENSES.SYNTHESIS]: this.renderSynthesisLens,
            [CONFIG.LENSES.DECISIONS]: this.renderDecisionsLens,
            [CONFIG.LENSES.QUESTIONS]: this.renderQuestionsLens
        };
        
        const renderFn = lensMap[AppState.currentLens];
        if (renderFn) {
            renderFn.call(this);
        }
    },
    
    renderDialogueLens() {
        const container = document.getElementById('lensDialogue');
        const thread = AppState.getCurrentThread();
        
        if (!thread || thread.messages.length === 0) {
            container.innerHTML = '<p class="empty-state">No messages yet. Start a conversation below.</p>';
            return;
        }
        
        container.innerHTML = thread.messages.map(msg => {
            const isHuman = msg.authorType === CONFIG.AUTHOR_TYPES.HUMAN;
            const provenance = isHuman ? PROVENANCE.human : PROVENANCE.agent;
            
            return `
                <div class="message-card" style="margin-bottom: 16px; padding: 12px; background: var(--overlay-light); border-left: 3px solid ${provenance.color}; border-radius: var(--radius-md);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span class="provenance-badge" style="background: ${provenance.color}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700;">
                                ${provenance.icon} ${provenance.label}
                            </span>
                            <span style="font-weight: 700; font-size: 13px;">${this.escapeHtml(msg.authorName)}</span>
                        </div>
                        <span style="font-size: 11px; color: var(--text-muted);">${this.formatTimestamp(msg.timestamp)}</span>
                    </div>
                    <div style="font-size: 14px; line-height: 1.6;">
                        ${this.escapeHtml(msg.content)}
                    </div>
                    ${msg.taskStatus ? `
                        <div style="margin-top: 8px;">
                            <span class="task-status task-status-${msg.taskStatus}" style="font-size: 11px; padding: 4px 8px; border-radius: 4px;">
                                ${msg.taskStatus.toUpperCase()}
                            </span>
                        </div>
                    ` : ''}
                    ${msg.citations && msg.citations.length > 0 ? `
                        <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border-subtle);">
                            <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 6px;">SOURCES:</div>
                            ${msg.citations.map(cite => `
                                <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">
                                    • ${this.escapeHtml(cite)}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
        
        // Auto-scroll to bottom
        container.scrollTop = container.scrollHeight;
    },
    
    renderSynthesisLens() {
        const container = document.getElementById('lensSynthesis');
        const thread = AppState.getCurrentThread();
        
        if (!thread || !thread.synthesis) {
            container.innerHTML = '<p class="empty-state">No synthesis available yet. The council will generate synthesis as conversations progress.</p>';
            return;
        }
        
        container.innerHTML = `
            <div class="synthesis-card" style="padding: 16px; background: var(--overlay-medium); border-radius: var(--radius-md);">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                    <span class="provenance-badge" style="background: ${COLORS.COUNCIL}; color: white; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700;">
                        ${PROVENANCE.council.icon} COUNCIL SYNTHESIS
                    </span>
                </div>
                <div style="font-size: 14px; line-height: 1.7; color: var(--text-primary);">
                    ${this.escapeHtml(thread.synthesis)}
                </div>
            </div>
        `;
    },
    
    renderDecisionsLens() {
        const container = document.getElementById('lensDecisions');
        const thread = AppState.getCurrentThread();
        
        if (!thread || thread.decisions.length === 0) {
            container.innerHTML = '<p class="empty-state">No decisions yet. Decisions will appear here when created.</p>';
            return;
        }
        
        container.innerHTML = thread.decisions.map(decision => {
            const statusColors = {
                proposed: COLORS.DECISION,
                discussed: COLORS.QUESTION,
                accepted: COLORS.AGENT,
                rejected: COLORS.ERROR
            };
            
            const statusColor = statusColors[decision.status] || COLORS.DECISION;
            
            return `
                <div class="decision-card" style="margin-bottom: 16px; padding: 14px; background: var(--overlay-light); border-left: 3px solid ${statusColor}; border-radius: var(--radius-md);">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                        <h5 style="font-weight: 700; font-size: 14px;">${this.escapeHtml(decision.title)}</h5>
                        <span class="status-badge" style="background: ${statusColor}; color: white; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700;">
                            ${decision.status.toUpperCase()}
                        </span>
                    </div>
                    ${decision.rationale ? `
                        <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 10px;">
                            <strong>Rationale:</strong> ${this.escapeHtml(decision.rationale)}
                        </div>
                    ` : ''}
                    ${decision.owner ? `
                        <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 6px;">
                            Owner: ${this.escapeHtml(decision.owner)}
                        </div>
                    ` : ''}
                    ${decision.evidenceLinks && decision.evidenceLinks.length > 0 ? `
                        <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 10px;">
                            Evidence: ${decision.evidenceLinks.length} linked sources
                        </div>
                    ` : ''}
                    ${decision.status === 'proposed' || decision.status === 'discussed' ? `
                        <div style="display: flex; gap: 8px; margin-top: 12px;">
                            <button class="btn btn-small" onclick="UI.updateDecisionStatus('${decision.id}', 'accepted')" style="background: ${COLORS.AGENT}; color: white; border: none;">
                                Accept
                            </button>
                            <button class="btn btn-small" onclick="UI.updateDecisionStatus('${decision.id}', 'rejected')" style="background: ${COLORS.ERROR}; color: white; border: none;">
                                Reject
                            </button>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    },
    
    renderQuestionsLens() {
        const container = document.getElementById('lensQuestions');
        const thread = AppState.getCurrentThread();
        
        if (!thread || thread.questions.length === 0) {
            container.innerHTML = '<p class="empty-state">No questions yet. Questions will appear here when asked.</p>';
            return;
        }
        
        container.innerHTML = thread.questions.map(question => {
            const statusColors = {
                open: COLORS.QUESTION,
                attempted: COLORS.QUESTION,
                answered: COLORS.AGENT,
                closed: COLORS.HUMAN
            };
            
            const statusColor = statusColors[question.status] || COLORS.QUESTION;
            
            return `
                <div class="question-card" style="margin-bottom: 16px; padding: 14px; background: var(--overlay-light); border-left: 3px solid ${statusColor}; border-radius: var(--radius-md);">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                        <div style="flex: 1;">
                            <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px;">${this.escapeHtml(question.prompt)}</div>
                            <div style="font-size: 11px; color: var(--text-muted);">
                                Asked by ${this.escapeHtml(question.askedBy)} • ${this.formatTimestamp(question.timestamp)}
                            </div>
                        </div>
                        <span class="status-badge" style="background: ${statusColor}; color: white; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700;">
                            ${question.status.toUpperCase()}
                        </span>
                    </div>
                    ${question.answer ? `
                        <div style="margin-top: 12px; padding: 12px; background: var(--overlay-medium); border-radius: var(--radius-sm);">
                            <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 6px;">ANSWER:</div>
                            <div style="font-size: 13px; line-height: 1.6;">
                                ${this.escapeHtml(question.answer)}
                            </div>
                            ${question.confidence ? `
                                <div style="margin-top: 8px; font-size: 11px; color: var(--text-muted);">
                                    Confidence: ${Math.round(question.confidence * 100)}%
                                </div>
                            ` : ''}
                        </div>
                    ` : ''}
                    ${question.status === 'answered' ? `
                        <button class="btn btn-small" onclick="UI.closeQuestion('${question.id}')" style="margin-top: 10px;">
                            Close Question
                        </button>
                    ` : ''}
                </div>
            `;
        }).join('');
    },
    
    // ===========================
    // ARTEFACTS
    // ===========================
    
    renderArtefactsList() {
        const container = document.getElementById('artefactsList');
        const thread = AppState.getCurrentThread();
        
        if (!thread || thread.artefacts.length === 0) {
            container.innerHTML = '<p class="empty-state">No artefacts yet</p>';
            return;
        }
        
        container.innerHTML = thread.artefacts.map(artefact => {
            const statusColors = {
                draft: COLORS.QUESTION,
                review: COLORS.DECISION,
                final: COLORS.AGENT
            };
            
            return `
                <div class="artefact-card" style="margin-bottom: 12px; padding: 12px; background: var(--overlay-light); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                        <h5 style="font-weight: 700; font-size: 13px;">${this.escapeHtml(artefact.title)}</h5>
                        <span class="status-badge" style="background: ${statusColors[artefact.status]}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 10px;">
                            ${artefact.status.toUpperCase()}
                        </span>
                    </div>
                    <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 8px;">
                        Type: ${this.escapeHtml(artefact.type)} • By: ${this.escapeHtml(artefact.authorName)}
                    </div>
                    <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 8px;">
                        ${this.formatTimestamp(artefact.timestamp)}
                    </div>
                    ${artefact.publishedUrl ? `
                        <a href="${artefact.publishedUrl}" target="_blank" style="font-size: 11px; color: ${COLORS.HUMAN}; text-decoration: none;">
                            📄 View in Notion →
                        </a>
                    ` : ''}
                    <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border-subtle);">
                        <button class="btn btn-small" onclick="UI.showAuditTrail('${artefact.id}')" style="width: 100%; font-size: 11px;">
                            View Audit Trail
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },
    
    // ===========================
    // ACTION LEDGER
    // ===========================
    
    renderActionLedger() {
        const container = document.getElementById('actionLedger');
        const entries = AppState.ledgerEntries.slice(0, 20); // Show last 20
        
        if (entries.length === 0) {
            container.innerHTML = '<p class="empty-state">No actions logged</p>';
            return;
        }
        
        container.innerHTML = entries.map(entry => `
            <div class="ledger-entry" style="margin-bottom: 10px; padding: 10px; background: var(--overlay-light); border-radius: var(--radius-sm); font-size: 11px; border-left: 2px solid ${COLORS.HUMAN};">
                <div style="color: var(--text-muted); margin-bottom: 4px;">
                    ${this.formatTimestamp(entry.timestamp)}
                </div>
                <div style="color: var(--text-secondary);">
                    <strong>${entry.action.toUpperCase().replace(/_/g, ' ')}</strong>
                </div>
                <div style="color: var(--text-secondary);">
                    ${this.escapeHtml(entry.details)}
                </div>
            </div>
        `).join('');
    },
    
    // ===========================
    // UTILITY METHODS
    // ===========================
    
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    },
    
    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
        
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    
    showModal(modalId) {
        document.getElementById('modalOverlay').classList.remove('hidden');
        document.getElementById(modalId).classList.remove('hidden');
        AppState.activeModal = modalId;
    },
    
    hideModal() {
        document.getElementById('modalOverlay').classList.add('hidden');
        if (AppState.activeModal) {
            document.getElementById(AppState.activeModal).classList.add('hidden');
        }
        AppState.activeModal = null;
    },
    
    showAuditTrail(artefactId) {
        const thread = AppState.getCurrentThread();
        if (!thread) return;
        
        const artefact = thread.artefacts.find(a => a.id === artefactId);
        if (!artefact) return;
        
        const modalBody = document.getElementById('auditModalBody');
        modalBody.innerHTML = `
            <h3 style="margin-bottom: 16px;">${this.escapeHtml(artefact.title)}</h3>
            
            <div style="margin-bottom: 20px;">
                <h4 style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 10px;">RETRIEVAL QUERY</h4>
                <div style="background: var(--overlay-light); padding: 12px; border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 12px;">
                    ${artefact.ragQuery || 'No query recorded'}
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h4 style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 10px;">TOP RETRIEVAL RESULTS</h4>
                ${artefact.retrievalResults ? artefact.retrievalResults.map((result, idx) => `
                    <div style="background: var(--overlay-light); padding: 10px; border-radius: var(--radius-sm); margin-bottom: 8px; font-size: 12px;">
                        <div style="color: ${COLORS.AGENT}; font-weight: 700; margin-bottom: 4px;">
                            #${idx + 1} - Score: ${result.score.toFixed(2)}
                        </div>
                        <div style="color: var(--text-secondary);">
                            ${this.escapeHtml(result.source)}
                        </div>
                    </div>
                `).join('') : '<p class="empty-state">No retrieval data</p>'}
            </div>
            
            <div>
                <h4 style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 10px;">TOOL ACTIONS</h4>
                ${artefact.toolActions ? artefact.toolActions.map(action => `
                    <div style="background: var(--overlay-light); padding: 10px; border-radius: var(--radius-sm); margin-bottom: 8px; font-size: 12px;">
                        <div style="color: ${COLORS.HUMAN}; font-weight: 700; margin-bottom: 4px;">
                            ${action.tool.toUpperCase()}
                        </div>
                        <div style="color: var(--text-secondary);">
                            ${this.escapeHtml(action.description)}
                        </div>
                        <div style="color: var(--text-muted); font-size: 11px; margin-top: 4px;">
                            Response: ${action.responseCode}
                        </div>
                    </div>
                `).join('') : '<p class="empty-state">No tool actions</p>'}
            </div>
        `;
        
        this.showModal('auditModal');
    },
    
    updateDecisionStatus(decisionId, newStatus) {
        const thread = AppState.getCurrentThread();
        if (!thread) return;
        
        AppState.updateDecisionStatus(thread.id, decisionId, newStatus);
        this.renderDecisionsLens();
        this.renderActionLedger();
    },
    
    closeQuestion(questionId) {
        const thread = AppState.getCurrentThread();
        if (!thread) return;

        AppState.updateQuestionStatus(thread.id, questionId, 'closed');
        this.renderQuestionsLens();
    },

    // ===========================
    // USER MANAGEMENT
    // ===========================

    renderUserCheckboxes(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = AppState.users.map(user => `
            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: var(--text-primary);">
                <input type="checkbox" name="workspaceUser" value="${user.userId}" style="width: 18px; height: 18px; cursor: pointer;">
                <span>${this.escapeHtml(user.name)}</span>
            </label>
        `).join('');
    },

    updateProjectUserCheckboxes() {
        const container = document.getElementById('userCheckboxList');
        if (!container) return;

        container.innerHTML = AppState.users.map(user => `
            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: var(--text-primary);">
                <input type="checkbox" name="projectUser" value="${user.userId}" style="width: 18px; height: 18px; cursor: pointer;">
                <span>${this.escapeHtml(user.name)}</span>
            </label>
        `).join('');
    }
};

// Add CSS for additional components
const additionalStyles = `
<style>
.project-card, .pack-card, .pack-info-card {
    padding: 12px;
    background: var(--overlay-light);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
}

.chip {
    display: inline-block;
    padding: 4px 8px;
    background: var(--overlay-medium);
    border: 1px solid var(--border-normal);
    border-radius: var(--radius-full);
    font-size: 11px;
    font-weight: 600;
    color: var(--text-secondary);
}

.chip-small {
    padding: 2px 6px;
    font-size: 10px;
}

.thread-item {
    padding: 12px;
    background: var(--overlay-light);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
}

.thread-item:hover {
    background: var(--overlay-medium);
    border-color: var(--border-normal);
}

.thread-item.active {
    background: var(--overlay-medium);
    border-color: var(--accent-purple);
    box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.2);
}

.task-status {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: 700;
}

.task-status-queued { background: var(--accent-yellow); color: black; }
.task-status-processing { background: var(--accent-blue); color: white; }
.task-status-complete { background: var(--accent-green); color: white; }
.task-status-failed { background: var(--accent-red); color: white; }
.task-status-requires_approval { background: var(--accent-orange); color: white; }
</style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);
