import React from 'react'

interface SectionProps {
  title: string
  subtitle?: string
  button?: React.ReactNode
  children: React.ReactNode
}

export function Section({ title, subtitle, button, children }: SectionProps) {
  return (
    <div className={'w-full flex flex-col gap-[15px] px-[20px]'}>
      {button ? (
        <div className={'flex justify-between items-center'}>
          <span className={'text-main font-semibold'}>{title}</span>
          {button}
        </div>
      ) : (
        <span className={'text-main font-semibold'}>{title}</span>
      )}
      {subtitle && (
        <span className={'text-sub text-description mt-[-10px]'}>
          {subtitle}
        </span>
      )}
      {children}
    </div>
  )
}

Section.displayName = 'Section'
