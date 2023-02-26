# ▶️ Getting Started

As we all know, there are two major approaches to implement a programming language.

One is **compiler** and other one is **interpreter**. What is the difference between them?

## 🖨 Compiler

*Compiler* only reads the program as input and produces an executable file.
The executable file is another program, such as assembly language, bytecode.
Then it runs your data separately on this `.exe` file and gives out the output.
It is similar to run your program offline.

![compiler](/compiler/image/compiler-sketch.png)

### 🧱 Structure

The first language [FORTRAN](https://www.google.com.hk/search?q=FORTRAN) compiler makes a huge impact of computer science.
The moder compilers still preserve the outline of FORTRAN one. So what is the structure of the FORTRAN compiler?

1. Lexical Analysis
2. Parsing
3. Semantic Analysis
4. Optimization
5. Code Generation

The step 1 and 2 take more care of the **syntax**. 
The step 3 takes care of the **semantic aspects** like type and scope.
The step 4 focuses on how to make program run **faster** and **use less memory**.
The last step is **translating** our program to the goal. It can be assembly language or bytecode.

### 🔮 Further Explanation

1. Lexical Analysis

    In lexical analysis, the compiler divides program into tokens through the separator and recognizes what they are.
    They may be a **keyword**, an **identifier** or even just a **number**.

    Just like what we do when seeing a sentence. Look at the following example.
    We can get some tokens like `I`, `am`, `a` and `sentence` and recognize them as a word.
    
    ![lexical analysis](/compiler/image/lexical-analysis-human.png)

    ::: tip
    The separator can be a white space, a semicolon and any other symbol.
    :::

2. Parsing

    After getting the tokens, the compiler starts to understand the program's structure.
    It needs to know how you write your program.

    Like we human do, we separate the word into type like *article*, *noun*, *verb* and so on.
    Therefore, we can successfully understand the whole structure of the sentence.

    ![parsing](/compiler/image/parsing-human.png)

3. Semantic Analysis

    The compiler knows the program structure, and now it wants to know what your program do?
    Maybe your program wants to calculate a formula or draw a circle on the screen. 
    The compiler wants to learn about this. But it is hard!

    Same as we do, let's look at two sentences. Can you correctly understand the meaning of the sentence?
    Obviously, you can't. Because `his` in these sentences can refer to more than one people.
    Only adding some context that we can understand `his` refer to Peter or Jerry and know the correct meaning.

   ![semantic analysis](/compiler/image/semantic-analysis-human.png)

4. Optimization

   Optimization is editing. The compiler may modify your program to save some resources when executing.
   For example, `X = Y * 0` can be optimized to `X = 0` with the condition both `X` and `Y` is integer.

   ::: warning
   If `X` and `Y` is not integer, `X = Y * 0` can not be optimized to `X = 0`.
   In the float number, according to IEEE, NaN * 0 = NaN.
   :::

5. Code Generation

    Now the compiler translates the optimized program into another language.

### ⚔️ Comparison between ancient and modern compiler

![semantic analysis](/compiler/image/compiler-comparison.png)

The most obvious difference from the picture we can see is the **optimization**.
Modern compiler costs a lot of effort to optimize our programs.

## 🖥 Interpreter

*Interpreter* reads the program and the data as input. After running, it gives out the output.
It is similar to run your program online.

![interpretor](/compiler/image/interpretor-sketch.png)
