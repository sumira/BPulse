export default function GuidePage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Technical Hazard Guide</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Potential Hazards</h2>
        <ul className="list-disc list-inside">
          <li>
            <span className="font-bold">Overheating:</span> Battery temperature
            exceeding safe limits.
          </li>
          <li>
            <span className="font-bold">Overvoltage:</span> Voltage levels
            beyond specified range.
          </li>
          <li>
            <span className="font-bold">Overcurrent:</span> Current draw
            exceeding battery capacity.
          </li>
          <li>
            <span className="font-bold">Short Circuit:</span> Unintended
            electrical path causing rapid discharge.
          </li>
          <li>
            <span className="font-bold">Data Loss:</span> Loss of critical
            monitoring data.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Safety Measures</h2>
        <ul className="list-disc list-inside">
          <li>
            <span className="font-bold">Temperature Monitoring:</span>
            Continuously monitor battery temperature and set alerts for
            threshold breaches.
          </li>
          <li>
            <span className="font-bold">Voltage Regulation:</span> Implement
            voltage regulation mechanisms to prevent overvoltage.
          </li>
          <li>
            <span className="font-bold">Current Limiting:</span> Use current
            limiting circuits to prevent overcurrent conditions.
          </li>
          <li>
            <span className="font-bold">Circuit Protection:</span> Incorporate
            fuses and circuit breakers to protect against short circuits.
          </li>
          <li>
            <span className="font-bold">Data Backup:</span> Regularly back up
            monitoring data to prevent data loss.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Troubleshooting</h2>
        <ul className="list-disc list-inside">
          <li>
            <span className="font-bold">High Temperature:</span> Check cooling
            system, reduce load, or replace battery.
          </li>
          <li>
            <span className="font-bold">Unstable Voltage:</span> Inspect power
            supply, check connections, or replace battery.
          </li>
          <li>
            <span className="font-bold">Excessive Current:</span> Identify and
            remove excessive loads, check for shorts.
          </li>
          <li>
            <span className="font-bold">Data Errors:</span> Restart system,
            check sensor connections, or restore from backup.
          </li>
        </ul>
      </section>
    </div>
  );
}
