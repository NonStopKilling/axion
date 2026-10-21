import { describe, expect, it } from 'vitest';
import { calculateOperationalRoi } from '../src/lib/roi';

describe('calculateOperationalRoi', () => {
  it('estimates recoverable time and savings from operational inputs', () => {
    const result = calculateOperationalRoi({ teamSize: 10, monthlySalary: 1_200_000, weeklyManualHours: 6 });

    expect(result.monthlyHoursLost).toBeCloseTo(259.8);
    expect(result.monthlyCost).toBeCloseTo(1_948_500);
    expect(result.recoverableMonthlyHours).toBeCloseTo(181.86);
    expect(result.estimatedAnnualSavings).toBeCloseTo(16_367_400);
  });

  it('rejects incomplete or non-positive inputs', () => {
    expect(() => calculateOperationalRoi({ teamSize: 0, monthlySalary: 1, weeklyManualHours: 1 })).toThrow();
  });
});
