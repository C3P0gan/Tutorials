import cv2
import os
import glob
from PIL import Image

def treat_images(origin_folder: str, destination_folder: str = "treated_images") -> None:
    files = glob.glob(f"{origin_folder}/*")

    for file in files:
        img = cv2.imread(file)

# transform to grayscale
        gray_img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)

        _, treated_img = cv2.threshold(gray_img, 127, 255, cv2.THRESH_TRUNC or cv2.THRESH_OTSU)
        filename = os.path.basename(file)
        cv2.imwrite(f"./{destination_folder}/{filename}", treated_img)

    files = glob.glob(f"{destination_folder}/*")
    for file in files:
        pil_image = Image.open(file)
        pil_image = pil_image.convert("P")
        pil_image_2 = Image.new("P", pil_image.size, color="white")

        for x in range(pil_image.size[1]):
            for y in range (pil_image.size[0]):
                pxl_color = pil_image.getpixel((y, x))
                if pxl_color == 127 or pxl_color == 119:
                    pil_image_2.putpixel((y, x), 0)
                elif pxl_color == 12 or pxl_color == 103:
                    pil_image_2.putpixel((y, x), 255)

        filename = os.path.basename(file)
        pil_image_2.save(f"./{destination_folder}/{filename}")

if __name__ == "__main__":
    treat_images("./bd_captchas/")
