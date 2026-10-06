export const getTimestamp = () => {
    return new Date().toLocaleString("en-US", {
        timezone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "medium"
    })
}
