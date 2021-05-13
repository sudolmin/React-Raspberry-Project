import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
const axios = require('axios');

const serialData=(dataSet)=>{
    const data_set={'labels':[], 'data':[]}
    for (let index = 0; index < dataSet.length; index++) {
        const element = dataSet[index];
        data_set.labels.push(element.timestamp)
        data_set.data.push(element.temparature)
    }

    return (data_set);
}

const getData = async ()=>{
    const res = await axios.get('http://{rest_api_ip}:8000/api/temp');
    localStorage.setItem('data', JSON.stringify(res.data.data))
}

const genData = () => {
    var dataSet=localStorage.getItem('data')
    dataSet=JSON.parse(dataSet)
    dataSet=serialData(dataSet)
    return {
    labels: dataSet.labels,
    datasets: [
    {
        label: 'Raspberry Pi CPU Temparature(C)',
        data: dataSet.data,
        backgroundColor: '#ADEFD140',
        borderColor: '#00203FFF',
        fill: 'origin',
        borderWidth: 1,
        },
        ]
    }
    };

const options = {
    legend: {
        position: "bottom"
    },
    animation : false,
    scales: {
        yAxes: [
        {
            ticks: {
                beginAtZero: true,
            },
        },
    ],
    },
};

const PlotGraph = () => {
    getData();
    const [data, setData] = useState(()=>{
        genData()
    });

    useEffect(() => {
        const interval = setInterval(() => {
            getData();
            setData(genData())
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="graphDiv">
            <Line data={data} options={options} />
        </div>
    )
}

export default PlotGraph
