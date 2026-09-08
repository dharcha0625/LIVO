import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Department, 
  Priority, 
  RequestStatus, 
  TaskStatus, 
  SalesStage, 
  LanguageCode, 
  Staff, 
  Guest, 
  GuestRequest, 
  TaskItem, 
  SalesOpportunity, 
  MessageThread, 
  InternalTeamMessage, 
  KnowledgeArticle, 
  AppNotification, 
  AiActionLog, 
  AiConfig, 
  UserRole 
} from '../types';
import { 
  INITIAL_STAFF, 
  INITIAL_GUESTS, 
  INITIAL_REQUESTS, 
  INITIAL_TASKS, 
  INITIAL_SALES_OPPORTUNITIES, 
  INITIAL_THREADS, 
  INITIAL_TEAM_MESSAGES, 
  INITIAL_KNOWLEDGE, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_AI_LOGS, 
  DEFAULT_AI_CONFIG 
} from '../data/mockData';
import { aiService, AiParsedIntent } from '../services/aiService';
import { taskService } from '../services/taskService';
import confetti from 'canvas-confetti';

export type NavTab = 
  | 'landing'
  | 'dashboard'
  | 'receptionist'
  | 'sales'
  | 'lancepad'
  | 'requests'
  | 'pipeline'
  | 'tasks'
  | 'messages'
  | 'analytics'
  | 'knowledge'
  | 'settings';

export interface Toast {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // Navigation & User
  currentTab: NavTab;
  setCurrentTab: (tab: NavTab) => void;
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  currentLanguage: LanguageCode;
  setCurrentLanguage: (lang: LanguageCode) => void;

  // Data State
  staff: Staff[];
  guests: Guest[];
  requests: GuestRequest[];
  tasks: TaskItem[];
  opportunities: SalesOpportunity[];
  threads: MessageThread[];
  teamMessages: InternalTeamMessage[];
  knowledge: KnowledgeArticle[];
  notifications: AppNotification[];
  aiLogs: AiActionLog[];
  aiConfig: AiConfig;

  // Modals & Panels
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isNotifOpen: boolean;
  setIsNotifOpen: (open: boolean) => void;
  isAiModalOpen: boolean;
  setIsAiModalOpen: (open: boolean) => void;
  isDemoTourOpen: boolean;
  setIsDemoTourOpen: (open: boolean) => void;
  demoStep: number;
  setDemoStep: (step: number) => void;

  // Toast
  toasts: Toast[];
  showToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  // Core Actions
  acceptTask: (taskId: string) => void;
  startTask: (taskId: string) => void;
  reassignTask: (taskId: string, staffId: string) => void;
  escalateTask: (taskId: string, reason?: string) => void;
  completeTask: (taskId: string, resolution: { reason: string; guestNotified: boolean; completedTime: string; notes: string }) => void;
  addTaskNote: (taskId: string, noteText: string) => void;

  // Request & CRM Actions
  createGuestRequest: (req: Partial<GuestRequest>) => void;
  updateRequestStatus: (reqId: string, status: RequestStatus) => void;
  createSalesOpportunity: (opp: Partial<SalesOpportunity>) => void;
  updateOpportunityStage: (oppId: string, stage: SalesStage) => void;
  updateOpportunity: (oppId: string, updates: Partial<SalesOpportunity>) => void;

  // Chat & Messages
  sendGuestMessage: (threadId: string, text: string, sender?: 'guest' | 'ai' | 'staff') => void;
  sendTeamMessage: (channelName: string, message: string, isUrgent?: boolean) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Knowledge & Config
  addKnowledgeArticle: (art: Omit<KnowledgeArticle, 'id' | 'lastUpdated' | 'timesAccessedByAi'>) => void;
  deleteKnowledgeArticle: (id: string) => void;
  updateAiConfig: (cfg: Partial<AiConfig>) => void;

  // AI Assistant & Demo Execution
  executeAiAssistantPrompt: (prompt: string) => AiParsedIntent;
  executeDemoWorkflow: (step: number) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Auth
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('Admin');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');

  // Main Collections
  const [staff, setStaff] = useState<Staff[]>(() => {
    const saved = localStorage.getItem('lance_staff');
    return saved ? JSON.parse(saved) : INITIAL_STAFF;
  });

  const [guests] = useState<Guest[]>(() => {
    const saved = localStorage.getItem('lance_guests');
    return saved ? JSON.parse(saved) : INITIAL_GUESTS;
  });

