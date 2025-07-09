'use client';

import { Input } from '@/components/ui/input';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { toast } from 'sonner';
import DetailForm from './detail-form';
import PhotoUploads from './photo-upload';
import { Button } from '@/components/ui/button';
import ConfirmRcDetail from './confirm-rc-details';
import { RcDetailsWithRegNo, useConfirmRCDetail } from '@/hooks/use-confirm-rc-detail';
import { postWithAuth } from '@/lib/post-with-auth';
import { useAuthStore } from '@/components/stores/auth-store';
import { usePathname, useRouter } from 'next/navigation';

const SellCarVerification = () => {
  const [regNum, setRegNum] = useState("");
  const setShowConfirmDetail = useConfirmRCDetail(state => state.setShow);
  const { hasHydrated, token } = useAuthStore();
  const router = useRouter();
  const path = usePathname();

  const verifyRegNo = async () => {
    if (!regNum) {
      toast.warning("Please enter a registration number.")
      return;
    }
    if (!hasHydrated) {
      toast.warning("Please give it a moment");
      return;
    }
    if (!token?.access_token) {
      router.replace(`${path}?auth-state=login`);
      return;
    }

    try {
      const { data, status } = await postWithAuth<{ reg_no: string }, { data: RcDetailsWithRegNo }>(`/vehicle-verify`, { reg_no: regNum });
      if (status === 200) {
        toast.success("Car verified successfully!");
        setTimeout(() => {
          setShowConfirmDetail(true, data.data);
          setRegNum("");
        }, 300);
        return;
      }
    } catch (err) {
      const e = err as AxiosError;
      console.error("error verifying reg no.:", e);
      if (e.response && e.response.status === 401)
        toast.error("Authentication Failed! Please try logging in again.");
      else if (e.response && e.response.status >= 400)
        toast.error("Bad Request! Please try again.");
      else if (e.response && e.response?.status >= 500) toast.error("Something Went Wrong!");
    }
  }

  return (
    <section className='relative z-10 w-full'>
      <div className='w-full max-w-3xl mx-auto text-center bg-white rounded-xl [box-shadow:0_0_10px_rgba(0,0,0,0.3)] py-2 sm:py-8 px-4 sm:px-32'>
        <h2 className='text-xl sm:text-3xl font-bold mb-6'>Enter your car Registration Number</h2>
        <div className='space-y-4 flex flex-col sm:flex-row sm:space-y-0 sm:space-x-4 items-center max-w-xl'>
          <Input id='reg-no' value={regNum}
            onChange={(e) => setRegNum(e.target.value)}
            className='w-full sm:!text-lg font-semibold py-2 sm:py-6 uppercase'
            placeholder='Enter your car number'
            required />
          <Button
            size="lg"
            className="bg-blue-600/90 hover:bg-blue-700 text-white px-8 py-6 text-lg font-bold"
            onClick={verifyRegNo}
          >
            Sell My Car
          </Button>
        </div>
      </div>
      <ConfirmRcDetail />
      <DetailForm />
      <PhotoUploads />
    </section>
  )
}


export default SellCarVerification;