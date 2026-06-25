'use client'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        background: '#D7DADF',
        fontFamily: 'var(--font-ibm-plex-mono), monospace',
        fontSize: '11px',
        letterSpacing: '0.08em',
        color: '#9197A1',
      }}
    >
      <span style={{ textTransform: 'uppercase' }}>database unreachable</span>
      <button
        onClick={reset}
        style={{
          padding: '4px 12px',
          borderRadius: '5px',
          border: '1px solid rgba(27,32,39,0.14)',
          background: 'transparent',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          letterSpacing: 'inherit',
          color: '#9197A1',
        }}
      >
        retry
      </button>
    </div>
  )
}
