import humanizeDuration from "humanize-duration";

// Create a custom humanizer with your configuration.
export const customHumanizer = humanizeDuration.humanizer({
  // Only display the largest unit
  largest: 1,
  // Units in descending order: years, weeks, hours, minutes
  units: ["y", "w", "h", "m"],
  // Remove any space between the number and the unit abbreviation
  spacer: "",
  // Use a delimiter (space) between multiple units if needed (not used with largest:1)
  delimiter: " ",
  // Custom language for unit abbreviations
  language: "custom",
  languages: {
    custom: {
      y: () => "y",
      w: () => "w",
      h: () => "h",
      m: () => "m",
    },
  },
});

/**
 * Wrapper function to humanize a duration value and always round up the numeric value.
 *
 * @param duration Duration in milliseconds.
 * @returns The humanized duration string with the numeric value rounded up.
 */
export const customHumanize = (duration: number): string => {
  // Use our custom humanizer to get a base string.
  const humanized = customHumanizer(duration);
  // Use a regex to capture the numeric part and the unit.
  const match = humanized.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (match) {
    // Convert the captured number to a number and round it up.
    return `${Math.ceil(Number(match[1]))}${match[2]}`;
  }
  return humanized;
};