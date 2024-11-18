import Form from '@/app/ui/loans/create-form';
import Breadcrumbs from '@/app/ui/loans/breadcrumbs';
import { fetchLoaners } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchLoaners();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Loans', href: '/dashboard/loans' },
          {
            label: 'Create Loan',
            href: '/dashboard/loans/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}