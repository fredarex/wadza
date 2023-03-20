import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import { ICommonProps } from '../../types/types'

interface IProps extends ICommonProps {
  estimation: string
}

const styles = {
  div: 'flex flex-col max-w-[70px] w-full',
  value: 'font-poppins-700 text-[17px] text-black leading-[98.3%]',
  label: 'font-poppins-400 text-xs text-black leading-[98.3%] mt-[2px]',
}

const Counter = (props: IProps) => {
  const { estimation, className } = props
  const [time, setTime] = useState({
    months: '00',
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  })
  const [expired, setExpired] = useState<boolean>(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = moment(new Date(Number(estimation) * 1000)).diff(new Date())
      if (remaining > 0) {
        const diffDuration = moment.duration(remaining)

        const months = diffDuration.months()
        const days = diffDuration.days()
        const hours = diffDuration.hours()
        const minutes = diffDuration.minutes()
        const seconds = diffDuration.seconds()

        setTime({
          months: (months >= 0 && months < 10) ? `0${months}` : String(months),
          days: (days >= 0 && days < 10) ? `0${days}` : String(days),
          hours: (hours >= 0 && hours < 10) ? `0${hours}` : String(hours),
          minutes: (minutes >= 0 && minutes < 10) ? `0${minutes}` : String(minutes),
          seconds: (seconds >= 0 && seconds < 10) ? `0${seconds}` : String(seconds),
        })
      } else {
        setExpired(true)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [estimation])

  return (
    <section className={`${className}`}>
      {expired ? (
        <h4 className='font-poppins-400 text-xs text-[#DB5C5C] leading-[98.3%] mt-4'>
          Expired
        </h4>
      ) : (
        <div className='flex flex-row mt-4'>
          {/* months */}
          <div className={styles.div}>
            <h2 className={styles.value}>
              {time.months}
            </h2>
            <h4 className={styles.label}>
              <FormattedMessage id='page.nft_detail.collection.nft_detail.counter.months' />
            </h4>
          </div>
          {/* days */}
          <div className={styles.div}>
            <h2 className={styles.value}>
              {time.days}
            </h2>
            <h4 className={styles.label}>
              <FormattedMessage id='page.nft_detail.collection.nft_detail.counter.days' />
            </h4>
          </div>
          {/* hours */}
          <div className={styles.div}>
            <h2 className={styles.value}>
              {time.hours}
            </h2>
            <h4 className={styles.label}>
              <FormattedMessage id='page.nft_detail.collection.nft_detail.counter.hours' />
            </h4>
          </div>
          {/* minutes */}
          <div className={styles.div}>
            <h2 className={styles.value}>
              {time.minutes}
            </h2>
            <h4 className={styles.label}>
              <FormattedMessage id='page.nft_detail.collection.nft_detail.counter.minutes' />
            </h4>
          </div>
          {/* seconds */}
          <div className={styles.div}>
            <h2 className={styles.value}>
              {time.seconds}
            </h2>
            <h4 className={styles.label}>
              <FormattedMessage id='page.nft_detail.collection.nft_detail.counter.seconds' />
            </h4>
          </div>
        </div>
      )}
    </section>
  )
}

export default Counter
