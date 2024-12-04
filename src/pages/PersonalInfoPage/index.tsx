import { PersonalInfoForm } from './PersonalInfoForm';
import { RecordsTable } from './RecordsTable';
import { useState } from 'react';
import type { FormValues } from './types';

export function PersonalInfoPage() {
  const [records, setRecords] = useState<FormValues[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = async (values: FormValues) => {
    if (editingId !== null) {
      setRecords((current) =>
        current.map((record, index) =>
          index === editingId ? values : record
        )
      );
      setEditingId(null);
    } else {
      setRecords((current) => [...current, values]);
    }
  };

  const handleEdit = (index: number) => {
    setEditingId(index);
    return records[index];
  };

  const handleDelete = (index: number) => {
    setRecords((current) => current.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      <PersonalInfoForm
        onSubmit={handleSubmit}
        editingId={editingId}
        initialValues={editingId !== null ? records[editingId] : undefined}
      />
      {records.length > 0 && (
        <RecordsTable
          records={records}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}