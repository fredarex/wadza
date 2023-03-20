import React, { ReactNode, useRef } from 'react'
import { ICommonProps } from '../../types/types';

interface IProps extends ICommonProps {
  children?: ReactNode
  tooltip?: string
}

const styles = {
  span: 'invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-purple-lighter font-poppins-400 text-xs text-white p-2 rounded absolute top-full mt-2 whitespace-nowrap'
}

const ToolTip = (props: IProps) => {
  const { children, tooltip, className } = props
  const tooltipRef = useRef<HTMLSpanElement>(null)
  const container = useRef<HTMLDivElement>(null)

  const onMouseEnter = (clientX: any) => {
    if (!tooltipRef.current || !container.current) return

    const { left } = container.current.getBoundingClientRect()
    tooltipRef.current.style.left = `${clientX - left}px`
  }

  return (
    <section ref={container} onMouseEnter={({ clientX }) => onMouseEnter(clientX)} className={`group relative inline-block z-[1] ${className}`}>
      {children}
      {tooltip ? (
        <span ref={tooltipRef} className={styles.span}>
          {tooltip}
        </span>
      ) : null}
    </section>
  )
}

export default ToolTip
