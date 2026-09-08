import { Guest } from '../types';
import { INITIAL_GUESTS } from '../data/mockData';

export const guestService = {
  findGuestByRoom(roomNumber: string, guests: Guest[] = INITIAL_GUESTS): Guest | undefined {
    return guests.find(g => g.roomNumber === roomNumber);
  },

  findGuestById(id: string, guests: Guest[] = INITIAL_GUESTS): Guest | undefined {
    return guests.find(g => g.id === id);
  },

  searchGuests(query: string, guests: Guest[] = INITIAL_GUESTS): Guest[] {
    const q = query.toLowerCase().trim();
    if (!q) return guests;
    return guests.filter(g => 
      g.name.toLowerCase().includes(q) ||
      g.roomNumber.includes(q) ||
      g.phone.includes(q) ||
      g.email.toLowerCase().includes(q)
    );
  },

  getVipBadgeDetails(vipTier?: string) {
    switch (vipTier) {
      case 'Diamond':
        return { color: 'bg-amber-100 text-amber-800 border-amber-300', label: 'Diamond VIP', perk: 'Presidential Lounge & 24/7 Butler' };
      case 'Platinum':
        return { color: 'bg-purple-100 text-purple-800 border-purple-300', label: 'Platinum VIP', perk: 'Complimentary Late Checkout 2 PM' };
      case 'Gold':
        return { color: 'bg-yellow-100 text-yellow-800 border-yellow-300', label: 'Gold VIP', perk: 'Complimentary High Floor Upgrade' };
      case 'Silver':
        return { color: 'bg-slate-100 text-slate-700 border-slate-300', label: 'Silver VIP', perk: 'Welcome Drink & Fruit Basket' };
      default:
        return { color: 'bg-slate-50 text-slate-600 border-slate-200', label: 'Standard Guest', perk: 'Standard Privileges' };
    }
  }
};
