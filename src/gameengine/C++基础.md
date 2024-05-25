---
icon: pen-to-square
date: 2024-04-30 
sticky: false
star: false
comment: true
category:
  - Coding
tag:
  - hazel
  - cpp
description: C++基础
---

# C++基础
## 引用
1. 引用是C++提供的语法糖。
2. 引用定义后不能修改所引用的对象。
3. C++的每次函数调用都会重新创建其形参，并用传入的实参对形参进行初始化。
	1. 默认都是传值
	2. 要传引用需要将形参定义为引用

## const
1. 声明对象不可变。
2. `const int * a`和`int const * a`等价，都是说指针指向的对象不可变，即禁止`*a = 1;`。
3. `int * const a`是说指针的地址不可变，即禁止`int* b = new int; a = b;`。
4. `void GetX() const {}`只能出现在类成员函数上，说明GetX这个函数不会修改类的成员。

## static
类或结构体外的static
1. 静态变量或函数意味着，当需要将这些函数或变量与实际定义的符号链接时，链接器不会在这个翻译单元的作用域之外，寻找那个符号定义。
2. extern关键字让链接器可以在其他编译单元寻找符号定义。称external linking。
3. static将其声明的变量定义对外部编译单元隐藏。如果extern声明的变量的定义被static声明就会报unresolved external symbol。

类或结构体内的static
1. static 变量，类的所有实例共享同一个static变量。(static变量不是实例的成员，不属于实例)
2. static 方法，可以通过类名直接调用。因此，不能访问类的实例。

局部static-在函数内声明static变量
```cpp
void Func()
{
	static int i = 0;
	i++;
	//... 这里i的作用相当于函数调用计数器。
}
```
1. i的作用域为Func函数体。
2. i的生存期为程序的生存期。

## enum和enum class的区别
ChatGPT的回答
在 C++ 中，`enum` 和 `enum class` 都用于定义枚举类型，但它们有一些重要的区别：
1. **作用域：**
    - `enum`：枚举值在同一作用域中与枚举类型名共享命名空间。这意味着枚举值可以直接使用，而且可以发生命名冲突。
    - `enum class`：枚举值的作用域被限制在枚举类的作用域内，枚举值之间不会发生命名冲突。
2. **底层类型：**
    - `enum`：枚举类型的底层类型可以是任何整数类型（char、short、int等），编译器会根据枚举值的范围自动选择适当的底层类型。
    - `enum class`：枚举类型的底层类型默认是 `int`，但可以通过显式指定来更改底层类型。
3. **类型安全：**
    - `enum`：枚举值隐式地转换为整数，没有类型检查。
    - `enum class`：枚举值不会隐式转换为整数，必须显式转换为底层类型。
4. **隐式转换：**
    - `enum`：可以隐式转换为整数类型。
    - `enum class`：不会发生隐式转换，需要显式转换为底层类型。

## 函数指针
函数的地址是存储器机器语言代码的内存的开始地址

定义一个指针必须指明其指向的类型，函数指针也一样。函数的类型就是函数的原型。因此，声明一个特定类型函数指针只需要将函数原型中的函数名用(`*pf`)替换即可，其中pf是指针变量的名称。

## pointe-to-pointer
使用场景：一个函数需要返回一个指针给调用者，但同时需要返回一个状态码。状态码通过返回值传递，函数调用者需要的指针只能通过参数传递了。因此需要声明一个指针的指针以pass-by-address。

```cpp
#include <iostream>
using namespace std;
#define PRINT(x) cout << (x) << endl;

class A
{
public:
    int a;
};

int test(A** pa)
{
    PRINT((*(*pa)).a); // 第一次解引用得到指针，第二次解引用才得到对象的地址
    static A* tmp = new A();
    tmp->a = 9;
    *pa = tmp; // 将创建好的指针传递给调用者
    return 1;
}

int main(){
    A* ta = new A();
    test(&ta); // &ta 是 指针ta本身的地址
    PRINT(ta->a)
}
```

## 宏定义中的'#'&'##'
```cpp
#define PRINT(x) cout << x << endl;

int main(){
    int a = 6;
    PRINT(a * a) // 输出 36
}
```

`#`和`##`都只用在有参数的宏定义中，且只能用在参数前。

`#x`：表示将传进来的参数直接看作字符串字面量。
```cpp
#define PRINT(x) cout << #x << endl;

int main(){
    int a = 6;
    PRINT(a * a) // 输出 a * a
	PRINT("abc") // 输出 "abc"
}
```

`##x`： It permits separate tokens to be joined into a single token, and therefore, can't be the first or last token in the macro definition. 将两个单独的符号合并成一个，且该符号必须是有效的。

```cpp
#define __T(x)      L ## x // 如果x是字符串 "abc" 则__T(x) 相当与 L"abc"

#define paster( n ) printf_s( "token" #n " = %d", token##n )
int token9 = 9;
int main()
{
   paster(9); // 输出 token9 = 9
}
```

## 继承
- 如果你以一个「基类之指针」指向「派生类之对象」，那么经由该指针你只能够调用基类所定义的函数。
- 如果基类和派生类都定义了「相同名称之成员函数」，那么通过对象指针调用 **(non-virtual)成员函数** 时，到底调用到哪一个函数，必须视该指针的**原始类型**而定，而不是视指针实际所指之对象的类型而定
- Polymorphism 的目的，就是要让处理「基类之对象」的程序代码，能够完全透通地继续适当处理「派生类之对象」
    - 如果你期望派生类重新定义一个成员函数，那么你应该在基类中把此函数设为virtual。
    - 以单一指令唤起不同函数，这种性质称为Polymorphism，意思是 "the ability to assume many forms"，也就是多态。
    - 虚函数是C++语言的Polymorphism 性质以及动态联编的关键。
    - 既然抽象类中的虚函数不打算被调用，我们就不应该定义它，应该把它设为纯虚函数（在函数声明之后加上"=0" 即可）。
    - 我们可以说，拥有纯虚函数者为抽象类（abstract Class），以别于所谓的实例类（concrete class)。

