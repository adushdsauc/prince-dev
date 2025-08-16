export const metadata = { title: 'Videos — Prince\'s Development' }

export default function VideosPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold">Videos</h1>
      <p className="mt-2 text-gray-600">Demos and walkthroughs of features and systems.</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="aspect-video w-full overflow-hidden rounded-xl border">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Demo Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="aspect-video w-full overflow-hidden rounded-xl border">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/oHg5SJYRHA0"
            title="Showcase"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}