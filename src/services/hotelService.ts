import { 
  GuestRequest, 
  TaskItem, 
  Staff, 
  Department, 
  KnowledgeArticle 
} from '../types';
import { INITIAL_KNOWLEDGE } from '../data/mockData';

export const hotelService = {
  calculateDepartmentWorkload(tasks: TaskItem[], staff: Staff[]): Array<{
    department: Department;
    activeTasks: number;
    staffCount: number;
    loadPercentage: number;
    color: string;
  }> {
    const departments: Department[] = [
      'Housekeeping',
      'Front Desk',
      'Engineering',
      'Concierge',
      'Food & Beverage',
      'Sales'
    ];

    const colors: Record<Department, string> = {
      'Housekeeping': 'bg-teal-500',
      'Front Desk': 'bg-blue-600',
      'Engineering': 'bg-amber-500',
      'Concierge': 'bg-indigo-500',
      'Food & Beverage': 'bg-emerald-500',
      'Sales': 'bg-purple-500',
      'Security': 'bg-slate-600',
      'Spa & Wellness': 'bg-rose-500',
    };

    return departments.map(dept => {
      const deptTasks = tasks.filter(t => t.department === dept && t.status !== 'COMPLETED');
      const deptStaff = staff.filter(s => s.department === dept);
      const capacity = Math.max(1, deptStaff.length * 4); // each staff handles max 4 comfortably
      const loadPercentage = Math.min(100, Math.round((deptTasks.length / capacity) * 100));

      return {
        department: dept,
        activeTasks: deptTasks.length,
        staffCount: deptStaff.length,
        loadPercentage,
        color: colors[dept] || 'bg-blue-500'
      };
    });
  },

  searchKnowledge(query: string, articles: KnowledgeArticle[] = INITIAL_KNOWLEDGE): KnowledgeArticle[] {
    const q = query.toLowerCase().trim();
    if (!q) return articles;
    return articles.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.content.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }
};
