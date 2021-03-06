
import { Siteswap } from "./Siteswap"


function mark(orbit, map, throws, i, j) {

   const release = throws[i][j]
   for (const toss of release) {

      if (toss.value === 0)
         continue
      const beat = (i + toss.value) % throws.length
      if (map[beat][toss.to] === orbit)
         continue

      map[beat][toss.to] = orbit
      mark(orbit, map, throws, beat, toss.to)
   }

}

function orbitise(siteswap) {

   if (siteswap.greatestValue === 0)
      return [siteswap]

   const { throws, notation } = siteswap
   const orbits = []

   // Maps tosses to orbits.
   const map = throws.map((action) => action.map(() => null))
   for (let i = 0; i < throws.length; i++) {
      const action = throws[i]
      for (let j = 0; j < action.length; j++) {

         const release = action[j]
         if (map[i][j] === null && !(release.length === 1 && release[0].value === 0)) {
            const orbit = []
            mark(orbit, map, throws, i, j)
            orbits.push(orbit)
         }
      }
   }

   if (orbits.length === 1)
      return [siteswap]

   for (let i = 0; i < throws.length; i++) {
      const action = throws[i]
      for (const orbit of orbits)
         orbit.push(action.map((release, j) => (map[i][j] === orbit ? release : [{ value: 0, from: j, to: j }])))
   }

   return orbits.map((orbit) => new Siteswap(orbit, notation))

}


export { orbitise }

