---
layout: posts
title: Variations of SSD— Feature-Fusion SSD (FSSD) and Rainbow SSD (RSSD)
---
# Variations of SSD: Feature-Fusion SSD (FSSD) and Rainbow SSD (RSSD)
While single-stage detectors such as Single-shot MultiBox Detectors (SSD) are generally faster than two-stage detectors like Faster R-CNN (FR-CNN), they are usually less accurate in their detection. This can be easily seen when the objects in question are small; SSD-based methods typically achieve much lower mean Average Precision (mAP) scores than FR-CNN-based methods. Several remedies have been proposed, including the addition of deconvolutional layers, as used in Deconvolutional SSD.

Rainbow SSD seeks to “combine” feature maps to give better predictions. The rationale is that by combining feature maps, the network can fully make use of the relationships between layers in the feature pyramid. It does this by processing the different feature maps in various ways and then concatenating them before prediction.

Feature-fusion SSD is another attempt to solve the small object detection problem. The feature-fusion module in FSSD essentially “fuses” all the feature maps from different scales to form new feature maps. The new feature maps are then used to predict the label and position of the objects to be detected.

# Rainbow SSD
RSSD seeks to improve the feature pyramid by concatenating different feature maps. There are two way in which this can be done. Firstly, bigger feature maps can be down-sampled via pooling to be concatenated with smaller feature maps. For example, feature maps of size 30 x 30 can undergo convolution to make a set of 15 x 15 feature maps. The 30 x 30 feature maps are then down-sampled through pooling operations to from another set of 15 x 15 feature maps. The two sets of 15 x 15 feature maps are then concatenated together Figure 1 shows how this can be used in the context of SSD.
![Concatenation with Pooling](../imgs/FSSD_RSSD/ConcatPool.png "ConcatPool")
<div align="center" markdown="1">
*Figure 1: Concatenation via Pooling in SSD-based detectors.*
</div>

As shown in figure 1, the additional feature maps with a different color after every layer (e.g. orange in layer 2, yellow in layer 3, etc) refers to feature maps produced after feature maps from previous layers undergo convolution. The feature maps with the same color as those in the previous layers (e.g. red in layer 2, red + orange in layer 3, etc) refers to feature maps produced after previous feature maps are down-sampled through pooling.

Secondly, smaller feature maps can be up-sampled via deconvolutions to be concatenated with bigger feature maps. For example, feature maps of size 30 x 30 can undergo convolution to form 15 x 15 feature maps. The 15 x 15 feature maps can then undergo deconvolution to form a different set of 30 x 30 feature maps, which are then concatenated along with the original 30 x 30 feature maps. Figure 2 shows how this can be achieved in SSD-based methods.

![Concatenation with Deconvolution](../imgs/FSSD_RSSD/ConcatDeconv.png "ConcatDeconv")
<div align="center" markdown="1">
*Figure 2: Concatenation via Deconvolution in SSD-based Detectors*
</div>
Referring to figure 2, the ‘red’ feature map is the first feature map. It undergoes convolution to generate the smaller ‘orange’ feature map, which also undergoes convolution to generate the even smaller ‘yellow’ feature map, and so on until the smallest ‘purple’ feature map is obtained. Then, it undergoes deconvolution to obtain the bigger ‘purple’ feature map. The ‘blue’ and ‘big purple’ feature maps are then concatenated before undergoing deconvolution and concatenation with the ‘green’ feature maps. This process repeats until the ‘red’ feature map is concatenated with the deconvolutioned feature maps.

The “rainbow” in RSSD refers to the way it concatenates feature maps: through both pooling and deconvolution, thus leading to a colorful visual representation of RSSD.

![Rainbow Concatenation](../imgs/FSSD_RSSD/RainbowConcat.png "RainbowConcat")
<div align="center" markdown="1">
*Figure 3: Rainbow Concatenation in RSSD*
</div>
This increases the number of feature maps per scale which can be used to predict the labels and positions of objects. Furthermore, the number of feature maps in each layer of the pyramid is the same, allowing for a shared classifier between all scales.

RSSD achieves higher performance compared to conventional SSD. For image size 300 x 300 with PASCAL VOC2007+2012 as training data, RSSD was able to get 78.5% mAP at 35.0 frame per second. In comparison, SSD300 achieved 77.7% at 61.1 fps, and I-SSD achieved 78.1% at 26.9 fps. The authors noted that using concatenation by pooling or deconvolution alone causes RSSD to perform worse than SSD.

