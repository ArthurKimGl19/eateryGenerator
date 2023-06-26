import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

import { cleanUpData } from '../../helpers/dataFunctions';
import { useChart } from '../../hooks/useChart';
import './ChartGraph.css';

export default function ChartGraph({ category, label }) {
    const data = useSelector((state) => state.eateries);
    const [eateries] = React.useState(cleanUpData(data));
    const { labels, counts } = useChart(category, eateries);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: label,
                data: counts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        ]
    };
    return (
        <Container className="chart-graph">
            <h4>Eateries {category} Data</h4>
            <Doughnut data={chartData} />
        </Container>
    );
}

ChartGraph.propTypes = {
    category: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};
