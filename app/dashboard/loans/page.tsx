import { lusitana } from '@/app/ui/fonts';
import { fetchLoans, fetchLoansPages, fetchFilteredLoans } from '@/app/lib/data';
import LatestLoans from '@/app/ui/loans/taken-loans';
import { Suspense } from 'react';
import { LatestLoansSkeleton } from '@/app/ui/skeletons';
import Pagination from '@/app/ui/loans/pagination';
import { useSearchParams } from 'next/navigation';
import { CreateLoan } from '@/app/ui/invoices/buttons';

export default async function Page(
  props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
      rowNum?: string;
    }>;
  }
) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchLoansPages(query);
    

     // Get the row value from searchParams, defaulting to 1 if not defined
  const row = searchParams?.rowNum;
  const rowNum = Number(row) || 1;

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Loans & Legs to break
      </h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateLoan/>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
     
      <Suspense key={query + currentPage} fallback={<LatestLoansSkeleton />}>
      <LatestLoans query={query}  currentPage={currentPage} />
      </Suspense>
      </div >
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>

      {/* <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        
        <Suspense key={query + currentPage}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      </div> */}
      
      <div className="mt-5 flex w-full justify-center">
      </div>
    </main>
  );
}