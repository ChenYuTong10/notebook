# 1️⃣ Lexical Analysis

## 🪄 Introduction

### ✂️ Partition string

In code editor, we might write our programs line by line with beautiful formats.
But when the compiler start to compile the program, it can not see these formats.
Instead, it sees the program only one line with white space.

::: tip
White space here refers to not only the blank, but also the escaped character.
:::

![compiler view](/compiler/image/compiler-view.png)

The compiler scans the input strings from left to right and recognizes substrings according to white space and punctuation.
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

## 📝 Regular Expression

To analyse a language, we need to know what rules the language observes.
So we want to a formal language to specific the language. That is **regular expression**.

Regular expression is the **syntax** we usually write in code editor.
Importantly, it is only the specification of a language not implementation.

> **Regular language** is a set of strings defined by regular expression.

There are five constructs of regular expressions.

|        Construct        |                        Description                        |
|:-----------------------:|:---------------------------------------------------------:|
|  Empty string(Epsilon)  |                   ε = &lcub; "" &rcub;                    |
| Single character string |                     &lcub; "a" &rcub;                     |
|      Union string       |       AB = &lcub; a ∈ A, b ∈ B &#124; a ^ b &rcub;        |
|  Concatenation string   | A + B = &lcub; a ∈ A &#124; a } ^ { b ∈ B &#124; b &rcub; |
|    Iteration string     |     A* = &lcub; "", "A", "AA", ... , "AA...A" &rcub;      |

Knowing the regular expression, let's look at the whole progress of from writing regular expression to lexical analysis.

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

::: tip 
Here are some ambiguities we need to solve.

Q1: Assume that there are two input strings `x1...xi` and `x1...xj`(i != j). Both observe Rj regular expression. Which input string do we use?

A1: This is similar to the problem when the compiler scans the first `=` operator. The answer is **match as long as possible**.

Q2: Assume that there is a string `if` and it can be `Keyword` and `Identifier`. Which token class should be used?

A2: To solve this problem, we need to give priority of each token class. And **match** the highest priority token class if conflicted.
:::

## ⚙️ Finite Automata <Badge type="warning" text="beta" />

After determining the language specification, we use **finite automata** to implement it.
Finite automata is like a machine. It has multiple different states and takes transitions among them when you input something.
So you can check specific strings written by this language whether consistent with the syntax.

We use some signs to show the state and transition. There are also some special conditions marked in chart.

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

> Always, DFA is faster than NFA when executing.

![dfa nfa transition](/compiler/image/dfa-nfa-transition.png)

The problem is how we transform our written regular expressions to the equivalent finite automata.
Let's try to transform to the NFA firstly. Look at the table.

> TODO: The reason why first transform to the NFA not DFA is still a mystery.

|        Construct        |    Description    |                           Corresponding NFA                           |
|:-----------------------:|:-----------------:|:---------------------------------------------------------------------:|
|  Empty string(Epsilon)  |         ε         |            ![epsilon nfa](/compiler/image/epsilon-nfa.png)            |
| Single character string | &lcub; "a" &rcub; | ![single character nfa.png](/compiler/image/single-character-nfa.png) |
|      Union string       |        AB         |            ![union nfa.png](/compiler/image/union-nfa.png)            |
|  Concatenation string   |       A + B       |    ![concatenation nfa.png](/compiler/image/concatenation-nfa.png)    |
|    Iteration string     |        A*         |        ![iteration nfa.png](/compiler/image/iteration-nfa.png)        |

Maybe an example is more distinct.

Assume there is a regular expression `(1 + 0)*1`. What is its finite automata?

Look at `1` and `0` in brackets. We construct their NFA firstly.

![regexp to nfa example 1.png](/compiler/image/regexp-to-nfa-example-1.png)

It is easy! And next we construct `1 + 0`'s NFA. Consider `1`'s NFA with `State A` and `0`'s with `State B`.
After that, replace the `State A` and `State B` in `A + B`'s NFA.

![regexp to nfa example 2.png](/compiler/image/regexp-to-nfa-example-2.png)

Then it is time to construct `(1 + 0)*`'s NFA. Wrap the whole NFA above with `State A`.
And replace the `State A` in `A*`'s NFA. It is the same.

![regexp to nfa example 3.png](/compiler/image/regexp-to-nfa-example-3.png)

Now it seems large. But don't be afraid. Now let's construct the last `1`'s NFA.

![regexp to nfa example 4.png](/compiler/image/regexp-to-nfa-example-4.png)

Finally, merge `(1 + 0)*`'s NFA and `1`'s into a NFA.

![regexp to nfa example 5.png](/compiler/image/regexp-to-nfa-example-5.png)

🎉 Congratulations! We transform the regular expression to NFA successfully!
