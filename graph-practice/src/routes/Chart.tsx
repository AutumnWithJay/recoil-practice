import ApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { fetchCoinHistory } from '../api';
import { isDarkAtom } from '../atoms';
import { ChartProps, IHistorical } from '../interfaces';

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['chart_ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    },
  );
  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: 'Price',
              data: data?.map((price) => price.close),
            },
          ]}
          options={{
            theme: {
              mode: isDark ? 'dark' : 'light',
            },
            chart: {
              height: 500,
              width: 500,
              background: 'transparent',
              toolbar: {
                show: false,
              },
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: 'smooth',
              width: 3,
            },
            xaxis: {
              axisTicks: { show: false },
              type: 'datetime',
              categories: data?.map((price) => price.time_close),
            },
            yaxis: {
              labels: {
                formatter: (value) => `$${value.toFixed(0)}`,
              },
              axisBorder: { show: true },
            },
            fill: { type: 'gradient', gradient: { gradientToColors: ['red'], stops: [0, 100] } },
            colors: ['blue'],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(3)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
