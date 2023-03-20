import React from 'react'
import { ICommonProps } from '../../types/types'
import { FormattedMessage, useIntl } from 'react-intl'

interface IProps extends ICommonProps {

}

const SubscribeBox = (props: IProps) => {
  const { className } = props
  const intl = useIntl()

  return (
    <div className={`flex items-center max-w-[399px] w-full rounded-full border-grey-light border bg-white py-[5px] pr-[5px] pl-[13px] ${className}`}>
      <input
        type='text'
        className='w-full bg-white rounded mr-4 caret-slate-800 placeholder:text-gray text-[12px] text-purple font-poppins-400 focus:outline-none'
        placeholder={intl.formatMessage({ id: 'page.home.footer.section.placeholder.your_email_address' })}
      />
      <button className='flex justify-center items-center max-w-[119px] w-full h-[27px] bg-purple rounded-[15px] font-poppins-600 text-xs text-white leading-[18px] hover:bg-purple/[0.75] ease-in duration-100'>
        <FormattedMessage id='page.home.footer.section.button.sign_up' />
      </button>
    </div>
  )
}

export default SubscribeBox