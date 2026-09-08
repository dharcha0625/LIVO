import { TaskItem, TaskStatus, Staff, Department, Priority } from '../types';

export const taskService = {
  /**
   * Find best available staff for a given department
   */
  findBestAvailableStaff(department: Department, staffList: Staff[]): Staff | undefined {
    const deptStaff = staffList.filter(s => s.department === department);
    if (deptStaff.length === 0) return staffList[0];

    // Priority to Available staff with lowest task count
    const available = deptStaff.filter(s => s.status === 'Available');
    if (available.length > 0) {
      return available.sort((a, b) => a.activeTasksCount - b.activeTasksCount)[0];
    }

    // Otherwise least busy staff
    return deptStaff.sort((a, b) => a.activeTasksCount - b.activeTasksCount)[0];
  },

  /**
   * Calculate SLA minutes based on priority and department
   */
  calculateSlaMinutes(priority: Priority, department: Department): number {
    if (priority === 'Urgent') return 10;
    if (priority === 'High') return 15;
    if (department === 'Housekeeping') return 15;
    if (department === 'Engineering') return 25;
    if (department === 'Food & Beverage') return 30;
    if (department === 'Front Desk') return 15;
    return 20;
  },

  /**
   * Filter tasks by column
   */
  getTasksByStatus(tasks: TaskItem[], status: TaskStatus): TaskItem[] {
    return tasks.filter(t => t.status === status);
  },

  /**
   * Calculate task counts for badge display
   */
  getTaskStatusCounts(tasks: TaskItem[]): Record<TaskStatus, number> {
    return {
      NEW: tasks.filter(t => t.status === 'NEW').length,
      'IN PROGRESS': tasks.filter(t => t.status === 'IN PROGRESS').length,
      WAITING: tasks.filter(t => t.status === 'WAITING').length,
      ESCALATED: tasks.filter(t => t.status === 'ESCALATED').length,
      COMPLETED: tasks.filter(t => t.status === 'COMPLETED').length,
    };
  }
};
