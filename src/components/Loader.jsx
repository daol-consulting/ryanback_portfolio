import React from 'react'
import { Html, useProgress } from '@react-three/drei'


const CanvasLoader = () => {
  const { progress } = useProgress()
  return (
    <Html >
      <span className='canvas-load' >
        <p style={{
          fontSize: '14',
          color: '#f1f1f1',
          fontWeight: '800',
          marginTop: '40'

        }}>
          {progress.toFixed(2)}%
        </p>
      </span>
    </Html>
  )
}

export const SectionLoader = () => (
  <div className="w-full h-[300px] flex items-center justify-center">
    <div className="canvas-loader" />
  </div>
)

export default CanvasLoader