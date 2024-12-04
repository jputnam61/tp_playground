import { format } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { FormValues } from './types';

interface RecordsTableProps {
  records: FormValues[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export function RecordsTable({ records, onEdit, onDelete }: RecordsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Submitted Records</CardTitle>
        <CardDescription>
          View and manage your submitted records
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record, index) => (
                <TableRow key={index} data-testid={`record-row-${index}`}>
                  <TableCell>
                    {record.firstName} {record.lastName}
                  </TableCell>
                  <TableCell>{record.email}</TableCell>
                  <TableCell>{record.phone}</TableCell>
                  <TableCell>
                    {format(record.dateOfBirth, 'PP')}
                  </TableCell>
                  <TableCell>
                    {record.address}, {record.city}, {record.state}{' '}
                    {record.postalCode}, {record.country}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(index)}
                        id={`button-edit-${index}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(index)}
                        id={`button-delete-${index}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}