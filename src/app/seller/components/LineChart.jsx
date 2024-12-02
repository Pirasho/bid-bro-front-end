"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';

const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
    ssr: false,
});

const data = {
    labels: ['day-1', 'day-2', 'day-3', 'day-4', 'day-5','day-6', 'day-7', 'day-8', 'day-9', 'day-10'],
    datasets: [
        {
            label: 'GeeksforGeeks Line Chart',
            data: [15, 9, 30, 36, 26,25, 19, 40, 43, 16],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
        },
    ],
};

const options = {
    plugins: {
        legend: {
            display: false
        }
    }
};

const LineChart = () => {
    return (
        <div>
            <Line
                data={data}
                options={options} />
        </div>
    );
};

export default LineChart;
