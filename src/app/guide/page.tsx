import {
  FaExclamationTriangle,
  FaThermometerHalf,
  FaBolt,
  FaBatteryHalf,
  FaDatabase,
  FaSearch,
  FaExclamation,
} from "react-icons/fa";
import { MdSettingsBackupRestore, MdPowerOff } from "react-icons/md";

export default function GuidePage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Technical Hazard Guide</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="p-4 rounded-lg shadow-md bg-white flex flex-col border-solid border-2 border-blue-400">
          <h2 className="text-2xl font-semibold mb-2 flex items-center">
            <FaExclamationTriangle className="mr-2 text-blue-300" /> Potential
            Hazards
          </h2>
          <ul className="list-none pl-4">
            <li className="mb-3">
              <span className="font-bold flex items-center">
                <FaThermometerHalf className="mr-1" /> Overheating:
              </span>{" "}
              Battery temperature exceeding safe limits.
            </li>
            <li className="mb-3">
              <span className="font-bold flex items-center">
                <FaBolt className="mr-1" /> Overvoltage:
              </span>{" "}
              Voltage levels beyond specified range.
            </li>
            <li className="mb-3">
              <span className="font-bold flex items-center">
                <FaBatteryHalf className="mr-1" /> Overcurrent:
              </span>{" "}
              Current draw exceeding battery capacity.
            </li>
            <li className="mb-3">
              <span className="font-bold flex items-center">
                <MdPowerOff className="mr-1" /> Short Circuit:
              </span>{" "}
              Unintended electrical path causing rapid discharge.
            </li>
            <li className="mb-3">
              <span className="font-bold flex items-center">
                <FaDatabase className="mr-1" /> Data Loss:
              </span>{" "}
              Loss of critical monitoring data.
            </li>
          </ul>
        </section>

        <section className="p-4 rounded-lg shadow-md bg-white flex flex-col border-solid border-2 border-yellow-400">
          <h2 className="text-2xl font-semibold mb-2 flex items-center">
            <FaExclamation className="mr-2 text-yellow-500" /> Safety Measures
          </h2>
          <ul className="list-none pl-4">
            <li className="mb-3">
              <span className="font-bold flex items-center">
                <FaThermometerHalf className="mr-1" /> Temperature Monitoring:
              </span>{" "}
              Continuously monitor battery temperature and set alerts for
              threshold breaches.
            </li>
            <li className="mb-3">
              <span className="font-bold flex items-center">
                <FaBolt className="mr-1" /> Voltage Regulation:
              </span>{" "}
              Implement voltage regulation mechanisms to prevent overvoltage.
            </li>
            <li className="mb-3">
              <span className="font-bold flex items-center">
                <FaBatteryHalf className="mr-1" /> Current Limiting:
              </span>{" "}
              Use current limiting circuits to prevent overcurrent conditions.
            </li>
            <li className="mb-3">
              <span className="font-bold flex items-center">
                <MdPowerOff className="mr-1" /> Circuit Protection:
              </span>{" "}
              Incorporate fuses and circuit breakers to protect against short
              circuits.
            </li>
            <li className="mb-3">
              <span className="font-bold flex items-center">
                <MdSettingsBackupRestore className="mr-1" /> Data Backup:
              </span>{" "}
              Regularly back up monitoring data to prevent data loss.
            </li>
          </ul>
        </section>

        <section className="p-4 rounded-lg shadow-md bg-white flex flex-col border-solid border-2 border-red-400">
          <h2 className="text-2xl font-semibold mb-2 flex items-center">
            <FaSearch className="mr-2 text-red-500" /> Troubleshooting
          </h2>
          <ul className="list-none pl-4">
            <li className="mb-3">
              <span className="font-bold flex items-center">
                <FaThermometerHalf className="mr-1" /> High Temperature:
              </span>{" "}
              Check cooling system, reduce load, or replace battery.
            </li>
            <li className="mb-3">
              <span className="font-bold flex items-center">
                <FaBolt className="mr-1" /> Unstable Voltage:
              </span>{" "}
              Inspect power supply, check connections, or replace battery.
            </li>
            <li className="mb-3">
              <span className="font-bold flex items-center">
                <FaBatteryHalf className="mr-1" /> Excessive Current:
              </span>{" "}
              Identify and remove excessive loads, check for shorts.
            </li>
            <li className="mb-3">
              <span className="font-bold flex items-center">
                <MdSettingsBackupRestore className="mr-1" /> Data Errors:
              </span>{" "}
              Restart system, check sensor connections, or restore from backup.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
