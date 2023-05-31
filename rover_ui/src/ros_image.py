#!/usr/bin/env python3

import rospy
import cv2 
import numpy as np
from cv_bridge import CvBridge, CvBridgeError
from sensor_msgs.msg import Image
import rospkg
from std_msgs.msg import Int64MultiArray

class Image_Publisher:
    def __init__(self):
        self.image_pub = rospy.Publisher("science_image", Image, queue_size=10)
        rospy.Subscriber("/threshold_limits", Int64MultiArray, self.callback)
        self.bridge = CvBridge()
        self.rate = rospy.Rate(20)
        self.threshold_values = [0, 180, 0, 255, 0, 255]
        self.camera = cv2.VideoCapture(0)
    
    def callback(self, msg):
        self.threshold_values = msg.data

    # def reader(self):
    #     rospack = rospkg.RosPack()
    #     image_path = rospack.get_path('rover_ui') + '/src/'
    #     cv_img = cv2.imread(image_path + 'image1.jpeg')
    #     return cv_img
    
    def draw_grid(self, img, line_color=(0, 255, 0), thickness=1, type_=cv2.LINE_AA, pxstep=11):

        x = pxstep
        y = pxstep
        while x < img.shape[1]:
            cv2.line(img, (x, 0), (x, img.shape[0]), color=line_color, lineType=type_, thickness=thickness)
            x += pxstep

        while y < img.shape[0]:
            cv2.line(img, (0, y), (img.shape[1], y), color=line_color, lineType=type_, thickness=thickness)
            y += pxstep


    def color_detect(self):
        ret, frame = self.camera.read()
        if ret == True:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
            frame = cv2.resize(frame, (640, 480), interpolation= cv2.INTER_AREA)
            lower = np.array([self.threshold_values[0], self.threshold_values[2], self.threshold_values[4]])
            upper = np.array([self.threshold_values[1], self.threshold_values[3], self.threshold_values[5]])
            mask = cv2.inRange(frame, lower, upper)
            kernel = np.ones((5,5), np.uint8)
        
            mask = cv2.dilate(mask, kernel)
            res_green = cv2.bitwise_and(frame, frame,
                                    mask = mask)
            final_img = cv2.cvtColor(res_green, cv2.COLOR_HSV2BGR)
            # self.draw_grid(final_img)
            bridge = CvBridge()
            ros_image = bridge.cv2_to_imgmsg(final_img, encoding="bgr8")
            return ros_image
        else :
            rospy.logerr("Microscope Cam is Closed")
            return False
    
    def pub(self):
        
        while not rospy.is_shutdown():
            try: 
                img = self.color_detect()
                self.image_pub.publish(img)
                self.rate.sleep()
            except CvBridgeError as e:
                print(e)

if __name__ == "__main__":

    rospy.init_node("Image_Publisher")
    image = Image_Publisher()

    try:
        image.pub()
    except rospy.ROSInterruptException:
        pass

