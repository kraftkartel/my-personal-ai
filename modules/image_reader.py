# image_reader.py
import cv2

def read_image(path: str):
    """
    Load an image from disk.
    """
    image = cv2.imread(path)
    if image is None:
        raise ValueError("Image not found.")
    return image
