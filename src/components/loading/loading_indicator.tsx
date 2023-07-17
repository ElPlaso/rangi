'use client'
import './loader.css'

export default function LoadingIndicator() {
  return (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  )
}