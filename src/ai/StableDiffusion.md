---
icon: pen-to-square
isOriginal: true
#author: Ms.Hope
date: 2023-06-11
sticky: false
star: true
comment: true
headerDepth: 4
category:
  - ai
tag:
  - StableDiffusion
---

# StableDiffusion
## Framework
![](/assets/images/StableDiffusion_11.png)
三大组件
1. text encoder：负责将输入的文字描述转换为词向量(embeddings)
2. generation model: Diffusion Model，将latent space中的随机噪音映射为图片的潜变量，通常使用UNet模型。在StableDiffusion里，除了随机噪音之外还需要接受词向量作为输入以保证生成的图片和输入相关。
3. decoder：VAE。将潜变量解码为图像。
 
## FID & Clip Score
FID：用预训练好的CNN模型提取图像的特征。假设生成图片和真实图片的特征向量服从高斯分布，计算两个分布的Frechet distance。
![](/assets/images/StableDiffusion_12.png)
Clip Score
![](/assets/images/StableDiffusion_13.png)
## DIffusion Model
![](/assets/images/StableDiffusion_14.png)给定一张图片，先用VAE将其转换到潜变量空间得到图片编码。
通过不断给图片编码加上噪音，最终得到一张纯噪音的编码。
生成图片的过程从一张随机噪音编码开始，通过向Decoder输入(当前latent，text_embedding，步数t)，预测出这一步加的噪音。通过减去预测的噪音得到这一步加噪前的latent。迭代多次得到最终图片。
![](/assets/images/StableDiffusion_15.png)
![](/assets/images/StableDiffusion_16.png)
## 原理
### 从生成模型谈起
与判别模型希望学习的条件概率分布P(y|x)不同, 生成模型是一种能够从给定数据中学习数据分布P(x)的模型。经典的四大生成模型包括：
- GAN
- VAE
- Flow
- Diffusion Model
![](/assets/images/StableDiffusion_1.png)生成模型的z通常是一个服从正态分布的随机变量，称噪音向量。通过神经网络将输入的正态分布映射为另一个分布并希望该分布能逼近真实的数据分布。通过噪音向量映射，可以使模型更好地学习数据分布。此外，通过改变输入的噪音向量，可以控制生成的数据。这使得模型具有很强的可控性，可以生成特定的图像样式或特征。

#### 问题是，如何求得P(x|z)?
实际上，我们只知道$z\sim N(0, I)$。$P_{data}(x)$也是未知的。那么，如何让P(x|z)去逼近$P_{data}(x)$呢？
通常采用的方法是极大似然估计。即从$P_{data}(x)$中采样N个样本$\{x_1,x_2, ...,x_N\}$，寻找一个$P_\theta(x)$(由P(x|z)简化而来, $\theta$表示神经网络的权重参数)使这批样本出现的概率最大：
$$\theta^*=argmax_\theta\prod_{i=1}^NP_\theta(x_i)=argmax_\theta\sum_{i=1}^N\log P_\theta(x_i)=argmin_\theta KL(P_{data}(x)||P_\theta(x))$$
可以证明，最大化Likelihood等价于最小化KL散度。KL散度越小说明两个分布越相似。也就是说，可以通过最大化样本的对数似然来使$P_\theta(x)$逼近$P_{data}(x)$。

