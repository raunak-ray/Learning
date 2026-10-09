export const getTimestamp = () => {
    return new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "medium"
    })
}