  const [requests, setRequests] = useState<GuestRequest[]>(() => {
    const saved = localStorage.getItem('lance_requests');
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem('lance_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [opportunities, setOpportunities] = useState<SalesOpportunity[]>(() => {
    const saved = localStorage.getItem('lance_opportunities');
    return saved ? JSON.parse(saved) : INITIAL_SALES_OPPORTUNITIES;
  });

  const [threads, setThreads] = useState<MessageThread[]>(() => {
    const saved = localStorage.getItem('lance_threads');
    return saved ? JSON.parse(saved) : INITIAL_THREADS;
  });

  const [teamMessages, setTeamMessages] = useState<InternalTeamMessage[]>(() => {
    const saved = localStorage.getItem('lance_team_messages');
    return saved ? JSON.parse(saved) : INITIAL_TEAM_MESSAGES;
  });

  const [knowledge, setKnowledge] = useState<KnowledgeArticle[]>(() => {
    const saved = localStorage.getItem('lance_knowledge');
    return saved ? JSON.parse(saved) : INITIAL_KNOWLEDGE;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('lance_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [aiLogs, setAiLogs] = useState<AiActionLog[]>(() => {
    const saved = localStorage.getItem('lance_ai_logs');
    return saved ? JSON.parse(saved) : INITIAL_AI_LOGS;
  });

  const [aiConfig, setAiConfig] = useState<AiConfig>(() => {
    const saved = localStorage.getItem('lance_ai_config');
    return saved ? JSON.parse(saved) : DEFAULT_AI_CONFIG;
  });

  // UI state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState(false);
  const [demoStep, setDemoStep] = useState(1);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('lance_staff', JSON.stringify(staff));
    localStorage.setItem('lance_requests', JSON.stringify(requests));
    localStorage.setItem('lance_tasks', JSON.stringify(tasks));
    localStorage.setItem('lance_opportunities', JSON.stringify(opportunities));
    localStorage.setItem('lance_threads', JSON.stringify(threads));
    localStorage.setItem('lance_team_messages', JSON.stringify(teamMessages));
    localStorage.setItem('lance_knowledge', JSON.stringify(knowledge));
    localStorage.setItem('lance_notifications', JSON.stringify(notifications));
    localStorage.setItem('lance_ai_logs', JSON.stringify(aiLogs));
    localStorage.setItem('lance_ai_config', JSON.stringify(aiConfig));
  }, [staff, requests, tasks, opportunities, threads, teamMessages, knowledge, notifications, aiLogs, aiConfig]);

