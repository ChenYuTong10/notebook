# 2️⃣ Parsing

## 🔮 Introduction

In the previous section, we have introduced what is regular language.
But the regular expression has its own disadvantage. Look at the following example.

![regular expression disadvantage](/compiler/image/regular-expression-disadvantage.png)

Assume that there is a string `11111` with 5 characters. When the machine inputs the string,
the state will jump between the start state and the final state. Finally stop on the final state.
The problem is how do I know how many characters in the input string.
From the result of the state, I can not get the number of the `1` character.
The finite automata counts the modulus of the states on machine.
That is it can not recognize **the language needs counting arbitrarily**. 

In parsing step, the compiler inputs the sequence of the tokens from lexical analysis
and outputs the parse tree of the program.

::: tip
Modern compilers may combine the lexical analysis and parsing into one step.
The lexical analysis will be done by the parser.
:::

## 🌳 Context-Free Grammar(CFG)

Common programming languages have recursive structure. What does it mean?

```cpp
while(i < 10)
{
    std::cout << i + 1 << "\n";
    i = i + 1;
}
```

Seeing the whole `while` loop structure. The strings `i < 10`, `std::cout...` and `i = i + 1` are all expressions.
That is we can abstract the structure of the `while` loop like following.

I know there will be an expression in while condition. It may be `i < 10`, `a != 10` and any other valid expression.
I also know there will be multiple expressions in while body. What is their common places? They must be the expression.
So using the **EXPR** to replace them and finally get the abstract recursive structure.

```cpp
/* while abstract structure */
while(EXPR) { EXPR }
```

The Context-Free Grammar(CFG) is a natural notation for this recursive structure.

### 🧱 Composition

A CFG consists of four parts.
- A set of terminals (T)
- A set of non-terminals (N)
- A start symbol (S, S ∈ N)
- A set of productions (X → Y1Y2...Yn, X ∈ N, Y ∈ T | N | ε)

**Terminal** is the symbol can not be replaced by other symbols.
> You will be more clear after seeing the following explanation. 

**Production** is a derivation. It means non-terminal `X` can be replaced by the symbols on the right hand.
Each `Yi` can be either a terminal or a non-terminal or a special symbol `ε`. 

Let's see a language with a general definition `{ (^i)^i | i >= 0 }`.

We can get the parts of CFG.
- Terminals `T = { (, ), ε }`
- Non-terminals `N = { S }`
- Start symbol `S`
- Productions `S → (S)`, `S → ε`

🪄 That's all. It is easy!

### ⚙️ Derivation

After getting the CFG productions, we can derive the strings recursively.

For example, we have a production `X → Y1Y2...Yn` and here is a string `X1X2X`.
We can generate a new string `X1X2Y1Y2...Yn` by replacing `X` to `Y1Y2...Yn`.
This is the context-free grammar derivation.

If we have multiple steps like above, we can derive from start symbol `S` to multiple strings.
Once the symbols in string are all terminals, the derivation is done.

Then a language `L(G)` defined by context-free grammar `G` is `{ a1...an | ∀i ai ∈ T ^ S → a1...an }`.
