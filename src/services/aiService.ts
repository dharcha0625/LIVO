import { 
  Department, 
  Priority, 
  LanguageCode, 
  SalesOpportunity, 
  KnowledgeArticle 
} from '../types';
import { SUPPORTED_LANGUAGES } from '../data/mockData';

export interface AiParsedIntent {
  rawPrompt: string;
  intentCategory: 'Housekeeping' | 'Engineering' | 'Front Desk' | 'Concierge' | 'Food & Beverage' | 'Sales' | 'General Query';
  department: Department;
  priority: Priority;
  roomNumber: string;
  guestName: string;
  itemSummary: string;
  confidence: number;
  responseMessage: string;
  recommendedAction: string;
  detectedLanguage: LanguageCode;
  isSalesLead: boolean;
  salesData?: {
    company: string;
    guestCount: number;
    roomsRequired: number;
    estimatedValue: number;
    leadScore: number;
    eventType: string;
  };
  pmsSyncSteps: Array<{
    step: string;
    subtext: string;
    system: string;
  }>;
}

export const aiService = {
  /**
   * Parse any natural language prompt simulating LLM intent classification & entity extraction
   */
  parseGuestOrSalesInput(text: string, currentLanguage: LanguageCode = 'en'): AiParsedIntent {
    const lower = text.toLowerCase();

    // Check for room number
    const roomMatch = text.match(/room\s*#?\s*(\d{3,4})/i) || text.match(/\b(\d{3,4})\b/);
    const roomNumber = roomMatch ? roomMatch[1] : (lower.includes('room') ? '402' : '305');

    // Check for Sales Lead keywords
    if (
      lower.includes('conference') || 
      lower.includes('corporate') || 
      lower.includes('event') || 
      lower.includes('banquet') || 
      lower.includes('wedding') || 
      lower.includes('retreat') || 
      lower.includes('delegates') || 
      lower.includes('people') || 
      lower.includes('pax') ||
      lower.includes('book') && (lower.includes('person') || lower.includes('people'))
    ) {
      // Extract guest count
      const countMatch = text.match(/(\d+)\s*(?:person|people|delegates|guests|pax)/i) || text.match(/\b(\d{2,4})\b/);
      const guestCount = countMatch ? parseInt(countMatch[1], 10) : 150;
      const roomsRequired = Math.ceil(guestCount * 0.45);
      const estimatedValue = guestCount * 4500 + roomsRequired * 6000;
      const leadScore = Math.min(96, 75 + Math.floor(guestCount / 10));

      const companyMatch = text.match(/(?:for|company|at)\s+([A-Z][A-Za-z0-9\s&]+)/);
      const company = companyMatch ? companyMatch[1].trim() : 'Apex Global Enterprises';

      return {
        rawPrompt: text,
        intentCategory: 'Sales',
        department: 'Sales',
        priority: guestCount > 100 ? 'High' : 'Normal',
        roomNumber: 'Inquiry',
        guestName: 'Corporate Organizer',
        itemSummary: `${guestCount} pax ${lower.includes('conference') ? 'Conference' : 'Corporate Event'} & ${roomsRequired} Room Blocks`,
        confidence: 0.96,
        responseMessage: `Thank you for your interest in Lance Grand Hotel. We have the capacity for ${guestCount} guests and can reserve ${roomsRequired} rooms with our Grand Ballroom. Our Sales Team has prepared a preliminary quote of ₹${(estimatedValue / 100000).toFixed(1)}L. A dedicated Sales Manager will reach out shortly.`,
        recommendedAction: 'Create Qualified Sales Lead & Send Draft Proposal',
        detectedLanguage: currentLanguage,
        isSalesLead: true,
        salesData: {
          company,
          guestCount,
          roomsRequired,
          estimatedValue,
          leadScore,
          eventType: lower.includes('wedding') ? 'Luxury Wedding Banquet' : 'Corporate Annual Conference'
        },
        pmsSyncSteps: [
          { step: 'Connecting to Sales & Catering CRS...', subtext: 'Querying Grand Ballroom availability', system: 'Amadeus Delphi / CRS' },
          { step: 'Blocking 80 Deluxe & Premier inventory slots...', subtext: 'Held with 72-hour provisional lock', system: 'Opera Cloud PMS' },
          { step: 'Generating dynamic quote with F&B catering rate...', subtext: 'Applying Standard Corporate Tier 1 Rate', system: 'Lance Sales Engine' },
          { step: 'Sales Lead Created & Notified to Team', subtext: 'Assigned to Senior Sales Manager', system: 'Lance CRM' }
        ]
      };
    }

    // Check for Engineering / Maintenance
    if (
      lower.includes('ac') || 
      lower.includes('air condition') || 
      lower.includes('cool') || 
      lower.includes('leak') || 
      lower.includes('broken') || 
      lower.includes('tv') || 
      lower.includes('light') || 
      lower.includes('water') || 
      lower.includes('drain') || 
      lower.includes('smell') ||
      lower.includes('wifi') ||
      lower.includes('internet')
    ) {
      const isUrgent = lower.includes('not working') || lower.includes('leak') || lower.includes('ac') || lower.includes('emergency');
      const item = lower.includes('ac') ? 'AC cooling malfunction' : lower.includes('tv') ? 'Smart TV remote / HDMI issue' : 'Plumbing / Lighting repair';

      return {
        rawPrompt: text,
        intentCategory: 'Engineering',
        department: 'Engineering',
        priority: isUrgent ? 'High' : 'Normal',
        roomNumber,
        guestName: 'In-House Guest',
        itemSummary: item,
        confidence: 0.95,
        responseMessage: `I sincerely apologize for the inconvenience in Room ${roomNumber}. I have immediately created a high-priority maintenance ticket and notified our Duty Engineer Kumar Velu. An engineer is en route with an expected arrival within 8–10 minutes.`,
        recommendedAction: 'Create Engineering Task & Auto-Escalate SLA',
        detectedLanguage: currentLanguage,
        isSalesLead: false,
        pmsSyncSteps: [
          { step: 'Connecting to Opera PMS Work Orders...', subtext: `Locating Room ${roomNumber} Guest Folio`, system: 'Oracle Opera PMS' },
          { step: 'Verifying Room Status & Engineering Log...', subtext: 'HVAC Sensor alert matched', system: 'BMS HVAC Gateway' },
          { step: 'Dispatching Emergency Work Order...', subtext: 'Assigning to Duty Engineer Kumar Velu', system: 'Lance Pad Dispatcher' },
          { step: 'Verification Complete - Task Active on Lance Pad', subtext: 'SLA countdown started (15 mins)', system: 'Lance Pad' }
        ]
      };
    }

    // Check for Front Desk / Check-in / Checkout
    if (
      lower.includes('checkout') || 
      lower.includes('check-out') || 
      lower.includes('check out') || 
      lower.includes('late checkout') || 
      lower.includes('key') || 
      lower.includes('bill') || 
      lower.includes('folio') ||
      lower.includes('luggage')
    ) {
      return {
        rawPrompt: text,
        intentCategory: 'Front Desk',
        department: 'Front Desk',
        priority: 'Normal',
        roomNumber,
        guestName: 'In-House Guest',
        itemSummary: lower.includes('late') ? 'Late Checkout Extension Request' : 'Front Desk Service Request',
        confidence: 0.97,
        responseMessage: `I have noted your checkout inquiry for Room ${roomNumber}. Our Front Desk system has verified room occupancy and we are pleased to offer a complimentary extension until 2:00 PM today. A keycard update is not required.`,
        recommendedAction: 'Update PMS Departure Time to 14:00',
        detectedLanguage: currentLanguage,
        isSalesLead: false,
        pmsSyncSteps: [
          { step: 'Authenticating with Opera PMS Legacy Server...', subtext: 'Reading Reservation record', system: 'Oracle Opera 5.6' },
          { step: 'Checking Housekeeping departure schedule...', subtext: 'No incoming arrival until 17:00', system: 'Housekeeping Sync' },
          { step: 'Extending departure timestamp to 14:00...', subtext: 'Keycard validity updated in VingCard lock system', system: 'ASSA ABLOY VingCard' },
          { step: 'Reservation Updated Successfully', subtext: 'Front desk staff notified', system: 'Lance FrontDesk Hub' }
        ]
      };
    }

    // Check for Concierge / Transport / Dining
    if (
      lower.includes('cab') || 
      lower.includes('taxi') || 
      lower.includes('airport') || 
      lower.includes('car') || 
      lower.includes('tour') || 
      lower.includes('table') || 
      lower.includes('restaurant') || 
      lower.includes('spa') ||
      lower.includes('massage')
    ) {
      const isDining = lower.includes('table') || lower.includes('restaurant') || lower.includes('dinner');
      const dept: Department = isDining ? 'Food & Beverage' : 'Concierge';

      return {
        rawPrompt: text,
        intentCategory: dept === 'Concierge' ? 'Concierge' : 'Food & Beverage',
        department: dept,
        priority: 'Normal',
        roomNumber,
        guestName: 'In-House Guest',
        itemSummary: isDining ? 'Restaurant Table Reservation' : 'Chauffeur / Airport Transfer Booking',
        confidence: 0.96,
        responseMessage: isDining
          ? `I'd be delighted to reserve a table at 'The Coastal Breeze' for Room ${roomNumber}. A prime window table has been held for you.`
          : `I have booked your Mercedes E-Class chauffeur transfer for Room ${roomNumber}. Driver details and vehicle tracking have been sent to your WhatsApp.`,
        recommendedAction: `Create ${dept} Task & Confirm Booking Details`,
        detectedLanguage: currentLanguage,
        isSalesLead: false,
        pmsSyncSteps: [
          { step: 'Accessing Concierge Chauffeur / POS Module...', subtext: 'Verifying vehicle fleet availability', system: 'Lance Fleet & POS' },
          { step: 'Reserving Chauffeur / Table Slot...', subtext: 'Driver Ramesh assigned with E-Class', system: 'Concierge Dispatch' },
          { step: 'Syncing billing details to Room Folio...', subtext: `Attached to Room ${roomNumber}`, system: 'Opera PMS Folio' },
          { step: 'Confirmation Dispatched to Guest via WhatsApp', subtext: 'Booking Ref: LNC-8821', system: 'Lance WhatsApp Bridge' }
        ]
      };
    }

    // Default: Housekeeping (Towels, Pillows, Cleaning, Toiletries, Water, etc.)
    const item = lower.includes('towel') ? 'Extra Towels' :
                 lower.includes('pillow') ? 'Extra Hypoallergenic Pillows' :
                 lower.includes('water') ? 'San Pellegrino Bottled Water' :
                 lower.includes('clean') ? 'Room Cleaning & Refresh' :
                 lower.includes('iron') ? 'Iron & Ironing Board' :
                 'Housekeeping Amenities Request';

    return {
      rawPrompt: text,
      intentCategory: 'Housekeeping',
      department: 'Housekeeping',
      priority: 'Normal',
      roomNumber,
      guestName: 'In-House Guest',
      itemSummary: item,
      confidence: 0.98,
      responseMessage: `Absolutely! I have created a housekeeping task for Room ${roomNumber} for ${item.toLowerCase()}. Housekeeping staff Priya Sharma has accepted the request and your items will be delivered within 8 minutes.`,
      recommendedAction: 'Create Housekeeping Task on Lance Pad',
      detectedLanguage: currentLanguage,
      isSalesLead: false,
      pmsSyncSteps: [
        { step: 'Connecting to Legacy PMS / Housekeeping Gateway...', subtext: `Locating Room ${roomNumber} occupied status`, system: 'Oracle Opera PMS' },
        { step: 'Finding Available Housekeeping Attendant...', subtext: 'Priya Sharma on 4th Floor Floor-Pantry selected', system: 'Lance Staff Router' },
        { step: 'Creating Task TASK-501 on Lance Pad...', subtext: `SLA: 10 minutes | Room: ${roomNumber}`, system: 'Lance Pad Staff Hub' },
        { step: 'Action Complete – Staff notified via Mobile Pad', subtext: 'Guest updated in real-time', system: 'Lance Real-Time Service' }
      ]
    };
  },

  /**
   * Translate responses or generate multilingual greeting
   */
  getMultilingualGreeting(lang: LanguageCode, guestName: string, room: string): string {
    switch (lang) {
      case 'ta':
        return `வணக்கம் ${guestName}! லான்ஸ் கிராண்ட் ஹோட்டல் AI வரவேற்பாளருக்கு நல்வரவு. அறை ${room}-க்கு உங்களுக்கு நான் எவ்வாறு உதவ முடியும்?`;
      case 'hi':
        return `नमस्ते ${guestName}! लांस ग्रैंड होटल के एआई रिसेप्शनिस्ट में आपका स्वागत है। कमरा ${room} के लिए मैं आपकी क्या सेवा कर सकता हूँ?`;
      case 'ml':
        return `നമസ്കാരം ${guestName}! ലാൻസ് ഗ്രാൻഡ് ഹോട്ടലിലേക്ക് സ്വാഗതം. റൂം ${room}-ലേക്ക് ഞാൻ എങ്ങനെയാണ് സഹായിക്കേണ്ടത്?`;
      case 'te':
        return `నమస్కారం ${guestName}! లాన్స్ గ్రాండ్ హోటల్ AI రిసెప్షనిస్ట్‌కు స్వాగతం. గది ${room} కొరకు నేను మీకు ఎలా సహాయపడగలను?`;
      case 'kn':
        return `ನಮಸ್ಕಾರ ${guestName}! ಲ್ಯಾನ್ಸ್ ಗ್ರ್ಯಾಂಡ್ ಹೋಟೆಲ್ AI ಸ್ವಾಗತಕಾರರಿಗೆ ಸುಸ್ವಾಗತ. ಕೊಠಡಿ ${room} ಗಾಗಿ ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?`;
      case 'fr':
        return `Bonjour ${guestName}! Bienvenue à la réception IA du Lance Grand Hotel. Comment puis-je vous assister pour la chambre ${room} aujourd'hui?`;
      case 'es':
        return `¡Hola ${guestName}! Bienvenido al Asistente de Recepción de Lance Grand Hotel. ¿En qué puedo ayudarle para la habitación ${room}?`;
      case 'de':
        return `Guten Tag ${guestName}! Willkommen beim KI-Concierge des Lance Grand Hotel. Wie kann ich Ihnen für Zimmer ${room} behilflich sein?`;
      default:
        return `Hello ${guestName}! Welcome to Lance Grand Hotel AI Receptionist. How may I assist you with Room ${room} today?`;
    }
  },

  /**
   * Quick AI draft generator for Sales inquiries
   */
  generateSalesProposalText(opp: Partial<SalesOpportunity>): string {
    const company = opp.company || 'Client';
    const guests = opp.guestCount || 100;
    const dates = opp.eventDates || 'Upcoming Dates';
    const value = opp.estimatedValue || 500000;
    const formattedVal = `₹${(value / 100000).toFixed(2)} Lakhs`;

    return `Dear ${opp.contactName || 'Corporate Organizer'},

Thank you for choosing Lance Grand Hotel for ${company}'s upcoming ${opp.eventType || 'Corporate Event'}.

We are pleased to offer you exclusive event hosting for ${guests} attendees on ${dates}.

PROPOSAL OVERVIEW:
• Event Space: Grand Sapphire Ballroom (State-of-the-art 4K LED Screen & Dolby Sound)
• Room Block: ${opp.roomsRequired || 40} Deluxe & Executive Suites with complimentary breakfast
• Dining: Curated 5-Course Executive Buffet with live interactive chef counters
• Inclusions: High-speed 500 Mbps dedicated lease line, podium, VIP lounge access
• Total Estimated Package: ${formattedVal} (inclusive of standard luxury service charges)

This proposal is valid for 7 business days. We would be delighted to host a private site inspection and menu tasting session at your earliest convenience.

Warm regards,
Sneha Patel
Director of Corporate Sales | Lance Grand Hotel
sales@lancehotel.com | +91 98406 78901`;
  }
};
