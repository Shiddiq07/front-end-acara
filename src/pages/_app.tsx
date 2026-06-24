// src/pages/_app.tsx
import '../styles/globals.css';
// import { Providers } from '../providers'; 
import { cn } from '@/utils/cn';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import {NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const inter=Inter({
  subsets:['latin'],
  weight:['100','200','300','400','500','600','700','800','900']
})
 const queryClient=new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false,
      retry:false 
    }
  }
 })
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
    <NextUIProvider>
      <main className={cn(inter.className)}>

      {/* Di Pages Router, Component inilah yang merender index.tsx  */}
      <Component {...pageProps} />
      </main>
   
    </NextUIProvider>
    </QueryClientProvider>
  );
}