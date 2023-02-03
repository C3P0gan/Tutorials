import cv2
import os
import numpy as np
import pickle
from imutils import paths
from sklearn.preprocessing import LabelBinarizer
from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers.convolutional import Conv2D, MaxPooling2D
from keras.layers.core import Flatten, Dense
from helpers import resize_to_fit

data = []
labels = []
origin_images_folder = "bd_letters"

images = paths.list_images(origin_images_folder)

for file in images:
    label = file.split("/")[1]
    image = cv2.imread(file)
    # grayscale
    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # resize to 20x20
    image = resize_to_fit(image, 20, 20)

    # add a dimension so keras can read the image
    image = np.expand_dims(image, axis=2)

    labels.append(label)
    data.append(image)

# reduce from (0, 255) to (0, 1)
data = np.array(data, dtype="float") / 255
labels = np.array(labels)

# train test splita 70/30
(x_train, x_test, y_train, y_test) = train_test_split(data, labels, test_size=0.3, random_state=7)

# OneHot Encoding
lb = LabelBinarizer().fit(y_train)
y_train = lb.transform(y_train)
y_test = lb.transform(y_test)

# Pickle the LabelBinarizer and save to file
with open("model_labels.dat", "wb") as pickle_file:
    pickle.dump(lb, pickle_file)

# create and train AI
model = Sequential()

 # create neural network layers
model.add(Conv2D(20, (5, 5), padding="same", input_shape=(20, 20, 1), activation="relu"))
model.add(MaxPooling2D(pool_size=(2, 2), strides=(2, 2)))

# create 2nd layer
model.add(Conv2D(50, (5, 5), padding="same", activation="relu"))
model.add(MaxPooling2D(pool_size=(2, 2), strides=(2, 2)))

# create 3rd layer
model.add(Flatten())
model.add(Dense(500, activation="relu"))

# output layer
model.add(Dense(25, activation="softmax"))

# compile all layers
model.compile(loss="categorical_crossentropy", optimizer="adam", metrics=["accuracy"])

# train AI
model.fit(x_train, y_train, validation_data=(x_test, y_test), batch_size=25, epochs=10, verbose=1)

# save trained model to file
model.save("trained_model.hdf5")
