!Baby steps for ML

# Baby steps for ML

怎样学习机器学习？吴恩达曾经给出过他的答案：不断复现他人paper中的成果。

以下是我自接触机器学习(尤其是深度学习)以来的一些经验总结。

## 1. Know what you're doing

- ML = optimize parameters of some function to minimize error
- DL = optimize parameters of some *deep* function to minimize error
- RL = optimize parameters of some function to maximize reward



- ML Research = optimize parameters of one's brain to fit experiment results and minimize confusion
- DL Research = optimize ML algorithms and (occasionally) find out how the brain works
- RL Research = solve real-world problems by converting them into simulated ones

## 2. Repeat what others have done

必须虚心学习。

ML is not about imagination. Your imagination suck when compared to what others had done. They suck when compared to what natural selection had done.

## 3. Data Synthesis

机器学习最适合解决那些【数据很便宜，逻辑很复杂】的问题，比如机器学习在图像识别上的大规模应用，就是基于我们获取图像的成本，远远低于我们编写图像识别逻辑的成本。因此低成本地获取数据对机器学习是非常重要的，比如现在有很多研究者通过CG方法合成图像来训练视觉应用。

可能有人说计算机生成的数据集，与真实世界收集的数据相比，必然会有比较大的bias。实际上这完全取决于研究者对具体领域的了解。以视觉为例，如今的主流游戏引擎可以轻而易举地渲染照片级的画面，而DeepMind最近开源的DeepMindLab也不过就是一个游戏引擎。

*Update: OpenAI刚刚开源了Universe*

对于各类RL应用，数据合成则更是不可或缺的：由于时间、能耗和安全性的限制，我们不可能真的让一条 random-initialized 的机械臂帮我们实现运动控制的 training loop。我们仍将大量地依赖软件仿真（比如[这样](https://drive.google.com/file/d/0B4nMjK_Q9AcRODlmZGd4QUVXVG8/view)）。

> If you want to solve Computer Vision, you have to solve Computer Graphics. -- Geoffrey Hinton

## 4. 最小化 Mnistification

在尝试一个新的方法/架构之前，总是先将其最小化。这其实是各种paper中最常用的trick。

> ImageNet wasn't built in one day.

最小化的数据集，最小化的网络架构……可以帮助我们更快地评估一个方法的 performance 和 robustness.

## 5. 善于品味 Acquire a good taste

<plot
set title "Percentage of good papers"
set xrange [-2:2]
set style fill solid 0.9 noborder
unset key
plot '-' using 1:2:3:4:5:6 with circles lc var
0    0    1    75    90    2
0    0    1   90    75    3
e
/>

## 6. Signs of danger (IMO)

- Heavily relied on frameworks
- Addicted to reading & posting things on Zhihu
- Repeatedly looking for data and challenges on Kaggle
- Playing with hyper-parameters for over a day
- Highlighting error% in bold font
- Imagining pure ML startups
