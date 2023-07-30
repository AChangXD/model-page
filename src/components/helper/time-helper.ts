/**
 * @author Mark Chang
 * @description Helper function for computing when a model was uploaded.
 */

export const breakdownTime = (timeInMilliSeconds: number) => {
  // Convert to days: 1000 * 60 * 60 * 24 = 86400000
  const days = timeInMilliSeconds / 86400000;
  // Convert to hours:
  const hours = (timeInMilliSeconds % 86400000) / 3600000;
  // Convert to minutes: 1000 * 60 * 60 = 360000
  const minutes = (timeInMilliSeconds % 3600000) / 60000;

  return {
    days: Math.floor(days),
    hours: Math.floor(hours),
    minutes: Math.floor(minutes),
  };
};
