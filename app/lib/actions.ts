'use server';
import {sql} from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
      });
      // Test it out:
    //   console.log(rawFormData);
    //   console.log(typeof rawFormData.amount);
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
    try{
      await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    }catch(error){
      return{
        message: 'Database Error: Failed to Create Invoice.',
      };
    }
    
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 try{
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
 
 }catch(error){
  return{message: 'Database Error: Failed to Update Invoice.'};
 }
  
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');
  try{
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
  }catch(error){
    return {message: 'Database Error: Failed to Delete Invoice.'};
  }
}
//---------------------------
const FormSchema1 = z.object({
  personid: z.coerce.number(),
  fullname: z.string(),
  loancost: z.string(),
  address: z.string(),
});

const CreateLoan = FormSchema1.omit({ personid: true });

export async function createLoan(formData: FormData) {
  // console.log('createLoan');
    const { fullname, loancost, address } = CreateLoan.parse({
        fullname: formData.get('fullname'),
        loancost: formData.get('loancost'),
        address: formData.get('address'),
      });
      // Test it out:
      // console.log(rawFormData);
    //   console.log(typeof rawFormData.amount);
    // const amountInCents = loancost * 100;
    // const personid = new Date().toISOString().split('T')[0];
    try{
      
      await sql`
      INSERT INTO Loans (fullname, loancost, address)
      VALUES (${fullname}, ${loancost}, ${address})
      `;

    }catch(error){
      return{
        message: 'Database Error: Failed to Create Invoice.',
      };
    }
    
  revalidatePath('/dashboard/loans');
  redirect('/dashboard/loans');
}