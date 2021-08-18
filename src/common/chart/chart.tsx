import {
  create,
  Scrollbar,
  useTheme as amchartsUseTheme,
} from '@amcharts/amcharts4/core'
import {
  DateAxis,
  IXYSeriesDataFields,
  LineSeries,
  ValueAxis,
  XYChart,
  XYCursor,
} from '@amcharts/amcharts4/charts'
import { useEffect, useRef } from 'react'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'

export type ChartProps = {
  dataFields: Array<IXYSeriesDataFields>
  tooltipText?: string
  data?: Array<unknown>
  id?: string
  names?: Array<string>
}

amchartsUseTheme(am4themes_animated)

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '300px',
    margin: '50px 0',
  },

  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export const Chart: React.VFC<ChartProps> = (props) => {
  const chartRef = useRef<null | XYChart>(null)

  const classes = useStyles()

  const { id = 'chart' } = props

  useEffect(() => {
    if (!props.data?.length) return

    chartRef.current = create(id, XYChart)
    const dateAxis = chartRef.current.xAxes.push(new DateAxis())
    dateAxis.renderer.minGridDistance = 60

    chartRef.current.data = props.data

    props.dataFields.forEach((field, index) => {
      if (!chartRef.current) return

      const valueAxis = chartRef.current.yAxes.push(new ValueAxis())
      if (chartRef.current.yAxes.indexOf(valueAxis) !== 0) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        valueAxis.syncWithAxis = chartRef.current.yAxes.getIndex(0)
      }

      const series = chartRef.current.series.push(new LineSeries())

      series.dataFields.valueY = field.valueY
      series.dataFields.dateX = field.dateX

      const name = props.names?.[index]

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
      chartRef.current.cursor.xAxis = dateAxis
    })

    chartRef.current.scrollbarX = new Scrollbar()

    return () => {
      chartRef.current?.dispose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data, id])

  return props.data?.length ? (
    <div id={id} className={classes.root} />
  ) : (
    <div className={clsx(classes.root, classes.flex)}>no data</div>
  )
}
