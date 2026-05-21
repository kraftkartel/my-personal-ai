# rule_engine.py
from enforcement.filters.text_filter import check_text
from enforcement.filters.image_filter import check_image

def enforce_rules(input_type: str, content):
    """
    Apply rules depending on input type (text, image, code).
    """
    if input_type == "text":
        return check_text(content)
    elif input_type == "image":
        return check_image(content)
    else:
        return content
