import { getRepartidoresConDeliveries } from "../api/deliveryApi";
import { Delivery, StatusDelivery } from "../types";
import { Users, Activity, Box, DollarSign } from "lucide-react";

function formatCurrency(amount: number) {
  return amount.toLocaleString("es-AR", { style: "currency", currency: "ARS" });
}

export default async function DeliveryMetrics() {
  const repartidores = await getRepartidoresConDeliveries();

  const allDeliveries = repartidores.flatMap((r) => r.deliveries || []);

  const totalRepartidores = repartidores.length;

  const activeRepartidores = repartidores.filter((r) =>
    (r.deliveries || []).some(
      (d) =>
        d.status === StatusDelivery.ASSIGNED ||
        d.status === StatusDelivery.ON_THE_WAY,
    ),
  ).length;

  const totalDeliveries = allDeliveries.length;

  const deliveriesByStatus = allDeliveries.reduce<Record<string, number>>(
    (acc, d) => {
      acc[d.status] = (acc[d.status] || 0) + 1;
      return acc;
    },
    {},
  );

  const revenue = allDeliveries.reduce((s, d) => s + Number(d.amount || 0), 0);

  // Top stores
  const storesMap = new Map<string, number>();
  for (const d of allDeliveries) {
    const name = d.storeName || "(sin local)";
    storesMap.set(name, (storesMap.get(name) || 0) + 1);
  }
  const topStores = Array.from(storesMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const repartidoresRanking = repartidores
    .map((r) => ({
      id: r.id,
      name: r.name,
      total: (r.deliveries || []).length,
      completed: (r.deliveries || []).filter(
        (d) => d.status === StatusDelivery.DELIVERED,
      ).length,
    }))
    .sort((a, b) => b.completed - a.completed)
    .slice(0, 8);

  // Helper for simple bars
  const maxStoreCount = topStores.length
    ? Math.max(...topStores.map((s) => s[1]))
    : 1;

  const metricCards = [
    {
      title: "Repartidores",
      value: totalRepartidores,
      icon: Users,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      bg: "bg-white",
    },
    {
      title: "Activos",
      value: activeRepartidores,
      icon: Activity,
      bg: "bg-white",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
    },
    {
      title: "Entregas",
      value: totalDeliveries,
      icon: Box,
      bg: "bg-white",
      iconColor: "text-orange-600",
      iconBg: "bg-orange-50",
    },
    {
      title: "Pagos a repartidores",
      value: formatCurrency(revenue),
      icon: DollarSign,
      bg: "bg-white",
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-2">
        {metricCards.map((m) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const Icon = m.icon as any;
          return (
            <div
              key={m.title}
              className={`p-6 rounded-2xl border border-outline-variant ${m.bg} flex items-center space-x-4 shadow-sm`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl ${m.iconBg} flex items-center justify-center`}
                >
                  <Icon className={`h-6 w-6 ${m.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{m.title}</p>
                  <p className="text-2xl font-bold text-zinc-900">{m.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Locales más activos (2/3 de ancho) */}
        <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-zinc-800 mb-4">
              Locales más activos
            </h3>
            <div className="space-y-4">
              {topStores.map(([store, count]) => (
                <div key={store} className="flex items-center gap-3">
                  <div className="w-40 text-sm text-zinc-600 truncate">
                    {store}
                  </div>
                  <div className="flex-1 h-3 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${(count / maxStoreCount) * 100}%` }}
                    />
                  </div>
                  <div className="w-8 text-right text-sm font-semibold text-zinc-800">
                    {count}
                  </div>
                </div>
              ))}
              {topStores.length === 0 && (
                <div className="text-sm text-zinc-500 py-4 text-center">
                  No hay deliveries registrados.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Top Repartidores (1/3 de ancho) - ¡Diseño Embellecido! */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-zinc-800 mb-4">
              Top repartidores{" "}
              <span className="text-xs font-normal text-zinc-500 block lg:inline">
                (Por entregas completadas)
              </span>
            </h3>
            <div className="space-y-3">
              {repartidoresRanking.map((r, index) => {
                // Colores dinámicos opcionales para el podio (oro, plata, bronce)
                const medalColors = [
                  "bg-amber-100 text-amber-700",
                  "bg-zinc-100 text-zinc-700",
                  "bg-orange-100 text-orange-700",
                ];
                const badgeStyle =
                  medalColors[index] || "bg-zinc-50 text-zinc-500";

                return (
                  <div
                    key={r.id}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${badgeStyle}`}
                      >
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium text-zinc-700 truncate">
                        {r.name}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                      {r.completed}
                    </span>
                  </div>
                );
              })}
              {repartidoresRanking.length === 0 && (
                <div className="text-sm text-zinc-500 py-4 text-center">
                  No hay datos de repartidores.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BLOQUE SECUNDARIO: Información Compacta */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Estado de deliveries */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-zinc-800 mb-3">
            Estado de deliveries
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100">
              <span className="block text-xs text-zinc-500 mb-1">
                Asignado / En camino
              </span>
              <span className="text-lg font-bold text-zinc-800">
                {(deliveriesByStatus[StatusDelivery.ASSIGNED] || 0) +
                  (deliveriesByStatus[StatusDelivery.ON_THE_WAY] || 0)}
              </span>
            </div>
            <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50">
              <span className="block text-xs text-emerald-700 mb-1">
                Entregados
              </span>
              <span className="text-lg font-bold text-emerald-700">
                {deliveriesByStatus[StatusDelivery.DELIVERED] || 0}
              </span>
            </div>
            <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100">
              <span className="block text-xs text-zinc-500 mb-1">Total</span>
              <span className="text-lg font-bold text-zinc-800">
                {totalDeliveries}
              </span>
            </div>
          </div>
        </div>

        {/* Resumen General */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-zinc-800 mb-3">
            Resumen operativo
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-zinc-600">
            <div className="flex flex-col justify-center border-r border-zinc-100 pr-2">
              <span className="text-xs text-zinc-400">Locales únicos</span>
              <span className="text-base font-semibold text-zinc-800 mt-0.5">
                {storesMapSize(storesMap)}
              </span>
            </div>

            <div className="flex flex-col justify-center border-r border-zinc-100 pr-2">
              <span className="text-xs text-zinc-400">
                Promedio Items por entrega
              </span>
              <span className="text-base font-semibold text-zinc-800 mt-0.5">
                {averageItems(allDeliveries)}
              </span>
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-xs text-zinc-400">
                Promedio Peso por entrega
              </span>
              <span className="text-base font-semibold text-zinc-800 mt-0.5">
                {averageWeight(allDeliveries)} kg
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function storesMapSize(map: Map<string, number>) {
  return map.size;
}

function averageItems(deliveries: Delivery[]) {
  if (!deliveries.length) return 0;
  const total = deliveries.reduce((s, d) => s + (d.totalItems || 0), 0);
  return Math.round(total / deliveries.length);
}

function averageWeight(deliveries: Delivery[]) {
  if (!deliveries.length) return 0;
  const total = deliveries.reduce((s, d) => s + (d.totalWeight || 0), 0);

  return parseFloat((total / deliveries.length).toFixed(1));
}
