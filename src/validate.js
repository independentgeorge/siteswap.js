
import { SiteswapError } from "./SiteswapError"


function validate(throws) {

   // This error assumes notations can't yield invalid .throws, only user can.
   if (!validStructure(throws))
      throw new SiteswapError("Invalid throws structure.")

   const balance = throws.map((action) => action.map(() => 0))
   for (let beat = 0; beat < throws.length; beat++) {

      const action = throws[beat]
      for (const release of action) {
         for (const toss of release) {
            // Outgoing toss counts.
            balance[beat][toss.from]++

            // Incoming toss counts.
            balance[(beat + toss.value) % throws.length][toss.to]--
         }
      }
   }

   if (balance.some((action) => action.some((count) => count !== 0)))
      throw new SiteswapError("Invalid siteswap.")

}

function validStructure(throws) {

   if (!Array.isArray(throws) || !throws.length)
      return false

   for (const action of throws) {
      if (!Array.isArray(action) || action.length !== throws[0].length)
         return false

      if (action.some((release) => !Array.isArray(release) || !release.every(({ value, from, to }) => value !== undefined && from !== undefined && to !== undefined && from < action.length && to < action.length)))
         return false
   }

   return true

}


export { validate }
