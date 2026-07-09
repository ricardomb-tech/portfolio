import { forwardRef } from 'react'

const textStyle = {
  fontFamily: '"Bebas Neue", Impact, sans-serif',
  fontSize: 'clamp(4rem, 11vw, 11rem)',
  fontWeight: 400,
  letterSpacing: '0.02em',
  lineHeight: 1,
  userSelect: 'none',
  whiteSpace: 'nowrap',
}

// Black text layer (visible on white background — top half)
export const TopText = forwardRef(function TopText(_, ref) {
  return (
    <div
      ref={ref}
      style={{
        ...textStyle,
        color: '#000',
        clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 20,
        width: 'max-content',
      }}
    >
      RICARDO MARTINEZ
    </div>
  )
})

// White text layer (visible on black background — bottom half)
export const BottomText = forwardRef(function BottomText(_, ref) {
  return (
    <div
      ref={ref}
      style={{
        ...textStyle,
        color: '#fff',
        clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 20,
        width: 'max-content',
      }}
    >
      RICARDO MARTINEZ
    </div>
  )
})