  // Toast Helpers
  const showToast = (title: string, message?: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Task Transitions
  const acceptTask = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          status: 'IN PROGRESS',
          acceptedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      return t;
    }));

    // Also update associated request
    const task = tasks.find(t => t.id === taskId);
    if (task?.requestId) {
      setRequests(prev => prev.map(r => r.id === task.requestId ? { ...r, status: 'In Progress' } : r));
    }

    showToast('Task Accepted', `Task #${taskId} is now In Progress.`, 'info');
  };

  const startTask = (taskId: string) => {
    acceptTask(taskId);
  };

  const reassignTask = (taskId: string, staffId: string) => {
    const targetStaff = staff.find(s => s.id === staffId);
    if (!targetStaff) return;

    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          assignedToStaffId: targetStaff.id,
          assignedToStaffName: targetStaff.name,
          notes: [
            ...t.notes,
            {
              id: `note-${Date.now()}`,
              staffName: 'Operations Lead',
              text: `Reassigned to ${targetStaff.name} (${targetStaff.department})`,
              timestamp: 'Just now'
            }
          ]
        };
      }
      return t;
    }));

    showToast('Task Reassigned', `Assigned to ${targetStaff.name}`, 'info');
  };

  const escalateTask = (taskId: string, reason: string = 'Staff escalated priority') => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          status: 'ESCALATED',
          priority: 'High',
          notes: [
            ...t.notes,
            {
              id: `note-${Date.now()}`,
              staffName: 'Staff On-Duty',
              text: `Escalated: ${reason}`,
              timestamp: 'Just now'
            }
          ]
        };
      }
      return t;
    }));

    const task = tasks.find(t => t.id === taskId);
    if (task?.requestId) {
      setRequests(prev => prev.map(r => r.id === task.requestId ? { ...r, status: 'Escalated', priority: 'High' } : r));
    }

    // Add notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Task Escalation Alert',
      message: `Task ${taskId} in Room ${task?.roomNumber || 'N/A'} was escalated.`,
      type: 'escalation',
      timestamp: 'Just now',
      isRead: false,
      linkTab: 'lancepad'
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast('Task Escalated', `High priority alert issued for ${task?.roomNumber}`, 'warning');
  };

  const completeTask = (
    taskId: string, 
    resolution: { reason: string; guestNotified: boolean; completedTime: string; notes: string }
  ) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          status: 'COMPLETED',
          completedAt: timeStr,
          resolution: {
            ...resolution,
            completedTime: timeStr
          }
        };
      }
      return t;
    }));

    const task = tasks.find(t => t.id === taskId);
    if (task?.requestId) {
      setRequests(prev => prev.map(r => {
        if (r.id === task.requestId) {
          return {
            ...r,
            status: 'Completed',
            completedAt: timeStr,
            resolutionNotes: resolution.notes || resolution.reason
          };
        }
        return r;
      }));
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#0d9488', '#0284c7', '#38bdf8', '#fbbf24']
      });
    } catch {
      // ignore in iframe
    }

    showToast('Task Completed', `Room ${task?.roomNumber || ''} request fulfilled and guest notified.`, 'success');
  };

  const addTaskNote = (taskId: string, noteText: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          notes: [
            ...t.notes,
            {
              id: `note-${Date.now()}`,
              staffName: currentUserRole === 'Admin' ? 'Supervisor' : currentUserRole,
              text: noteText,
              timestamp: 'Just now'
            }
          ]
        };
      }
      return t;
    }));
  };

  // Guest Requests
  const createGuestRequest = (reqData: Partial<GuestRequest>) => {
    const id = `REQ-${1050 + requests.length}`;
    const newReq: GuestRequest = {
      id,
      guestId: reqData.guestId || 'guest-1',
      guestName: reqData.guestName || 'In-House Guest',
      roomNumber: reqData.roomNumber || '402',
      request: reqData.request || 'Custom Service Request',
      details: reqData.details || '',
      department: reqData.department || 'Housekeeping',
      priority: reqData.priority || 'Normal',
      status: reqData.status || 'Pending',
      channel: reqData.channel || 'WhatsApp',
      createdAt: 'Just now',
      updatedAt: 'Just now',
      slaMinutes: reqData.slaMinutes || 15,
      isAiHandled: reqData.isAiHandled ?? true,
      pmsSyncStatus: 'synced',
      assignedStaffName: reqData.assignedStaffName || 'Priya Sharma'
    };

    setRequests(prev => [newReq, ...prev]);

    // Create corresponding task on Lance Pad
    const bestStaff = taskService.findBestAvailableStaff(newReq.department, staff);
    const newTask: TaskItem = {
      id: `TASK-${510 + tasks.length}`,
      requestId: id,
      title: newReq.request,
      description: newReq.details || `${newReq.request} requested for Room ${newReq.roomNumber}`,
      roomNumber: newReq.roomNumber,
      guestName: newReq.guestName,
      department: newReq.department,
      priority: newReq.priority,
      status: 'NEW',
      assignedToStaffId: bestStaff?.id || 'staff-1',
      assignedToStaffName: bestStaff?.name || 'Priya Sharma',
      createdAt: 'Just now',
      slaMinutes: newReq.slaMinutes,
      timeRemainingMins: newReq.slaMinutes,
      notes: [
        {
          id: `note-${Date.now()}`,
          staffName: 'Receptionist AI',
          text: `Auto-dispatched from guest ${newReq.channel} inquiry.`,
          timestamp: 'Just now'
        }
      ]
    };

    setTasks(prev => [newTask, ...prev]);

    showToast('New Request Created', `${newReq.request} for Room ${newReq.roomNumber}`, 'success');
  };

  const updateRequestStatus = (reqId: string, status: RequestStatus) => {
    setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status, updatedAt: 'Just now' } : r));
  };

  // Sales Opportunities
  const createSalesOpportunity = (oppData: Partial<SalesOpportunity>) => {
    const id = `OPP-${310 + opportunities.length}`;
    const newOpp: SalesOpportunity = {
      id,
      company: oppData.company || 'Enterprise Partner',
      contactName: oppData.contactName || 'Corporate Lead',
      contactEmail: oppData.contactEmail || 'lead@enterprise.com',
      contactPhone: oppData.contactPhone || '+91 98400 11223',
      eventType: oppData.eventType || 'Annual Conference',
      guestCount: oppData.guestCount || 100,
      roomsRequired: oppData.roomsRequired || 45,
      eventDates: oppData.eventDates || 'Q4 2026',
      estimatedValue: oppData.estimatedValue || 450000,
      stage: oppData.stage || 'New',
      leadScore: oppData.leadScore || 85,
      assignedStaffName: oppData.assignedStaffName || 'Sneha Patel',
      lastInteraction: 'Just now via Sales AI',
      nextFollowUp: 'Tomorrow at 10:00 AM',
      channel: oppData.channel || 'Email',
      notes: oppData.notes || '',
      meetingRoomRequired: oppData.meetingRoomRequired ?? true,
      cateringRequired: oppData.cateringRequired ?? true,
      aiExtractedInsights: oppData.aiExtractedInsights || {
        budgetIndication: 'Budget verified',
        decisionTimeline: 'Within 2 weeks',
        sentimentScore: 0.92
      }
    };

    setOpportunities(prev => [newOpp, ...prev]);
    showToast('New Lead in Pipeline', `${newOpp.company} (₹${(newOpp.estimatedValue / 100000).toFixed(1)}L)`, 'success');
  };

  const updateOpportunityStage = (oppId: string, stage: SalesStage) => {
    setOpportunities(prev => prev.map(o => o.id === oppId ? { ...o, stage, lastInteraction: 'Just now' } : o));
    showToast('Stage Updated', `Opportunity moved to ${stage}`, 'info');
  };

  const updateOpportunity = (oppId: string, updates: Partial<SalesOpportunity>) => {
    setOpportunities(prev => prev.map(o => o.id === oppId ? { ...o, ...updates, lastInteraction: 'Just now' } : o));
  };

  // Messaging & Team Chat
  const sendGuestMessage = (threadId: string, text: string, sender: 'guest' | 'ai' | 'staff' = 'staff') => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      threadId,
      sender,
      senderName: sender === 'staff' ? (currentUserRole === 'Admin' ? 'Staff' : currentUserRole) : sender === 'ai' ? 'Receptionist AI' : 'Guest',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today',
      channel: 'WhatsApp' as const
    };

    setThreads(prev => prev.map(th => {
      if (th.id === threadId) {
        return {
          ...th,
          lastMessageText: text,
          lastMessageTime: 'Just now',
          messages: [...th.messages, newMsg]
        };
      }
      return th;
    }));
  };

  const sendTeamMessage = (channelName: string, message: string, isUrgent = false) => {
    const currentStaffMember = staff.find(s => s.role === currentUserRole) || staff[0];
    const newMsg: InternalTeamMessage = {
      id: `tm-${Date.now()}`,
      channelName,
      staffId: currentStaffMember.id,
      staffName: currentStaffMember.name,
      staffAvatar: currentStaffMember.avatar,
      staffDepartment: currentStaffMember.department,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today',
      isUrgent
    };

    setTeamMessages(prev => [...prev, newMsg]);
    showToast('Message Sent', `Posted to ${channelName}`, 'info');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const addKnowledgeArticle = (art: Omit<KnowledgeArticle, 'id' | 'lastUpdated' | 'timesAccessedByAi'>) => {
    const newArt: KnowledgeArticle = {
      ...art,
      id: `kb-${Date.now()}`,
      lastUpdated: new Date().toISOString().split('T')[0],
      timesAccessedByAi: 0
    };
    setKnowledge(prev => [newArt, ...prev]);
    showToast('Knowledge Article Added', newArt.title, 'success');
  };

  const deleteKnowledgeArticle = (id: string) => {
    setKnowledge(prev => prev.filter(k => k.id !== id));
    showToast('Article Removed', '', 'info');
  };

  const updateAiConfig = (cfg: Partial<AiConfig>) => {
    setAiConfig(prev => ({ ...prev, ...cfg }));
    showToast('AI Settings Updated', 'System policies have been saved.', 'success');
  };

  // AI Assistant Execution
  const executeAiAssistantPrompt = (prompt: string): AiParsedIntent => {
    const parsed = aiService.parseGuestOrSalesInput(prompt, currentLanguage);

    // Log action in AI logs
    const newLog: AiActionLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString() + ' Today',
      actionType: parsed.isSalesLead ? 'lead_qualified' : parsed.priority === 'High' ? 'maintenance_escalated' : 'request_handled',
      description: `AI parsed prompt: "${prompt}" -> ${parsed.recommendedAction}`,
      roomOrLead: parsed.isSalesLead ? parsed.salesData?.company || 'Corporate' : `Room ${parsed.roomNumber}`,
      department: parsed.department,
      status: parsed.priority === 'High' ? 'Escalated' : 'Success',
      latencyMs: Math.floor(Math.random() * 300 + 200),
      channel: 'Web Chat'
    };
    setAiLogs(prev => [newLog, ...prev]);

    // If sales lead, create opportunity
    if (parsed.isSalesLead && parsed.salesData) {
      createSalesOpportunity({
        company: parsed.salesData.company,
        guestCount: parsed.salesData.guestCount,
        roomsRequired: parsed.salesData.roomsRequired,
        estimatedValue: parsed.salesData.estimatedValue,
        leadScore: parsed.salesData.leadScore,
        eventType: parsed.salesData.eventType,
        notes: `Extracted from prompt: "${prompt}"`
      });
    } else if (!parsed.isSalesLead) {
      // Create guest request & task
      createGuestRequest({
        guestName: parsed.guestName,
        roomNumber: parsed.roomNumber,
        request: parsed.itemSummary,
        department: parsed.department,
        priority: parsed.priority,
        details: prompt,
        isAiHandled: true
      });
    }

    return parsed;
  };

  // Guided End-to-End Demo Workflow
  const executeDemoWorkflow = (step: number) => {
    setDemoStep(step);

    if (step === 1) {
      // Step 1: Guest sends "I need two towels in Room 402"
      showToast('Demo Step 1', 'Simulating guest WhatsApp message for Room 402...', 'info');
    } else if (step === 2) {
      // Step 2: Receptionist AI parses & verifies
      showToast('Demo Step 2', 'Receptionist AI verified Room 402 with Opera PMS and dispatched task.', 'success');
      setCurrentTab('receptionist');
    } else if (step === 3) {
      // Step 3: Lance Pad receives task
      setCurrentTab('lancepad');
      showToast('Demo Step 3', 'Task TASK-501 appeared live on Lance Pad!', 'info');
    } else if (step === 4) {
      // Step 4: Staff accepts task
      acceptTask('TASK-501');
      showToast('Demo Step 4', 'Staff Priya Sharma accepted the task.', 'info');
    } else if (step === 5) {
      // Step 5: Staff completes task
      completeTask('TASK-501', {
        reason: 'Delivered 2 plush towels & 1 robe to Room 402',
        guestNotified: true,
        completedTime: '14:38 Today',
        notes: 'Handed directly to Mr. Rahul Krishnan.'
      });
    } else if (step === 6) {
      // Step 6: Guest receives confirmation
      showToast('Demo Step 6', 'Guest received instant WhatsApp delivery confirmation & feedback rating prompt.', 'success');
    } else if (step === 7) {
      // Step 7: Sales inquiry arrives
      showToast('Demo Step 7', 'Inbound Corporate RFP arrived from TechNova Global (180 guests).', 'info');
      setCurrentTab('sales');
    } else if (step === 8) {
      // Step 8: Sales AI qualifies
      showToast('Demo Step 8', 'Sales AI scored lead (94/100) & estimated ₹8.5L revenue.', 'success');
      setCurrentTab('pipeline');
    } else if (step === 9) {
      // Step 9: Proposal sent & Dashboard updated
      showToast('Demo Flow Completed', 'Full 360° hotel operations lifecycle demonstrated successfully!', 'success');
      setCurrentTab('dashboard');
    }
  };

  const resetAllData = () => {
    setStaff(INITIAL_STAFF);
    setRequests(INITIAL_REQUESTS);
    setTasks(INITIAL_TASKS);
    setOpportunities(INITIAL_SALES_OPPORTUNITIES);
    setThreads(INITIAL_THREADS);
    setTeamMessages(INITIAL_TEAM_MESSAGES);
    setKnowledge(INITIAL_KNOWLEDGE);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAiLogs(INITIAL_AI_LOGS);
    setAiConfig(DEFAULT_AI_CONFIG);
    localStorage.clear();
    showToast('Reset Complete', 'All mock data restored to defaults.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        currentUserRole,
        setCurrentUserRole,
        isLoggedIn,
        setIsLoggedIn,
        currentLanguage,
        setCurrentLanguage,
        staff,
        guests,
        requests,
        tasks,
        opportunities,
        threads,
        teamMessages,
        knowledge,
        notifications,
        aiLogs,
        aiConfig,
        isSearchOpen,
        setIsSearchOpen,
        isNotifOpen,
        setIsNotifOpen,
        isAiModalOpen,
        setIsAiModalOpen,
        isDemoTourOpen,
        setIsDemoTourOpen,
        demoStep,
        setDemoStep,
        toasts,
        showToast,
        removeToast,
        acceptTask,
        startTask,
        reassignTask,
        escalateTask,
        completeTask,
        addTaskNote,
        createGuestRequest,
        updateRequestStatus,
        createSalesOpportunity,
        updateOpportunityStage,
        updateOpportunity,
        sendGuestMessage,
        sendTeamMessage,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addKnowledgeArticle,
        deleteKnowledgeArticle,
        updateAiConfig,
        executeAiAssistantPrompt,
        executeDemoWorkflow,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
