from placeholder import PlaceHolderImage
Width = int(raw_input("\nWhat is the width?\n"))
Height = int(raw_input("\nWhat is the height?\n"))
BGColor = str(raw_input("\nWhat Color grey or green or purple\n"))
Text = str(raw_input("\nText on Image?\n"))
Path = str(raw_input("\nWhat is the name?\n"))
img = PlaceHolderImage(width = Width, height = Height, path = '../assets/'+Path+'.png',bg_color=BGColor,text=Text+' '+str(Width)+'x'+str(Height))
img.save_image()