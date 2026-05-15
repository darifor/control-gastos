import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { addTransaction } from '../services/transactions';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = {
  gasto: [
    { value: 'alimentacion', label: 'Alimentación' },
    { value: 'transporte', label: 'Transporte' },
    { value: 'vivienda', label: 'Vivienda' },
    { value: 'ocio', label: 'Ocio' },
    { value: 'salud', label: 'Salud' },
    { value: 'ropa', label: 'Ropa' },
    { value: 'formacion', label: 'Formación' },
    { value: 'otros', label: 'Otros' }
  ],
  ingreso: [
    { value: 'salario', label: 'Salario' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'inversiones', label: 'Inversiones' },
    { value: 'otros', label: 'Otros' }
  ]
};

export function AddTransaction() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: 'gasto',
    amount: '',
    category: 'alimentacion',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTransaction(formData);
    navigate('/history');
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setFormData({
      ...formData,
      type: newType,
      category: CATEGORIES[newType][0].value
    });
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 w-full max-w-2xl mx-auto">
      <h1 className="text-[24px] md:text-[32px] font-semibold leading-tight text-on-surface">
        Añadir Transacción
      </h1>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* All fields take full width on mobile */}
            <div className="w-full">
              <Select
                label="Tipo"
                id="type"
                value={formData.type}
                onChange={handleTypeChange}
                options={[
                  { value: 'gasto', label: 'Gasto' },
                  { value: 'ingreso', label: 'Ingreso' }
                ]}
              />
            </div>

            <div className="w-full">
              <Input
                label="Cantidad (€)"
                id="amount"
                type="number"
                step="0.01"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
              />
            </div>

            <div className="w-full">
              <Select
                label="Categoría"
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                options={CATEGORIES[formData.type]}
              />
            </div>

            <div className="w-full">
              <Input
                label="Descripción"
                id="description"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Ej. Compra supermercado"
              />
            </div>

            <div className="w-full">
              <Input
                label="Fecha"
                id="date"
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            {/* Buttons: full width on mobile, right-aligned on md+ */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant={formData.type === 'ingreso' ? 'success' : 'primary'}
                className="w-full sm:w-auto"
              >
                Guardar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
