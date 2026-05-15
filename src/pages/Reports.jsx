import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Select } from '../components/ui/Select';
import { subscribeToTransactions } from '../services/transactions';
import {
  BarChart, Bar, PieChart, Pie, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

const COLORS = ['#0f172a', '#10b981', '#f43f5e', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'];

export function Reports() {
  const [transactions, setTransactions] = useState([]);
  const [chartType, setChartType] = useState('bar');

  useEffect(() => {
    const unsubscribe = subscribeToTransactions((data) => {
      setTransactions(data);
    });
    return () => unsubscribe();
  }, []);

  const dataPie = transactions.reduce((acc, t) => {
    const existing = acc.find(item => item.name === t.category);
    if (existing) {
      existing.value += t.amount;
    } else {
      acc.push({ name: t.category, value: t.amount, type: t.type });
    }
    return acc;
  }, []);

  const dataMonthly = transactions.reduce((acc, t) => {
    const month = t.date.substring(0, 7);
    const existing = acc.find(item => item.name === month);
    if (existing) {
      if (t.type === 'ingreso') existing.ingresos += t.amount;
      else existing.gastos += t.amount;
      existing.saldo = existing.ingresos - existing.gastos;
    } else {
      acc.push({
        name: month,
        ingresos: t.type === 'ingreso' ? t.amount : 0,
        gastos: t.type === 'gasto' ? t.amount : 0,
        saldo: t.type === 'ingreso' ? t.amount : -t.amount
      });
    }
    return acc;
  }, []).sort((a, b) => a.name.localeCompare(b.name));

  const renderChart = () => {
    switch (chartType) {
      case 'pie':
        return (
          <PieChart>
            <Tooltip contentStyle={{ borderRadius: '8px' }} />
            <Legend />
            <Pie data={dataPie.filter(d => d.type === 'gasto')} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius="60%" label>
              {dataPie.filter(d => d.type === 'gasto').map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        );
      case 'line':
        return (
          <LineChart data={dataMonthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5eeff" />
            <XAxis dataKey="name" stroke="#7c839b" fontSize={11} />
            <YAxis stroke="#7c839b" fontSize={11} width={45} />
            <Tooltip contentStyle={{ borderRadius: '8px' }} />
            <Legend />
            <Line type="monotone" dataKey="saldo" stroke="#000000" strokeWidth={2} name="Evolución Saldo" />
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart data={dataMonthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5eeff" />
            <XAxis dataKey="name" stroke="#7c839b" fontSize={11} />
            <YAxis stroke="#7c839b" fontSize={11} width={45} />
            <Tooltip contentStyle={{ borderRadius: '8px' }} />
            <Legend />
            <Area type="monotone" dataKey="ingresos" stackId="1" stroke="#006c49" fill="#6cf8bb" name="Ingresos" />
            <Area type="monotone" dataKey="gastos" stackId="2" stroke="#ba1a1a" fill="#ffdad6" name="Gastos" />
          </AreaChart>
        );
      case 'bar':
      default:
        return (
          <BarChart data={dataMonthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5eeff" />
            <XAxis dataKey="name" stroke="#7c839b" fontSize={11} />
            <YAxis stroke="#7c839b" fontSize={11} width={45} />
            <Tooltip contentStyle={{ borderRadius: '8px' }} />
            <Legend />
            <Bar dataKey="ingresos" fill="#10b981" name="Ingresos" radius={[4, 4, 0, 0]} />
            <Bar dataKey="gastos" fill="#f43f5e" name="Gastos" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Header: stacks on mobile, row on md+ */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h1 className="text-[24px] md:text-[32px] font-semibold leading-tight text-on-surface">
          Reportes y Análisis
        </h1>
        <div className="w-full sm:w-64">
          <Select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            options={[
              { value: 'bar', label: 'Barras (Ingresos vs Gastos)' },
              { value: 'pie', label: 'Sectores (Desglose Gastos)' },
              { value: 'line', label: 'Líneas (Evolución Saldo)' },
              { value: 'area', label: 'Área (Flujo)' }
            ]}
          />
        </div>
      </div>

      <Card>
        {/* 300px on mobile, 500px on md+ */}
        <CardContent className="h-[300px] md:h-[500px] pt-6">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
