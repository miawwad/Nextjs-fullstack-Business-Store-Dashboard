import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { Loan } from '@/app/lib/definitions';
import { useSearchParams } from 'next/navigation';
import { fetchFilteredLoans } from '@/app/lib/data';

export default async function LatestLoans({
  query,
  currentPage,
  latestLoans,
  rowNum,
}: {
  query: string;
  currentPage: number;
  latestLoans: Loan[];
  rowNum: number;
  
}) {
  const loan = await fetchFilteredLoans(query, currentPage);

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Loans
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: Uncomment this code in Chapter 7 */}

        <div className="bg-white px-6">
          {loan.map((Loan, i) => {
            return (
              <div
                key={Loan.personid}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {Loan.fullname}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {Loan.address}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {Loan.loancost}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
