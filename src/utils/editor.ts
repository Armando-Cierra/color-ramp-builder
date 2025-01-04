export const recalculateStepsPercentages = (newAmount: number) => {
  const newPercentages = [];
  for (let i = 0; i < newAmount; i++) {
    const value = Math.round((i / (newAmount - 1)) * 100) / 100;
    newPercentages.push(value.toFixed(2));
  }

  return newPercentages;
};
