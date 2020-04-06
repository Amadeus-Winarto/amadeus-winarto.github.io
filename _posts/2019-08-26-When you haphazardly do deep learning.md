---
layout: posts
title: When you haphazardly do deep learning…
---
# When you haphazardly do deep learning...

It has been quite some time since I last wrote anything. I was working on a school project in the meantime, and I had learned a lot in the process, whether it is deep learning-related or just pure work ethics. With all that knowledge, I, along with some friends, participated in a deep learning competition organised locally (by the Defence Science and Technology Agency, for anyone based in Singapore). Prize money was SG$4000, so obviously we were hyped up. And quite confident too…

Alas, we lost in the competition, ranking fourth and missing the much needed cash. Yet I learned plenty, in particular with respect to the question I posted in the title of this article. So here I would like to share some of the insights I gained. Most of it would probably sound obvious to veterans, but I think it would be valuable for others looking to further their own understanding in deep learning. Ok, so here goes.

# 1. Data is Everything
This is one of the things that pros find obvious but others find bewildering. The advancement in neural network architecture has been impressive. In the computer vision realm, it began with AlexNet and has not ended ever since. Currently the State of the Art, as far as I am aware, is EfficientNet:

Figure 1: Such accuracy, much wow

With that kind of performance improvements due to architectural innovations, it’s easy to fall into the the trap of thinking that architecture is everything. Yet ultimately, deep learning is by nature data hungry, and one stands to gain a lot by simply cleaning whatever data one already have and increasing the amount of data.

So that was something I wasn’t aware of during the competition.

The task was simple enough to understand. The data set consisted of 11 classes of different human poses such as ‘HulkSmash’ or ‘ChairPose’. Strange naming aside, each class had around 90+ training images and 15+ validation images. We had one week to prepare our model, and it would be tested on a separate, withheld test set.

Figure 2: Totally representative graph I took online

Obviously 90+ training images per class is not enough to train a ResNet50 from scratch, so our instincts told us to do transfer learning and data augmentation. But really, transfer learning and data augmentation can only do so much. We opted to do photometric and geometric transformations to the images provided, but we were still faced with the over-fitting problem. This could be due to certain similarities within a class and differences between classes that are not the distinctive features which would accurately separate the classes and help in generalisation. As an example, if all the people which posed the ‘HulkSmash’ wore red shirts and all the people which posed the ‘ChairPose’ wore green shirts, then the network might have been looking out for red vs green instead of actually learning about the pose. Of course this was not actually the case, and anyway we also did some color-based transformations to the images, but the idea remains true.

Taking additional pictures, on the other hand, could easily address this problem as we introduce much more variety within each class as well as between classes. Together with data augmentation, it would have allowed the network to learn the exact discriminating features that we wanted it to learn. By neglecting data quantity, we forewent the chance to properly utilise the millions of parameters that a decent convnet has to learn the proper discriminating features.

# 2. Hyperparameter Optimization
The magick of gradient descent and backpropagation is amazing indeed. Explaining the concepts graphically using a few example data points and by constraining the learned function to be a linear scalar function (y = ax + b where x, y, a and b are all real numbers) can seem easy, so easy that it’s sometimes called ‘mere curve-fitting’.

But this magic is deceptively simple. Gradient descent (GD) can be used to optimize the parameters of the function, which would be a and b in the above function, to minimise a certain loss/cost function. GD also works for a lot of different kinds of functions, not just linear ones, and can be used in conjunction with any kind of differentiable loss function. But right from the outset one can see that the GD algorithm itself has parameters which can affect the generalisation ability of the trained neural network. Things such as the loss function, batch size, learning rate and more are some of the parameters which we need to set to use the GD algorithm. And these parameters, otherwise known as ‘Hyperparameters’ to differentiate it from the weights and biases (parameters) of the neural network, also need to be optimised.

Sadly optimising these hyperparameters can be rather difficult. There are of course default values out there. Keras for example sets learning rate to 0.1 by default for the Stochastic Gradient Descent algorithm. But these default values are really only suggestions. Values that the creators of the algorithm found to be helpful and values that you need can be close, or they can be ridiculously different.

Image result for hyperparameter tuning
Figure 3: Google image search really is amazing

Relying on default values and hoping it will give the best results is really like flipping 100 coins and pray all 100 will be heads. It is improbable and unlikely to be productive. Haphazardly inputting values might also lead to zero or even negative work done. The key is to be principled in the search.

Some common methods out there include grid search, random search, and bayesian optimisation. Grid search is probably the most intuitive. For a given hyperparameter to be tuned, set a lower limit and an upper limit for the search along with a predefined step. Then, search through the values between the lower and upper limit, increment by the predefined step size to generate the next candidate value. Even better, you can do the search in a logarithmic space. For example, if I know the value would be between 0.001 to 0.1, then I can try 0.001, 0.01, and 0.1 during the first iteration. After getting the two values which give the two best results, say 0.001 and 0.01, I can then try to search within these two bounds with a step size of 0.001 i.e. 0.001, 0.002, 0.003, etc until 0.01.

