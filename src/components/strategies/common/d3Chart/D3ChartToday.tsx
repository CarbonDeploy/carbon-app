import { useD3ChartCtx } from './D3ChartContext';
import { toUnixUTCDay, dayFormatter } from 'components/simulator/utils';

export const D3ChartToday = () => {
  const { xScale, dms } = useD3ChartCtx();
  const today = toUnixUTCDay(new Date());
  const x = xScale(today)! + xScale.bandwidth() / 2;
  return (
    <g>
      <line
        x1={x}
        x2={x}
        y1={0}
        y2={dms.boundedHeight}
        stroke="white"
        strokeWidth="1"
        strokeDasharray="2"
      />
      <g transform={`translate(${x}, ${dms.boundedHeight + 8})`}>
        <rect x={-32} height="16" width="64" fill="white" rx="4" />
        <text
          y="6"
          dominantBaseline="hanging"
          textAnchor="middle"
          fill="black"
          fontSize="10"
        >
          {dayFormatter.format(new Date())}
        </text>
      </g>
    </g>
  );
};
