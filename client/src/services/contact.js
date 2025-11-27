export const sendEmail = async (body) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/contact`, {
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