import React from 'react'
import { ICommonProps } from '../../../types/types'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
)

interface IProps extends ICommonProps {
  data: any
  options?: any
}

const PriceChart = (props: IProps) => {
  const { data, options, className } = props
  return (
    <section>
      <Chart type='bar' data={data} options={options} />
    </section>
  )
}

export default PriceChart
