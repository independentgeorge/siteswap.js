# siteswap.js

Parse, examine and manipulate juggling patterns in JavaScript.

_Supported environments: Node 6.5+, Chrome, Firefox, Edge, Safari, Opera._


## Usage

#### Siteswap( string, notation = "compressed" )

- `string` - siteswap string or throws array.
- `notation` - notation(s) used to parse `string`. See [supported notations](#notations).

```javascript
new Siteswap("753")
new Siteswap("[43]14")
new Siteswap("(4,2x)*")
new Siteswap("7,5,3", "standard")
new Siteswap("<3p,3,3|3p,3,3>", "passing")
new Siteswap("<(4xp,4x)|(4xp,4x)>", "passing")
new Siteswap(`B3,A3,A3
              C3,B3,B3
              A3,C3,C3`, "multihand")
```

The following properties/functions are exposed:


__`.valid`__ &raquo; boolean showing if the siteswap is valid.

__`.error`__ &raquo; error message (set to invalid siteswaps).

__`.input`__ &raquo; passed arguments (set to invalid siteswaps).

__`.notation`__ &raquo; notation used to parse the siteswap.

__`.degree`__ &raquo; number of hands used per beat. 

__`.props`__ &raquo; number of props the pattern requires.

__`.multiplex`__ &raquo; greatest number of props released together from a single hand.

__`.greatestValue`__ &raquo; greatest throw value.

__`.period`__ &raquo; length of one cycle.

__`.fullPeriod`__ &raquo; length of one coloured cycle (one which distinguishes props).

__`.groundState`__ &raquo; boolean showing if the siteswap is ground state or excited.

__`.prime`__ &raquo; boolean showing if the siteswap is prime (cannot be decomposed).

__`.throws`__ &raquo; array of tosses like `{ from: int, to: int, value: int }` three levels deep representing the throw sequence. `.throws[1][0][3]` is the fourth (multiplex) toss of the first hand during the second throw of the sequence.

__`.states`__ &raquo; array of states representing the number of props in hands over time. `.states[1][0][3]` is the number of props in the first hand, four beats after the second throw is made.

__`.strictStates`__ &raquo; array of states representing positions of specific props within hands over time. `.states[1][0][3][2]` is the id of the third ball in the first hand, four beats after the second throw is made.

__`.orbits`__ &raquo; array of siteswap's orbits which are themselves `Siteswap`s.

__`.composition`__ &raquo; array of prime `Siteswap`s the siteswap is consisted of.

__`.equals( siteswap )`__ &raquo; returns a boolean showing if the siteswap's `.throws` match those of any rotation of `siteswap`.

__`.rotate( count = 1 )`__ &raquo; returns a new `Siteswap` obtained by rotating the throw sequence by `count` beats to the right.

__`.toString( notation = this.notation )`__ &raquo; returns a string representing the siteswap in a given notation.

__`.log()`__ &raquo; outputs all the siteswap properties in a human friendly form to console.

-----

Invalid siteswaps only have `.valid`, `.error`, and `.input` properties set.


Example
```javascript
const siteswap = new Siteswap("753")
siteswap.valid                      // true
siteswap.notation                   // "compressed:async"
siteswap.degree                     // 1
siteswap.props                      // 5
siteswap.multiplex                  // 1
siteswap.greatestValue              // 7
siteswap.period                     // 3
siteswap.fullPeriod                 // 12
siteswap.groundState                // true
siteswap.prime                      // true
siteswap.throws                     // [
                                    //  [[{ "value": 7, "from": 0, "to": 0 }]],
                                    //  [[{ "value": 5, "from": 0, "to": 0 }]],
                                    //  [[{ "value": 3, "from": 0, "to": 0 }]]
                                    // ]
siteswap.states                     // [
                                    //  [[1,1,1,1,1]],
                                    //  [[1,1,1,1,0,0,1]],
                                    //  [[1,1,1,0,1,1]]
                                    // ]
siteswap.strictStates               // [
                                    //  [[[1],[2],[3],[4],[5]]],
                                    //  [[[2],[3],[4],[5],[],[],[1]]],
                                    //  [[[3],[4],[5],[],[2],[1]]],
                                    //  [[[4],[5],[3],[2],[1]]],
                                    //  [[[5],[3],[2],[1],[],[],[4]]],
                                    //  [[[3],[2],[1],[],[5],[4]]],
                                    //  [[[2],[1],[3],[5],[4]]],
                                    //  [[[1],[3],[5],[4],[],[],[2]]],
                                    //  [[[3],[5],[4],[],[1],[2]]],
                                    //  [[[5],[4],[3],[1],[2]]],
                                    //  [[[4],[3],[1],[2],[],[],[5]]],
                                    //  [[[3],[1],[2],[],[4],[5]]]
                                    // ]
siteswap.composition                // [this]
siteswap.orbits                     // [new Siteswap("750"), new Siteswap("003")]
siteswap.toString()                 // "753"
siteswap.toString("standard:async") // "7,5,3"

```




## Notations


___standard___

- shorthand for `["standard:async", "standard:sync"]`  


___standard:async___

- throw values > 9 are written as numbers: `11` is eleven ball cascade
- throw values are separated: `1,1` is one ball cascade

```
5
11,1
[4,3],1,4
```

___standard:sync___

- throw values are doubled
- throw values > 9 are written as numbers: `(10x,10x)` is a ten ball wimpy pattern
- throw values are separated: `([4,4],4)`

```
(4,4)
(4,2x)(2x,4)
([2x,2x],0)*
```

___compressed___

- shorthand for `["compressed:async", "compressed:sync"]`

___compressed:async___

- throw values > 9 are written as alphabetical letters: `b` is eleven ball cascade
- throw values are not separated: `11` is one ball cascade

```
5
b1
[43]14
```

___compressed:sync___

- throw values are doubled
- throw values > 9 are written as alphabetical letters: `(ax,ax)` is a ten ball wimpy pattern
- multiplex throw values are not separated: `([44],4)`
- hands are optionally separated: `([44],4)` `([44]4)`

```
(44)
(4,4)
(4,2x)(2x,4)
([2x2x],0)*
```

___passing___

- shorthand for `["passing:async", "passing:sync"]`

___passing:async___

- jugglers' actions are separated like `< … | … | … >` and respect the _standard:async_ rules
- a pass is denoted with `p` when there are two jugglers: `<3p|3p>`
- a pass is denoted with `pN` when there are two or more jugglers: `<3p2|3p3|3p1>`

```
<3|3>
<3p|3p>
<3p2|3p1>
<3p2|3p3|3p1>
<[3,3p],3,3|3p,3,3>
```

___passing:sync___

- jugglers' actions are separated like `< … | … | … >` and respect the _standard:sync_ rules
- a pass is denoted with `p` when there are two jugglers: `<(4xp,4)|(4,4xp)>`
- a pass is denoted with `pN` when there are two or more jugglers: `<(4xp2,4)|(4,4xp1)>`

```
<(4,2x)*|(4x,4x)>
<(4p,4)|(4p,4)>
<(4p2,4)|(4p1,4)>
<([6x,4p],4)(4,6x)|([4x,4p],6)(6,4x)>
```

___multihand___

- throws are grouped by hands in rows
- tosses are comma separated: `A5,A3`
- a toss is denoted with the target hand (A,B,C...) and throw value: `A3`, or
- a toss is denoted with the relative target hand and throw value in parentheses: `(-1,3)`

```
A6,A4

B3
C3
D3
A3

[A4,B3],A4,A1
[A3,B5],B3,B1

(0,6)(0,4)

( 1,4)( 1,2)[(0,3)( 1,3)]
(-1,1)(-1,5)[(0,3)(-1,3)]
```


-----

_All notations support multiplex throws using the [ ] syntax._

_All choices (like comma/space as separator) must be consistently applied._



## To do

- Siteswap and transition generator.
- Custom hand rhythm. Like two hands in one handed patterns.
- Combining siteswaps of different degrees.

## License

MIT License



