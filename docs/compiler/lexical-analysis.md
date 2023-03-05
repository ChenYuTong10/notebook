# 1️⃣ Lexical Analysis

Lexical analysis is the first key step when the compiler works.
What is lexical analysis(LA) doing and how does it do with the program?
Next we will introduce the whole details of LA.

## ⚙️ What is LA doing

### ✂️ Partition string

In code editor, we might write our programs line by line with beautiful formats.
But when the compiler start to compile the program, it can not see these formats.
Instead, it sees the program only one line with white space.

::: tip
White space here refers to not only the blank, but also the escaped character.
:::

![compiler view](/compiler/image/compiler-view.png)

The compiler scans the input strings from left to right and recognizes substrings according to white space.
These substrings recognized we call them **lexemes**.

Let's look at an example.

```c++
/* comparison or equal */
std::cout << i == j << "\n";
```
In this statement, when the compiler scans the string, it will get `std`, `cout`, `<<` and so on.
Here has a question when it gets first `=` lexeme.
Can you confirm it is equal operator or comparison operator? No, you can't.
You should look ahead and scan the next one `=` to know it is comparison operator.
So this example also tells you **looking ahead** in lexical analysis is required sometimes.

### 🏷 Identify token class

When the compiler gets these lexemes, it needs to classify their class at the same time.
The class may be `Number`, `Keyword`, `Identifier`, `Operator` and so on.

|   Class    |       Example       |
|:----------:|:-------------------:|
|   Number   | `43`, `053`,`0x2b`  |
|  Keyword   | `if`, `else`, `for` |
| Identifier | `x`, `foo`, `data`  |
|  Operator  | `+`, `-`, `=`, `==` |
|    ...     |         ...         |

Finally, the compiler will combine the lexemes and their corresponding class to a series of pairs looks like `<class, lexeme>` and then passing the result to the next step.
These pairs we call them **tokens**.

![lexical analysis progress](/compiler/image/lexical-analysis-progress.png)

## 🔍 How does LA do

### 📑 Regular Expression

Let's think about a question. What should we do before doing the lexical analysis?
Think about the language syntax? Yes, you are right.

To analyse a language, we need to know what rules the language should observe.
So we need a formal language to specific the language. That is **regular expression**.

Regular expression is the syntax we usually write in code editor.
Importantly, it is only the specification of a language **not implementation**.

> **Regular language** is a set of strings defined by regular expression.

There are five basic constructs of regular expressions.

|        Construct        |                        Description                        |
|:-----------------------:|:---------------------------------------------------------:|
|  Empty string(Epsilon)  |                   ε = &lcub; "" &rcub;                    |
| Single character string |                     &lcub; "a" &rcub;                     |
|      Union string       |       AB = &lcub; a ∈ A, b ∈ B &#124; a ^ b &rcub;        |
|  Concatenation string   | A + B = &lcub; a ∈ A &#124; a } ^ { b ∈ B &#124; b &rcub; |
|    Iteration string     |     A* = &lcub; "", "A", "AA", ... , "AA...A" &rcub;      |

Knowing the regular expression, let's look at the whole progress from writing regular expression to lexical analysis.

1. Write a regular expression for lexemes of each token class.
   - Number: digit+
   - Keyword: 'if', 'else', ...
   - Identifier: letter(letter + digit)*
   - ......
2. Construct `R` matching all lexemes for all tokens.
   > This is only the union of all regular expression on step 1.
3. Input `x1...xn` and check whether string `x1...xn` in L(R).
4. If success, `x1...xn` observes Rj regular expression.
5. If failed, remove `x1...xn` from input and goto step 3.

> L(R) is the set of regular language defined by the regular expression R.

::: tip 
Here are some ambiguities we need to solve.

Q1: Assume that there are two input strings `x1...xi` and `x1...xj`(i != j). Both observe Rj regular expression. Which input string do we use?

A1: This is similar to the problem when the compiler scans the first `=` operator. The answer is **match as long as possible**.

Q2: Assume that there is a string `if` and it can be `Keyword` and `Identifier`. Which token class should be used?

A2: To solve this problem, we need to give priority of each token class. And **match** the highest priority token class if conflicted.
:::

### 🕹 Finite Automata

After determining the language specification, we use **finite automata** to implement it.
Finite automata is like a machine. It has multiple different states and takes transitions among them when you input something.
So you can check specific strings written by this language whether consistent with the syntax.

We use some signs to show some different states and transitions. There are also some special conditions marked in chart.

![state and transition](/compiler/image/state-transition.png)

> **Epsilon-move** enables machine to move next without input any string.

Let's use an example to see how finite automata check the strings.

Assume there is a language accepts only "1". And we can get a finite automata flowchart like following.

![finite antomata flowchart](/compiler/image/finite-automata-flowchart.png)

In case 1, the scanner pointer scans the input `1` and allows automata take a transition from `A` to `B`.
Then the automata is in accepting state and the pointer is at the end of input string. The input is **accepted**.

In case 2, the first input is `0` but there is no transition on zero. The machine is stuck and the input is **rejected**.

In case 3, the first input is `1` and the state moves to `B`. The second input is `0` but no next transition for zero on state `B`.
Though the automata is on the final state, it also **rejects** this input string.

This is the whole progress how finite automata checks the input string.

And from the case above, we can know there are two conditions need to satisfy if the input string is accepted.
- The machine is on the final state
- The scanner pointer is at the end of input string

