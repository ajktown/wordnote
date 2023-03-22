import { useEffect, useRef } from 'react'

export const useIsObserved = (onObserved: () => any) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onObserved()
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    // 'ref.current' will likely have changed by the time this effect cleanup function runs
    // And therefore has to be copied inside of the useEffect
    const copiedRef = ref
    if (copiedRef.current) observer.observe(copiedRef.current)

    return () => {
      if (copiedRef.current) {
        observer.unobserve(copiedRef.current)
      }
    }
  }, [onObserved])

  return ref
}
