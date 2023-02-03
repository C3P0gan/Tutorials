from keras.models import load_model
from helpers import resize_to_fit
from imutils import paths
import numpy as np
import cv2
import pickle
from captcha_treatment import treat_images

def solve_captcha() -> str:
    # import trained model and labels
    with open("./model_labels.dat", "rb") as labels:
        lb = pickle.load(labels)

    model = load_model("./trained_model.hdf5")

    treat_images("./to_solve/", destination_folder="./to_solve/")

    files = list(paths.list_images("./to_solve/"))
    for file in files:
        img = cv2.imread(file)

        # grayscale
        gray_img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)

        # black and white
        _, bw_img = cv2.threshold(gray_img, 0, 255, cv2.THRESH_BINARY_INV)

        # find contours
        contours, _ = cv2.findContours(bw_img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        letters_region = []

        # filter contours
        for contour in contours:
            (x, y, width, height) = cv2.boundingRect(contour)
            area = cv2.contourArea(contour)
            if area < 90:
                letters_region.append((x, y, width, height))

        letters_region = sorted(letters_region, key=lambda x: x[0])

        # print contours and split letters into individual files
        final_img = cv2.merge([gray_img] * 3)

        prediction = []

        i = 1
        for rect in letters_region:
            x, y, width, height = rect
            letter_img = gray_img[y-2:y+height+2, x-2:x+width+2]

            # resize to 20x20px
            letter_img = resize_to_fit(letter_img, 20, 20)

            # add dimensions for keras
            letter_img = np.expand_dims(letter_img, axis=2)
            letter_img = np.expand_dims(letter_img, axis=0)

            predicted_letter = model.predict(letter_img)
            predicted_letter = lb.inverse_transform(predicted_letter)[0]
            prediction.append(predicted_letter)

        prediction_txt = "".join(prediction)
        return prediction_txt

if __name__ == "__main__":
    solve_captcha()