Next we will introduce two kinds of finite automata. Both recognize the same set of regular languages.

The first one is **Non-deterministic Finite Automata(NFA)**.
- Can have epsilon-move
- Multiple transitions for one input in a given state

The second one is **Deterministic Finite Automata(DFA)**.
   - No epsilon-move
   - One transition per input per state

As we can see, NFA may have multiple states per input. It can present a regular expression more easily and more flexibly.
But it can be verbose and may impact the efficiency of LA. 
DFA only has a state per transition. Less state and more accurate transition. It can more efficient in LA.

So from the features of NFA and DFA, we usually transform the regular expression to NFA firstly and then transform NFA to DFA.

![dfa nfa transition](/compiler/image/dfa-nfa-transition.png)

The problem is how we transform our written regular expressions to the equivalent finite automata.
Let's try to transform to the NFA firstly. Look at the table.

|        Construct        |    Description    |                           Corresponding NFA                           |
|:-----------------------:|:-----------------:|:---------------------------------------------------------------------:|
|  Empty string(Epsilon)  |         ε         |            ![epsilon nfa](/compiler/image/epsilon-nfa.png)            |
| Single character string | &lcub; "a" &rcub; | ![single character nfa.png](/compiler/image/single-character-nfa.png) |
|      Union string       |        AB         |            ![union nfa.png](/compiler/image/union-nfa.png)            |
|  Concatenation string   |       A + B       |    ![concatenation nfa.png](/compiler/image/concatenation-nfa.png)    |
|    Iteration string     |        A*         |        ![iteration nfa.png](/compiler/image/iteration-nfa.png)        |

Maybe showing an example is more distinct.

Assume there is a regular expression `(1 + 0)*1`. What is its NFA?

Look at `1` and `0` in brackets. We construct their NFA firstly.

![regexp to nfa example 1](/compiler/image/regexp-to-nfa-example-1.png)

It is easy! And next we construct `1 + 0`'s NFA. Consider `1`'s NFA with `State A` and `0`'s with `State B`.
After that, replace the `State A` and `State B` in `A + B`'s NFA.

![regexp to nfa example 2](/compiler/image/regexp-to-nfa-example-2.png)

Then it is time to construct `(1 + 0)*`'s NFA. Wrap the whole NFA above with `State A`.
And replace the `State A` in `A*`'s NFA. It is the same.

![regexp to nfa example 3](/compiler/image/regexp-to-nfa-example-3.png)

Now it seems large. But don't be afraid. Now let's construct the last `1`'s NFA.

![regexp to nfa example 4](/compiler/image/regexp-to-nfa-example-4.png)

Finally, merge `(1 + 0)*`'s NFA and `1`'s into a NFA.

![regexp to nfa example 5](/compiler/image/regexp-to-nfa-example-5.png)

🎉 Congratulations! We transform the regular expression to NFA successfully!

Before transforming NFA to DFA, let us look at a new thing `ε-closure`. See the following NFA with the given states.

![ε-closure](/compiler/image/ε-closure.png)

Assume that the NFA is on state B, it can have a transition to the `State C, D` when input `ε`. So `ε-closure(B) = { B, C, D }`.

Assume that the NFA is on state G, it can have a transition to the `State A, H`.
But when it is on state A, it also can have a transition to the `State B`.
When it is on state B, `State C, D` comes. Finally, it can be the state `State A, B, C, D, H, I`.
So `ε-closure(G) = { A, B, C, D, G, H, I }`.

> If a NFA has n states, the number of DFA can be transformed from this NFA is 2^n - 1.

Now knowing the `ε-closure`, let's start to transform NFA to DFA.

The ε-closure of NFA start state is `{ A, B, C, D, H, I }`. We merge them within a group to be the start state of DFA.

![nfa to dfa 1](/compiler/image/nfa-to-dfa-1.png)

Next let's see what happen when the DFA inputs `0`. It will transition to the `State F`. And the `ε-closure(F) = { A, B, C, D, F, G, H, I }`.

![nfa to dfa 2](/compiler/image/nfa-to-dfa-2.png)

Then when the DFA input `1` from start state, it may like this.

![nfa to dfa 3](/compiler/image/nfa-to-dfa-3.png)

And so on, we combine the whole conditions and get a DFA like following.

![nfa to dfa 4](/compiler/image/nfa-to-dfa-4.png)

🎉 Congratulations! We transform the NFA to DFA successfully!

We already know the whole progress of LA. Let's think about how to realize DFA in programming.

There are two dimensions of DFA. One is state and another one is input string.
So naturally we can use a table to record the relation between states and input strings.

| State \ Input |  0  |  1  |
|:-------------:|:---:|:---:|
|       K       |  L  |  M  |
|       L       |  L  |  M  |
|       M       |  L  |  M  |

And the core of the lexer may like this.

```c++
#include <string>

/* Here needs a DFA relation table */

bool LA(std::string input)
{
   int i = 0; /* start from the first character */
   int state = 0; /* set start state of DFA */
   while(i < input.size())
      state = relation[state][input[i++]];
   return i == 2; /* check final state of DFA */
}
```

::: tip
There is an optimization for the DFA relation table above.
We can see there are three same rows, so we can share one of it to make it more impact.

![dfa optimization](/compiler/image/dfa-optimization.png)
:::
