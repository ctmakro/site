!Learning to Run

# The Learning to Run Competition

The first RL competition with actual prizes as far as I know.

Homepage: <https://www.crowdai.org/challenges/nips-2017-learning-to-run>

## Brief

You are given a physics simulation environment (namely OpenSim) with a human musculoskeletal model (known as the "skeleton" or "agent" in RL terms), where the muscles can be activated with real numbers ranging between [0,1].

For each of the 1000 simulation steps of an "episode", you can observe the state of the skeleton in the form of 41 real numbers describing the location/rotation of body parts and other misc info, then you can make the skeleton move by activating the 18 muscles with 18 real numbers chosen by you, after which you will receive a reward whose value is exactly the delta-distance the skeleton's pelvis has moved in the x(forward)-direction, during this single step. The goal is to obtain as much reward as possible within those 1000 steps, in other words to run as fast as possible.

There's going to be obstacles on the way to try to slow the agent down.

You can take a look at the leaderboard for some examples of it.

## Submission

run your agent against the environment running on a grading server with an HTTP API.

## In order to participate

Let's assume you already learned the basics of RL from Professor Sutton's book: <http://incompleteideas.net/sutton/book/bookdraft2017june.pdf>

There's a lot to take care of in this competition. I will address them one by one.

1. **You should not use the observations directly as the input to whatever algorithm you're using.**

  The "state" have to be derived from the "observation", for example the velocity of the body parts can be calculated by differentiating two consecutive obsevations. Without the velocity of the body parts, your "observation" is far from having Markov property, which will degrade your performance.

  Also the position observations are given in absolute coordinates. For a running agent, the absolute position is both irrelevant and harmful(because it's unbounded), and therefore should be converted to relative coorinates with zero at the agent's say pelvis.

  Theoretically your neural network can be trained to do arbitary math, so there's no need to ... but in reality, with finite and non-i.i.d. samples, it's literally impossible.

  Recap: Eliminating the absolute positions from your observation vector is CRITICAL for sucesseful training.

  A good intuition on what a neural network is good for fitting is important for deciding how you should process your observation.

2. **There's no feeling from the feet.**

  You will not be able to observe how hard your feet hit the ground, which is VERY CRITICAL for human to run or even walk properly. The organizer refused to add that sensor, making the competition unnecessarily hard. You can still run without feeling from feet, just not that easy, and not that fast.

3. **The presence of obstacles is only represented with a distance value (to the closest obstacle in front of you), where 100.0 means no obstacles ahead.**

  Which means you will have to clamp it, from neural network perspective; also, you will not be able to see any obstacles behind that(even if it's close and gigantic).

4. **Yes all instructions/hints above were not provided by the organizer.**

  Which means they haven't train the model(at least not to the level of running) themselves before hosting the competition. It's then literally up to the participants to debug all the quirk and weirdness of the environment. I took part in many of those debug activities; sometimes it's a typo, sometimes it's a misconception, sometimes both.

5. **You cannot use evolutional strategies, tabular RL or DQN.**

  The "state" an agent can be in is high-dimensional and continuous, thus cannot be represented with a look-up table, which means it's impossible to quantize the states and evaluate the value function Monte-Carlo-y. Similar reason for evolutional strategies (CEM and such).

  Also, DQN or any algorithms that deals with discrete choices per step were also ruled out for the task.

  As of now, most of the likely-to-win entries are trained with DDPG.

6. **I wrote the only get-running tutorial for the entire fucking competition** <https://www.crowdai.org/topics/tutorial-getting-the-skeleton-to-walk/discussion>

7. **Then they extended the competition for one fucking month.** This is both good and bad.

8. **The simulation environment is slow as fuck.**

  The organizer chose OpenSim, which is open-source, and did not check it for performance. The skeleton itself is easy to simulate at about 2-5fps, but once high forces were exerted by the muscles, the foot stomps hard into the ground surface, at which point the RK4 solver can take up to about 3 minutes to solve a single timestep. When the agent is running slow enough, the simulation speed is still bearable; once the agent have learned to run fast, the simulation will slow down by orders of magnitude. Of course the organizer did not expect that at all, being frustrated when they find some of the submissions took longer than hell to run on their servers.

  The OpenAI folks were also amazed by how slow the environment is: <https://github.com/stanfordnmbl/osim-rl/issues/78>

9. **The submission process has a (badly designed) time limit.**

  Which means if your submission have been going on for longer than a certain period of time, the server will stop the submission and throw you an error. At first it's 10 minutes; then after some blaming they changed it to 20 minutes; finally after more repetitive blaming they changed it to 90 minutes. The time limit has been super-fucking annoying for most of the participants for about a month, since the time it takes to submit is determined by the simulation environment ran on the server, and it often takes longer than 90 minutes for 3 episodes when the skeleton was running at a speed of >30meters/episode.

  Interestingly(sadly also), it took a long time for the organizer to realize that all those annoying ServerErrors reported by the participants were actually caused by the simulation environment simply being too slow.

10. **Your efforts might be wasted...**

  What made the situation even worse: the speed of simulation increases significantly if the number of obstacles goes up (obviously this is an implementation problem). The organizer knew all these problems but only admitted when asked by participants. To alleviate the problem, they decided to use 3 obstacles for leaderboard submission, but 10 obstacles for final round evaluation. They simply assume that the 10-obstacle environment is a subset of the 3-obstacle environment, which is correct observation-wise, and completely wrong state-wise. During the 10-obstacle environment, the skeleton will run much faster when meeting the obstacles appeared later in its way, a case won't happen in the 3-obstacle environment. Thus eventually, every participant have to retrain their model for the 10-obstacle environment, if they want better performance for final evaluation.

  It takes on average about 15 seconds/step on a modern CPU core to run the simulation, when the average speed of running of the skeleton is 40meter/episode. For all those deep reinforcement learning algorithms we knew to this date, DQN for example, require 1M steps to train for each of the games, which means 15M seconds for L2R. ~170days/run is not an acceptable schedule for a learning algorithm.

11. **Paramilitary is fucking expensive**

  So I (and eventually almost every participant) came up with a solution: Parallelized DDPG.

  DDPG is an off-policy algorithm, allowing it to learn from experiences regardless of where those experiences came from. So we can play a lot of episodes simutaneously and collect experience at a much faster rate. So I wrote some farming code to allow anyone to host a bunch of L2R environments across their network, and play them as if they're local. <https://github.com/ctmakro/stanford-osrl/#parallelism--farming>

  Many participants benefited from the code. Later in August, Amazon AWS sponsored $1100 worth of credits for each of the participants. At some point I spread my 10-obstacle environments across a maximum of 20 c4.4xlarge(16 cores each) instances, only to be able to reduce the time needed for each "run" down to about half a day. And at this rate of spending, even with spot instances of $0.5/h per machine, my account blew up after not more than a few dozen runs. I'm now about $1000 in debt to AWS.

12. **More Cores or Lose**

  For anyone familiar with Deep RL or just Deep Learning, It usually takes more than a dozen runs to optimize the hyperparameters of any model/algorithm.
  Since I'm already in debt to AWS at this point, without the help of the 320-core rig, It's almost impossible to perform any trial-and-error within the less-than-half-month period after the organizer announced the existence of the 10-obstacle environment. Right now the only ones with chances to win are those with company/academic computing power (true story). And there's no point to spend my OWN money on a competition just to win by outnumbering in processing power.

13. **Docker? Now?**

  Now they decide to let every participant use docker to submit their model to avoid potential overfit of data on final round submission. The 4GB docker image with an I-wrote-myself Redis-as-RPC framework embedded in it was handed to the participants, and the participants are expected to help test the whole thing including debug, one week before final deadline.

## Ditch the competition

Enough of all this. My time is more valuable than both the DGX workstation and the NIPS trip.

Today(20171108) I decided to ditch the competition. Prediction: The top-3 winners are all going to be Chinese.
