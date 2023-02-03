import cv2
import os
import glob

files = glob.glob("./treated_images/*")
for file in files:
    img = cv2.imread(file)
    # grayscale
    gray_img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    # black and white
    _, bw_img = cv2.threshold(gray_img, 0, 255, cv2.THRESH_BINARY_INV)

    contours, _ = cv2.findContours(bw_img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    letters_region = []

    # filter contours
    for contour in contours:
        (x, y, width, height) = cv2.boundingRect(contour)
        area = cv2.contourArea(contour)
        if area < 90:
            letters_region.append((x, y, width, height))

    if len(letters_region) != 4:
        continue

    # print contours and split letters into individual files
    final_img = cv2.merge([gray_img] * 3)

    i = 1
    for rect in letters_region:
        x, y, width, height = rect
        letter_img = gray_img[y-2:y+height+2, x-2:x+width+2]
        filename = os.path.basename(file).replace(".png", f"_letter_{i}.png")
        cv2.imwrite(f"./letters/{filename}", letter_img)
        cv2.rectangle(final_img, (x-2, y-2), (x+width+2, y+height+2), (0, 255, 0), 1)
        i += 1

    filename = os.path.basename(file)
    cv2.imwrite(f"./identified/{filename}", final_img)
