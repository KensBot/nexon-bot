exports.run = {
   noxious: ['premium', 'sewabot'],
   hidden: ['prem', 'infopremium', 'sewa'],
   category: 'about',
   async: async (m, {
      clips
   }) => {
       clips.reply(m.chat, info(), m)
   },
    error: false,
}
let info = () => {
   return `⼷  *P R E M I U M*

*Price* : 
1. *Rp. 5,000,-* (15 Hari)
2. *Rp. 15,000,-* (1 Bulan)
3. *Rp. 30,000,-* (2 Bulan) + 7 hari
4. *Rp. 50,000,-* (Permanen)

⼷  *S E W A - B O T*

*Price* :
1. *Rp. 15.000,-* (1 Bulan)
   »  Join 1 Group 
   »  Unlock Feature Admin 
   »  Online 24 Jam

2. *Rp. 30.000,-* (2 Bulan)
   »  Join 1 Group 
   »  Unlock Feature Admin 
   »  Online 24 Jam

3. *Rp. 45.000,-* (3 Bulan) + 10 Hari
   »  Join 1 Group 
   »  Unlock Feature Admin 
   »  Online 24 Jam

4. *Rp. 60.000,-* (4 Bulan) + 20 Hari
   »  Join 1 Group 
   »  Unlock Feature Admin 
   »  Online 24 Jam

5. *Rp. 80.000,-* (Permanen)
   »  Join 1 Group 
   »  Unlock Feature Admin 
   »  Online 24 Jam

Jika ingin membeli premium plan / sewa bot silahkan hubungin *.owner*`
}