#### GAN
GAN的基本结构包括两个神经网络：生成器和判别器。生成器(G: $P_\theta(x)$)用于生成逼真的数据，判别器(D: $P_{\theta'}(y|x),y\in \{0, 1\}$ , 0表示假，D认为x是由G生成的，1表示真，D认为x是真实数据的样本)则用于判别生成的数据是否为真实数据。在训练过程中，生成器和判别器相互对抗，生成器生成数据，判别器判断数据的真假，两个网络的参数不断更新，直到生成器可以生成逼真的数据，并且判别器无法区分生成数据和真实数据。

生成器的作用是尽量逼近真实的数据分布，即$G^*=argmin_G Divergence(P_{data}, P_G)$

判别器的作用是衡量$P_\theta(x), P_{data}(x)$的Divergence。方法是最大化目标函数V(G,D)。
$$V(G,D)=E_{x\sim P_{data}}[\log D(x)]+E_{x\sim P_{G}}[\log (1-D(x))]$$
即$D^*=argmax_D V(G,D)$。D需要给真实数据高分，给生成的数据低分以使V(G,D)最大化。V(G,D)的最大值$V(G,D^*)=JSD(P_{data}||P_G)$。

于是，生成器的目标可以等价地表示为: 
$$G^*=argmin_G Divergence(P_{data}, P_G)=argmin_G \max_D V(G,D)$$

#### VAE
ELBO(Evidence Lower Bound)
$\log P_\theta(x)$无法直接计算，但其ELBO是可以计算的。

![](/assets/images/StableDiffusion_2.png)
![](/assets/images/StableDiffusion_3.png)
![](/assets/images/StableDiffusion_4.png)
![](/assets/images/StableDiffusion_5.png)
VAE 的loss1。这里3表示隐变量z的维度。

![](/assets/images/StableDiffusion_6.png)VAE的loss2  

Vae的Encoder实际有两个head，一个输出mean，一个输出var。z是从标准正态分布采样得到的样本，decode时需要重新参数化为$mean+z*\sqrt {var}$。

### Diffusion Model
参考资料  
[李宏毅 Diffusion Model 原理剖析 1](https://www.youtube.com/watch?v=ifCDXFdeaaM&t)  
[李宏毅 Diffusion Model 原理剖析 2](https://www.youtube.com/watch?v=73qwu77ZsTM)  
[李宏毅 Diffusion Model 原理剖析 3](https://www.youtube.com/watch?v=m6QchXTx6wA)  
[李宏毅 Diffusion Model 原理剖析 4](https://www.youtube.com/watch?v=67_M2qP5ssY&t)  

#### 基本概念
![](/assets/images/StableDiffusion_7.png)前向过程：$q(x_t|x_{t-1})$  
反向过程：$p(x_{t-1}|x_t)$  

#### 加噪和采样算法
![](/assets/images/StableDiffusion_8.png)

#### 训练过程
![](/assets/images/StableDiffusion_9.png)从数据集中采样一张图像$x_0$, 从T个时间步中均匀采样一个时间步t，采样一个标准正态噪音。
先使用公式
$$x_t=\sqrt{\bar \alpha_t} x_0+\sqrt{1-\bar \alpha_t}\epsilon$$
计算出加噪t次后的图像。在将其和时间步t送入Noise Predictor中预测$x_{t-1}\rightarrow x_t$这一步所加的噪音(即$q(x_{t-1}|x_t, x_0)$)。

#### 推断过程
![](/assets/images/StableDiffusion_10.png)从噪音输入$x_T$开始，去除Noise Predicter每一步预测出的噪音，**并加上缩放后的随机标准正态噪音**。迭代T次后得到输出图像。注意，最后一步不需要额外加噪。   

评论注：denoise时要加噪的原因可能是，在score-based generative model相关的paper中有提到，比較像是預測結果不應該收斂在一個特定的位置(a point in density region)，而是要在一個分布範圍(density region)。換句話說，如果每次update是得到一個向量(score function)朝向一個點，那noise就是讓這個向量(noisy score)轉換成朝向一個可能的範圍。讓結果從預測”一個固定方向”，轉成是要預測”一個固定範圍”，這只要sigma 足夠小，預測目標結果的分布範圍就會成立。


#### 原理详解
DDPM是一个生成模型，想要得到对真实数据分布的近似$P_\theta(x)$。  

给定一个数据集，使用极大h似然原理估计$P_\theta(x)$，要想最大化似然函数$\prod_{i=1}^NP_\theta(x_i)$，相当于要想办法最大化$\log P_\theta(x)$ 。要最大化$\prod_{i=1}^NP_\theta(x_i)$，可以使用ELBO，即最大化$E_{q(x_1:x_T|x_0)} [\log \frac {P(x_0:x_T)} {q(x_1:x_T|x_0)}]$。  
经过一番艰难的推导，易得:
$$ 
\begin{array}{}
E_{q(x_1:x_T|x_0)} [\log \frac {P(x_0:x_T)} {q(x_1:x_T|x_0)}] = E_{q(x_{1}|x_{0})}[\log P(x_{0}|x_{1})] -KL(q(x_{T}|x_{0})||P(x_{T})) \\
- \sum _{t=2}^{T}E_{q(x_{t}|x_{0})}\left[ KL(q(x_{t-1}|x_{t},x_{0})||P(x_{t-1}|x_{t}))\right]
\end{array}$$
其中  
$$q(x_{t-1}|x_{t},x_{0})= \frac{q(x_{t-1},x_{t},x_{0})}{q(x_{t},x_{0})}= \frac{q(x_{t}|x_{t-1})q(x_{t-1}|x_{0})q(x_{0})}{q(x_{t}|x_{0})q(x_{0})}= \frac{q(x_{t}|x_{t-1})q(x_{t-1}|x_{0})}{q(x_{t}|x_{0})} $$
又经过一番艰难的推导，易得:  
$q(x_{t-1}|x_{t},x_{0})$服从均值为$\cfrac{\sqrt{\bar \alpha_{t-1}}\beta_{t}x_{0}+ \sqrt{\alpha_{t}}(1- \overline{\alpha}_{t-1})x_{t}}{1-\overline{\alpha}_{t}}$，方差为$\cfrac{1- \bar \alpha_{t-1}}{1- \bar{\alpha}_{t}}\beta _{t}I$的正态分布。通常的操作是固定方差，只预测$x_{t-1}$的mean即$\cfrac{\sqrt{\bar \alpha_{t-1}}\beta_{t}x_{0}+ \sqrt{\alpha_{t}}(1- \overline{\alpha}_{t-1})x_{t}}{1-\overline{\alpha}_{t}}$。于是$q(x_{t-1}|x_{t},x_{0})$和$p(x_{t-1}|x_{t},x_{0})$的Divergence就可以用mean的接近程度来表示。  

通过加噪公式$x_t=\sqrt{\bar \alpha_t} x_0+\sqrt{1-\bar \alpha_t}\epsilon$ 可以进一步化简：
$$\cfrac{\sqrt{\bar \alpha_{t-1}}\beta_{t}x_{0}+ \sqrt{\alpha_{t}}(1- \bar{\alpha}_{t-1})x_{t}}{1-\overline{\alpha}_{t}} = \frac{1}{\sqrt{\alpha _{t}}}(x_{t}- \frac{1- \alpha _{t}}{\sqrt{1- \bar{\alpha}_{t}}}\epsilon)$$
这就是采样公式$x_{t-1}=\cfrac{1}{\sqrt{\alpha _{t}}}(x_{t}- \frac{1- \alpha _{t}}{\sqrt{1- \bar{\alpha}_{t}}}\epsilon)$的由来, 当然采样时$\epsilon$要替换为$\epsilon_\theta(x_t, t)$。





