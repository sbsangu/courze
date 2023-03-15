import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

export  const LineChart = () => {
  const labels=getLastYearMonths();
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Yearly Views',
      },
    },
  };
  const data={
    labels,
    datasets:[
      {
        label:"Views",
        data:[1,2,3,4,5,6,7,8,9,8,5,4],
        borderColor:"darkviolet",
        backgroundColor:'darkviolet'


      }
    ]
  }
  return <Line options={options} data={data} />
    
  
}


export const DoughnutChart=()=>{

 
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Yearly Views',
      },
    },
  };
  const data={
    labels:["Subscribed",'Not Subscribed'],
    datasets:[
      {
        label:"Views",
        data:[3,20],
        borderColor:['rgba(62,12,171)','rgba(214,43,129)'],
        backgroundColor:['rgba(62,12,171,0.3)','rgba(214,43,129,0.3)']


      }
    ]
  }
return <Doughnut data={data} options={options}/> 


};

function getLastYearMonths() {
  const labels = [];

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentMonth = new Date().getMonth();

  const remain = 11 - currentMonth;

  for (let i = currentMonth; i < months.length; i++) {
    const element = months[i];
    labels.unshift(element);
   
  }

  for (let i = 11; i > remain; i--) {
    if (i === currentMonth) break;
    const element = months[i];
    labels.unshift(element);
  }
  console.log(labels);

return labels;
}