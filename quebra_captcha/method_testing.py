import cv2
from PIL import Image

methods = [
    cv2.THRESH_BINARY,
    cv2.THRESH_BINARY_INV,
    cv2.THRESH_TRUNC,
    cv2.THRESH_TOZERO,
    cv2.THRESH_TOZERO_INV,
]

img = cv2.imread("./bd_captchas/captcha_3.png")

# transform to grayscale
gray_img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)

for method in methods:
    _, treated_img = cv2.threshold(gray_img, 127, 255, method or cv2.THRESH_OTSU)
    cv2.imwrite(f"./method_testing/treated_img_{method}.png", treated_img)

pil_image = Image.open("./method_testing/treated_img_2.png")
pil_image = pil_image.convert("P")
pil_image_2 = Image.new("P", pil_image.size, color="white")

for x in range(pil_image.size[1]):
    for y in range (pil_image.size[0]):
        pxl_color = pil_image.getpixel((y, x))
        if pxl_color == 127 or pxl_color == 119:
            pil_image_2.putpixel((y, x), 0)
        elif pxl_color == 12 or pxl_color == 103:
            pil_image_2.putpixel((y, x), 255)

pil_image_2.save("./method_testing/final_img.png")
