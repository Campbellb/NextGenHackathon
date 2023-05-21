import { Inter, Roboto, Montserrat, Open_Sans, Oswald, Merriweather } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

 export const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-roboto'
});

 export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat'
});

 export const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans'
});

 export const oswald = Oswald({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-oswald'
});

export const merriweather = Merriweather({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-arial',
  weight: ['400', '700']
});

export const fonts = {
  "oswald": oswald,
  "inter": inter,
  "roboto": roboto,
  "montserrat": montserrat,
  "open sans": openSans
}

export type fontNames = 'oswald' | 'inter' | 'roboto' | 'montserrat' | 'open sans'