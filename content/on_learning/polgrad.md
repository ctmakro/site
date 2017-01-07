!Policy Gradient Method 策略梯度方法

# Policy Gradient Method 策略梯度方法

there are many tutorials online for Reinforcement Learning and specifically the policy gradient method(s). not all of them are well written though, too much math has always been a problem. this tutorial however, wants to change this.

Unfortunately this is going to be written in Chinese. For English readers: I put A LOT OF comments and explanations in English in the source code, so you could go directly to the code and see what it does. I guarantee it will be the most concise code ever written for Neural Network Based Deep Reinforcement Learning!

<https://github.com/ctmakro/gymnastics/blob/master/polgrad.py>

## you must know `gym`

you must know how to install and run experiments with OpenAI Gym.

你必须知道如何安装OpenAI Gym环境，以及用它运行实验。（提示：`pip install gym`）

## other verified RL learning resources

- David Silver's youtube series

- John Schulman's youtube series (shorter than Silver's, and lower quality, but the code exercises he offered were GREAT)

## what you can then achieve 然后你可以实现

<div style="text-align:center">
<video src="training_episode_batch_video.mp4" controls="controls" style="max-width:320px" class="plot">
if you see this, your browser sucks and can't load the video tag
</video>
</div>

参见：

<https://gym.openai.com/evaluations/eval_Xy4aCON2TDyhAZynJ3gTA#reproducibility>

## 什么是策略梯度

增强学习的一般情景：学习者(Agent)观察环境(Environment)，利用一定的策略(Policy)，来决定什么环境下应该作出什么行为(Action)。

如果用神经网络来充当学习者，那么网络的输入就是环境变量，或者称为State；而网络的输出就是Action。所谓的策略，就是网络的权重(Weights)。通过调节网络的权重（通常记为θ，即theta），我们就可以改变网络在面对一定环境时的输出，也就是改变了策略。

调节神经网络权重的最常用方法，是梯度下降法，我们先求出每一个权重对某个误差函数的梯度，然后从权重中减去这个梯度，以降低误差。

增强学习的目标，是最大化学习者通过其行为获得的报酬(Reward)。对于神经网络学习者，我们只要告诉它什么环境下做什么可以获得最大报酬，然后进行监督训练就可以了。

但是在增强学习的情景中，经常遇到这样的问题：我们做出了一系列的行为，但是获得的报酬迟迟才到。

比如去超市买西红柿，我们事先并不知道西红柿和西红柿之间的区别，买完回来被骂了一顿才知道买错了，或者被夸了一顿才知道买对了。

换言之，我们虽然获得了报酬，但并不确定是因为运气，还是之前的某个行为（比如在挑选西红柿的时候按照其外观分类）导致的，所以没办法给之前的每一步行为打分。

既然不能给每一步行为打分、无法计算行为对报酬的未来期望值的影响，我们就没有数据可以训练我们的神经网络。于是研究者们提出了一系列的方法，来估算每一步操作的报酬的未来期望值。

换言之，只要我们能估算网络权重θ，也就是我们所用的策略，对报酬的未来期望值E的梯度，我们就可以用梯度上升法调节θ，对网络进行训练，来提高网络输出的行为获得的报酬的期望值。

这就是“策略梯度”这个名称的由来。具体代码里我们可以把符号反过来，就变成大家都会做的梯度下降了。

说太多不如看代码，代码里我写了非常详尽的中文注释和英文注释，应该是目前市面上最简洁的深度增强学习代码。

代码发布在下面的地址。里面用keras框架实现了一个最简单的神经网络，你也可以改用你自己习惯的学习框架。

<https://github.com/ctmakro/gymnastics/blob/master/polgrad.py>
