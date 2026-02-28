import { Link } from 'react-router-dom'

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-spotify-dark text-spotify-text flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
        Coming Soon
      </h1>
      <Link
        to="/spotify"
        className="text-spotify-text-secondary hover:text-spotify-green transition-colors text-sm mt-8"
      >
        View portfolio
      </Link>
    </div>
  )
}
