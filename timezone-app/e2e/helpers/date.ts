export const getFormattedTimeFromTimezone = (timezone: string) => {
    return new Date().toLocaleTimeString([], { timeStyle: "short", timeZone: timezone });
};