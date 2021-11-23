import {
  create,
  useTheme as amchartsUseTheme,
  unuseAllThemes,
  addLicense,
  color,
  percent,
} from '@amcharts/amcharts4/core'
import {
  DateAxis,
  IXYSeriesDataFields,
  LineSeries,
  ValueAxis,
  XYChart,
} from '@amcharts/amcharts4/charts'
import { useEffect, useRef } from 'react'
import amchartsdark from '@amcharts/amcharts4/themes/dark'
import clsx from 'clsx'

import { useTheme } from '~/common/theme'
import { config } from '~/config'
import * as styles from './protocol-last-month-chart.css'

export type ProtocolLastMonthChartProps = {
  dataFields: Array<IXYSeriesDataFields & { color?: string }>
  data?: Array<unknown>
  id?: string
}

if (config.AMCHARTS_LICENCE) {
  addLicense(config.AMCHARTS_LICENCE)
}

export const ProtocolLastMonthChart: React.VFC<ProtocolLastMonthChartProps> = (
  props
) => {
  const chartRef = useRef<null | XYChart>(null)
  const dataFieldsRef = useRef(props.dataFields)

  const [themeMode] = useTheme()

  const { id = 'chart' } = props

  useEffect(() => {
    if (!props.data?.length) return

    chartRef.current = create(id, XYChart)

    chartRef.current.width = percent(100)
    chartRef.current.height = percent(40)

    if (themeMode === 'dark') {
      amchartsUseTheme(amchartsdark)
    } else {
      unuseAllThemes()
    }

    const dateAxis = chartRef.current.xAxes.push(new DateAxis())
    dateAxis.renderer.disabled = true

    dateAxis.renderer.baseGrid.disabled = true
    dateAxis.renderer.grid.template.disabled = true

    dateAxis.fontSize = 12
    dateAxis.renderer.labels.template.durationFormatter.outputFormat = 'MM-yyyy'
    dateAxis.userClassName = styles.date

    chartRef.current.data = props.data

    chartRef.current.zoomOutButton.disabled = true
    chartRef.current.seriesContainer.draggable = false
    chartRef.current.seriesContainer.resizable = false

    dataFieldsRef.current.forEach((field) => {
      if (!chartRef.current) return

      const valueAxis = chartRef.current.yAxes.push(new ValueAxis())
      if (chartRef.current.yAxes.indexOf(valueAxis) !== 0) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        valueAxis.syncWithAxis = chartRef.current.yAxes.getIndex(0)
      }

      valueAxis.fontSize = 12
      valueAxis.userClassName = styles.valueAxis
      valueAxis.renderer.grid.template.disabled = true
      valueAxis.renderer.labels.template.disabled = true

      const series = chartRef.current.series.push(new LineSeries())

      series.dataFields.valueY = field.valueY
      series.dataFields.dateX = field.dateX
      if (field.color) {
        series.stroke = color(field.color)
        series.fill = color(field.color)
      }
      series.strokeWidth = 2
    })

    return () => {
      chartRef.current?.dispose()
    }
  }, [props.data, id, themeMode])

  return props.data?.length ? (
    <div id={id} className={styles.root} />
  ) : (
    <div className={clsx(styles.root, styles.flex)}>no data</div>
  )
}
