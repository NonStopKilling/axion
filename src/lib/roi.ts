export type OperationalRoiInputs = {
  teamSize: number;
  monthlySalary: number;
  weeklyManualHours: number;
};

const weeksPerMonth = 4.33;
const workingHoursPerMonth = 160;
const recoverableShare = 0.7;

export const calculateOperationalRoi = ({ teamSize, monthlySalary, weeklyManualHours }: OperationalRoiInputs) => {
  if (![teamSize, monthlySalary, weeklyManualHours].every((value) => Number.isFinite(value) && value > 0)) {
    throw new Error('Los datos de la calculadora deben ser mayores que cero.');
  }

  const monthlyHoursLost = teamSize * weeklyManualHours * weeksPerMonth;
  const monthlyCost = monthlyHoursLost * (monthlySalary / workingHoursPerMonth);
  const recoverableMonthlyHours = monthlyHoursLost * recoverableShare;
  const estimatedMonthlySavings = monthlyCost * recoverableShare;

  return {
    monthlyHoursLost,
    monthlyCost,
    recoverableMonthlyHours,
    estimatedMonthlySavings,
    estimatedAnnualSavings: estimatedMonthlySavings * 12,
  };
};