Random search is similar to grid search, except that you randomly sample for values between the lower and upper bound, without needing to define the step size. One can assume that any values within the two bounds have equal probability of being the right value, so you can sample from a uniform distribution. Another way is to pre-define the sampling distribution to be gaussian in nature. This is based on the intuitive assumption that as one gets closer to the optimal value the results would increase. As one deviates further from the optimal value in any direction however the results should decrease. The mean of the gaussian distribution to be sampled from can be set to the suggested or default value, whereas the standard deviation can be set such that mean + 3 standard deviations give the upper bound and mean - 3 standard deviations give the lower bound. (+-3 sigma)

Bayesian optimisation takes this idea even further. I won’t discuss it here — my understanding of bayesian probability is quite shaky, but BO is said to be better than grid and random search. If you don’t understand anything here you can always just copy and paste code from sklearn (but try not to though).
# 3. Ensembling

This is probably the holy grail of Kagglers, and the bane of those who seek fast inference. Ensembling is a technique which dates back to the age of machine learning without neural networks — the key idea is to utilise different learning algorithms with different ability and somehow combine them to obtain a superior model with better generalisation to unseen data.

It lies on the assumption that searching for the single best model available out of all the possible models out there is intractable. This is also related to the fact that the gradient descent algorithm only allows us to search for models which lie at the local minimum of the loss function’s landscape, and this landscape is non-convex and thus the local minimum is not the global minimum. If this sounds like Marsian to you, see the figure below.

Figure 4: The left image shows a convex function. The right image shows a non-convex function. The z-axis represents the value of the loss function, while the x and y axis represents the parameters of the model.

Imagine a heavy ball placed on a metallic sheet shaped like the convex function shown on Fig. 4. It’s easy to see that, upon releasing the ball, it will always travel to the same location on the sheet, regardless of the initial position of the ball. This is what it means to be convex (again, not the most rigorous of definitions, but it works). On the other hand, the same ball released on a metallic sheet shaped like the left image in Fig.4 would land on different locations depending on the initial position of the ball. The ball will always land on a point which is a local minimum (a valley), but there are no guarantees in place on whether this local minimum is the global minimum (whether the valley is the deepest valley).

Ensembling allows you to get around this problem. The idea is to train multiple neural networks with different randomisations to convergence. To obtain the final prediction, we do take all the predictions of the trained networks and then average the results. Another way is to do a voting of predictions, which is essentially taking the mode instead of the mean predictions. There are also other ways to ensemble networks: a weighted average of the networks’ predictions, bagging, boosting, and more. Also, to increase diversity, one can even use different architectures e.g. ResNet, DenseNets, Inception-v3, etc and then ensemble across the different models.

Based on the above alone, you can probably see why we didn’t try ensembling. We thought that it was too troublesome, that the effort would not be proportionate to the increase in accuracy. Furthermore, it reduces the speed of inference; instead of predicting on the test set only once using one model, ensembling would require predicting on the test set multiple times according to the number of models used to build the ensemble. Given the presence of a time limit for inference, we opted to focus on building a single model which can give high accuracy instead of training several weaker models.

Whether or not it was the right decision is difficult to say; there are no guarantees that ensembling will definitely improve accuracies. But I think ensembling should be in the minds of those who seek to bring machine learning into production, especially when inference speed is not a major concern.

# Conclusion

At the end of the day, we lost. We didn’t get the prize money. We didn’t get the bragging rights. And so on. But we learned a lot from the experience, and it really shaped my thoughts on how deep learning should and should not be used, along with certain good practices which one would do well to remember. I hope by sharing this, many can benefit and not repeat the same mistakes we did.
# Clarifications
There were certain gross generalisations and unstated assumptions made above, especially in point 3. I deliberately wrote it in such a manner to reduce the complexity; deep learning is complicated enough as it is. I want to just clarify certain points for accuracy’s sake:

> “But really, transfer learning and data augmentation can only do so much.”

This is not always true. In fact, for the human pose problem posted in the competition, there is a way to augment data, although it borders on data generation. One can actually model the poses on a computer and then just change the background, point-of-view, colours, etc. It’s a possibility that we tried, but we realised that we didn’t have the resources nor time to execute it properly. Much easier to just take an additional hundred images.

> “The ball will always land on a point which is a local minimum (a valley), but there are no guarantees in place on whether this local minimum is the global minimum (whether the valley is the deepest valley).”

This is not true. The ball will always land on a point which is flat, a point on the function with zero gradient. Technically speaking, it can be a local minimum, a local maximum, or a saddle point. Local maximum is highly unlikely, but a saddle point is definitely possible. A saddle point is a point with zero gradient in all directions but is neither a minimum or a maximum. Since the gradient is zero, the gradient descent algorithm essentially terminates despite not finding the local minimum. There are ways to address this; in fact escaping saddle points is an active research area.

Also, there are research which suggests that the trajectory when searching for the local minimum of the loss landscape is just as important is finding the local minimum itself. I personally like the works by Sanjeev Arora and his team on this matter. You can read up more about it on https://www.offconvex.org

> “This landscape is non-convex and thus the local minimum is not the global minimum.”

Well optimisation in deep learning is not always non-convex. Certain very special problems, with some contraints in place, can actually be a convex optimisation problem. The matrix completion problem, for example, is convex when the objective is to find a matrix with minimum Nuclear norm (yay more googling)
