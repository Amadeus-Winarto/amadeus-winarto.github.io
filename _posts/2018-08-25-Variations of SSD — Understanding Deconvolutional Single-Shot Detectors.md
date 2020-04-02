---
layout: posts
---
# Introduction to SSD

Single-shot MultiBox Detector is a one-stage object detection algorithm. This means that, in contrast to two-stage models, SSDs do not need an initial object proposals generation step. This makes it, usually, faster and more efficient than two-stage approaches such as Faster R-CNN, although it sacrifices performance for detection of small objects to gain speed.

![alt text](https://github.com/Amadeus-Winarto/amadeus-winarto.github.io/imgs/SSD.png "Figure 1: Architecture of SSD")

In the original paper for SSD, the authors proposed the use of preset anchor boxes to replace regional proposal generation. Furthermore, to account for different object sizes, SSD uses more than one feature map for detection. In the diagram shown above, 6 feature maps are used: Conv4_3, Conv7, Conv8_2, Conv9_2, Conv10_2, and Conv11_2.

Despite SSD’s astonishing performance, it (greatly) suffers from missed detection for small objects. This is because smaller objects — typically defined as less than 36x36 in an image — would have been shrunk tremendously after being passed through multiple pooling layers. Hence, the detection part in SSD does not have enough spatial information to discern small objects.
Deconvolutional Single-Shot Detector (DSSD)

SSD consists of feature extraction and detection. In order to achieve greater performance, Deconvolutional Single-Shot Detector was proposed to improve both parts. Firstly, the authors introduce the use of ResNet-101, a state-of-the-art classifier at the time, as a feature extractor instead of VGGNet as used in the original paper. Also, deconvolutional layers are used in the detection part to increase the resolution of the feature maps produced by the feature extractor. This would theoretically allow for better detection of small objects by providing additional large-scale context.
The authors noted, however, that “naive implementation does not succeed”. To solve this, they crafted a deconvolution module and a prediction module, thus enabling the effective use of deconvolutional layers and ResNet-101

Figure 2: Side-by-side comparison of DSSD and SSD. Top image is the architecture of SSD whereas the bottom image is the architecture of DSSD
ResNet-101 vs VGG-19
In image classification tasks, residual networks have been proven to be better than VGG as it provides skip-connections between convolutional blocks, thus diminishing the effects of vanishing gradient, allowing networks to go deeper. In fact, ResNets typically can go up to 101 layers whereas VGG networks can only go up to 19. Since deeper networks are usually better for image classification, ResNets are generally more accurate than VGG.

Figure 3: VGG-19 vs ResNet-34
However, simply replacing the VGG-based feature extractor in SSD with ResNet-101 does not lead to greater performance. Hence, a custom-made prediction module is needed.
Prediction Module
In the original SSD architecture, the feature maps are barely processed before a loss function is applied to it. This means that the layers in the feature extractor must learn to generate feature maps that not only represent the spatial and semantic information from the previous layers, but also the transformations that lead to good classification. Since different branches in SSD correspond to different scales, it may need to undo previous transformations before applying the one that works best for its scale.
To tackle this problem, DSSD uses prediction modules (PMs) that would do the necessary processing of feature maps which would lead to good classification. The feature extractor thus only need to learn how to best represent information from the image. Furthermore, because the PMs for different scales are independent of each other, they are able to learn the transformations specific to their scale.

Figure 4: Variations of Prediction Modules tested by the authors
As shown in the ablation study on Pascal VOC 2007 done by the authors, SSD with prediction module variant C gives a higher mAP of 77.1 compared to Vanilla SSD (prediction module variant A) with an mAP of 76.9, thus proving that PMs help to boost performance.
Deconvolution Module
To achieve better accuracy, deconvolutional layers are used to increase the resolution of feature maps. The detection is then done using the “super-resolved” feature maps. In addition, to integrate information from earlier feature maps, deconvolutional modules are used.

Figure 5: Deconvolution Module
Technically, deconvolutional layers need not be used at all. Upsampling followed by a convolutional layer can also achieve the desired effect. However, since upsampling layers do not have any learnable parameters, it may not lead to the optimum results. Hence, deconvolutional layers are used.
Overall Architecture
DSSD utilises the generated feature maps from deconvolutional modules in order to make use of the increased resolution. Prediction Modules are thus attached after Deconvolution Modules.

Figure 6: DSSD Architecture
A note-worthy observation is that DSSD looks awfully similar to an auto-encoder architecture. In fact, the authors mentioned that they drew inspiration from the Stacked Hourglass Model, which has a similar architecture to an auto-encoder. However, the Decoder stage is shorter than the Encoder part due to considerations for detection speed, computational resources and the lack of existing models for decoders trained on the task of image classification.
Training
Data augmentation strategy used for DSSD is largely the same as that for SSD. Random cropping of the original image, random photometric distortions, random flipping of cropped patches, and random expansion (zoom-out) trick were adopted into the DSSD framework.
For anchor boxes, the authors suggested adding another aspect ratio. Using K-means clustering on the training boxes with two clusters initially, the authors add another cluster if the error can be improved by more than 20%. The result shows that there are 7 clusters for bounding boxes. Hence, an additional aspect ratio, 1.6, is used.
Results
For small input image size (around 300x300), the use of ResNet-101 does not increase performance. It is hypothesised that since ResNet-101 is very deep, input image size must be big enough so that spatial information is conserved after thorough processing.
The use of the proposed modules leads to greater accuracy
DSSD-513 performs better than the (then) state-of-the-art detector R-FCN by 1%
References
Fu, C.Y., et al.: Dssd: Deconvolutional single shot detector. arXiv preprint arXiv:1701.06659 (2017)
Liu, W., Anguelov, D., Erhan, D., Szegedy, C., Reed, S., Fu, C. and Berg, A. (2018). SSD: Single Shot MultiBox Detector.
A. Newell, K. Yang and J. Deng, “Stacked Hourglass Networks for Human Pose Estimation”, Arxiv.org, 2018. [Online]. Available: https://arxiv.org/abs/1603.06937.
