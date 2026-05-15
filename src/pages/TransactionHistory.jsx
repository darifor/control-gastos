import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { deleteTransaction, subscribeToTransactions } from '../services/transactions';
import { Trash2 } from 'lucide-react';

export function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToTransactions((data) => {
      setTransactions(data);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta transacción?')) {
      await deleteTransaction(id);
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <h1 className="text-[24px] md:text-[32px] font-semibold leading-tight text-on-surface">
        Historial de Transacciones
      </h1>

      {/* Mobile card list — visible below md */}
      <div className="flex flex-col gap-3 md:hidden">
        {transactions.length === 0 && (
          <p className="text-center text-on-surface-variant py-8 text-[14px]">
            No hay transacciones registradas.
          </p>
        )}
        {transactions.map((t) => (
          <Card key={t.id}>
            <CardContent className="pt-4 pb-4">
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-on-surface truncate">{t.description}</p>
                  <p className="text-[12px] text-on-surface-variant capitalize mt-0.5">
                    {t.category}
                  </p>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">
                    {new Date(t.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col items-end shrink-0 gap-2">
                  <p className={`text-[15px] font-bold font-data ${t.type === 'ingreso' ? 'text-secondary' : 'text-on-surface'}`}>
                    {t.type === 'ingreso' ? '+' : '-'}{t.amount.toFixed(2)} €
                  </p>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="text-error hover:bg-error-container p-1 rounded-md transition-colors"
                    aria-label="Eliminar transacción"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop table — visible from md+ */}
      <Card className="hidden md:block">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{new Date(t.date).toLocaleDateString()}</TableCell>
                  <TableCell className="capitalize">{t.category}</TableCell>
                  <TableCell>{t.description}</TableCell>
                  <TableCell className={`text-right font-data font-semibold ${t.type === 'ingreso' ? 'text-secondary' : 'text-on-surface'}`}>
                    {t.type === 'ingreso' ? '+' : '-'}{t.amount.toFixed(2)} €
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" onClick={() => handleDelete(t.id)} className="text-error hover:text-error hover:bg-error-container px-2">
                      <Trash2 size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {transactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-on-surface-variant py-8">
                    No hay transacciones registradas.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
