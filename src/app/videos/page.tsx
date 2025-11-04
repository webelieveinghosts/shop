const YOUTUBE_LINKS = [
    "https://www.youtube.com/watch?v=kd4Bf_TMt0A&list=RDkd4Bf_TMt0A&start_radio=1",
    "https://www.youtube.com/watch?v=kd4Bf_TMt0A&list=RDkd4Bf_TMt0A&start_radio=1",
    "https://www.youtube.com/watch?v=kd4Bf_TMt0A&list=RDkd4Bf_TMt0A&start_radio=1"
]

function extractYouTubeId(url: string) {
    try {
        const u = new URL(url)
        const v = u.searchParams.get("v")
        if (v) return v
        if (u.hostname.includes("youtu.be")) return u.pathname.slice(1)
        const parts = u.pathname.split("/").filter(Boolean)
        const embedIndex = parts.indexOf("embed")
        if (embedIndex !== -1 && parts[embedIndex + 1]) return parts[embedIndex + 1]
        return parts[parts.length - 1]
    } catch {
        const m = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{6,})/)

        return m ? m[1] : url
    }
}

export default async function VideosPage() {
    return (
        <div className="w-full min-h-screen bg-white text-black px-4 pt-10 pb-20">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-semibold mb-10 text-center uppercase tracking-wide">
                    Vídeos
                </h1>

                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {YOUTUBE_LINKS.map((link, i) => {
                        const id = extractYouTubeId(link)
                        const src = `https://www.youtube.com/embed/${id}`

                        return (
                            <div
                                key={i}
                                className="bg-white border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-500"
                            >
                                <div className="relative" style={{ paddingTop: "56.25%" }}>
                                    <iframe
                                        src={src}
                                        title={`video-${i}`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute left-0 top-0 w-full h-full border-0"
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
