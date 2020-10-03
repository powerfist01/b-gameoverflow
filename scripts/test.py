arr = []
with open("titles_for_profile","r") as f:
    for item in f.readlines():
        title = item.split("\t")[0].strip()
        arr.append(title)

f = open("titles","a")
for title in arr:
    f.write(title)
    f.write("\n")