抽象类不能产生出对象实体，但是我们可以拥有指向抽象类之指针，以便于操作抽象类的各个派生类。

**虚函数派生下去仍为虚函数，而且可以省略virtual关键词。**

### Object slicing与虚函数

```cpp
#include <iostream.h>
class CObject
{
public:
    virtual void Serialize() { cout << "CObject::Serialize() \\n\\n"; }
};

class CDocument : public CObject
{
public:
    int m_data1;
    void func()
    {
        cout << "CDocument::func()" << endl;
        Serialize();
    }
virtual void Serialize() { cout << "CDocument::Serialize() \\n\\n"; }
};

class CMyDoc : public CDocument
{
public:
    int m_data2;
    virtual void Serialize() { cout << "CMyDoc::Serialize() \\n\\n"; }
};

void main()
{
    CMyDoc  mydoc;
    CMyDoc * pmydoc = new CMyDoc;
    cout << "#1 testing" << endl;
    mydoc.func(); // CDocument::func() CMyDoc::Serialize()
    cout << "#2 testing" << endl;
    ((CDocument*)(&mydoc))->func(); // CDocument::func() CMyDoc::Serialize()
    cout << "#3 testing" << endl;
    pmydoc->func(); // CDocument::func() CMyDoc::Serialize()
    cout << "#4 testing" << endl;
		// 这里出现了object slicing
    ((CDocument)mydoc).func(); //!!! CDocument::func() CDocument::Serialize()
}
```

当我们调用：((CDocument)mydoc).func(); mydoc已经是一个被切割得剩下半条命的对象，而 func 内部调用虚函数 Serialize；后者将使用的「mydoc 的虚函数指针」虽然存在，它的值是什么呢？你是不是隐隐觉得有什么大灾难要发生？

幸运的是，由于 ((CDocument)mydoc).func() 是个传值而非传址动作，编译器以所谓的复制构造函数（copy constructor）把CDocument 对象内容复制了一份，使得mydoc的vtable 内容与CDocument对象的vtable 相同。

## **四种不同的对象生存方式（in stack、in heap、global、local static）**
既然谈到了static对象，就让我把所有可能的对象生存方式及其构造函数调用时机做个整理。所有作法你都已经在前一节的小程序中看过。

在C++ 中，有四种方法可以产生一个对象。第一种方法是在堆栈（stack）之中产生它：
```
void MyFunc()
{
    CFoo foo;  // 在堆栈（stack）中产生 foo 对象
    ...
}

```

第二种方法是在堆积（heap）之中产生它：
```
void MyFunc()
{
    ...
    CFoo* pFoo = new CFoo(); // 在堆积（heap）中产生对象
}

```

第三种方法是产生一个全局对象（同时也必然是个静态对象）：
```
CFoo foo; // 在任何函数范围之外做此动作

```

第四种方法是产生一个局部静态对象：
```
void MyFunc()
{
    static CFoo foo;  // 在函数范围（scope）之内的一个静态对象
    ...
}

```

不论任何一种作法，C++ 都会产生一个针对CFoo 构造函数的调用动作。前两种情况，C++ 在配置内存 (来自栈（stack）或堆（heap)之后立刻产生一个隐藏的（你的原始代码中看不出来的）构造函数调用。第三种情况，由于对象实现于任何「函数活动范围（function scope）」之外，显然没有地方来安置这样一个构造函数调用动作。

是的，第三种情况（静态全局对象）的构造函数调用动作必须靠startup代码帮忙。startup代码是什么？是更早于程序进入点（main 或 WinMain）执行起来的代码，由 C++ 编译器提供，被链接到你的程序中。startup 代码可能做些像函数库初始化、进程信息设立、I/O stream 产生等等动作，以及对 static 对象的初始化动作（也就是调用其构造函数）。

当编译器编译你的程序，发现一个静态对象，它会把这个对象加到一个串列之中。更精确地说则是，编译器不只是加上此静态对象，它还加上一个指针，指向对象之构造函数及其参数（如果有的话）。把控制权交给程序进入点（main 或 WinMain）之前，startup代码会快速在该串列上移动，调用所有登记有案的构造函数并使用登记有案的参数，于是就初始化了你的静态对象。

第四种情况（局部静态对象）相当类似C语言中的静态局部变量，只会有一个实体（instance）产生，而且在固定的内存上（既不是stack 也不是heap）。它的构造函数在控制权第一次移转到其声明处（也就是在MyFunc第一次被调用）时被调用。

## 字符编码
 首先，关于utf-8的编码说明：有1个字节，有两个字节的（大多数中文），也有三个字节的（少部分其他国家字符）。因此网络传输接收到的数据利用std::string类型来保存也是没问题的。

C++ std::string存储的是单字节字符，对于中文编码，编码的时候一般是将中文字变成2个字节的gb2312后存储到std::string里面。

比如：std::string s = "abcd你好";    长度是8个字节，使用s.length方法测试下即可知道。

增加`u8`前缀，则改为使用UTF-8编码，一个中文为3字节。