'use server'

import { seedCustomers, seedInvoices, seedRevenue, seedUsers } from "@/scripts/seed";
import { revalidatePath } from 'next/cache'
import {redirect} from 'next/navigation'

export async function seed() {
    try {
      await seedUsers();
      await seedCustomers();
      await seedInvoices();
      await seedRevenue();
    } catch (error) {
      console.error('Error seeding database:', error);
      throw error;
    } finally {
      revalidatePath('/dashboard')
      revalidatePath('/dashboard/invoices')
      revalidatePath('/dashboard/customers')
      redirect('/dashboard')
    }
  }