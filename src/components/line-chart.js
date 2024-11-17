import { Line } from 'react-chartjs-2';

const data = {
    labels: ['00.05', '00.10', '00.15', '00.20', '00.25', '00.30', 
    ],
    datasets: [
      {
        label: 'Discharge Current',
        data: [5, 4.4, 6, 3, 2, 4, 3],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };
  
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const CurentChart = () => {
    return (
      <div className='w-full sm:w-1/2 lg:w-1/2 h-78 mx-4 '>
        <h2>Discharge Chart</h2>
        <Line data={data} options={options} />
      </div>
    );
  };
  
  export default CurentChart;
  