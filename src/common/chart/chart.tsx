import {
  create,
  useTheme as amchartsUseTheme,
  unuseAllThemes,
  percent,
  addLicense,
  color,
} from '@amcharts/amcharts4/core'
import {
  DateAxis,
  IXYSeriesDataFields,
  LineSeries,
  ValueAxis,
  XYChart,
  XYCursor,
  Legend,
} from '@amcharts/amcharts4/charts'
import { useEffect, useRef } from 'react'
import amchartsdark from '@amcharts/amcharts4/themes/dark'
import clsx from 'clsx'

import { useTheme } from '~/common/theme'
import { config } from '~/config'
import * as styles from './chart.css'

export type ChartProps = {
  dataFields: Array<IXYSeriesDataFields & { color?: string; format?: string }>
  tooltipText?: string
  data?: Array<unknown>
  id?: string
  names?: Array<string>
}

if (config.AMCHARTS_LICENCE) {
  addLicense(config.AMCHARTS_LICENCE)
}

export const Chart: React.VFC<ChartProps> = (props) => {
  const chartRef = useRef<null | XYChart>(null)
  const namesRef = useRef(props.names)

  const [themeMode] = useTheme()

  const { id = 'chart' } = props

  useEffect(() => {
    if (!props.data?.length) return

    chartRef.current = create(id, XYChart)

    if (themeMode === 'dark') {
      amchartsUseTheme(amchartsdark)
    } else {
      unuseAllThemes()
    }

    const dateAxis = chartRef.current.xAxes.push(new DateAxis())
    dateAxis.renderer.minGridDistance = 60
    dateAxis.baseInterval = {
      timeUnit: 'hour',
      count: 1,
    }

    dateAxis.gridIntervals.setAll([
      { timeUnit: 'hour', count: 1 },
      { timeUnit: 'day', count: 1 },
      { timeUnit: 'day', count: 7 },
      { timeUnit: 'month', count: 1 },
    ])

    dateAxis.fontSize = 12
    dateAxis.dateFormats.setKey('month', 'MMM YYYY')
    dateAxis.renderer.labels.template.rotation = -45
    dateAxis.width = percent(100)
    dateAxis.renderer.labels.template.durationFormatter.outputFormat = 'MM-yyyy'
    dateAxis.userClassName = styles.date

    chartRef.current.data = props.data

    props.dataFields.forEach((field, index) => {
      if (!chartRef.current) return

      const valueAxis = chartRef.current.yAxes.push(new ValueAxis())
      if (chartRef.current.yAxes.indexOf(valueAxis) !== 0) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        valueAxis.syncWithAxis = chartRef.current.yAxes.getIndex(0)
      }

      valueAxis.fontSize = 12
      valueAxis.userClassName = styles.valueAxis

      const series = chartRef.current.series.push(new LineSeries())

      series.dataFields.valueY = field.valueY
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (field.format) series.dataFields.format = field.format
      series.dataFields.dateX = field.dateX
      if (field.color) {
        series.stroke = color(field.color)
        series.fill = color(field.color)
      }
      series.strokeWidth = 2

      const name = namesRef.current?.[index]

      if (name) {
        series.name = name
      }

      if (props.tooltipText) {
        series.tooltipText = props.tooltipText
      }

      if (series.tooltip) {
        series.tooltip.pointerOrientation = 'vertical'
      }

      chartRef.current.cursor = new XYCursor()
      // chartRef.current.cursor.xAxis = dateAxis
    })

    if (props.dataFields.length > 1) {
      const legend = new Legend()

      legend.useDefaultMarker = true
      legend.data = props.dataFields.map((seriesitem) => ({
        name: seriesitem.valueY,
      }))
      legend.contentAlign = 'left'
      legend.fontSize = 16
      if (themeMode === 'dark') {
        legend.labels.template.fill = color('rgba(255, 255, 255, 0.64)')
      } else {
        legend.labels.template.fill = color('rgba(0, 0, 0, 0.64)')
      }
      legend.markers.template.height = 12
      legend.markers.template.width = 32

      chartRef.current.legend = legend
    }

    return () => {
      chartRef.current?.dispose()
    }
  }, [props.data, id, themeMode, props.tooltipText, props.dataFields])

  return props.data?.length ? (
    <div id={id} className={styles.root} />
  ) : (
    <div className={clsx(styles.root, styles.flex)}>no data</div>
  )
}
