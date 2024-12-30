import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiAlertCircle, FiAlertTriangle, FiInfo } from "react-icons/fi";

interface AlertData {
  severity: "Critical" | "Medium" | "Low";
  title: string;
  description: string;
  timestamp: string;
}

const AlertCard = ({ data }: { data: AlertData }) => {
  const severityConfig = {
    Critical: {
      icon: <FiAlertCircle className="text-red-600 text-2xl" />,
      badgeColor: "bg-red-100 text-red-600",
      titleColor: "text-red-600",
    },
    Medium: {
      icon: <FiAlertTriangle className="text-yellow-600 text-2xl" />,
      badgeColor: "bg-yellow-100 text-yellow-600",
      titleColor: "text-yellow-600",
    },
    Low: {
      icon: <FiInfo className="text-blue-600 text-2xl" />,
      badgeColor: "bg-blue-100 text-blue-600",
      titleColor: "text-blue-600",
    },
  };

  const { severity, title, description, timestamp } = data;
  const { icon, badgeColor, titleColor } = severityConfig[severity];

  return (
    <Card className="w-full max-w-md bg-white shadow-md rounded-lg border border-blue-300 mb-3">
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {icon}
          <div>
            <CardTitle className={`text-xl font-semibold ${titleColor}`}>
              {title}
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {description}
            </CardDescription>
          </div>
        </div>
        <Badge className={badgeColor}>{severity}</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{description}</p>
        <p className="text-sm text-gray-500 mt-2">Triggered at: {timestamp}</p>
      </CardContent>
    </Card>
  );
};

export default AlertCard;
