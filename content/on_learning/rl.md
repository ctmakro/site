!RL is progressing rapidly

大概半年前的时候跟我的一个朋友聊起，说有没有供人工智能比赛的竞技场？

他说kaggle，我说kaggle比的是error%，没有观赏性。

我当时的设想是这样的：

- 服务器上举行一场比赛，由A和B两位 RL agent 轮流出招。

- 首先服务器通知A出招，A通过网络向服务器发送它下一步的招数。服务器收到招数后，计算state，并将state返回给 A和B。

- 然后服务器通知B，B接到通知后，同样计算下一步的招数并发给服务器。如此轮流往复，直到产生胜者为止。

最近OpenAI开源了Gym。Gym是一个【让大家可以通过几行代码将agent通过VNC连接到网络上某个用docker虚拟的训练环境进行训练】的python库。借助Gym，大家可以方便地用单步方法训练agent玩上千种游戏、跑上千种RL Benchmark了。可以预见从此RL领域的玄学会越来越少（类似比武大会的作用）。

很快就会出现AI拳皇争霸赛、AI极品飞车、AI FIFA之类的比赛。

这样的进步速度是令人欣喜的。短短十几年，我们就从一帮人挤在游戏厅里打机，进化到了一帮人挤在实验室里看agent打机。