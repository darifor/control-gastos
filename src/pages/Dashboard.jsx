import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { subscribeToTransactions } from '../services/transactions';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [metrics, setMetrics] = useState({ ingresos: 0, gastos: 0, saldo: 0 });

  useEffect(() => {
    const unsubscribe = subscribeToTransactions((data) => {
      setTransactions(data);
      const ingresos = data.filter(t => t.type === 'ingreso').reduce((acc, t) => acc + t.amount, 0);
      const gastos = data.filter(t => t.type === 'gasto').reduce((acc, t) => acc + t.amount, 0);
      setMetrics({ ingresos, gastos, saldo: ingresos - gastos });
    });
    return () => unsubscribe();
  }, []);

  const dataPorCategoria = transactions
    .filter(t => t.type === 'gasto')
    .reduce((acc, t) => {
      const existing = acc.find(item => item.name === t.category);
      if (existing) {
        existing.amount += t.amount;
      } else {
        acc.push({ name: t.category, amount: t.amount });
      }
      return acc;
    }, []);

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <h1 className="text-[24px] md:text-[32px] font-semibold leading-tight text-on-surface">
        Panel de Control
      </h1>

      {/* KPI Cards — 1 col mobile, 3 cols md+ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <Card>
          <CardHeader><CardTitle>Saldo Neto</CardTitle></CardHeader>
          <CardContent>
            <p className="text-[24px] md:text-[32px] font-bold text-on-surface font-data truncate">
              {metrics.saldo.toFixed(2)} €
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Ingresos Totales</CardTitle></CardHeader>
          <CardContent>
            <p className="text-[24px] md:text-[32px] font-bold text-secondary font-data truncate">
              {metrics.ingresos.toFixed(2)} €
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Gastos Totales</CardTitle></CardHeader>
          <CardContent>
            <p className="text-[24px] md:text-[32px] font-bold text-error font-data truncate">
              {metrics.gastos.toFixed(2)} €
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts — stacked on mobile, side by side on lg+ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader><CardTitle>Gastos por Categoría</CardTitle></CardHeader>
          <CardContent className="h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataPorCategoria}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5eeff" />
                <XAxis dataKey="name" stroke="#7c839b" fontSize={11} tick={{ fontSize: 11 }} />
                <YAxis stroke="#7c839b" fontSize={11} width={45} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: 'none', boxShadow: '0px 4px 12px rgba(15,23,42,0.1)' }}
                  itemStyle={{ color: '#000000' }}
                />
                <Bar dataKey="amount" name="Cantidad" fill="#ba1a1a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Transacciones Recientes</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 md:gap-4">
              {transactions.slice(0, 5).map(t => (
                <div
                  key={t.id}
                  className="flex justify-between items-center border-b border-outline-variant pb-3 last:border-0 last:pb-0 gap-2"
                >
                  <div className="min-w-0">
                    <p className="text-[13px] md:text-[14px] font-medium text-on-surface truncate">{t.description}</p>
                    <p className="text-[11px] md:text-[12px] text-on-surface-variant capitalize">
                      {t.category} • {new Date(t.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className={`text-[13px] md:text-[14px] font-semibold font-data shrink-0 ${t.type === 'ingreso' ? 'text-secondary' : 'text-on-surface'}`}>
                    {t.type === 'ingreso' ? '+' : '-'}{t.amount.toFixed(2)} €
                  </p>
                </div>
              ))}
              {transactions.length === 0 && (
                <p className="text-center text-on-surface-variant py-6 text-[14px]">
                  No hay transacciones registradas.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
