export default async function(email:string, password:string){
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    let otp;

    try {
        // Get Token
        console.log("Fetchin OTP --- ⏳")
        const tokenRes = await fetch('https://api.mail.tm/token', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address: email, password: password })
        })

        const tokenResBody = await tokenRes.json();
        const token = tokenResBody.token;

        // Poll for OTP
        while (!otp) {
            const listRes = await fetch("https://api.mail.tm/messages", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            })
            const listResBody = await listRes.json();
            const messageSummary = listResBody['hydra:member']?.[0];

            if (messageSummary) {
                const detailRes = await fetch(`https://api.mail.tm/messages/${messageSummary.id}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                })

                const detailResBody = await detailRes.json();
                // Look for 6 digits in the full text body
                const match = detailResBody.text.match(/\d{6}/);
                if (match) {
                    otp = match[0];
                    console.log(`OTP fetched successfully -- 🎊 \n OTP is ${otp} -- 🤫`)
                    break; 
                }
            }

            // Wait 2 seconds before polling again
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        return otp;
    } catch (err: any) {
        if (err.name === 'AbortError') {
            console.error("OTP Fetch timed out after 30 seconds.");
        } else {
            console.error(`Couldn't fetch OTP!`, err);
        }
    } finally {
        clearTimeout(timeoutId);
    }
}