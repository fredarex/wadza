import React from 'react'
import { useIntl } from 'react-intl'
import { ICommonProps, ICreatorFee } from '../../types/types'
import { MainInput } from '../form'
import { TrashAltSvgIcon } from '../icons'

interface IProps extends ICommonProps {
  index: number
  fee: ICreatorFee
  onChange: (value: string, index: number, div: string) => void
  remove: (index: number) => void
}

const styles = {
  input: 'bg-[#F5F5F5] font-poppins-400 text-sm py-[11px] px-[19px] leading-[21px] rounded-md placeholder:text-[#BCBCBC]',
  pInput: 'w-full bg-[#F5F5F5] font-poppins-400 text-sm py-[11px] px-3 text-black leading-[21px] rounded-md placeholder:text-[#BCBCBC] focus:outline-none',
}

const CreatorFee = (props: IProps) => {
  const { index, fee, onChange, remove } = props
  const intl = useIntl()

  return (
    <section className='flex flex-row mb-[11px]'>
      <MainInput
        type='text'
        value={fee.address}
        onChange={(e) => onChange(e.target.value, index, 'address')}
        placeholder={intl.formatMessage({ 'id': 'page.collection.creation.creator_fee.placeholder' })}
        className='max-w-[266px] w-full mr-[10px]'
        inputClassName={styles.input}
      />
      <div className='flex flex-row items-center max-w-[101px] w-full h-11 pr-[11px] bg-[#F5F5F5] rounded-md mr-[10px]'>
        <input
          type='text'
          className={styles.pInput}
          placeholder='0'
          value={fee.percentage}
          onChange={(e) => onChange(e.target.value, index, 'percentage')}
          min={0}
          max={10}
        />
        <h5 className='font-poppins-400 text-sm text-[#666666] leading-[21px]'>
          %
        </h5>
      </div>
      <button onClick={() => remove(index)} className='flex flex-row max-w-[46px] w-full justify-center items-center bg-[#F5F5F5] hover:bg-[#F1EEEE] rounded-md'>
        <TrashAltSvgIcon color='#8B6EAE' />
      </button>
    </section>
  )
}

export default CreatorFee
