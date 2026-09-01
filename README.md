# background-remover

from rembg import remove,new_session
from PIL import Image

session=new_session("u2netp")

input=Image.open("pic.jpg")

input.thumbnail((800,800))

output =remove(input,session=session)
output.save("output.png")