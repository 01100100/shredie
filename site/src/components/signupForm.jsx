import { createSignal, Show } from "solid-js"

const SignupForm = () => {
    const [email, setEmail] = createSignal("")
    const [status, setStatus] = createSignal("idle")
    const [errorMessage, setErrorMessage] = createSignal("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email()) {
            setErrorMessage("Email required")
            setStatus("error")
            return
        }

        try {
            setStatus("loading")
            const response = await fetch("/.netlify/functions/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email() }),
            })

            const data = await response.json()
            if (!response.ok) throw new Error(data.message || "Something went wrong")

            setStatus("success")
            setEmail("")
        } catch (error) {
            setErrorMessage(error.message || "Failed to sign up")
            setStatus("error")
        }
    }

    return (
        <div class="w-full">
            <Show when={status() !== "success"}>
                <form onSubmit={handleSubmit} class="bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-lg relative overflow-hidden style-preserve-blur">
                    <h3 class="text-white/90 text-sm font-medium mb-3 text-center">Get early access 🤙</h3>

                    <div class="relative">
                        <input
                            type="email"
                            value={email()}
                            onInput={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            class="w-full px-4 py-3 pr-12 rounded-lg bg-white/05 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 text-sm backdrop-blur-sm"
                            required
                        />
                        <button
                            type="submit"
                            disabled={status() === "loading"}
                            class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 rounded-md text-white p-1.5 text-sm focus:outline-none hover:bg-white/30 transition-colors"
                            aria-label="Submit email"
                        >
                            {status() === "loading" ? (
                                <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5l7 7-7 7"></path>
                                </svg>
                            )}
                        </button>
                    </div>

                    <Show when={status() === "error"}>
                        <div class="mt-2 p-2 bg-white/5 border border-red-300/20 rounded-lg text-red-300/90 text-xs">
                            {errorMessage()}
                        </div>
                    </Show>

                    <div class="mt-3 text-center text-white/40 text-xs">
                        Join the shredvolution!
                    </div>
                </form>
            </Show>
            <Show when={status() === "success"}>
                <div class="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-lg text-center relative overflow-hidden style-preserve-blur">
                    <div class="inline-flex items-center justify-center w-10 h-10 bg-white/20 rounded-full mb-3">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-medium text-white mb-2">You're In</h3>
                    <p class="text-white/60 text-sm">I'll notify you when it's time</p>
                </div>
            </Show>
        </div>
    )
}

export default SignupForm