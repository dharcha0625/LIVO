import { SalesOpportunity, SalesStage } from '../types';

export const salesService = {
  calculateTotalPipelineValue(opportunities: SalesOpportunity[]): number {
    return opportunities
      .filter(o => o.stage !== 'Lost')
      .reduce((sum, opp) => sum + opp.estimatedValue, 0);
  },

  calculateWeightedPipelineValue(opportunities: SalesOpportunity[]): number {
    const weights: Record<SalesStage, number> = {
      New: 0.2,
      Qualified: 0.5,
      Proposal: 0.7,
      Negotiation: 0.85,
      Won: 1.0,
      Lost: 0.0,
    };
    return opportunities.reduce((sum, opp) => {
      const weight = weights[opp.stage] || 0.3;
      return sum + opp.estimatedValue * weight;
    }, 0);
  },

  getOpportunitiesByStage(opportunities: SalesOpportunity[], stage: SalesStage): SalesOpportunity[] {
    return opportunities.filter(o => o.stage === stage);
  },

  formatInr(amount?: number | null): string {
    if (amount == null || isNaN(amount)) {
      return '₹0';
    }
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  }
};
