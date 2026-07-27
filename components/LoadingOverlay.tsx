import React from 'react'

const LoadingOverlay = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading-shadow-wrapper">
        <div className="loading-shadow">
          <div className="loading-animation">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55C43.8071 55 55 43.8071 55 30"
                stroke="#663820"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h2 className="loading-title">Synthesizing Your Book...</h2>
          <div className="loading-progress">
            <div className="loading-progress-item">
              <span className="loading-progress-status" />
              <span>Analyzing PDF structure</span>
            </div>
            <p className="text-[var(--text-secondary)] text-center mt-2">
              Please wait, this may take a minute
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingOverlay
