import numpy as np
import cv2
import json

def invert(img, out_path):
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    img_final = cv2.bitwise_not(img_gray)
    cv2.imwrite(out_path, img_final)

def segment_ROI(img, out_path, rect):
    mask = np.zeros(img.shape[:2],np.uint8)
    bgdModel = np.zeros((1,65),np.float64)
    fgdModel = np.zeros((1,65),np.float64)
    cv2.grabCut(img,mask,rect,bgdModel,fgdModel,5,cv2.GC_INIT_WITH_RECT)
    mask2 = np.where((mask==2)|(mask==0),0,1).astype('uint8')
    img = img*mask2[:,:,np.newaxis]
    cv2.imwrite(out_path,img)

def write_to_JSON(img):
    h, w = img.shape[:2]
    pixel_vals = []
    for i in range(w):
        row = []
        for j in range(h):
            k = img[i,j]
            if(k[0]==0 and k[1]==0 and k[2]==0):
                row.append(0)
            else:
                row.append(1)
        pixel_vals.append(row)

    out_dict = {"data": pixel_vals}
    with open('img_dat.json', 'w') as outfile:
        json.dump(out_dict, outfile)


img = cv2.imread("./test_image_bank/money_seg.jpg")
# res = cv2.resize(img,(300, 300), interpolation = cv2.INTER_AREA)
# segment_ROI(res, "./test_image_bank/money_seg.jpg", (30,30,270,270))

write_to_JSON(img)

# with open('./img_dat.json') as data_file:    
#     data = json.load(data_file)
# print(data["data"][0])