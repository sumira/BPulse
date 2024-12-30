import AlertCard from "../Components/allert-card";

type Severity = "Critical" | "Medium" | "Low";

interface AlertData {
  severity: Severity;
  title: string;
  description: string;
  timestamp: string;
}

const alertData: AlertData[] = [
  {
    severity: "Critical",
    title: "Overheating Detected",
    description: "Battery temperature exceeded 45°C.",
    timestamp: "2024-12-30, 14:35:00",
  },
  {
    severity: "Medium",
    title: "High Current Usage",
    description: "Discharge current is nearing the safe threshold.",
    timestamp: "2024-12-30, 13:15:00",
  },
  {
    severity: "Low",
    title: "Battery Health Good",
    description: "Battery is operating within normal parameters.",
    timestamp: "2024-12-30, 10:00:00",
  },
];

export default function AllertsPage() {
  return (
    <div className="p-3">
      {alertData.map((data, index) => (
        <AlertCard key={index} data={data} />
      ))}
    </div>
  );
}
