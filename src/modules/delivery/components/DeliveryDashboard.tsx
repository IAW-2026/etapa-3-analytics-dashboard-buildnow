import DeliveryMetrics from "./DeliveryMetrics";

export default async function DeliveryDashboard() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight text-on-surface">
          Deliveries
        </h1>
        <p className="text-sm text-on-surface-variant">
          Panel de control para seguimiento y actualización de estados de envío.
        </p>

        <DeliveryMetrics />
      </div>
    </div>
  );
}
