#!/usr/bin/env python3

import rospy
from std_msgs.msg import Int64MultiArray
import numpy as np
import cv2 
import rospkg
from cv_bridge import CvBridge, CvBridgeError
from sensor_msgs.msg import Image

cv_img = cv2.imread('rocks.jpeg')

resized_img = cv2.resize(cv_img, [640, 480])

hsv_img = cv2.cvtColor(resized_img, cv2.COLOR_BGR2HSV)

lower = np.array([5, 135, 90])
upper = np.array([25, 160, 115])
mask = cv2.inRange(hsv_img, lower, upper)

kernel = np.ones((5,5), np.uint8)
        
mask = cv2.dilate(mask, kernel)
res_green = cv2.bitwise_and(hsv_img, hsv_img,
                                    mask = mask)

final_img = cv2.cvtColor(res_green, cv2.COLOR_HSV2BGR)

cv2.imshow("image", resized_img)

cv2.waitKey(0)
cv2.destroyAllWindows()