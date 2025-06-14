import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <h1 className="text-4xl font-bold text-secondary-900 mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-secondary-700 mb-4">Page Not Found</h2>
      
      <p className="text-secondary-500 text-center max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <div className="flex space-x-4">
        <Link to="/" className="btn btn-primary">
          Go to Dashboard
        </Link>
        <button 
          onClick={() => window.history.back()}
          className="btn btn-secondary"
        >
          Go Back
        </button>
      </div>
    </div>
  )
}

export default NotFound
