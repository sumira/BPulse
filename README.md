# BPulse Web Application

This is the web interface for the **BPulse Project**, a battery capacity tester that monitors and analyzes battery performance in real-time. The application is built using [Next.js](https://nextjs.org) and was bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

To set up the development environment, start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to access the application.

You can begin editing the interface by modifying `app/page.tsx`. The page will automatically refresh as you save changes.

This project utilizes [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for optimized font management and includes [Geist](https://vercel.com/font), a modern font family.

## Project Features

- **Real-Time Monitoring**: Displays current, voltage, and temperature data during the battery testing process.
- **Start/Stop Testing**: The application sends commands to the ESP32 to initiate or stop capacity testing.
- **Data Visualization**: Graphs generated using data stored in InfluxDB for analysis of historical trends.
- **Notification System**: Alerts the user based on testing thresholds.

## Communication and Components

- **ESP32 Integration**: Handles data collection from sensors including MAX6675, INA219, and LM35 sensors.
- **MongoDB**: Stores historical data for graphing and analysis.
- **HiveMQTT**: Facilitates real-time communication between the application and the ESP32 module.

## Learn More

To learn more about Next.js, explore the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Comprehensive guide on Next.js features and APIs.
- [Learn Next.js](https://nextjs.org/learn) - Interactive tutorial for beginners.

## Deploy on Vercel

The easiest way to deploy this application is through the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). Follow the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for detailed instructions.

---

Feel free to reach out for feedback or contributions to the project. Let's make BPulse better together!
