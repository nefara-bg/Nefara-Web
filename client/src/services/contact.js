export const sendEmail = async (body) => {
    const res = await fetch("https://nefara-server-xz6h.onrender.com/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })

    if(res.ok) {
        return {
            success: true
        }
    }

    return {
        success: false,
        error: "Something went wrong. Please try again."
    }
}