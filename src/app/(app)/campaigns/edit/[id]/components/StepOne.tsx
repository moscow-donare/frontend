"use client"

import { CATEGORY_ID_TO_NAME } from '@/shared/const/Categories';
import { Button, DatePicker, DateValue, Input, Select, SelectItem } from '@heroui/react';
import { Calendar } from 'lucide-react';
import { useEditCampaignContext } from '../context/EditCampaignContext';
import { useEditCampaigns } from '../hooks/useEditCampaigns';
import { getLocalTimeZone, today, parseDate } from '@internationalized/date';
import { I18nProvider } from '@react-aria/i18n';

export const StepOne: React.FC = () => {
  const {
    formData,
    updateTitle,
    updateCategory,
    updateGoal,
    updateEndDate,
  } = useEditCampaignContext();
  
  const { handleNextStep } = useEditCampaigns();

  const handleDateChange = (value: DateValue | null) => {
    let jsDate: Date;
    if (!value) return;
    if ('hour' in value) {
      jsDate = new Date(value.year, value.month - 1, value.day);
    } else {
      jsDate = new Date(value.year, value.month - 1, value.day);
    }
    updateEndDate(jsDate.toISOString().split('T')[0]);
  };

  // Convert string date to DateValue for the DatePicker
  const getDateValue = () => {
    if (!formData.endDate) return null;
    try {
      return parseDate(formData.endDate);
    } catch {
      return null;
    }
  };

  return (
    <div className='flex flex-col space-y-6'>
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Editar Detalles de la Campaña</h2>
      <div className="mb-6">
        <Input
          variant="bordered"
          type="text"
          id="title"
          label="Título de la Campaña"
          value={formData.title}
          onChange={(e) => updateTitle(e.target.value)}
          placeholder="Ej: Ayuda para tratamiento médico"
          className="mt-1"
          isRequired
          labelPlacement='outside'
          size="lg"
        />
      </div>

      <div className="mb-6">
        <Select
          id="category"
          variant="bordered"
          isRequired
          selectedKeys={formData.category ? new Set([formData.category.toString()]) : new Set()}
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys as Set<number>)[0];
            if (selectedKey) {
              updateCategory(selectedKey);
            }
          }}
          placeholder="Selecciona una categoría"
          className="mt-1"
          label="Categoría"
          labelPlacement='outside'
          size="lg"
        >
          {Object.entries(CATEGORY_ID_TO_NAME).map(([id, name]) => (
            <SelectItem key={id}>
              {name}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="mb-6">
        <Input
          variant="bordered"
          type="number"
          id="goal"
          value={formData.goal.toString()}
          onChange={(e) => updateGoal(parseFloat(e.target.value))}
          placeholder="0.00"
          isRequired
          label="Objetivo de Recaudación (USD)"
          labelPlacement='outside'
          min="1"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">USD</span>
            </div>
          }
          className="mt-1"
          size="lg"
        />
      </div>

      <div className="mb-6">
        <div className="mt-1 relative">
          <I18nProvider locale="en-GB">
            <DatePicker
              id="endDate"
              variant="bordered"
              value={getDateValue()}
              onChange={handleDateChange}
              isRequired
              className="max-w-full"
              label="Fecha de finalización"
              labelPlacement='outside'
              validationBehavior='aria'
              showMonthAndYearPickers
              size="lg"
              minValue={today(getLocalTimeZone())}
              startContent={<Calendar className="h-4 w-4 text-default-400" />}
            />
          </I18nProvider>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="button"
          onPress={handleNextStep}
          color="primary"
          size="lg"
          className="px-8"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};