# Feature-fusion SSD
The idea behind FSSD is simple: find a way to balance between semantic and positional information. This is because while less care can be afforded for bigger objects, small objects require deliberate architectural design to be detected.

Consider a 300 x 300 image. A small object of size 10 x 10 would have features of size 1 x 1 when the feature map is of size 30 x 30. Thus, the moment the feature map size drops below this, the small object would not be detected.

In comparison, a big object of size 100 x 100 would have features of size 10 x 10 in a 30 x 30 feature map. Even when the feature maps are processed and down-sampled to 5 x 5, the big object would still be detectable.

Because SSD uses multiple feature maps of different scales to detect different objects, small objects need to be detected early on when the feature maps are still big enough i.e. positional information is not lost too much. However, big feature maps also mean that they are much earlier in the architecture and is thus not processed enough (Figure 3). This means that they may lack enough semantic information to be useful in predicting the small objects’ classes .

![SSD](../imgs/FSSD_RSSD/SSD.png "SSD")
<div align="center" markdown="1">
*Figure 4: Conventional SSD. The smallest of objects are detected from Conv4_3, whereas the biggest of objects are detected from Conv11_2*
</div>
FSSD thus tries to combine the positional information of earlier feature maps with the semantic information in later feature maps through the use of feature-fusion modules. (Figure 4b). The feature-fusion module would take in Conv4_3, FC7, and Conv7_2 feature maps. Then, a 1 x 1 Convolutional layer will be run through each to resize the feature maps into 38 x 38 x 256 feature maps. Bilinear interpolations are applied to feature maps whose size are smaller than 38 x 38 before the 1 x 1 convolution. They will then be concatenated together before Batch Normalization is applied. The resulting feature maps are then used for generating the feature pyramids for inference (Figure 4b).

![Simplified](../imgs/FSSD_RSSD/Simplified.png "Simplified")
<div align="center" markdown="1">
*Figure 5a shows a simplified sketch of the SSD architecture. Figure 5b shows a simplified sketch of FSSD as well as how the Feature-Fusion module works.*
</div>
To maximise the utility of the feature-fusion module, the authors conducted ablation studies into the following:
- Range of layers to be fused
- Feature fusion: concatenation or element-wise summation
- Normalize feature value or not
- Pyramid feature extractor design
The results are as follows:
- Conv4_3, fc_7 and conv7_2 should be fused (Assuming VGG16 backbone)
- Concatenation for feature fusion
- Batch Normalization
- Pyramid feature extraction should utilise simple blocks, each having a 3 x 3 Conv followed by a ReLU, followed by concatenation. Fused feature maps should not be used for prediction directly

The simplicity of this approach is striking. It takes the intuition of feature fusion and works on it through the simple method of convolution followed by concatenation. The improvements it brings to conventional SSD is also remarkable. When trained on PASCAL VOC 2007 trainval and test + PASCAL VOC 2012 trainval + MSCOCO dataset, FSSD300 achieves 82.0% mAP, higher than conventional SSD300 or DSOD300 (79.3%). FSSD512 manage to reach 84.2%, higher than even Faster R-CNN (ResNet-101) at 83.8%.

Furthermore, Light FSSD300 (Mobilenet) was able to achieve higher mAP than Mobilenet SSD300 on MSCOCO minival2014. This shows its potential for embedded devices.

However, a ResNet-based FSSD was not used by the authors of the paper. Thus, it is difficult to compare to other methods that uses ResNet as its backbone, such as DSOD or DSSD.

# Conclusion
As shown by FSSD and RSSD, it appears that single-stage detectors can also benefit from an improved feature pyramid through the different processing of feature maps and its concatenation before prediction. This may open up more possibilities into building better and faster object detectors.

# References
- Jeong, Jisoo, Hyojin Park and Nojun Kwak. “Enhancement of SSD by concatenating feature maps for object detection.” CoRR abs/1705.09587 (2017): n. pag.
- Li, Zuoxin and Fuqiang Zhou. “FSSD: Feature Fusion Single Shot Multibox Detector.” CoRR abs/1712.00960 (2017): n. pag.
