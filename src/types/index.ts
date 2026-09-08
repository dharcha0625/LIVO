export type Department = 
  | 'Front Desk'
  | 'Housekeeping'
  | 'Engineering'
  | 'Concierge'
  | 'Food & Beverage'
  | 'Sales'
  | 'Security'
  | 'Spa & Wellness';

export type Priority = 'Low' | 'Normal' | 'High' | 'Urgent';

export type RequestStatus = 'Pending' | 'In Progress' | 'Escalated' | 'Completed' | 'Cancelled';

export type TaskStatus = 'NEW' | 'IN PROGRESS' | 'WAITING' | 'ESCALATED' | 'COMPLETED';

export type Channel = 'Phone' | 'SMS' | 'Email' | 'WhatsApp' | 'Hotel Messaging' | 'Web Chat' | 'In-Person';

export type UserRole = 'Admin' | 'Manager' | 'Receptionist' | 'Housekeeping' | 'Engineering' | 'Sales' | 'Concierge';

export type StaffStatus = 'Available' | 'Busy' | 'Away' | 'On Break' | 'Offline';

export type SalesStage = 'New' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';

export type LanguageCode = 'en' | 'ta' | 'hi' | 'ml' | 'te' | 'kn' | 'es' | 'fr' | 'de';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: Department;
  role: UserRole;
  status: StaffStatus;
  avatar: string;
  activeTasksCount: number;
  shiftStart: string;
  shiftEnd: string;
  rating: number;
}

export interface Guest {
  id: string;
  name: string;
  roomNumber: string;
  roomType?: string;
  vipStatus: boolean;
  vipTier?: 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  checkInDate?: string;
  checkOutDate?: string;
  preferredLanguage: LanguageCode;
  totalStays: number;
  avatar: string;
  notes?: string;
  loyaltyPoints?: number;
  folioBalance?: number;
  specialPreferences?: string[];
}

export interface GuestRequest {
  id: string;
  guestId: string;
  guestName: string;
  roomNumber: string;
  request: string;
  details?: string;
  department: Department;
  priority: Priority;
  status: RequestStatus;
  assignedStaffId?: string;
  assignedStaffName?: string;
  channel: Channel;
  createdAt: string;
  updatedAt: string;
  estimatedDeliveryMins?: number;
  completedAt?: string;
  resolutionNotes?: string;
  isAiHandled: boolean;
  aiConfidence?: number;
  pmsSyncStatus?: 'synced' | 'pending' | 'failed';
  slaMinutes: number;
}

export interface TaskItem {
  id: string;
  requestId?: string;
  title: string;
  description: string;
  roomNumber: string;
  guestName: string;
  department: Department;
  priority: Priority;
  status: TaskStatus;
  assignedToStaffId: string;
  assignedToStaffName: string;
  createdAt: string;
  acceptedAt?: string;
  completedAt?: string;
  slaMinutes: number;
  timeRemainingMins?: number;
  notes: Array<{
    id: string;
    staffName: string;
    text: string;
    timestamp: string;
  }>;
  resolution?: {
    reason: string;
    guestNotified: boolean;
    completedTime: string;
    notes: string;
  };
  attachments?: string[];
}

export interface SalesOpportunity {
  id: string;
  company: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  eventType: string;
  guestCount: number;
  roomsRequired: number;
  eventDates: string;
  estimatedValue: number; // in INR
  stage: SalesStage;
  leadScore: number; // 0 - 100
  assignedStaffName: string;
  lastInteraction: string;
  nextFollowUp: string;
  channel: Channel;
  notes: string;
  meetingRoomRequired: boolean;
  cateringRequired: boolean;
  aiExtractedInsights?: {
    budgetIndication?: string;
    decisionTimeline?: string;
    competitorMentions?: string[];
    sentimentScore?: number;
  };
  proposalSentDate?: string;
  proposalDetails?: {
    roomRate: number;
    hallRental: number;
    fAndBCost: number;
    taxes: number;
    total: number;
    specialDiscounts: string;
  };
}

export interface ChatMessage {
  id: string;
  threadId: string;
  sender: 'guest' | 'ai' | 'staff';
  senderName: string;
  text: string;
  timestamp: string;
  channel: Channel;
  language?: LanguageCode;
  aiMetadata?: {
    intentDetected?: string;
    entities?: Record<string, string>;
    confidence?: number;
    actionTaken?: string;
  };
}

export interface MessageThread {
  id: string;
  guestId?: string;
  guestName: string;
  roomNumber?: string;
  company?: string;
  channel: Channel;
  department: Department;
  lastMessageText: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'Open' | 'Pending' | 'Closed';
  isAiHandled: boolean;
  aiSummary: string;
  messages: ChatMessage[];
  assignedStaffName?: string;
}

export interface InternalTeamMessage {
  id: string;
  channelName: string; // e.g. '#housekeeping', '#engineering', '#front-desk', '#concierge', '#sales'
  staffId: string;
  staffName: string;
  staffAvatar: string;
  staffDepartment: Department;
  message: string;
  timestamp: string;
  attachments?: string[];
  mentions?: string[];
  isUrgent?: boolean;
}

export interface KnowledgeArticle {
  id: string;
  category: 
    | 'Hotel Information'
    | 'Rooms'
    | 'Dining'
    | 'Parking'
    | 'Pool'
    | 'Gym'
    | 'Wi-Fi'
    | 'Check-in / Checkout'
    | 'Nearby Attractions'
    | 'Policies'
    | 'Events'
    | 'Transportation';
  title: string;
  content: string;
  tags: string[];
  lastUpdated: string;
  timesAccessedByAi: number;
  verifiedBy: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'request' | 'high_priority' | 'escalation' | 'sales_lead' | 'followup' | 'task_completed' | 'ai_handoff';
  timestamp: string;
  isRead: boolean;
  linkTab?: string;
  metadata?: {
    roomNumber?: string;
    requestId?: string;
    leadId?: string;
    priority?: Priority;
  };
}

export interface AiActionLog {
  id: string;
  timestamp: string;
  actionType: 'request_handled' | 'lead_qualified' | 'maintenance_escalated' | 'faq_answered' | 'followup_sent' | 'pms_sync';
  description: string;
  roomOrLead: string;
  department: Department;
  status: 'Success' | 'In Progress' | 'Escalated';
  latencyMs: number;
  channel: Channel;
}

export interface AiConfig {
  receptionistAiEnabled: boolean;
  salesAiEnabled: boolean;
  autoTaskCreation: boolean;
  autoEscalation: boolean;
  multilingualSupport: boolean;
  humanHandoff: boolean;
  voicePersona: 'polite_concierge' | 'fast_executive' | 'warm_hospitality';
  confidenceThreshold: number;
  slaEscalationThresholdMins: number;
}
