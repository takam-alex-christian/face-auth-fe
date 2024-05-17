

export async function loginFetch(capturedImage: string) {
    const reqHeaders = new Headers()
    reqHeaders.append("Content-Type", "application/json")

    return await fetch("/backend_login", {
        body: JSON.stringify({ image: capturedImage }),
        mode: "cors",
        headers: reqHeaders,
        method: "POST"
    }).then(res => res.json()).then((jsonResponse) => {
        console.log(jsonResponse)
        return jsonResponse
    })
}