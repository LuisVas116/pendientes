import React from 'react'

export default function Header() {
  return (
    <>
    <header className="bg-light py-3 shadow-sm mb-4 d-flex justify-content-center align-items-center" style={{ borderBottom: '3px solid #dee2e6' }}>
        <div>
        <h2
      onClick={() => window.location.reload()}
      className="cursor-pointer fw-bold text-primary m-0"
      style={{ userSelect: 'none' }}
        >
           Pendientes 📝
        </h2>
      </div>
      </header>
      </>
  )
}
