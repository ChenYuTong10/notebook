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

Most programming languages have recursive structure. What does it mean?

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
- A set of terminals $(T)$
- A set of non-terminals $(N)$
- A start symbol $(S, S \in N)$
- A set of productions $(X → Y_1Y_2...Y_n, X \in N, Y \in T \vert N \vert ε)$

**Terminal** is the symbol can not be replaced by other symbols.
> You will be more clear about terminal after seeing the following explanation. 

**Production** is a derivation. It means non-terminal $X$ can be replaced by the symbols on the right hand.
Each $Y_i$ can be either a terminal or a non-terminal or a special symbol `ε`. 

Let's see a language with a general definition $\{ (^i )^i \vert i >= 0 \}$.

We can get the parts of CFG.
- Terminals $T = \{ (, ), ε \}$
- Non-terminals $N = \{ S \}$
- Start symbol $S$
- Productions $S → (S), S → ε$

> Of course, you can replace start symbol $S$ with any other character you like.

### ⚙️ Derivation

After getting the productions, we can derive the strings recursively.

For example, we have a production $X → Y_1Y_2...Y_n$ and here is a string $X_1X_2X$.
We can generate a new string $X_1X_2Y_1Y_2...Y_n$ by replacing $X$ to $Y_1Y_2...Y_n$.
This is the context-free grammar derivation.

If we have multiple steps like above, we can derive from start symbol $S$ to multiple strings.
Once the symbols in string are all terminals, the derivation is done.

The language defined by context-free grammar `G` is $L(G) = \{ a_1...a_n | \forall i\ a_i ∈ T \wedge S → a_1...a_n \}$.

Let's see an example about simple arithmetic expressions.

As you can see, the left side is a defined context-free grammar.

- Terminals $T = \{ (, ), id \}$
- Non-Terminals $N = \{ E \}$
- Start symbol $E$
- Productions have listed on the image.

And the right side is just a few expressions in the language defined by this grammar.

![cfg language example](/compiler/image/cfg-language-example.png)

We can draw each derivation as a tree. For example, a derivation $X → Y_1...Y_n$.
The start symbol $X$ is the root of tree and the symbol $Y_1...Y_n$ are the children of the root.

![cfg derivation tree](/compiler/image/cfg-derivation-tree.png)

Now we are going to show two ways to produce the derivation for the string `id * id + id`.

This is the one of the derivations.

![cfg left most derivation tree](/compiler/image/cfg-left-most-derivation.png)

This is the other one of the derivations.

![cfg right most derivation tree](/compiler/image/cfg-right-most-derivation.png)

There are some questions about two derivations.

Q1: What are the characteristics of nodes in both parse tree?

A1: All terminals are on the **leaves** and all non-terminals are on the **interior** nodes.

Q2: What is the similarities of two derivations?

A2: Both parse trees are the same. That means a derivation defines a parse tree but a parse tree may have multiple derivations. 
    Most importantly, **it is not an accident.**

Q3: What is the difference of two derivations?

A3: The difference is the former derivation always replaces the left-most non-terminal to the terminal.
    But the latter one replaces the right-most non-terminal to the terminal.
    Therefore, we call them **left-most derivation** and **right-most derivation** separately.
    Both derivations are important in the parser implementation.

### 💣 Ambiguity

Let's discuss a critical problem about the parse tree.
Look at the same string `id * id + id` with a different parse tree.

![cfg ambiguity](/compiler/image/cfg-ambiguity.png)

The same string `id * id + id` has different parse trees.

A grammar is **ambiguous** if it has more than one parse tree for some strings.
Equivalently, there is one more left-most derivation or right-most derivation for some strings.

What is the problem with the ambiguous grammar? If the grammar is ambiguous,
the compiler needs to choose which interpretation should be picked up to your program.
It is up to the compiler's decision. It is horrible.

How can we handle this ambiguity? The direct way is to **rewrite the grammar unambiguously**.
See the grammar below. It ensures only one parse tree for each string.

![cfg unambiguity](/compiler/image/cfg-unambiguity.png)

From the productions of CFG, we can see:

- $E$ generates $E$ and if we don't want to $E$, we should generate $E'$.
- $E'$ generates $E'$ and if we don't want to $E'$, we should generate $id$ or $(E)$.

At the same time, the grammar forces the plus to generate before the times.
That is why this grammar works.

However, there is something we need to know. 

It is impossible to transform an ambiguous grammar to an unambiguous one automatically.
We need to rewrite the grammar manually. 

Writing an ambiguous grammar is comfortable because ambiguity can simplify the grammar 
and allows us to write it more naturally. But writing an unambiguous one is a headache.

So instead of rewriting the ambiguous grammar directly, we always write the ambiguous grammar along with **disambiguating declarations**.
Most tools disambiguate grammar through *precedence and associativity declarations*.

Let's look at an example containing [bison](https://www.gnu.org/software/bison/) tool.

There is a CFG with two productions $E → E + E, E → int$.
The grammar is ambiguous when the string is `int + int + int`.
Here are two different parse trees of the string.

![cfg ambiguity example](/compiler/image/cfg-ambiguity-example.png)

Now we use bison tool to declare a left associativity of plus `%left +`.
The parse tree below will be no longer valid after disambiguating grammar.

> `%left +` is the syntax of bison. You can learn about it if you are interested with it.

## 💊 Error Handling

There are many kinds of possible errors in program.

| Error Kind |         Description          |       Example        |   Detector   |
|:----------:|:----------------------------:|:--------------------:|:------------:|
|  Lexical   | Using unrecognized character |       ...$...        |    Lexer     |
|   Syntax   | Lexical Units make no sense  |        1 +* 2        |    Parser    |
|  Semantic  | Uncorrected types and so on  | int x = 0, y = x(1); | Type Checker |
|    ...     |             ...              |         ...          |     ...      |

A good error handler should:
- Report the error accurately and clearly.
- Recover from the error quickly.
- Not slow down the compilation of valid code.

Next we are going to introduce three different kinds of error handling.

### 🩼 Panic Mode

Panic mode is the simplest and most popular method in error handling.

The basic idea is that when the compiler detects an error, it will discard tokens until the token can be parsed.

For example, there is an expression `(1 + + 2) + 3`. The compiler will be stuck when encounters the second `+`.
In panic mode, the compiler will discard the `+` token and skip ahead to the `2`.

In bison tool, a special terminal `error` is used in productions to describe how much input should be skipped.

Look at the production $E → int | E + E | (E) | error\ int | (error)$.
The compiler will try to find a normal state firstly.
But if no state is recognized, it will declare an `error` state.
The state $error\ int$ shows all tokens before next integer will be discarded
and the another state $(error)$ indicates everything between parentheses will be thrown.

### 💉 Error Productions

The basic idea of error productions is merging known common mistakes into grammar.

For example, the scientists always write math expression `4x` instead of `4 * x`.
So when we consider the productions of CFG, we will add the production $E → E * E \vert EE$.

In other hand, merging the error into productions may complicate the language grammar.

### 🩹 Error Correction

Error correction will try to insert or delete the tokens to correct program automatically.
When the compiler meets an error, it will search a program as close as possible
to the original program and corrects the error.

> Here you will learn about the **minimum edit distance algorithm**.

It sounds good, right? However, it is hard to implement a compiler like this.
You may need to consider where to insert or delete the fragments in program and where to find the closest, the most fit program? 
What's more, the resources used to search the program and correct the errors will slow down the speed of parsing valid program.

