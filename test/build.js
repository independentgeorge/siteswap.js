"use strict"

import assert                    from "assert"
import { Siteswap as Siteswap1 } from "../src/Siteswap"
import Siteswap2                 from "../dist/siteswap"


describe("Builds", function(){

   it("src/Siteswap.js", function(){ assert.doesNotThrow( () => new Siteswap1([[[{"value":3,"handFrom":0,"handTo":0}]]], null) ) })
   it("dist/siteswap",   function(){ assert.doesNotThrow( () => new Siteswap2([[[{"value":3,"handFrom":0,"handTo":0}]]], null) ) })

})